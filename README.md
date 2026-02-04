# 小学数学题库测试系统

[![GitHub stars](https://img.shields.io/github/stars/kongshan001/teach_math?style=social)](https://github.com/kongshan001/teach_math)
[![GitHub forks](https://img.shields.io/github/forks/kongshan001/teach_math?style=social)](https://github.com/kongshan001/teach_math)

基于浏览器的小学数学练习工具，支持多种题型、计时功能和历史记录复盘。

[GitHub 仓库地址](https://github.com/kongshan001/teach_math) | [在线演示](https://kongshan001.github.io/teach_math/)

## 功能特性

### 题型支持
- **100以内加减法**：随机混合进位/不进位加法，退位/不退位减法
- **99乘法表**：1-9数字乘法练习
- **复合运算**：最多3步运算，包含括号

### 核心功能
- ✅ 自定义题目数量（1-100题）
- ✅ 可选总计时器
- ✅ 单题倒计时（简单题30秒，困难题60秒）
- ✅ 超时警报声提醒
- ✅ 即时对错反馈
- ✅ 答对自动进入下一题（1秒延迟）
- ✅ 答错红色高亮提示
- ✅ 答错可修改
- ✅ 难度循序渐进（按难度1→2→3排序）
- ✅ 自动评分（百分制，四舍五入）
- ✅ 历史记录持久化存储
- ✅ 复盘功能（按题型筛选、错题集）
- ✅ 删除历史记录

### 评分规则
- 满分100分
- 答错按比例扣分（如20题答错1题，扣5分）
- 分数四舍五入取整

## 测试

### 自动化测试
- **test.html**: 完整的自动化测试套件
  - 模块加载测试
  - 工具函数测试
  - 题目生成测试
  - 状态管理测试
  - 存储管理测试
  - UI 控制测试
  - 完整流程测试

### 调试工具
- **debug.html**: 模块加载验证工具
  - 检查所有模块是否正确加载
  - 验证全局函数是否暴露
  - 显示详细的加载日志

**使用方法**: 在浏览器中打开 `test.html` 或 `debug.html` 即可运行测试。

### 代码架构
- **模块化设计**: 采用 ES6 模块系统，代码按功能拆分为 10 个模块
- **易于维护**: 每个模块职责单一，便于定位和修改问题
- **可扩展性强**: 新增功能只需创建新模块或修改对应模块

**详细架构说明**: 查看 [STRUCTURE.md](STRUCTURE.md)

## 使用方法

### 1. 打开应用

**方式一：在线使用（推荐）**
访问 [https://kongshan001.github.io/teach_math/](https://kongshan001.github.io/teach_math/)

**方式二：本地使用**
1. 克隆仓库：`git clone https://github.com/kongshan001/teach_math.git`
2. 在浏览器中打开 `index.html` 文件

### 2. 开始测试
1. 在首页设置题目数量（默认20题）
2. 选择是否启用总计时器
3. 点击"开始测试"按钮

### 3. 答题
1. 查看题目和倒计时
2. 在输入框中输入答案
3. 按回车或点击"提交答案"
4. 查看反馈：
   - 答对：显示"✓ 正确！"，1秒后自动进入下一题
   - 答错：输入框变红，显示"✗ 错误！"，不显示正确答案
5. 答错时可点击"修改答案"重新作答
6. 点击"下一题"继续

### 4. 查看结果
- 显示总分、正确率、总用时
- 点击"查看详情"查看每道题答题情况
- 点击"重新测试"开始新一轮测试
- 点击"查看历史记录"查看所有历史测试

### 5. 历史记录复盘
- 查看所有历史测试记录
- 按题型筛选：全部、加减法、乘法、复合运算
- 错题集：只查看有错误的测试
- 点击记录查看详细答题情况
- 错题显示效果：
  - 红色背景和边框
  - 题目前显示"✗"图标
  - 题目后显示"（错误）"标记
  - 题目文字显示红色
- 可删除单条记录

## 技术特性

### 浏览器兼容性
- 支持现代浏览器（Chrome、Firefox、Safari、Edge）
- 响应式设计，支持移动端访问

### 数据存储
- 使用浏览器 localStorage 存储历史记录
- 无需服务器，数据保存在本地浏览器
- 刷新页面数据不丢失

### 音效实现
- 使用 Web Audio API 生成警报声
- 无需外部音频文件

## 难度分级

### 简单（难度1）- 30秒
- 不进位加法
- 不退位减法
- 6以下数字乘法

### 中等（难度2）- 60秒
- 进位加法
- 退位减法
- 6-9数字乘法
- 2步复合运算

### 困难（难度3）- 60秒
- 3步复合运算（含括号）

## 题目示例

### 100以内加减法
- `23 + 45 =`（进位）
- `17 + 22 =`（不进位）
- `85 - 38 =`（退位）
- `72 - 21 =`（不退位）

### 99乘法表
- `3 × 4 =`（简单）
- `7 × 8 =`（中等）

### 复合运算
- `(3 + 4) × 2 =`
- `(8 - 3) + 5 =`
- `4 × 3 - 5 =`
- `(2 + 3) × (4 + 1) =`
- `7 - 2 + 3 =`
- `2 × 3 + 4 × 5 =`

**注意**：所有题目都不会产生负数结果。

## 数据结构说明

### 测试记录格式
```json
{
  "testId": "uuid",
  "date": "2026-02-04 10:30:00",
  "settings": {
    "questionCount": 20,
    "enableTimer": true
  },
  "totalTime": 180,
  "score": 95,
  "correctCount": 19,
  "totalCount": 20,
  "questions": [
    {
      "question": "23 + 45 =",
      "userAnswer": 68,
      "correctAnswer": 68,
      "isCorrect": true,
      "type": "addition",
      "difficulty": 2,
      "timeLimit": 60,
      "timeSpent": 5.2
    }
  ]
}
```

### 题目类型
- `addition`: 加减法
- `multiplication`: 乘法
- `composite`: 复合运算

## 注意事项

1. **音效**：首次使用时需要用户交互才能播放音效
2. **存储**：清除浏览器数据会删除历史记录
3. **浏览器**：建议使用最新版本浏览器以获得最佳体验
4. **屏幕**：推荐使用电脑或平板，手机也可使用但体验稍逊

## 开发说明

### 文件结构
```
teach_math/
├── css/
│   └── style.css          # 全局样式
├── js/
│   ├── main.js            # 主入口
│   ├── utils.js           # 工具函数
│   ├── state.js           # 状态管理
│   ├── timer.js           # 计时系统
│   ├── storage.js         # 存储管理
│   ├── questionGenerator.js # 题目生成器
│   ├── quiz.js            # 答题逻辑
│   ├── test.js            # 测试流程
│   ├── review.js          # 复盘功能
│   └── ui.js              # UI 控制
├── index.html             # 主页面
├── STRUCTURE.md           # 架构文档
└── README.md              # 项目说明
```

### 核心功能模块
- **questionGenerator.js**: 题目生成器
  - generateAddSubtraction(): 加减法
  - generateMultiplication(): 乘法
  - generateComposite(): 复合运算
  - generateQuestions(): 生成题目集
- **timer.js**: 计时系统
  - startTimer(): 开始计时
  - stopTimer(): 停止计时
  - updateTimerDisplay(): 更新显示
- **quiz.js**: 答题逻辑
  - submitAnswer(): 提交答案
  - modifyAnswer(): 修改答案
  - nextQuestion(): 下一题
- **test.js**: 测试流程
  - startTest(): 开始测试
  - showQuestion(): 显示题目
  - showResult(): 显示结果
- **storage.js**: 存储管理
  - saveTestRecord(): 保存记录
  - loadRecords(): 加载记录
  - deleteRecord(): 删除记录
- **review.js**: 复盘功能
  - showRecords(): 显示记录列表
  - showRecordDetail(): 显示记录详情
  - deleteCurrentRecord(): 删除记录
- **ui.js**: UI 控制
  - showPage(): 页面切换
  - showFeedback(): 显示反馈
  - updateProgressInfo(): 更新进度

## 许可证

本项目仅供学习和教学使用。
