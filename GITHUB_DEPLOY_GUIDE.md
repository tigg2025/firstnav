# 🚀 GitHub 上传和域名部署完整指南

## 🎯 目标

将AI芯片导航项目上传到GitHub，并通过自定义域名访问。

## 📝 准备清单

- [ ] GitHub 账号
- [ ] 购买的域名（可选，也可使用免费子域名）
- [ ] 项目代码已经准备就绪

## 🔧 第一步：配置项目信息

### 1. 更新域名配置

**将以下文件中的域名替换为你的实际域名：**

#### `lib/constants.ts` (第65行)
```javascript
export const SITE_CONFIG = {
  name: "AI芯片导航",
  description: "专业的AI芯片信息导航平台",
  url: "https://你的域名.com",  // 🔥 改成你的域名
  ogImage: "/og-image.jpg",
  creator: "AI Chip Navigator Team",
  keywords: [
    "AI芯片", "人工智能芯片", "GPU", "NPU", "ASIC", "FPGA",
    "芯片导航", "芯片对比", "AI训练", "AI推理", "边缘计算"
  ]
} as const
```

#### `app/layout.tsx` (第28行)
```javascript
openGraph: {
  type: "website",
  locale: "zh_CN",
  url: "https://你的域名.com",  // 🔥 改成你的域名
  title: "AI芯片导航 - 专业的AI芯片信息导航平台",
  description: "汇聚全球AI芯片信息，提供详细的技术参数、性能对比和最新资讯",
  siteName: "AI芯片导航",
  // ... 其他配置
}
```

#### `app/sitemap.ts` (第5行)
```javascript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://你的域名.com"  // 🔥 改成你的域名
  // ... 其他配置
}
```

#### `public/robots.txt` (最后一行)
```
Sitemap: https://你的域名.com/sitemap.xml
```

#### `package.json`
```json
{
  "homepage": "https://你的域名.com",
  "repository": {
    "type": "git",
    "url": "https://github.com/你的GitHub用户名/ai-chip-navigator.git"
  }
}
```

### 2. 最终构建测试

```bash
# 测试构建
pnpm build

# 如果成功，继续下一步
```

## 🌍 第二步：上传到 GitHub

### 1. 在 GitHub 创建仓库

