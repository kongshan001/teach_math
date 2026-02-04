# 测试和调试指南

## 问题排查

### 1. 点击开始测试按钮没有反应

**可能原因**:
- 模块加载失败
- 全局函数未正确暴露
- JavaScript 错误

**排查步骤**:
1. 打开浏览器开发者工具 (F12)
2. 查看 Console 标签页
3. 检查是否有错误信息
4. 打开 `debug.html` 验证模块加载

**常见错误及解决方案**:

#### 错误: "Failed to load module"
```
解决方案:
- 检查文件路径是否正确
- 确保所有 .js 文件存在于 js/ 目录
- 检查浏览器是否支持 ES6 模块（需要现代浏览器）
```

#### 错误: "startTest is not defined"
```
解决方案:
- 等待 main.js 完全加载
- 检查 debug.html 中是否显示 "✓ 应用加载完成"
- 刷新页面重试
```

#### 错误: "ReferenceError"
```
解决方案:
- 检查控制台具体错误信息
- 确保所有依赖模块都已加载
- 检查模块导出/导入是否正确
```

### 2. 使用调试工具

#### debug.html - 模块加载验证

打开 `debug.html` 后，页面会自动检查:
- 所有模块是否正确导入
- 所有函数是否暴露到全局
- 加载过程中的错误信息

预期输出:
```
✓ utils.js 导入成功
✓ questionGenerator.js 导入成功
✓ state.js 导入成功
✓ timer.js 导入成功
✓ storage.js 导入成功
✓ ui.js 导入成功
✓ quiz.js 导入成功
✓ test.js 导入成功
✓ review.js 导入成功
✓ main.js 导入成功
✓ window.startTest 存在
✓ window.showRecords 存在
...
```

#### test.html - 自动化测试

打开 `test.html` 后，点击各个测试按钮:
- **模块加载测试**: 验证所有模块是否加载
- **工具函数测试**: 测试 UUID 生成、时间格式化等
- **题目生成测试**: 验证题目生成逻辑
- **状态管理测试**: 测试状态重置
- **存储管理测试**: 测试 localStorage 操作
- **UI 控制测试**: 测试 UI 相关函数
- **完整流程测试**: 模拟完整测试流程

## 开发调试

### 1. 本地开发

推荐使用 Live Server 或类似工具:
```bash
# 使用 Python 启动简单服务器
python -m http.server 8000

# 或使用 Node.js 的 http-server
npx http-server
```

然后访问 `http://localhost:8000`

### 2. 查看 Console 日志

应用包含详细的日志输出:
```
[时间] 模块导入信息
[时间] 应用初始化信息
[时间] 错误信息（如果有）
```

### 3. 测试单个模块

在浏览器 Console 中:
```javascript
// 测试题目生成
import('./js/questionGenerator.js').then(qg => {
    const questions = qg.generateQuestions(5);
    console.log('生成的题目:', questions);
});

// 测试工具函数
import('./js/utils.js').then(utils => {
    console.log('UUID:', utils.generateUUID());
    console.log('时间:', utils.formatTime(125));
});

// 测试存储
import('./js/storage.js').then(storage => {
    const records = storage.loadRecords();
    console.log('记录数:', records.length);
});
```

## 性能优化

### 1. 模块加载优化

当前使用 ES6 模块，可以考虑:
- 使用打包工具（Vite, Webpack）
- 代码分割和懒加载
- 模块预加载

### 2. 性能监控

在 Console 中运行:
```javascript
// 查看页面加载时间
console.time('页面加载');
window.onload = () => {
    console.timeEnd('页面加载');
};

// 查看函数执行时间
console.time('generateQuestions');
const questions = window.generateQuestions(100);
console.timeEnd('generateQuestions');
```

## 常见问题

### Q: 为什么有时候按钮没有反应？
A: 可能是模块未完全加载，等待几秒或刷新页面重试。

### Q: 浏览器控制台显示 CORS 错误
A: 使用本地服务器而非直接打开文件（file:// 协议）

### Q: localStorage 数据丢失
A: 清除浏览器数据会删除存储的记录，这是正常行为。

### Q: 音效不播放
A: 需要用户交互后才能播放音效，点击任意按钮即可。

## 贡献指南

### 1. 代码规范
- 使用 ES6+ 语法
- 每个函数添加 JSDoc 注释
- 保持模块职责单一

### 2. 测试要求
- 修改代码后运行 test.html
- 确保所有测试通过
- 添加新功能的测试用例

### 3. 提交规范
```
Fix: 简短描述修复的问题
Feat: 简短描述新功能
Docs: 文档更新
Refactor: 代码重构
Test: 测试相关
```

## 获取帮助

1. 查看 GitHub Issues
2. 检查 Console 日志
3. 使用 debug.html 和 test.html 排查问题
4. 提交 Issue 并附上错误信息
