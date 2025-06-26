#!/bin/bash

# 仅部署脚本 - 适用于已经构建好的静态文件
# 将 out/ 目录的内容推送到 gh-pages 分支

echo "🚀 开始部署静态文件到 GitHub Pages..."

# 检查 out 目录是否存在
if [ ! -d "out" ]; then
    echo "❌ 找不到 out/ 目录！请先运行 'pnpm build' 构建网站"
    exit 1
fi

echo "📊 部署文件统计："
echo "   - HTML 文件: $(find out -name "*.html" | wc -l)"
echo "   - JS 文件: $(find out -name "*.js" | wc -l)"  
echo "   - CSS 文件: $(find out -name "*.css" | wc -l)"
echo "   - 总文件数: $(find out -type f | wc -l)"
echo "   - 目录大小: $(du -sh out | cut -f1)"

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