1. 访问 [github.com](https://github.com)
2. 点击右上角的 "+" → "New repository"
3. 仓库名称：`ai-chip-navigator`
4. 选择 "Public"（公开，免费）
5. 不要勾选任何初始化选项
6. 点击 "Create repository"

### 2. 本地 Git 配置

```bash
# 如果还没有初始化 Git
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "feat: initial commit - AI chip navigator ready for deployment"

# 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的GitHub用户名/ai-chip-navigator.git

# 设置主分支
git branch -M main

# 推送到 GitHub
git push -u origin main
```

## 🚀 第三步：选择部署平台

### 方案一：Vercel 部署（推荐，最简单）

#### 优势：
- ✅ 完全免费
- ✅ 自动SSL证书
- ✅ 全球CDN
- ✅ 自动部署
- ✅ 性能优秀

#### 部署步骤：

1. **连接 GitHub**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "Continue with GitHub"
   - 授权 Vercel 访问你的 GitHub

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择 `ai-chip-navigator` 仓库
   - 点击 "Import"

3. **配置项目**
   - **Framework Preset**: Next.js (自动检测)
   - **Root Directory**: ./
   - **Build Command**: `pnpm build`
   - **Output Directory**: .next
   - 点击 "Deploy"

4. **等待部署完成** (2-3分钟)

5. **获取免费域名**
   - 部署完成后，你会得到一个类似这样的免费域名：
   - `https://ai-chip-navigator-你的用户名.vercel.app`

### 方案二：Netlify 部署

1. **连接 GitHub**
   - 访问 [netlify.com](https://netlify.com)
   - 点击 "Add new site" → "Import an existing project"
   - 选择 GitHub 并授权

2. **配置构建**
   - 选择你的仓库
   - **Build command**: `pnpm build`
   - **Publish directory**: `.next`
   - 点击 "Deploy site"

3. **获取免费域名**
   - 类似：`https://amazing-name-123456.netlify.app`

### 方案三：GitHub Pages（静态部署）

如果选择 GitHub Pages，需要修改配置：

1. **修改 next.config.mjs**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // ... 其他配置保持不变
}
```

2. **启用 GitHub Pages**
   - 在 GitHub 仓库中：Settings → Pages
   - Source: GitHub Actions
   - 代码中已包含 GitHub Actions 配置

## 🌐 第四步：配置自定义域名

### 如果你有自己的域名：

#### Vercel 域名配置

1. **在 Vercel 中添加域名**
   - 项目设置 → Domains
   - 添加你的域名：`你的域名.com`

2. **配置 DNS 记录**
在你的域名提供商处添加：

```
类型: A
名称: @
值: 76.76.19.61
TTL: 3600

类型: CNAME
名称: www
值: cname.vercel-dns.com
TTL: 3600
```

#### Netlify 域名配置

```
类型: A
名称: @
值: 75.2.60.5
TTL: 3600

类型: CNAME
名称: www
值: 你的站点名.netlify.app
TTL: 3600
```

#### Cloudflare 配置（推荐）

如果使用 Cloudflare：

1. 添加你的域名到 Cloudflare
2. 使用 Cloudflare 的 DNS
3. 添加 CNAME 记录指向部署平台
4. 启用 "Proxied" 获得更好的性能

### 免费域名选项：

如果暂时没有域名，可以使用：

1. **GitHub.io 域名** (GitHub Pages)
   - `你的用户名.github.io/ai-chip-navigator`

2. **Vercel 免费域名**
   - `ai-chip-navigator-xxxx.vercel.app`

3. **Netlify 免费域名**
   - `amazing-name-123456.netlify.app`

## ✅ 第五步：验证部署

部署完成后，检查以下项目：

### 功能检查

- [ ] 首页正常显示
- [ ] 芯片分类页面工作正常
- [ ] 搜索和筛选功能正常
- [ ] 语言切换功能正常
- [ ] 移动端显示正常
- [ ] 所有链接可点击

### SEO 检查

- [ ] 页面标题正确显示
- [ ] meta 描述正确
- [ ] Open Graph 数据正确
- [ ] sitemap.xml 可访问：`你的域名.com/sitemap.xml`
- [ ] robots.txt 可访问：`你的域名.com/robots.txt`

### 性能检查

- [ ] 页面加载速度 < 3秒
- [ ] 图片正确显示
- [ ] 移动端性能良好

## 🔍 第六步：SEO 设置

### Google Search Console

1. 访问 [search.google.com/search-console](https://search.google.com/search-console)
2. 添加资源 → 输入你的域名
3. 验证所有权（HTML标签方式）
4. 提交站点地图：`你的域名.com/sitemap.xml`

### 百度站长平台

1. 访问 [ziyuan.baidu.com](https://ziyuan.baidu.com)
2. 添加网站并验证
3. 提交链接和sitemap

## 📈 第七步：监控和分析

### 添加 Google Analytics（可选）

1. 创建 GA4 账号
2. 在 `.env.local` 中添加：
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
3. 重新部署

### 性能监控

- 使用 [PageSpeed Insights](https://pagespeed.web.dev/)
- 监控 Core Web Vitals
- 定期检查网站可用性

## 🎉 完成！

恭喜！你的AI芯片导航网站现在可以通过域名访问了！

### 常用操作：

```bash
# 更新网站内容
git add .
git commit -m "feat: update content"
git push origin main
# 自动触发重新部署

# 本地开发
pnpm dev

# 本地构建测试
pnpm build
```

### 后续优化建议：

1. **内容更新**：定期添加新的芯片数据
2. **性能优化**：图片压缩、代码分割
3. **SEO优化**：关键词优化、内容优化
4. **用户体验**：收集反馈、功能改进

### 需要帮助？

- 查看 `DEPLOYMENT.md` 获取详细部署说明
- 查看 `CONTRIBUTING.md` 了解如何贡献
- 在 GitHub Issues 中提问

---

🎯 **快速命令总结：**

```bash
# 1. 配置并测试
pnpm build

# 2. 上传到 GitHub
git add . && git commit -m "feat: ready for deployment"
git remote add origin https://github.com/你的用户名/ai-chip-navigator.git
git push -u origin main

# 3. 在 Vercel 导入项目，完成！
``` 