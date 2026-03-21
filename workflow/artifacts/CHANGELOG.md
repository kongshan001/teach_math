# 变更日志 (CHANGELOG)

本文档记录 teach_math 项目的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)。

---

## [0.2.0] - 2026-03-21

### Added
- 多角色迭代工作流系统
  - 4个角色：产品策划、产品经理、程序、QA
  - 上下游依赖关系管理
  - 每10分钟自动迭代执行
  - 自动 Git 提交和推送

- 功能规格说明文档 (`workflow/artifacts/FEATURE_SPECS.md`)
  - 错题本智能复习功能设计
  - 学习报告功能设计

- 任务清单文档 (`workflow/artifacts/TASK_BACKLOG.md`)
  - P0/P1/P2 优先级任务拆分
  - Sprint 规划

- 状态看板系统 (`workflow/STATUS.md`)
  - 全局状态监控
  - 角色进度追踪
  - 活动日志

- 边界条件测试 (QA-001)
  - count=0 → 自动修正为 1
  - count=10000 → 自动修正为 1000
  - count=-5 → 自动修正为 1
  - 测试文件: `tests/Grade5Generator.test.ts`

### Fixed
- **DEV-001**: 修复 Grade5Generator 小数精度问题
  - TypeScript 版本: `src/generators/Grade5Generator.ts`
  - JavaScript 版本: `js/questionGenerator.js`
  - 使用 `Math.round(num * 100) / 100` 保留两位小数
  - 影响范围: basic/improved/challenge 三种难度
  - 五年级新增减法支持（原来只有加法）

- **DEV-002**: 添加输入参数验证
  - 文件: `src/core/QuestionGenerator.ts`
  - 新增 `validateAndNormalizeOptions()` 方法
  - count 参数限制在 [1, 1000] 范围
  - 所有生成器 (Grade1-6) 已更新使用参数验证

- **BUG**: 修复六年级题目生成变量未定义错误
  - 文件: `js/questionGenerator.js`
  - 问题: `generateGrade6` 函数中 `c`, `d` 变量未声明
  - 修复: 添加 `let a, b, c, d, answer, question, type, tags;`

### Changed
- 迭代脚本支持自动 Git 提交和推送
- 每次迭代自动更新状态看板
- 优化题目生成器代码注释

### Tests
- 新增 8 个边界条件和精度测试用例
- 测试总数: 70 个 (全部通过)
- 测试文件数: 7 个

---

## [0.1.0] - 2026-02-22

### Added
- 初始版本发布
- 支持 1-6 年级题目生成
- 3 个难度级别 (basic/improved/challenge)
- 62 个单元测试
- TypeScript 重构
- Web 版本 (`index.html`)
- 微信小程序版本 (`miniprogram/`)

### Features
- 100 以内加减法
- 99 乘法表
- 复合运算（含括号）
- 计时功能
- 历史记录
- 复盘功能

---

## 版本说明

- **主版本号**: 重大架构变更或不兼容的 API 修改
- **次版本号**: 新增功能，向后兼容
- **修订号**: Bug 修复，向后兼容

---

## 迭代记录

| 迭代 | 时间 | 主要内容 |
|------|------|----------|
| #1-5 | 11:49-12:09 | 工作流系统搭建，文档生成 |
| #6 | 12:29 | 实际修复 DEV-001/DEV-002，编写 QA-001 |
| #7-17 | 12:39-14:49 | 稳定运行，状态监控 |
| #18 | 14:59 | 发现网站使用 JS 版本代码未同步 |
| #19 | 15:09 | 修复网站 JS 版本小数精度，增加减法支持 |
| #27 | 17:09 | 发现六年级 c is not defined 错误 |
| #28 | 17:27 | 修复六年级变量未定义错误 |
| #29-46 | 17:39-19:45 | 稳定运行，P0 任务验证完成 |

---

## 下一版本计划 (0.3.0)

### Sprint 2 - 错题本功能 (P1)
- [ ] DEV-003: 错题数据结构设计
- [ ] DEV-004: 错题收集逻辑
- [ ] 错题筛选和复习推荐

### Sprint 3 - 学习报告 (P2)
- [ ] DEV-005: 报告数据统计
- [ ] 周报/月报生成
- [ ] 趋势图展示
