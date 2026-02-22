# 小学数学题库系统

[![GitHub stars](https://img.shields.io/github/stars/kongshan001/teach_math?style=social)](https://github.com/kongshan001/teach_math)
[![GitHub forks](https://img.shields.io/github/forks/kongshan001/teach_math?style=social)](https://github.com/kongshan001/teach_math)

基于浏览器的小学数学练习工具，支持多种题型、计时功能和历史记录复盘。

**新版**: 支持按年级（1-6年级）区分的小学数学练习系统

[GitHub 仓库地址](https://github.com/kongshan001/teach_math) | [在线演示](https://kongshan001.github.io/teach_math/)

## 功能特性

### 年级覆盖 (新版)
- **一年级**: 10/20以内加减法
- **二年级**: 100以内加减法、连加连减
- **三年级**: 表内乘法、除法入门、分数认识
- **四年级**: 三位数乘两位数、两位数除法、四则混合运算
- **五年级**: 小数运算、分数加减法
- **六年级**: 分数乘除法、百分数、比例

### 难度级别
每个年级包含3个难度级别：
- **基础 (Basic)**: 30秒/题
- **提高 (Improved)**: 45秒/题  
- **挑战 (Challenge)**: 60秒/题

### 题型支持 (原版)
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

## 使用方法

### 1. 打开应用

**方式一：在线使用（推荐）**
访问 [https://kongshan001.github.io/teach_math/](https://kongshan001.github.io/teach_math/)

**方式二：本地使用**
1. 克隆仓库：`git clone https://github.com/kongshan001/teach_math.git`
2. 在浏览器中 `index.html`

### 2. TypeScript 版本使用

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 运行测试
npm test

# 编程式调用
npm run build && node -e "
import { GradeQuestionFactory } from './dist/index.js';
const factory = new GradeQuestionFactory();
const questions = factory.generate({ grade: 1, difficultyLevel: 'basic', count: 5 });
console.log(questions);
"
```

## 项目结构

```
teach_math/
├── src/                        # TypeScript 源码
│   ├── types/
│   │   └── Question.ts         # 类型定义
│   ├── core/
│   │   ├── QuestionGenerator.ts # 抽象生成器
│   │   └── GradeQuestionFactory.ts # 年级工厂
│   ├── generators/
│   │   ├── Grade1Generator.ts  # 一年级生成器
│   │   ├── Grade2Generator.ts  # 二年级生成器
│   │   ├── Grade3Generator.ts  # 三年级生成器
│   │   ├── Grade4Generator.ts  # 四年级生成器
│   │   ├── Grade5Generator.ts  # 五年级生成器
│   │   └── Grade6Generator.ts  # 六年级生成器
│   └── index.ts                 # 入口文件
├── tests/                       # 单元测试 (62个用例)
├── dist/                        # 编译输出
├── css/                         # Web版样式
├── js/                          # Web版JavaScript
├── miniprogram/                 # 微信小程序版本
├── index.html                   # Web版主页面
├── package.json
├── tsconfig.json
└── README.md
```

## 题目数据结构

```typescript
interface Question {
    id: string;
    question: string;
    answer: number;
    type: QuestionType;
    grade: Grade;
    difficulty: Difficulty;
    difficultyLevel: DifficultyLevel;
    timeLimit: number;
    tags: string[];
    gradeDescription: string;
}
```

## 测试覆盖

- 单元测试: 62个测试用例
- 覆盖所有年级生成器和工厂类
- 验证题目生成、答案正确性、难度设置
- 100% 测试覆盖率

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

## 更新日志

### 2026-02-22
- 初始版本发布
- 支持1-6年级题目生成
- 3个难度级别
- 100%测试覆盖率
- TypeScript 重构

### 2026-02-05 难度优化更新
- 加法：数字范围扩大至 10-90
- 乘法：限制在99乘法表
- 复合运算：增加连加减、双乘法

## 许可证

本项目仅供学习和教学使用。
