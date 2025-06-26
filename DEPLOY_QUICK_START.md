# 🚀 本地构建部署指南

## 概述

这是一个静态导航网站，采用**本地构建 + GitHub Pages 部署**的方案。只将编译好的静态文件推送到 GitHub，无需在线构建。

## 📋 部署步骤（推荐方式）

### 方案一：一键构建并部署

```bash
# 一条命令完成构建和部署
./scripts/build-static.sh
```

这个脚本会：
1. 清理旧文件
2. 安装依赖并构建
3. 自动部署到 gh-pages 分支
4. 推送到 GitHub

### 方案二：分步操作

```bash
# 1. 本地构建
pnpm build

# 2. 仅部署已构建的文件
./scripts/deploy-only.sh
```

### 配置 GitHub Pages

1. 访问你的 GitHub 仓库
2. 点击 **Settings** → **Pages**
3. Source 选择：**Deploy from a branch**
4. Branch 选择：**gh-pages** / **(root)**

### 连接 Cloudflare Pages（可选）

如果想使用 Cloudflare CDN 和自定义域名：

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 点击 **Pages** → **创建项目**
3. 连接到你的 GitHub 仓库的 **gh-pages 分支**
4. 配置设置：
   ```
   构建命令: (留空 - 因为已经是构建好的文件)
   输出目录: /
   分支: gh-pages
   ```

## 🔧 本地测试

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建静态文件
pnpm build

# 预览静态网站
pnpm preview
```

## 📁 项目结构

```
main 分支 (源代码)         gh-pages 分支 (静态文件)
├── app/                   ├── index.html
├── components/            ├── _next/
├── lib/                   ├── favicon.ico
├── scripts/               ├── sitemap.xml
├── package.json           └── robots.txt
└── next.config.mjs
```

## 🚀 工作流程

1. **开发**: 在 `main` 分支开发
2. **本地构建**: `pnpm build` 生成 `out/` 目录
3. **部署**: 脚本将 `out/` 内容推送到 `gh-pages` 分支
4. **访问**: GitHub Pages 自动托管 `gh-pages` 分支

## 📝 脚本说明

### `scripts/build-static.sh`
完整的构建+部署流程：
- 检查代码质量
- 构建静态文件
- 自动切换分支并部署

### `scripts/deploy-only.sh`
仅部署已构建的文件：
- 适用于已经运行过 `pnpm build`
- 快速推送到 gh-pages

## ✨ 优势

- **快速部署**: 无需等待在线构建
- **版本控制**: 源代码和静态文件分离
- **灵活性**: 可以本地调试构建结果
- **兼容性**: 支持任何静态托管平台

## 🆘 故障排除

**脚本权限错误？**
```bash
chmod +x scripts/*.sh
```

**构建失败？**
```bash
pnpm type-check && pnpm lint
```

**Git 分支问题？**
```bash
git checkout main
git pull origin main
```

**自定义域名？**
在 `scripts/build-static.sh` 中取消注释：
```bash
echo "yourdomain.com" > CNAME
```

---

🎉 现在你只需要运行 `./scripts/build-static.sh` 就能完成整个部署流程！