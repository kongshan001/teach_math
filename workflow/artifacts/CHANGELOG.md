# 变更日志 (Changelog)

> 生成时间: 2026-03-21 12:52:00
> 负责人: 程序

## [0.2.0] - 2026-03-21

### Fixed
- DEV-001: 修复 Grade5Generator 小数精度问题 ✅ **实际修复**
  - 使用 `Math.round(num * 100) / 100` 保留两位小数
  - 影响文件: `src/generators/Grade5Generator.ts`
  - 修复范围: basic/improved/challenge 三种难度的所有答案计算

- DEV-002: 添加输入参数验证 ✅ **实际修复**
  - count 参数限制在 1-1000 范围
  - 添加 `validateAndNormalizeOptions()` 方法
  - 影响文件: `src/core/QuestionGenerator.ts` (基类)
  - 所有生成器 (Grade1-6) 均已更新使用参数验证

### Added
- QA-001: 边界条件测试 ✅ **实际编写**
  - 测试 count=0, count=10000, count=-5 的边界处理
  - 测试答案精度（最多两位小数）
  - 影响文件: `tests/Grade5Generator.test.ts`

---

## 验证结果

```
 ✓ tests/GradeQuestionFactory.test.ts  (12 tests)
 ✓ tests/Grade5Generator.test.ts  (16 tests)
 ✓ tests/Grade1Generator.test.ts  (7 tests)
 ✓ tests/Grade2Generator.test.ts  (9 tests)
 ✓ tests/Grade4Generator.test.ts  (9 tests)
 ✓ tests/Grade3Generator.test.ts  (9 tests)
 ✓ tests/Grade6Generator.test.ts  (8 tests)

 Test Files  7 passed (7)
      Tests  70 passed (70)
```
