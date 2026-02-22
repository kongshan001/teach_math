# 小学数学题库系统 (年级版)

基于 teach_math 项目扩展，支持按年级（1-6年级）区分的小学数学练习系统。

## 功能特性

### 年级覆盖
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

## 项目结构

```
teach_math/
├── src/
│   ├── types/
│   │   └── Question.ts           # 类型定义
│   ├── core/
│   │   ├── QuestionGenerator.ts  # 抽象生成器
│   │   └── GradeQuestionFactory.ts # 年级工厂
│   ├── generators/
│   │   ├── Grade1Generator.ts    # 一年级生成器
│   │   ├── Grade2Generator.ts    # 二年级生成器
│   │   ├── Grade3Generator.ts    # 三年级生成器
│   │   ├── Grade4Generator.ts    # 四年级生成器
│   │   ├── Grade5Generator.ts    # 五年级生成器
│   │   └── Grade6Generator.ts    # 六年级生成器
│   └── index.ts                   # 入口文件
├── tests/                          # 单元测试
├── package.json
├── tsconfig.json
└── README.md
```

## 使用方法

### 安装依赖
```bash
npm install
```

### 构建项目
```bash
npm run build
```

### 运行测试
```bash
npm test
```

### 编程式调用

```typescript
import { GradeQuestionFactory } from './dist/index.js';

const factory = new GradeQuestionFactory();

// 生成10道一年级基础题
const questions = factory.generate({
    grade: 1,
    difficultyLevel: 'basic',
    count: 10
});

console.log(questions);
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

## 更新日志

### 2026-02-22
- 初始版本发布
- 支持1-6年级题目生成
- 3个难度级别
- 100%测试覆盖率
