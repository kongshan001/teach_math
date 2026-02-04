# 项目结构说明

本项目包含两个版本：Web版本和微信小程序版本。

## 项目目录

```
teach_math/
├── index.html                 # Web版主页面
├── css/                       # Web版样式
│   └── style.css             # 主样式文件
├── js/                        # Web版JavaScript模块
│   ├── main.js               # 主入口文件
│   ├── quiz.js               # 答题逻辑
│   ├── test.js               # 测试逻辑
│   ├── review.js             # 复习/历史记录逻辑
│   ├── state.js              # 状态管理
│   ├── timer.js              # 计时器
│   ├── storage.js            # 本地存储
│   ├── questionGenerator.js  # 题目生成器
│   ├── ui.js                 # UI操作
│   └── utils.js              # 工具函数
├── miniprogram/              # 微信小程序版本
│   ├── app.js                # 小程序主文件
│   ├── app.json              # 小程序配置
│   ├── app.wxss              # 全局样式
│   ├── project.config.json   # 项目配置
│   ├── sitemap.json          # 索引配置
│   ├── pages/                # 页面目录
│   │   ├── index/           # 首页
│   │   ├── quiz/            # 答题页
│   │   ├── result/          # 结果页
│   │   └── records/         # 历史记录页
│   └── utils/                # 工具函数
│       ├── questionGenerator.js
│       ├── storage.js
│       ├── timer.js
│       └── utils.js
├── .github/                  # GitHub配置
│   └── workflows/
│       └── deploy.yml       # GitHub Pages部署配置
├── README.md                 # Web版说明文档
├── miniprogram/README.md     # 小程序版说明文档
└── STRUCTURE.md              # 本文档
```

## Web版本说明

### 技术栈
- 纯HTML5 + CSS3 + JavaScript (ES6模块化)
- 使用 localStorage 存储历史记录
- GitHub Pages 部署

### 核心功能
- 题目生成（加减法、乘法、复合运算）
- 答题系统（计时器、答案验证、修改答案）
- 结果统计（评分、详情查看）
- 历史记录（筛选、删除、错题集）
- "曾经错过"标记功能

## 微信小程序版本说明

### 技术栈
- 微信小程序原生框架
- WXML + WXSS
- wx.setStorageSync 存储历史记录

### 核心功能
- 所有Web版本功能
- 移动端优化UI
- 原生导航栏

## 两个版本的对比

| 功能 | Web版 | 小程序版 |
|------|-------|----------|
| 题目生成 | ✅ | ✅ |
| 答题系统 | ✅ | ✅ |
| 计时器 | ✅ | ✅ |
| 答案修改 | ✅ | ✅ |
| 结果统计 | ✅ | ✅ |
| 历史记录 | ✅ | ✅ |
| "曾经错过" | ✅ | ✅ |
| 键盘回车提交 | ✅ | ❌ |
| 本地存储 | localStorage | wx.setStorageSync |
| 样式单位 | px/rem | rpx |
| 部署方式 | GitHub Pages | 微信开发者工具上传 |

## 开发指南

### Web版本
```bash
# 本地运行
python3 -m http.server 8080

# 访问
http://localhost:8080
```

### 小程序版本
1. 下载并安装微信开发者工具
2. 打开 `miniprogram` 目录
3. 配置 AppID
4. 点击"编译"按钮

## 共享代码

两个版本的核心逻辑（题目生成、存储、工具函数）基本相同，但适配了各自的运行环境：

- **Web版**: ES6模块化，使用 `import/export`
- **小程序版**: CommonJS模块化，使用 `module.exports`
- **存储**: Web版使用 `localStorage`，小程序版使用 `wx.setStorageSync`
- **样式**: Web版使用 `px/rem`，小程序版使用 `rpx`

## 部署方式

### Web版
1. 推送代码到GitHub
2. GitHub Actions自动部署到GitHub Pages
3. 访问: `https://kongshan001.github.io/teach_math/`

### 小程序版
1. 在微信开发者工具中打开项目
2. 点击"上传"按钮
3. 在微信公众平台提交审核
4. 审核通过后发布

## 维护建议

1. **代码复用**: 两个版本的核心逻辑尽量保持一致，修改时需要同步更新
2. **功能对等**: 保持两个版本的功能对等，避免功能差异
3. **测试覆盖**: 两个版本都需要充分测试
4. **文档更新**: 修改功能时同步更新文档
