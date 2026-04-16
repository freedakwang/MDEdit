#!/usr/bin/env node
/**
 * 读取 Markdown，将 ```svg 围栏与裸 <svg>...</svg> 转为 JPG，写入资源目录，并输出新 MD。
 *
 * 用法:
 *   npm install
 *   node md-svg-to-jpg.mjs <输入.md> [资源目录]
 *
 * 默认资源目录: 与 .md 同目录下的「<文件名>.assets」
 * 默认输出文件: 同目录下「<文件名>.with-jpg.md」
 *
 * 选项:
 *   --in-place   直接覆盖原文件（慎用）
 *   --out <path> 指定输出的 .md 路径
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

function hash12(s) {
  return crypto.createHash('sha256').update(s, 'utf8').digest('hex').slice(0, 12);
}

function parseArgs(argv) {
  const out = { inPlace: false, outMd: null, positional: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--in-place') out.inPlace = true;
    else if (a === '--out') {
      out.outMd = argv[++i];
      if (!out.outMd) {
        console.error('缺少 --out 参数值');
        process.exit(1);
      }
    } else if (!a.startsWith('-')) out.positional.push(a);
  }
  return out;
}

/**
 * @param {string} md
 * @returns {{ index: number, full: string, svg: string, fenced: boolean }[]}
 */
function findSvgBlocks(md) {
  const list = [];
  const fenceRanges = [];
  const reFence = /```svg\s*\n([\s\S]*?)\n```/gi;
  let m;
  while ((m = reFence.exec(md)) !== null) {
    list.push({ index: m.index, full: m[0], svg: m[1], fenced: true });
    fenceRanges.push([m.index, m.index + m[0].length]);
  }
  function insideAnyFence(start, end) {
    return fenceRanges.some(([rs, re]) => start >= rs && end <= re);
  }
  const reRaw = /<svg[\s\S]*?<\/svg>/gi;
  reRaw.lastIndex = 0;
  while ((m = reRaw.exec(md)) !== null) {
    const start = m.index;
    const end = start + m[0].length;
    if (insideAnyFence(start, end)) continue;
    list.push({ index: start, full: m[0], svg: m[0], fenced: false });
  }
  list.sort((a, b) => b.index - a.index);
  return list;
}

async function svgBufferToJpegFile(svgText, destPath) {
  const buf = Buffer.from(svgText.trim(), 'utf8');
  await sharp(buf)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(destPath);
}

(async function run() {
  const argv = process.argv.slice(2);
  const opts = parseArgs(argv);
  const [inputPath, assetDirArg] = opts.positional;

  if (!inputPath) {
    console.error(`用法: node md-svg-to-jpg.mjs <输入.md> [资源目录] [--out <输出.md>] [--in-place]`);
    process.exit(1);
  }

  const absMd = path.resolve(inputPath);
  if (!fs.existsSync(absMd) || !fs.statSync(absMd).isFile()) {
    console.error('找不到文件:', absMd);
    process.exit(1);
  }

  const mdDir = path.dirname(absMd);
  const base = path.basename(absMd, path.extname(absMd));
  const assetDir = assetDirArg
    ? path.resolve(assetDirArg)
    : path.join(mdDir, `${base}.assets`);

  let outMdPath;
  if (opts.inPlace) outMdPath = absMd;
  else if (opts.outMd) outMdPath = path.resolve(opts.outMd);
  else outMdPath = path.join(mdDir, `${base}.with-jpg.md`);

  let md = fs.readFileSync(absMd, 'utf8');
  const blocks = findSvgBlocks(md);

  if (blocks.length === 0) {
    console.log('未发现 SVG（```svg 围栏或 <svg>...</svg>）。');
    if (!opts.inPlace && outMdPath !== absMd) {
      fs.writeFileSync(outMdPath, md, 'utf8');
      console.log('已复制为:', outMdPath);
    }
    process.exit(0);
  }

  fs.mkdirSync(assetDir, { recursive: true });

  const relFromMdToAsset = path.relative(path.dirname(outMdPath), assetDir);
  const prefix = relFromMdToAsset === '' ? '' : relFromMdToAsset.replace(/\\/g, '/') + '/';

  const usedNames = new Map();

  for (const b of blocks) {
    const h = hash12(b.svg);
    let fileBase = `svg-${h}`;
    if (usedNames.has(h)) {
      fileBase = usedNames.get(h);
    } else {
      usedNames.set(h, fileBase);
    }
    const jpgName = `${fileBase}.jpg`;
    const absJpg = path.join(assetDir, jpgName);

    if (!fs.existsSync(absJpg)) {
      try {
        await svgBufferToJpegFile(b.svg, absJpg);
        console.log('已写入:', absJpg);
      } catch (e) {
        console.error('SVG 转 JPG 失败:', e.message);
        process.exit(1);
      }
    } else {
      console.log('已存在，跳过:', absJpg);
    }

    const mdRef = `\n\n![图表](${prefix}${jpgName})\n\n`;
    md = md.slice(0, b.index) + mdRef + md.slice(b.index + b.full.length);
  }

  fs.writeFileSync(outMdPath, md, 'utf8');
  console.log('已生成 Markdown:', outMdPath);
  console.log('共处理', blocks.length, '处 SVG。');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
