#!/bin/bash

echo "==================================="
echo "小学数学题库测试系统 - 验证脚本"
echo "==================================="
echo ""

# 检查文件是否存在
echo "1. 检查文件结构..."
files=(
    "index.html"
    "css/style.css"
    "js/main.js"
    "js/utils.js"
    "js/state.js"
    "js/timer.js"
    "js/storage.js"
    "js/questionGenerator.js"
    "js/quiz.js"
    "js/test.js"
    "js/review.js"
    "js/ui.js"
    "test.html"
    "debug.html"
    "README.md"
    "STRUCTURE.md"
    "TESTING.md"
)

all_exist=true
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file (缺失)"
        all_exist=false
    fi
done

echo ""

# 检查 JavaScript 文件语法
echo "2. 检查 JavaScript 语法..."
js_files=(
    "js/utils.js"
    "js/state.js"
    "js/timer.js"
    "js/storage.js"
    "js/questionGenerator.js"
    "js/quiz.js"
    "js/test.js"
    "js/review.js"
    "js/ui.js"
    "js/main.js"
)

for file in "${js_files[@]}"; do
    if [ -f "$file" ]; then
        # 检查是否有 export/import 语句
        if grep -q "export\|import" "$file"; then
            echo "  ✓ $file (ES6 模块)"
        else
            echo "  ⚠ $file (无模块语句)"
        fi
    fi
done

echo ""

# 统计代码行数
echo "3. 代码统计..."
echo "  HTML 文件:"
wc -l *.html | tail -1
echo "  JavaScript 文件:"
wc -l js/*.js | tail -1
echo "  CSS 文件:"
wc -l css/*.css | tail -1
echo "  Markdown 文件:"
wc -l *.md | tail -1

echo ""

# 检查 Git 状态
echo "4. Git 状态..."
if [ -d ".git" ]; then
    echo "  ✓ Git 仓库存在"
    
    if git status | grep -q "nothing to commit"; then
        echo "  ✓ 无未提交的更改"
    else
        echo "  ⚠ 有未提交的更改"
        git status --short
    fi
    
    if git remote -v | grep -q "github.com"; then
        echo "  ✓ 远程仓库已配置"
        git remote -v | grep origin
    fi
else
    echo "  ✗ Git 仓库不存在"
fi

echo ""

echo "==================================="
echo "验证完成！"
echo "==================================="
echo ""
echo "下一步:"
echo "1. 在浏览器中打开 index.html"
echo "2. 打开浏览器开发者工具 (F12)"
echo "3. 查看 Console 标签页"
echo "4. 点击'开始测试'按钮测试功能"
echo "5. 打开 test.html 运行自动化测试"
echo "6. 打开 debug.html 验证模块加载"
