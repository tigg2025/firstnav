#!/usr/bin/env zsh

# AI芯片导航 - GitHub Pages 部署脚本
# 使用方法: ./deploy.sh
# 兼容: zsh 和 bash

set -e  # 遇到错误立即退出

echo "🚀 开始部署 AI芯片导航到 GitHub Pages..."
echo ""

# 检查必要文件是否存在
required_files=("index.html" "data.js" "script.js" "README.md")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ 错误: 缺少必要文件 $file"
        exit 1
    fi
done

echo "✅ 所有必要文件检查完成"

# 显示文件大小
echo ""
echo "📦 文件大小统计:"
du -h index.html data.js script.js README.md

total_size=$(du -ch index.html data.js script.js | tail -n1 | cut -f1)
echo "📊 核心文件总大小: $total_size"
echo ""

# 检查是否在git仓库中
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ 错误: 当前目录不是git仓库"
    echo "请先运行: git init"
    exit 1
fi

# 检查是否有远程仓库
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  警告: 没有配置远程仓库"
    echo "请先添加远程仓库: git remote add origin <your-repo-url>"
    read -p "是否继续? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 保存当前分支
current_branch=$(git branch --show-current)
echo "💾 当前分支: $current_branch"

# 确保工作区干净
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 检测到未提交的更改，先提交到当前分支..."
    git add .
    git commit -m "save: prepare for deployment

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
fi

# 创建或切换到 gh-pages 分支
echo "🔄 切换到 gh-pages 分支..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
    # gh-pages 分支已存在
    git checkout gh-pages
    echo "✅ 切换到现有的 gh-pages 分支"
else
    # 创建新的 gh-pages 分支
    git checkout --orphan gh-pages
    echo "✅ 创建新的 gh-pages 分支"
fi

# 清理 gh-pages 分支中的旧文件
echo "🧹 清理旧文件..."
git rm -rf . 2>/dev/null || true
rm -rf * 2>/dev/null || true

# 从原分支复制静态文件
echo "📋 复制静态文件..."
git checkout $current_branch -- index.html data.js script.js 2>/dev/null || true

# 创建 .nojekyll 文件以避免Jekyll处理
touch .nojekyll

# 添加所有文件
git add .

# 检查是否有内容需要提交
if git diff --cached --quiet; then
    echo "ℹ️  没有新的更改需要部署"
else
    # 提交更改
    echo "💾 提交更改..."
    commit_message="deploy: update static site $(date '+%Y-%m-%d %H:%M:%S')

Lightweight AI chip navigator:
- Pure HTML/CSS/JS implementation  
- Multi-language support (zh/en/ja/ko)
- Responsive design with Tailwind CSS
- Fast loading (~50KB vs 88MB Next.js)

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

    git commit -m "$commit_message"
fi

# 推送到远程仓库
echo "🚀 推送到 GitHub..."
if git push origin gh-pages; then
    echo "✅ 推送成功!"
else
    echo "⚠️  推送失败，可能需要设置upstream"
    if git push --set-upstream origin gh-pages; then
        echo "✅ 设置upstream并推送成功!"
    else
        echo "❌ 推送失败"
        git checkout $current_branch
        exit 1
    fi
fi

# 回到原分支
echo "🔄 回到原分支 $current_branch..."
git checkout $current_branch

# 获取仓库信息
repo_url=$(git remote get-url origin 2>/dev/null || echo "unknown")
if [[ $repo_url == *"github.com"* ]]; then
    # 提取用户名和仓库名
    if [[ $repo_url =~ github\.com[:/]([^/]+)/([^/]+)(\.git)? ]]; then
        username=${BASH_REMATCH[1]}
        repo_name=${BASH_REMATCH[2]}
        site_url="https://${username}.github.io/${repo_name}"
    else
        site_url="https://yourusername.github.io/your-repo-name"
    fi
else
    site_url="https://yourusername.github.io/your-repo-name"
fi

echo ""
echo "🎉 部署完成!"
echo ""
echo "📋 部署信息:"
echo "   分支: gh-pages"
echo "   文件: index.html, data.js, script.js"
echo "   大小: $total_size"
echo ""
echo "🌐 网站地址 (几分钟后可用):"
echo "   $site_url"
echo ""
echo "⚙️  GitHub Pages 设置:"
echo "   1. 访问: https://github.com/$username/$repo_name/settings/pages"
echo "   2. Source: Deploy from a branch"
echo "   3. Branch: gh-pages"
echo "   4. Folder: / (root)"
echo ""
echo "✨ 享受你的轻量级AI芯片导航网站!"