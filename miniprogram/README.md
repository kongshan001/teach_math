# 小学数学题库测试 - 微信小程序版

## 项目说明

本项目是"小学数学题库测试"的微信小程序版本，提供了完整的数学练习功能。

## 功能特性

✅ **题目生成**
- 加减法题目（支持进位和退位）
- 乘法题目（九九乘法表）
- 复合运算题目（括号、混合运算）

✅ **答题系统**
- 每道题独立的计时器（30秒/60秒）
- 答案验证和反馈
- 支持修改错误答案
- 实时显示当前分数

✅ **结果统计**
- 总体评分显示
- 答题详情查看
- 标记"曾经错过"的题目
- 总用时统计

✅ **历史记录**
- 保存所有测试记录
- 支持按类型筛选（全部/加减法/乘法/复合运算/错题集）
- 查看单次测试详情
- 删除记录功能

## 目录结构

```
miniprogram/
├── app.js                 # 小程序主文件
├── app.json               # 小程序配置
├── app.wxss               # 全局样式
├── project.config.json    # 项目配置
├── sitemap.json           # 索引配置
├── pages/                 # 页面目录
│   ├── index/            # 首页（开始测试）
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── quiz/             # 答题页
│   │   ├── quiz.js
│   │   ├── quiz.json
│   │   ├── quiz.wxml
│   │   └── quiz.wxss
│   ├── result/           # 结果页
│   │   ├── result.js
│   │   ├── result.json
│   │   ├── result.wxml
│   │   └── result.wxss
│   └── records/          # 历史记录页
│       ├── records.js
│       ├── records.json
│       ├── records.wxml
│       └── records.wxss
└── utils/                # 工具函数
    ├── utils.js          # 通用工具
    ├── questionGenerator.js  # 题目生成器
    ├── storage.js        # 本地存储
    └── timer.js          # 计时器
```

## 开发指南

### 环境要求

1. 下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

2. 注册微信小程序账号，获取 AppID

3. 打开微信开发者工具，选择"小程序项目"

### 导入项目

1. 选择项目目录：`miniprogram`

2. 填写 AppID（测试可以使用测试号）

3. 项目名称：`小学数学题库测试`

### 修改 AppID

打开 `miniprogram/project.config.json`，修改 `appid` 字段：

```json
{
  "appid": "你的AppID"
}
```

### 本地调试

1. 在微信开发者工具中打开项目

2. 点击"编译"按钮

3. 在模拟器中预览和调试

### 发布上线

1. 在微信开发者工具中点击"上传"

2. 填写版本号和项目备注

3. 在微信公众平台提交审核

4. 审核通过后即可发布

## 技术栈

- **框架**: 微信小程序原生框架
- **样式**: WXSS
- **数据存储**: wx.setStorageSync / wx.getStorageSync
- **导航**: wx.navigateTo / wx.redirectTo

## 与 Web 版本对比

| 功能 | Web 版 | 小程序版 |
|------|--------|----------|
| 题目生成 | ✅ | ✅ |
| 答题系统 | ✅ | ✅ |
| 计时器 | ✅ | ✅ |
| 答案修改 | ✅ | ✅ |
| 结果统计 | ✅ | ✅ |
| 历史记录 | ✅ | ✅ |
| "曾经错过"标记 | ✅ | ✅ |
| 键盘回车提交 | ✅ | ❌ |
| 导航栏 | ❌ | ✅ |
| 移动端优化 | ⚠️ | ✅ |

## 注意事项

1. **小程序限制**
   - 不支持 `alert()`，使用 `wx.showToast()` 代替
   - 不支持 `localStorage`，使用 `wx.setStorageSync()` 代替
   - 不支持 `setTimeout` 和 `setInterval` 的字符串参数
   - 样式使用 `rpx` 单位适配不同屏幕

2. **调试方法**
   - 使用 `console.log()` 在控制台输出
   - 使用 `wx.showToast()` 显示提示信息
   - 使用 `wx.showModal()` 显示确认对话框

3. **性能优化**
   - 合理使用 `setData`，避免频繁更新
   - 长列表使用虚拟滚动
   - 图片资源适当压缩

## 更新日志

### v1.0.0 (2024-02-04)
- 初始版本发布
- 实现完整的答题功能
- 支持历史记录查看
- 支持"曾经错过"标记

## 联系方式

如有问题或建议，欢迎反馈！
