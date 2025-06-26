# GitHub 部署指南

## 方式一：直接替换主分支内容

### 1. 清理现有文件
```bash
cd /Users/bai/Downloads/project/daohang

# 删除不需要的目录（如果还存在）
rm -rf static-version

# 检查当前文件
ls -la
```

应该只保留以下文件：
- `index.html`
- `data.js` 
- `script.js`
- `README.md`
- `DEPLOY_TO_GITHUB.md`（此文件）

### 2. 提交到主分支
```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "refactor: migrate to lightweight static HTML version

- Replace heavy Next.js app (88MB) with pure HTML/CSS/JS (~50KB)
- Maintain all features: multi-language, search, responsive design
- Reduce build size by 99.9% for simple navigation website
- Enable instant loading and easy deployment

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

# 推送到远程仓库
git push origin main
```

### 3. 配置 GitHub Pages
1. 打开 GitHub 仓库页面
2. 点击 **Settings** 标签
3. 在左侧菜单找到 **Pages**
4. 在 **Source** 下选择 **Deploy from a branch**
5. **Branch** 选择 `main`
6. **Folder** 选择 `/ (root)`
7. 点击 **Save**

## 方式二：使用 gh-pages 分支（推荐）

### 1. 创建并切换到 gh-pages 分支
```bash
# 创建新的孤立分支
git checkout --orphan gh-pages

# 删除所有追踪的文件
git rm -rf .

# 只保留静态文件
cp index.html data.js script.js README.md ./

# 添加文件
git add index.html data.js script.js README.md

# 提交
git commit -m "deploy: initial static site deployment

Simple HTML/CSS/JS version of AI chip navigator

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

# 推送到远程
git push origin gh-pages
```

### 2. 配置 GitHub Pages 使用 gh-pages 分支
1. 在 GitHub 仓库的 **Settings** > **Pages**
2. **Source** 选择 **Deploy from a branch**
3. **Branch** 选择 `gh-pages`
4. **Folder** 选择 `/ (root)`
5. 点击 **Save**

## 方式三：自动化部署脚本

创建一个简单的部署脚本：

```zsh
#!/bin/zsh
# deploy.sh

echo "🚀 部署静态网站到 GitHub Pages..."

# 切换到 gh-pages 分支
git checkout gh-pages 2>/dev/null || git checkout -b gh-pages

# 清理旧文件
git rm -rf . 2>/dev/null || true

# 从 main 分支复制静态文件
git checkout main -- index.html data.js script.js README.md

# 添加并提交
git add .
git commit -m "deploy: update static site $(date)"

# 推送
git push origin gh-pages

# 回到 main 分支
git checkout main

echo "✅ 部署完成！"
echo "📦 网站将在几分钟后可用: https://yourusername.github.io/your-repo-name"
```

使用方法：
```bash
chmod +x deploy.sh
./deploy.sh
```

## 验证部署

部署完成后，访问：
`https://yourusername.github.io/your-repo-name`

应该看到完整的AI芯片导航网站，包括：
- ✅ 多语言切换功能
- ✅ 搜索功能
- ✅ 响应式设计
- ✅ 快速加载（~50KB vs 88MB）

## 故障排除

### 1. 如果页面显示空白
- 检查浏览器控制台是否有JavaScript错误
- 确认 `data.js` 和 `script.js` 文件存在且可访问

### 2. 如果样式异常
- 确认 Tailwind CSS CDN 正常加载
- 检查网络连接

### 3. 如果图标不显示
- 确认 Lucide Icons CDN 正常加载
- 检查网络连接

## 文件大小对比

| 版本 | 大小 | 加载时间 | 依赖 |
|------|------|----------|------|
| Next.js | 88MB | 10-30秒 | Node.js构建 |
| 静态版本 | ~50KB | <1秒 | 仅CDN |

## 下一步

1. 自定义域名（可选）
2. 添加更多芯片数据到 `data.js`
3. 根据需要添加新功能到 `script.js`
4. 监控网站访问情况