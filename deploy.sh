#!/bin/bash

# ==========================================
# MDEdit 一键更新与部署脚本 (deploy.sh)
# 用途：在服务器环境上一键拉取最新代码并重启 HTTP 服务
# ==========================================

PORT=8765
echo "🚀 开始一键更新并部署 MDEdit..."

# 1. 更新代码
echo "📦 正在从 Git 仓库拉取最新代码..."
git pull origin main

if [ $? -eq 0 ]; then
    echo "✅ 代码拉取成功！"
else
    echo "❌ 代码拉取失败，请检查网络环境或 Git 权限配置。"
    exit 1
fi

# 2. 检查并清理旧的服务进程
echo "🌐 正在管理本地 HTTP 静态解析服务 (端口: $PORT)..."
PID=$(lsof -t -i:$PORT 2>/dev/null)

if [ ! -z "$PID" ]; then
    echo "🔄 发现旧的 Python 服务正在运行 (PID: $PID)，正在自动重启以应用新版..."
    kill -9 $PID
    sleep 1
else
    echo "▶️ 未发现运行中的后台服务，准备首次启动..."
fi

# 3. 启动新守护进程
# 利用 Python 内置模块提供静态文件及跨域支持（用于流畅调用 AI API）
nohup python3 -m http.server $PORT > deploy_server.log 2>&1 &

# 等待服务准备
sleep 1 

# 4. 验证服务
NEW_PID=$(lsof -t -i:$PORT 2>/dev/null)
if [ ! -z "$NEW_PID" ]; then
    echo "🎉 部署已顺利完成！服务正在稳定运行中 (PID: $NEW_PID)。"
    echo "👉 您的应用访问地址为: http://localhost:$PORT/MDEdit.html"
    echo "   (如果在局域网内，请使用设备的实际 IP 地址访问，如 http://192.168.x.x:$PORT/MDEdit.html)"
else
    echo "⚠️ 警告：服务启动似乎存在异常，请检查 deploy_server.log 中的报错信息。"
fi
