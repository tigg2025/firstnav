# Cloudflare Pages 部署指南

本指南将帮助你将 AI 芯片导航网站部署到 Cloudflare Pages 并绑定自定义域名。

## 🚀 部署步骤

### 1. 准备 GitHub 仓库

确保你的代码已经推送到 GitHub：

```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "feat: 优化静态部署配置"

# 推送到 GitHub
git push origin main
```

### 2. 在 Cloudflare Pages 创建项目

1. **登录 Cloudflare Dashboard**
   - 访问 [https://dash.cloudflare.com](https://dash.cloudflare.com)
   - 登录你的 Cloudflare 账户

2. **创建 Pages 项目**
   - 点击左侧导航栏的 "Pages"
   - 点击 "创建项目" 或 "Create a project"
   - 选择 "连接到 Git" 或 "Connect to Git"

3. **连接 GitHub 仓库**
   - 授权 Cloudflare 访问你的 GitHub 账户
   - 选择包含网站代码的仓库
   - 点击 "开始设置" 或 "Begin setup"

### 3. 配置构建设置

在项目设置页面配置以下选项：

```
项目名称: ai-chip-navigator (或你喜欢的名称)
生产分支: main
构建命令: pnpm build
构建输出目录: out
根目录: / (保持空白)
```

**环境变量**（如果需要）：
```
NODE_VERSION = 18
PNPM_VERSION = 8
```

### 4. 触发首次部署

点击 "保存并部署" 或 "Save and Deploy"，Cloudflare 将：
1. 从 GitHub 拉取代码
2. 运行构建命令 `pnpm build`
3. 部署 `out/` 目录中的静态文件
4. 提供一个 `.pages.dev` 的临时域名

## 🌐 绑定自定义域名

### 1. 在 Cloudflare 中添加域名

1. **添加站点**
   - 在 Cloudflare Dashboard 主页点击 "添加站点"
   - 输入你的域名（例如：`example.com`）
   - 选择免费计划

2. **更新 DNS 设置**
   - Cloudflare 会扫描你的现有 DNS 记录
   - 确认或添加必要的记录
   - 按照指示更新域名的 Nameservers

### 2. 配置 Pages 自定义域名

1. **在 Pages 项目中添加域名**
   - 进入你的 Pages 项目
   - 点击 "自定义域" 或 "Custom domains" 选项卡
   - 点击 "设置自定义域" 或 "Set up a custom domain"

2. **添加域名记录**
   - 输入你的域名：`example.com`
   - 同时添加 `www.example.com`（如果需要）
   - Cloudflare 会自动创建 CNAME 记录

### 3. DNS 记录示例

Cloudflare 会自动创建以下记录：

```
类型: CNAME
名称: @
目标: your-project.pages.dev
代理状态: 已代理（橙色云朵）

类型: CNAME  
名称: www
目标: your-project.pages.dev
代理状态: 已代理（橙色云朵）
```

## ⚡ Cloudflare 优化配置

### 1. 启用性能优化

在 Cloudflare Dashboard 中：

**速度 → 优化**
- ✅ Auto Minify (HTML, CSS, JS)
- ✅ Rocket Loader
- ✅ Mirage (图片优化)

**速度 → 缓存**
- 缓存级别：标准
- 浏览器缓存 TTL：4 小时
- ✅ Always Online

### 2. 安全设置

**安全 → SSL/TLS**
- 加密模式：完全（严格）
- ✅ Always Use HTTPS
- ✅ Automatic HTTPS Rewrites

**安全 → 边缘证书**
- ✅ Universal SSL（免费证书）

### 3. 页面规则优化

创建页面规则以优化性能：

```
规则 1: example.com/*
设置:
- 缓存级别: 缓存所有内容
- 边缘缓存 TTL: 30 天

规则 2: example.com/*.html
设置:
- 浏览器缓存 TTL: 4 小时

规则 3: example.com/_next/static/*
设置:
- 缓存级别: 缓存所有内容
- 边缘缓存 TTL: 1 年
- 浏览器缓存 TTL: 1 年
```

## 🔄 自动部署

### GitHub Actions 集成

你的 GitHub Actions 工作流会自动：
1. 检测到代码推送到 `main` 分支
2. 构建静态网站
3. 部署到 GitHub Pages
4. Cloudflare Pages 会自动同步更新

### 手动触发部署

在 Cloudflare Pages 项目中：
1. 点击 "部署" 选项卡
2. 点击 "创建部署"
3. 选择分支（通常是 `main`）
4. 点击 "保存并部署"

## 📊 监控和分析

### 1. Cloudflare Analytics

在 Cloudflare Dashboard 查看：
- 流量统计
- 性能指标
- 安全事件
- 缓存命中率

### 2. Real User Monitoring (RUM)

启用 RUM 获取真实用户体验数据：
- Core Web Vitals
- 页面加载时间
- 地理分布统计

## 🚨 故障排除

### 常见问题

**1. 构建失败**
```bash
# 检查构建命令
构建命令: pnpm build
输出目录: out

# 确保 package.json 中有正确的脚本
"scripts": {
  "build": "next build"
}
```

**2. 404 错误**
- 确保输出目录设置为 `out`
- 检查 `next.config.mjs` 中的 `output: 'export'`

**3. 样式丢失**
- 检查 CSS 文件是否正确构建
- 确保 Tailwind CSS 正确配置

**4. 域名访问问题**
- 检查 DNS 记录是否正确
- 确认 SSL 证书已激活
- 等待 DNS 传播（最多 24 小时）

### 验证部署

**检查列表：**
- [ ] 网站可以通过 `.pages.dev` 域名访问
- [ ] 自定义域名正确解析
- [ ] SSL 证书已激活（绿色锁图标）
- [ ] 所有页面和资源正常加载
- [ ] 多语言切换功能正常
- [ ] 搜索功能正常工作

## 📞 支持

如果遇到问题：

1. **Cloudflare 社区**: [community.cloudflare.com](https://community.cloudflare.com)
2. **Cloudflare 文档**: [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages)
3. **GitHub Issues**: 在你的仓库中创建 issue

---

🎉 恭喜！你的 AI 芯片导航网站现在已经部署到 Cloudflare Pages 并配置了自定义域名。