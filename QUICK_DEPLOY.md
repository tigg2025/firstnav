# 🚀 快速部署指南

最快5分钟完成部署！

## 🎯 选择部署方式

### 方案一：Vercel（最简单，推荐新手）

1. **准备GitHub仓库**
```bash
# 在GitHub上创建新仓库，然后：
git remote add origin https://github.com/你的用户名/ai-chip-navigator.git
git branch -M main
git push -u origin main
```

2. **一键部署**
- 访问 [vercel.com/new](https://vercel.com/new)
- 选择你的GitHub仓库
- 点击Deploy，等待2-3分钟即可完成！

3. **配置自定义域名**（可选）
- 在Vercel项目设置 → Domains
- 添加你的域名，按提示配置DNS

### 方案二：Netlify（功能丰富）

1. **拖拽部署**
```bash
pnpm build  # 构建项目
```
- 将 `.next` 文件夹拖拽到 [netlify.com/drop](https://app.netlify.com/drop)

2. **Git连接部署**
- 访问 [netlify.com](https://netlify.com)
- New site from Git → 选择你的仓库

### 方案三：GitHub Pages（免费）

1. **启用GitHub Pages**
- 仓库设置 → Pages → 选择"GitHub Actions"

2. **代码已包含自动部署配置**
- 推送代码即可自动部署

## 🔧 部署前配置

### 必需步骤：更新域名配置

1. **更新网站URL**（在多个文件中）：

**lib/constants.ts**
```javascript
export const SITE_CONFIG = {
  url: "https://你的域名.com",  // 改这里
  // ...
}
```

**app/layout.tsx** (第28行)
```javascript
url: "https://你的域名.com",  // 改这里
```

**public/robots.txt** (最后一行)
```
Sitemap: https://你的域名.com/sitemap.xml
```

2. **更新GitHub仓库信息**

**package.json**
```json
{
  "homepage": "https://你的域名.com",
  "repository": {
    "url": "https://github.com/你的用户名/ai-chip-navigator.git"
  }
}
```

## 💾 Git提交和推送

```bash
# 添加所有文件
git add .

# 提交
git commit -m "feat: ready for deployment"

# 推送到GitHub
git push origin main
```

## 🌐 域名配置速查

### Vercel域名配置
在域名DNS设置中添加：
```
A记录: @ → 76.76.19.61
CNAME: www → cname.vercel-dns.com
```

### Netlify域名配置
```
A记录: @ → 75.2.60.5
CNAME: www → 你的站点名.netlify.app
```

### Cloudflare域名配置（推荐）
```
A记录: @ → 代理服务器IP
CNAME: www → 你的部署地址
```

## ✅ 部署成功检查

部署完成后访问你的网站，检查：

- [ ] 首页正常显示
- [ ] 搜索功能正常
- [ ] 分类页面正常
- [ ] 多语言切换正常
- [ ] 移动端显示正常
- [ ] SEO信息正确（查看页面源码）

## 🔍 SEO设置

### Google Search Console
1. 访问 [search.google.com/search-console](https://search.google.com/search-console)
2. 添加你的域名
3. 验证所有权
4. 提交sitemap: `你的域名.com/sitemap.xml`

### 百度站长平台
1. 访问 [ziyuan.baidu.com](https://ziyuan.baidu.com)
2. 添加网站
3. 验证网站所有权
4. 提交sitemap

## 🚨 常见问题

### 1. 构建失败
```bash
# 本地测试构建
pnpm build

# 检查错误
pnpm type-check
pnpm lint
```

### 2. 404错误
- 确保路由配置正确
- 检查Next.js配置
- 查看部署平台的重定向设置

### 3. 静态资源加载失败
- 检查 `next.config.mjs` 中的 `assetPrefix` 设置
- 确保静态资源路径正确

### 4. 域名不生效
- 检查DNS配置是否正确
- 等待DNS传播（可能需要24-48小时）
- 使用 [nslookup.io](https://nslookup.io) 检查DNS状态

## 📱 性能优化

部署后建议：

1. **启用CDN**（Cloudflare推荐）
2. **配置缓存策略**
3. **启用Gzip压缩**
4. **图片优化**（WebP格式）
5. **监控性能**（Google PageSpeed Insights）

## 🎉 完成！

恭喜！你的AI芯片导航网站已经成功部署。现在你可以：

- 分享你的网站链接
- 开始添加更多芯片数据
- 收集用户反馈
- 持续优化和改进

有问题？查看完整的 `DEPLOYMENT.md` 文件获取详细说明。 