# 🚀 快速部署到线上

你的AI芯片导航项目已经准备就绪！按照以下步骤可以快速部署到线上并通过域名访问。

## ⚡ 3分钟快速部署（推荐）

### 第1步：上传到GitHub

1. **在GitHub创建新仓库**
   - 访问 https://github.com/new
   - 仓库名：`ai-chip-navigator`
   - 设为公开（Public）
   - 点击"Create repository"

2. **连接并推送代码**
```bash
# 添加远程仓库（替换为你的GitHub用户名）
git remote add origin https://github.com/你的用户名/ai-chip-navigator.git

# 推送代码
git branch -M main
git push -u origin main
```

### 第2步：部署到Vercel（免费）

1. 访问 https://vercel.com
2. 点击"Continue with GitHub"登录
3. 点击"Add New..." → "Project"
4. 选择你刚创建的`ai-chip-navigator`仓库
5. 点击"Deploy" - 等待2-3分钟即完成！

**完成！** 你会得到一个可访问的网址，类似：
`https://ai-chip-navigator-xxxx.vercel.app`

## 🌐 配置自定义域名（可选）

如果你有自己的域名：

### 在Vercel中配置
1. 项目设置 → Domains
2. 添加你的域名

### 在域名提供商配置DNS
```
类型: A记录
名称: @  
值: 76.76.19.61

类型: CNAME
名称: www
值: cname.vercel-dns.com
```

## 📝 需要修改域名的文件

部署前，建议将以下文件中的域名改为你的实际域名：

1. `lib/constants.ts` - 第65行的 `url` 字段
2. `app/layout.tsx` - 第28行的 `url` 字段  
3. `app/sitemap.ts` - 第5行的 `baseUrl`
4. `public/robots.txt` - 最后一行的网址

## 🎉 完成检查

部署成功后，你的网站应该包含：

- ✅ 响应式AI芯片导航界面
- ✅ 多语言支持
- ✅ 搜索和筛选功能
- ✅ SEO优化
- ✅ 移动端适配
- ✅ 快速加载速度

## 🔧 其他部署选项

- **Netlify**: 类似Vercel的免费平台
- **GitHub Pages**: 完全免费，但需要静态导出
- **自建服务器**: 使用Docker部署

详细说明请查看：`GITHUB_DEPLOY_GUIDE.md`

---

**现在就开始吧！** 🚀 

```bash
# 只需要两个命令：
git remote add origin https://github.com/你的用户名/ai-chip-navigator.git
git push -u origin main
```

然后在Vercel导入项目即可！ 