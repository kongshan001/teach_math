# 项目结构

```
teach_math/
├── css/
│   └── style.css          # 全局样式（396行）
├── js/
│   ├── main.js            # 主入口，初始化应用（79行）
│   ├── utils.js           # 工具函数（36行）
│   ├── state.js           # 状态管理（35行）
│   ├── timer.js           # 计时系统（53行）
│   ├── storage.js         # 存储管理（32行）
│   ├── questionGenerator.js # 题目生成器（173行）
│   ├── quiz.js            # 答题逻辑（68行）
│   ├── test.js            # 测试流程（77行）
│   ├── review.js          # 复盘功能（126行）
│   └── ui.js              # UI 控制（80行）
├── index.html             # 主页面（91行）
├── README.md              # 项目说明
└── .gitignore            # Git 忽略配置
```

## 模块说明

### 1. css/style.css（396行）
- 全局样式
- 页面布局
- 组件样式（按钮、输入框、弹窗等）
- 响应式设计
- 错误提示样式

### 2. js/utils.js（36行）
**功能**: 工具函数

**导出函数**:
- `playAlarm()` - 播放警报声
- `generateUUID()` - 生成唯一标识符
- `formatTime(seconds)` - 格式化时间显示

### 3. js/state.js（35行）
**功能**: 全局状态管理

**导出变量**:
- `currentTest` - 当前测试状态
- `currentTimer` - 当前计时器
- `timeLeft` - 剩余时间
- `maxTime` - 最大时间
- `totalTimeTimer` - 总计时器
- `currentRecordId` - 当前记录ID

**导出函数**:
- `resetTestState()` - 重置测试状态

### 4. js/timer.js（53行）
**功能**: 计时系统

**导出函数**:
- `startTimer(seconds, onTick, onComplete)` - 开始计时
- `stopTimer()` - 停止计时
- `updateTimerDisplay()` - 更新计时显示
- `getTimeLeft()` - 获取剩余时间
- `getMaxTime()` - 获取最大时间

### 5. js/storage.js（32行）
**功能**: 存储管理

**导出函数**:
- `saveTestRecord(record)` - 保存测试记录
- `loadRecords()` - 加载所有记录
- `deleteRecord(testId)` - 删除记录
- `filterRecords(records, filter)` - 筛选记录

### 6. js/questionGenerator.js（173行）
**功能**: 题目生成器

**导出函数**:
- `generateAddSubtraction()` - 生成加减法题目
- `generateMultiplication()` - 生成乘法题目
- `generateComposite()` - 生成复合运算题目
- `generateQuestions(count)` - 生成题目集

**内部函数**:
- `calculateOperation(a, b, op)` - 计算运算结果

### 7. js/quiz.js（68行）
**功能**: 答题逻辑

**导出函数**:
- `submitAnswer()` - 提交答案
- `modifyAnswer()` - 修改答案
- `nextQuestion()` - 下一题

### 8. js/test.js（77行）
**功能**: 测试流程

**导出函数**:
- `startTest(questionCount, enableTimer)` - 开始测试
- `showQuestion()` - 显示题目
- `showResult()` - 显示结果

### 9. js/review.js（126行）
**功能**: 复盘功能

**导出函数**:
- `showResultDetail(record)` - 显示测试结果详情
- `showRecords(filter)` - 显示历史记录
- `showRecordDetail(testId)` - 显示记录详情
- `closeDetailModal()` - 关闭详情弹窗
- `deleteCurrentRecord()` - 删除当前记录

### 10. js/ui.js（80行）
**功能**: UI 控制

**导出函数**:
- `showPage(pageId)` - 显示指定页面
- `resetHome()` - 重置到首页
- `showFeedback(message, type)` - 显示反馈
- `clearFeedback()` - 清除反馈
- `setInputState(disabled, hasError)` - 设置输入框状态
- `updateProgressInfo()` - 更新进度信息
- `updateButtons(modifyVisible, nextVisible)` - 更新按钮显示
- `showModal()` - 显示弹窗
- `hideModal()` - 隐藏弹窗
- `handleKeyPress(event)` - 处理键盘事件

### 11. js/main.js（79行）
**功能**: 主入口，初始化应用

**功能**:
- 导入所有模块
- 暴露全局函数和状态
- 初始化事件监听
- 适配 HTML 中的函数调用

## 模块依赖关系

```
main.js (主入口)
├── utils.js (工具函数)
├── state.js (状态管理)
├── timer.js (计时系统)
│   └── utils.js
├── storage.js (存储管理)
├── questionGenerator.js (题目生成器)
│   └── utils.js
├── quiz.js (答题逻辑)
│   ├── timer.js
│   ├── ui.js
│   └── state.js
├── test.js (测试流程)
│   ├── questionGenerator.js
│   ├── state.js
│   ├── ui.js
│   └── timer.js
├── review.js (复盘功能)
│   ├── storage.js
│   ├── state.js
│   ├── utils.js
│   └── ui.js
└── ui.js (UI 控制)
    └── state.js
```

## 模块化优势

### 1. 代码组织清晰
- 每个模块职责单一
- 代码按功能分类
- 易于查找和维护

### 2. 可维护性强
- 修改某个功能只需编辑对应模块
- 不会影响其他模块
- 减少代码冲突

### 3. 可复用性高
- 工具函数可在多处使用
- 题目生成器可独立测试
- UI 控制可适配不同场景

### 4. 易于扩展
- 新增题型只需修改 questionGenerator.js
- 新增功能可创建新模块
- 模块间依赖清晰

### 5. 便于测试
- 每个模块可单独测试
- Mock 依赖模块
- 单元测试更容易编写

## 使用说明

### 本地开发
1. 克隆仓库
2. 直接在浏览器中打开 `index.html`
3. 或使用本地服务器（如 Live Server）

### 构建部署
- 无需构建工具
- 直接部署到 GitHub Pages
- GitHub Actions 自动部署

## 注意事项

1. **ES6 模块**: 使用 `import/export` 语法
2. **全局暴露**: main.js 将函数暴露到 `window` 对象
3. **事件绑定**: HTML 中的 `onclick` 调用全局函数
4. **浏览器兼容**: 现代浏览器支持 ES6 模块

## 未来优化方向

1. **打包工具**: 使用 Vite 或 Webpack 打包
2. **类型定义**: 添加 TypeScript 类型
3. **单元测试**: 使用 Jest 测试各个模块
4. **代码规范**: 添加 ESLint 和 Prettier
5. **性能优化**: 代码分割和懒加载
