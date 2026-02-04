#!/bin/bash

echo "========================================"
echo "小学数学题库测试系统 - 诊断脚本"
echo "========================================"
echo ""

# 1. 检查文件
echo "1. 检查关键文件..."
files=(
    "index.html"
    "standalone.html"
    "simple-test.html"
    "test.html"
    "debug.html"
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

if [ "$all_exist" = true ]; then
    echo ""
    echo "✓ 所有关键文件都存在"
else
    echo ""
    echo "✗ 有文件缺失"
    exit 1
fi

echo ""

# 2. 检查目录结构
echo "2. 检查目录结构..."
dirs=("css" "js")
for dir in "${dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "  ✓ $dir/"
        file_count=$(find "$dir" -type f | wc -l)
        echo "    文件数: $file_count"
    else
        echo "  ✗ $dir/ (不存在)"
    fi
done

echo ""

# 3. 检查 HTML 文件中的按钮绑定
echo "3. 检查按钮绑定方式..."
echo "  index.html:"
if grep -q 'onclick=' index.html; then
    echo "    ⚠ 仍然使用 onclick（应该使用 addEventListener）"
else
    echo "    ✓ 使用 addEventListener（正确）"
fi

echo "  standalone.html:"
if grep -q 'onclick=' standalone.html; then
    echo "    ✓ 使用 onclick（单文件版本，正确）"
else
    echo "    ⚠ 应该使用 onclick（单文件版本）"
fi

echo ""

# 4. 检查 JavaScript 模块
echo "4. 检查 JavaScript 模块..."
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
        if grep -q "export\|import" "$file"; then
            echo "  ✓ $file (ES6 模块)"
        else
            echo "  ⚠ $file (无模块语句)"
        fi
    else
        echo "  ✗ $file (不存在)"
    fi
done

echo ""

# 5. 检查 Git 状态
echo "5. 检查 Git 状态..."
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
        git remote -v | head -1
    else
        echo "  ⚠ 远程仓库未配置"
    fi
    
    # 检查最新提交
    echo ""
    echo "  最新提交:"
    git log -1 --oneline
else
    echo "  ✗ Git 仓库不存在"
fi

echo ""

# 6. 测试建议
echo "========================================"
echo "6. 测试建议"
echo "========================================"
echo ""
echo "如果 '开始测试' 按钮没有反应，请按以下步骤排查:"
echo ""
echo "步骤 1: 测试单文件版本（排除模块化问题）"
echo "  - 在浏览器中打开 standalone.html"
echo "  - 点击 '开始测试' 按钮"
echo "  - 如果正常工作，说明基本功能 OK"
echo ""
echo "步骤 2: 测试模块加载（验证模块化是否正常）"
echo "  - 在浏览器中打开 simple-test.html"
echo "  - 查看日志输出"
echo "  - 检查是否有错误"
echo ""
echo "步骤 3: 测试主应用（完整功能）"
echo "  - 在浏览器中打开 index.html"
echo "  - 按 F12 打开开发者工具"
echo "  - 查看 Console 标签页"
echo "  - 检查是否有错误信息"
echo "  - 点击 '开始测试' 按钮"
echo "  - 查看是否有反馈"
echo ""
echo "步骤 4: 运行完整测试"
echo "  - 在浏览器中打开 test.html"
echo "  - 点击所有测试按钮"
echo "  - 验证所有测试通过"
echo ""
echo "步骤 5: 检查模块加载"
echo "  - 在浏览器中打开 debug.html"
echo "  - 查看所有模块是否加载成功"
echo ""
echo "========================================"
echo "诊断完成！"
echo "========================================"
