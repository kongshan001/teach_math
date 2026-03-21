#!/bin/bash
# 数学题库网站预览脚本

PORT=8080

echo "📚 启动数学题库网站..."
echo "📍 访问地址: http://localhost:$PORT"
echo "🛑 按 Ctrl+C 停止服务"
echo ""

# 使用 Python 的简单 HTTP 服务器
cd "$(dirname "$0")"
python3 -m http.server $PORT
