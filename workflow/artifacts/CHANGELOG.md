# 变更日志 (Changelog)

> 生成时间: 2026-03-21 11:59:07
> 负责人: 程序

## [0.2.0] - 2026-03-21

### Fixed
- DEV-001: 修复 Grade5Generator 小数精度问题
  - 使用 `Math.round(num * 100) / 100` 保留两位小数
  - 影响文件: `src/generators/Grade5Generator.ts`

- DEV-002: 添加输入参数验证
  - count 参数限制在 1-1000 范围
  - 添加类型检查
  - 影响文件: `src/core/QuestionGenerator.ts`

### Added
- 为所有公共 API 添加 JSDoc 注释

### Changed
- 优化 UUID 生成，使用更安全的随机算法

---

## 待 QA 验证

- [ ] 验证小数精度修复
- [ ] 验证参数边界处理
- [ ] 运行完整测试套件
