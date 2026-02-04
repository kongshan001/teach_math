# 快速开始

## 首次使用

### 方法 1: 单文件版本（推荐新手）
1. 在浏览器中打开 `standalone.html`
2. 点击"开始测试"按钮
3. 开始答题！

### 方法 2: 完整应用
1. 在浏览器中打开 `index.html`
2. 按 F12 打开开发者工具
3. 查看 Console 标签页确认没有错误
4. 点击"开始测试"按钮
5. 开始答题！

## 遇到问题？

### 按钮点击没反应？
1. 打开 `standalone.html` 测试单文件版本
2. 如果单文件版本正常，问题出在模块化
3. 运行 `./diagnose.sh` 查看详细诊断
4. 查看 `BUTTON_FIX.md` 了解修复过程

### 想查看测试结果？
1. 完成测试后，会自动显示结果页面
2. 点击"查看详情"查看每道题的情况
3. 点击"查看历史记录"查看所有测试记录

### 想测试功能是否正常？
1. 打开 `test.html`
2. 点击所有测试按钮
3. 验证所有测试通过（绿色）

### 想检查模块加载？
1. 打开 `debug.html`
2. 查看所有模块是否加载成功
3. 查看是否有错误信息

## 常用命令

```bash
# 验证项目完整性
./verify.sh

# 运行诊断
./diagnose.sh

# 打开主应用
open index.html

# 打开单文件版本
open standalone.html

# 打开测试页面
open test.html
```

## 在线访问

- 主应用: https://kongshan001.github.io/teach_math/
- 单文件版本: https://kongshan001.github.io/teach_math/standalone.html
- 自动化测试: https://kongshan001.github.io/teach_math/test.html
- 模块验证: https://kongshan001.github.io/teach_math/debug.html

## 获取帮助

1. 查看 README.md
2. 查看 TESTING.md
3. 查看 BUTTON_FIX.md
4. 运行 ./diagnose.sh
5. 提交 Issue
