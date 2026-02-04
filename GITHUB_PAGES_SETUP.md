# GitHub Pages 配置指南

## 问题描述

如果 GitHub Actions 部署失败，显示以下错误：
```
Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions
```

这意味着 GitHub Pages 需要在仓库设置中手动启用。

## 解决方法

### 方法 1: 自动启用（通过 enablement 参数）

最新版本的 deploy.yml 已经添加了 `enablement: true` 参数，应该会自动启用 Pages：

```yaml
- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
  with:
    enablement: true
```

### 方法 2: 手动启用（如果自动启用失败）

1. 访问仓库 GitHub 页面
2. 点击 Settings 标签
3. 左侧菜单选择 Pages
4. 在 "Build and deployment" 部分：
   - Source: 选择 "GitHub Actions"
5. 点击 Save

### 方法 3: 通过 API 启用

```bash
# 使用 GitHub CLI 启用 Pages
gh api repos/kongshan001/teach_math/pages --method PUT \
  -f source.branch=main \
  -f source.path=/
```

## 验证 Pages 是否启用

1. 访问仓库的 Actions 页面
2. 查看最近的 deploy 工作流
3. 应该显示绿色勾号（成功）

## 访问 Pages 网站

启用成功后，网站地址为：
https://kongshan001.github.io/teach_math/

## 故障排除

### 错误: "HttpError: Not Found"

原因: Pages 站点尚未创建
解决: 
1. 手动在 Settings > Pages 中启用
2. 或等待 `enablement: true` 自动创建

### 错误: "Permission denied"

原因: 权限不足
解决: 检查 workflow 中的 permissions：
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

### 部署成功但页面 404

原因: 可能需要等待几分钟
解决: 
1. 等待 2-5 分钟
2. 刷新页面
3. 检查仓库根目录是否有 index.html

## 最新配置

当前的 deploy.yml 配置已经优化：
- ✅ 添加了 enablement: true
- ✅ 正确的权限设置
- ✅ 使用最新版本的 actions

如果仍然失败，请尝试手动在 Settings > Pages 中启用。
