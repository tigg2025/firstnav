#!/bin/bash

# Cloudflare Pages 清理脚本
# 确保所有文件都符合25MB限制

set -e

echo "🧹 开始清理大文件以符合 Cloudflare Pages 25MB 限制..."

# 删除所有构建和缓存文件
echo "📦 清理构建文件..."
rm -rf .next
rm -rf out
rm -rf build
rm -rf dist

# 删除所有缓存
echo "🗑️ 清理缓存文件..."
rm -rf node_modules/.cache
rm -rf .cache
rm -rf .temp
rm -rf .tmp

# 删除TypeScript缓存
echo "📝 清理 TypeScript 缓存..."
rm -f *.tsbuildinfo
rm -f next-env.d.ts
rm -f tsconfig.tsbuildinfo

# 删除包管理器缓存
echo "📦 清理包管理器缓存..."
rm -rf .pnpm-store
rm -rf .yarn/cache
rm -rf .npm

# 清理所有可能的webpack缓存
echo "⚙️ 清理 Webpack 缓存..."
find . -name "*.pack" -type f -delete 2>/dev/null || true
find . -name "*webpack*" -type d -exec rm -rf {} + 2>/dev/null || true

# 检查是否还有大文件
echo "🔍 检查大文件..."
echo "查找大于10MB的文件："
find . -type f -size +10M -not -path "./node_modules/*" -not -path "./.git/*" 2>/dev/null || echo "✅ 没有找到大文件"

echo "🎉 清理完成！现在可以安全推送到 Cloudflare Pages"

# 显示项目大小
echo "📊 项目大小统计："
du -sh . 2>/dev/null | grep -v node_modules || echo "无法计算大小"

echo ""
echo "🚀 接下来："
echo "1. 安装依赖: pnpm install"
echo "2. 构建测试: pnpm build"
echo "3. 推送代码: git add . && git commit -m 'clean: prepare for cloudflare' && git push" 