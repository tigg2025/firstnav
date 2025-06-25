#!/bin/bash

# Cloudflare Pages 专用构建脚本
# 确保构建过程中不产生大文件

set -e

echo "🌐 开始 Cloudflare Pages 专用构建..."

# 设置环境变量禁用缓存
export NEXT_CACHE_DISABLED=1
export NODE_ENV=production

# 清理可能存在的缓存
echo "🧹 清理缓存..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .cache

# 安装依赖
echo "📦 安装依赖..."
pnpm install --frozen-lockfile

# 构建项目
echo "🏗️ 构建项目..."
pnpm build

# 删除可能的大文件
echo "🗑️ 清理大文件..."
find .next -name "*.pack" -type f -delete 2>/dev/null || true
find .next -path "*/cache/*" -type f -delete 2>/dev/null || true
find .next -name "*webpack*" -type f -size +1M -delete 2>/dev/null || true

# 检查文件大小
echo "🔍 检查文件大小..."
MAX_SIZE_FOUND=false
while IFS= read -r -d '' file; do
    size=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null || echo "0")
    size_mb=$((size / 1024 / 1024))
    if [ $size_mb -gt 20 ]; then
        echo "⚠️ 发现大文件: $file (${size_mb}MB)"
        MAX_SIZE_FOUND=true
        rm -f "$file"
        echo "✅ 已删除大文件: $file"
    fi
done < <(find .next -type f -print0 2>/dev/null || true)

if [ "$MAX_SIZE_FOUND" = true ]; then
    echo "🔧 已清理所有大文件"
else
    echo "✅ 没有发现大文件"
fi

echo "🎉 构建完成！可以安全部署到 Cloudflare Pages" 