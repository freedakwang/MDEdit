#!/bin/bash

# ==========================================
# MDEdit 远程部署脚本 (deploy.sh)
# 用途：将本地构建推送到远程服务器，并重启对应服务
# 目标机：62.234.107.180
# 网址：https://mdedit.all8ai.top/
# ==========================================

SERVER="root@62.234.107.180"
REMOTE_DIR="/opt/mdedit-pwa"

echo "🚀 开始部署 MDEdit 到远程服务器 ($SERVER)..."

# 1. 拷贝核心文件到远程服务器
echo "📦 正在使用 rsync 复制文件到远程目录 $REMOTE_DIR ..."
# 将本地的 MDEdit.html 作为远程的 index.html 进行部署，以确保页面直接访问生效
rsync -avz --progress MDEdit.html $SERVER:$REMOTE_DIR/index.html

# 可选：如果还需要同步别的资源，可以一并加入
rsync -avz --progress README.md $SERVER:$REMOTE_DIR/

if [ $? -eq 0 ]; then
    echo "✅ 文件同步成功！"
else
    echo "❌ 文件同步失败，请检查网络环境或 SSH 权限配置。"
    exit 1
fi

# 2. 远程更新并重启服务
echo "🌐 正在远程重启 pm2 服务 (mdedit-pwa)..."
ssh $SERVER "pm2 restart mdedit-pwa"

if [ $? -eq 0 ]; then
    echo "🎉 部署已顺利完成！服务已重启。"
    echo "👉 您的应用访问地址为: https://mdedit.all8ai.top/"
else
    echo "⚠️ 警告：远程服务重启存在异常，请尝试手动登录检查。"
fi
