/**
 * MDEdit 代码混淆构建脚本
 * 
 * 用法: node build.js
 * 输出: MDEdit.min.html (混淆后的版本)
 */

const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');

const INPUT = 'MDEdit.html';
const OUTPUT = 'MDEdit.min.html';

console.log('读取源文件:', INPUT);
let html = fs.readFileSync(INPUT, 'utf8');

// 提取 <script> 标签内的 JS 代码
const scriptRegex = /(<script>)([\s\S]*?)(<\/script>)/;
const match = html.match(scriptRegex);

if (!match) {
    console.error('未找到 <script> 标签');
    process.exit(1);
}

const originalJS = match[2];
console.log('原始 JS 大小:', (originalJS.length / 1024).toFixed(1), 'KB');

// 混淆 JavaScript
console.log('正在混淆 JavaScript...');
const obfuscated = JavaScriptObfuscator.obfuscate(originalJS, {
    // 压缩
    compact: true,
    // 控制流扁平化（增加逆向难度）
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.5,
    // 死代码注入
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.2,
    // 标识符混淆
    identifierNamesGenerator: 'hexadecimal',
    // 字符串混淆
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.5,
    rotateStringArray: true,
    shuffleStringArray: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    // 数字转表达式
    numbersToExpressions: true,
    // 调试保护（防止 DevTools 调试）
    debugProtection: false,
    // 自我保护（防止代码被格式化）
    selfDefending: true,
    // Unicode 转义
    unicodeEscapeSequence: false,
    // 保留函数名（避免破坏 onclick 等引用）
    reservedNames: [
        'showExportModal', 'hideExportModal', 'exportHTML', 'exportDocx',
        'exportPDF', 'copyHTML', 'copyForWechat', 'copyPreviewText',
        'showImportModal', 'hideImportModal', 'triggerImport',
        'showAISettings', 'hideAISettings', 'saveAISettings',
        'toggleDarkMode', 'toggleAIPanel', 'toggleOutline',
        'newFile', 'openFile', 'saveFile', 'saveFileAs',
        'insertFormat', 'swapPanels', 'showGroupModal', 'hideGroupModal',
        'toggleSearch', 'showHistoryPanel', 'hideHistoryPanel',
        'sendAIMessage', 'handleQuickAction', 'stopAIStream',
        'resizeStart', 'clearAIHistory',
        // 全局变量
        'editor', 'preview', 'currentFileName', 'currentFilePath',
        'marked', 'DOMPurify', 'hljs'
    ]
});

const obfuscatedJS = obfuscated.getObfuscatedCode();
console.log('混淆后 JS 大小:', (obfuscatedJS.length / 1024).toFixed(1), 'KB');

// 替换原始 JS
html = html.replace(scriptRegex, '$1' + obfuscatedJS + '$3');

// 压缩 CSS（简单压缩：去除注释和多余空白）
html = html.replace(/<style>([\s\S]*?)<\/style>/g, (match, css) => {
    const minCSS = css
        .replace(/\/\*[\s\S]*?\*\//g, '')  // 去除注释
        .replace(/\s+/g, ' ')               // 压缩空白
        .replace(/\s*([{}:;,>+~])\s*/g, '$1') // 去除选择器周围空白
        .replace(/;}/g, '}')                // 去除最后的分号
        .trim();
    return '<style>' + minCSS + '</style>';
});

// 压缩 HTML（去除注释和多余空白，保留 pre/code 内容）
html = html.replace(/<!--[\s\S]*?-->/g, '');  // 去除 HTML 注释
html = html.replace(/^\s+/gm, '');             // 去除行首空白
html = html.replace(/\n+/g, '\n');             // 压缩空行

fs.writeFileSync(OUTPUT, html, 'utf8');
console.log('');
console.log('✅ 混淆完成!');
console.log('输出文件:', OUTPUT);
console.log('文件大小:', (fs.statSync(OUTPUT).size / 1024).toFixed(1), 'KB');
console.log('原始大小:', (fs.statSync(INPUT).size / 1024).toFixed(1), 'KB');
