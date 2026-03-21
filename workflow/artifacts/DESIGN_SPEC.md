# 设计规范文档 (Design Specification)

> 生成时间: 2026-03-22 01:45:49
> 负责人: UI设计师

## 1. 设计系统

### 1.1 色彩规范

```css
/* 主色调 - 活力橙 */
--primary: #FF6B35;
--primary-light: #FF8A5B;
--primary-dark: #E55A2B;

/* 辅助色 - 清新蓝 */
--secondary: #4ECDC4;
--secondary-light: #7ED9D2;
--secondary-dark: #35B5AC;

/* 功能色 */
--success: #27AE60;    /* 正确 */
--error: #E74C3C;      /* 错误 */
--warning: #F39C12;    /* 警告 */
--info: #3498DB;       /* 信息 */

/* 中性色 */
--text-primary: #2C3E50;
--text-secondary: #7F8C8D;
--background: #F8F9FA;
--card: #FFFFFF;
```

### 1.2 字体规范

```css
/* 标题 */
--font-h1: 24px / 32px 'PingFang SC', sans-serif;
--font-h2: 20px / 28px 'PingFang SC', sans-serif;
--font-h3: 18px / 24px 'PingFang SC', sans-serif;

/* 正文 */
--font-body: 16px / 24px 'PingFang SC', sans-serif;
--font-small: 14px / 20px 'PingFang SC', sans-serif;

/* 数字（题目） */
--font-number: 32px / 40px 'SF Mono', monospace;
```

### 1.3 间距规范

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
```

### 1.4 圆角规范

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 16px;
--radius-full: 9999px;
```

## 2. 组件设计

### 2.1 答题卡片

```
┌─────────────────────────────┐
│  12 + 8 = ?                 │  ← 题目 (32px)
│                             │
│  ┌─────┐ ┌─────┐ ┌─────┐   │  ← 答案输入
│  │  2  │ │  0  │ │     │   │
│  └─────┘ └─────┘ └─────┘   │
│                             │
│  ⏱ 00:25    进度: 3/10     │  ← 计时器 + 进度
│                             │
│       [ 提交答案 ]          │  ← 主按钮
└─────────────────────────────┘
```

### 2.2 知识点雷达图

```
        加法
         △
        /│\
       / │ \
 减法 ◄──┼──► 乘法
       \ │ /
        \│/
         ▽
        除法
```

### 2.3 错题列表项

```
┌─────────────────────────────┐
│ 12 + 8 = 19  ✗              │
│ 正确答案: 20                 │
│ 知识点: 20以内加法           │
│ 时间: 2026-03-22 10:30      │
└─────────────────────────────┘
```

## 3. 页面布局

### 3.1 首页
- 年级选择（大按钮）
- 难度选择（分段控件）
- 题目数量（滑块）
- 开始按钮（全宽）

### 3.2 答题页
- 顶部: 返回 + 计时器 + 进度
- 中间: 题目卡片
- 底部: 答案输入 + 提交

### 3.3 结果页
- 总分展示（大字）
- 正确率图表
- 错题列表
- 分享按钮

## 4. 交互规范

### 4.1 答对反馈
- 绿色对勾动画
- 1秒后自动下一题
- 播放成功音效

### 4.2 答错反馈
- 红色叉号动画
- 显示正确答案
- 可修改答案
- 播放错误音效

### 4.3 加载状态
- 骨架屏占位
- 进度条动画

---

## 交付清单

- [ ] 设计规范文档 ✅
- [ ] 组件设计稿 (待输出)
- [ ] 页面流程图 (待输出)
- [ ] 切图资源 (待输出)
