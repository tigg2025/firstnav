#!/bin/bash

# AI芯片导航 - 本地构建并部署脚本
# 在本地构建静态文件，然后推送到 GitHub gh-pages 分支

echo "🚀 开始本地构建并部署..."

# 1. 清理旧的构建文件
echo "🧹 清理旧文件..."
rm -rf .next out

# 2. 安装依赖
echo "📦 安装依赖..."
pnpm install

# 3. 类型检查
echo "🔍 类型检查..."
pnpm type-check

# 4. 代码检查
echo "🔧 代码检查..."
pnpm lint

# 5. 构建静态文件
echo "🏗️ 构建静态文件..."
pnpm build

# 6. 检查构建结果
if [ ! -d "out" ]; then
    echo "❌ 构建失败！"
    exit 1
fi

echo "✅ 构建成功！"
echo "📊 构建统计："
echo "   - HTML 文件: $(find out -name "*.html" | wc -l)"
echo "   - JS 文件: $(find out -name "*.js" | wc -l)"  
echo "   - CSS 文件: $(find out -name "*.css" | wc -l)"
echo "   - 总文件数: $(find out -type f | wc -l)"
echo "   - 目录大小: $(du -sh out | cut -f1)"

# 7. 部署到 gh-pages 分支
echo "🚀 部署到 GitHub Pages..."

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  检测到未提交的更改，先提交到 main 分支..."
    git add .
    git commit -m "feat: 更新源代码"
    git push origin main
fi

# 切换到 gh-pages 分支
echo "📂 切换到 gh-pages 分支..."
git checkout gh-pages

# 清理 gh-pages 分支的旧文件（保留 .git 和 .gitignore）
echo "🧹 清理 gh-pages 分支..."
find . -maxdepth 1 ! -name '.git' ! -name '.gitignore' ! -name '.' -exec rm -rf {} \; 2>/dev/null || true

# 复制构建好的文件
echo "📋 复制静态文件..."
cp -r out/* .

# 添加 CNAME 文件（如果有自定义域名）
# echo "yourdomain.com" > CNAME

# 提交并推送到 gh-pages
echo "📤 提交并推送到 GitHub..."
git add .
git commit -m "deploy: 更新静态网站 $(date '+%Y-%m-%d %H:%M:%S')"
git push origin gh-pages

# 切换回 main 分支
echo "🔄 切换回 main 分支..."
git checkout main

echo "🎉 部署完成！"
echo "🌐 网站将在几分钟后可用："
echo "   - GitHub Pages: https://$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\)\/\([^.]*\).*/\1.github.io\/\2/')"
echo "   - 自定义域名: 如果配置了 CNAME 文件"