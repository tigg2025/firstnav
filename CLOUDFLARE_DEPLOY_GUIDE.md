# 🌐 Cloudflare + GitHub 部署指南

为 **tigg2025/firstnav** 项目配置 Cloudflare Pages 部署

## ⚡ 快速部署步骤

### 第1步：推送到 GitHub

```bash
# 添加你的远程仓库
git remote add origin https://github.com/tigg2025/firstnav.git

# 推送代码
git push -u origin main
```

### 第2步：Cloudflare Pages 部署

1. **登录 Cloudflare**
   - 访问 [dash.cloudflare.com](https://dash.cloudflare.com)
   - 登录你的 Cloudflare 账号

2. **创建 Pages 项目**
   - 左侧菜单：`Workers 和 Pages` → `Pages`
   - 点击 `创建应用程序`
   - 选择 `连接到 Git`

3. **连接 GitHub**
   - 授权 Cloudflare 访问你的 GitHub
   - 选择仓库：`tigg2025/firstnav`

4. **配置构建设置**
   ```
   项目名称: firstnav
   生产分支: main
   框架预设: Next.js
   构建命令: pnpm build
   构建输出目录: .next
   Root目录: /
   环境变量: NODE_VERSION = 18
   ```

5. **开始部署**
   - 点击 `保存并部署`
   - 等待 3-5 分钟完成首次部署

## 🌍 配置自定义域名

### 方案一：使用现有域名

如果你有自己的域名（例如：yourdomain.com）：

1. **在 Cloudflare 添加域名**
   - 在 Cloudflare 首页点击 `添加站点`
   - 输入你的域名
   - 选择免费计划
   - 等待 DNS 扫描完成

2. **更改域名服务器**
   - 复制 Cloudflare 提供的 nameservers
   - 在你的域名注册商处更改为 Cloudflare 的 nameservers
   - 等待 DNS 传播（通常 24 小时内）

3. **配置 Pages 域名**
   - 返回 `Workers 和 Pages` → `firstnav` 项目
   - 点击 `自定义域` 标签
   - 点击 `设置自定义域`
   - 输入你的域名：`yourdomain.com`
   - Cloudflare 会自动配置 DNS 记录

### 方案二：使用免费子域名

如果暂时没有域名，可以使用：

1. **免费域名服务**
   - [Freenom](https://freenom.com) - 免费 .tk, .ml, .ga 域名
   - [EU.org](https://nic.eu.org) - 免费 .eu.org 子域名
   - [No-IP](https://www.noip.com) - 免费动态 DNS

2. **或使用 Cloudflare Pages 提供的免费域名**
   - 默认获得：`firstnav.pages.dev`

## 🔧 项目配置优化

### 更新域名配置

在获得最终域名后，更新以下文件：

#### `lib/constants.ts`
```javascript
export const SITE_CONFIG = {
  name: "AI芯片导航",
  description: "专业的AI芯片信息导航平台",
  url: "https://你的域名.com", // 🔥 改成你的实际域名
  ogImage: "/og-image.jpg",
  creator: "AI Chip Navigator Team",
  keywords: [
    "AI芯片", "人工智能芯片", "GPU", "NPU", "ASIC", "FPGA",
    "芯片导航", "芯片对比", "AI训练", "AI推理", "边缘计算"
  ]
} as const
```

#### `app/layout.tsx`
```javascript
// 第28行左右
openGraph: {
  type: "website",
  locale: "zh_CN",
  url: "https://你的域名.com", // 🔥 改成你的实际域名
  title: "AI芯片导航 - 专业的AI芯片信息导航平台",
  // ...
}
```

#### `app/sitemap.ts`
```javascript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://你的域名.com" // 🔥 改成你的实际域名
  // ...
}
```

#### `public/robots.txt`
```
Sitemap: https://你的域名.com/sitemap.xml
```

### 推送更新

```bash
# 修改域名配置后
git add .
git commit -m "feat: update domain configuration"
git push origin main
# Cloudflare 会自动重新部署
```

## 🚀 Cloudflare 优势

使用 Cloudflare Pages 的好处：

- ✅ **免费且快速** - 全球 CDN 加速
- ✅ **自动 HTTPS** - 免费 SSL 证书
- ✅ **边缘计算** - 全球 300+ 节点
- ✅ **DDoS 防护** - 企业级安全
- ✅ **自动部署** - Git 推送即部署
- ✅ **无限带宽** - 免费计划无流量限制
- ✅ **优秀的中国访问速度** - 比 Vercel 更快

## 📊 性能优化设置

### Cloudflare 优化配置

1. **缓存设置**
   - SSL/TLS → 概述 → 设置为 `完全(严格)`
   - 速度 → 优化 → 启用 `自动缩小 HTML、CSS、JS`
   - 速度 → 优化 → 启用 `Brotli`

2. **安全设置**
   - 安全性 → 设置 → 安全级别：`中等`
   - 防火墙 → 启用 `浏览器完整性检查`

3. **页面规则**（可选）
   ```
   规则: *.yourdomain.com/*
   设置: 
   - 浏览器缓存 TTL: 1 个月
   - 缓存级别: 缓存所有内容
   - Edge 缓存 TTL: 1 个月
   ```

## 📱 移动端优化

Cloudflare 自动启用的功能：
- 移动端重定向
- 图片优化
- AMP 支持
- HTTP/3 支持

## 🔍 SEO 和分析

### Google Search Console

1. 访问 [search.google.com/search-console](https://search.google.com/search-console)
2. 添加资源 → 输入你的域名
3. 使用 DNS 验证方式（推荐）
4. 提交站点地图：`https://你的域名.com/sitemap.xml`

### Cloudflare Analytics

- 在 Cloudflare 面板查看免费的网站分析
- 包括访客数、页面浏览量、带宽使用等

### 百度站长平台

1. 访问 [ziyuan.baidu.com](https://ziyuan.baidu.com)
2. 添加网站并验证
3. 提交链接和sitemap

## 🚨 常见问题

### 1. 部署失败
```bash
# 检查构建
pnpm build

# 查看 Cloudflare Pages 日志
```

### 2. 域名不生效
- 检查 nameservers 是否正确指向 Cloudflare
- 等待 DNS 传播（最多 48 小时）
- 在 Cloudflare DNS 页面检查记录

### 3. 性能问题
- 启用 Cloudflare 的优化功能
- 检查图片是否过大
- 使用 Cloudflare 的分析工具

## 🎯 完整部署命令

```bash
# 1. 推送到 GitHub
git remote add origin https://github.com/tigg2025/firstnav.git
git push -u origin main

# 2. 在 Cloudflare Pages 连接仓库并部署

# 3. 配置域名（如需要）

# 4. 享受全球最快的 AI 芯片导航网站！ 🚀
```

## 🎉 部署完成检查

- [ ] 网站正常访问
- [ ] 所有页面功能正常
- [ ] 移动端显示完美
- [ ] 搜索功能工作
- [ ] 多语言切换正常
- [ ] SSL 证书有效
- [ ] 性能测试通过

---

**恭喜！** 你的 AI 芯片导航网站现在运行在全球最快的 CDN 上！ 🌍✨ 