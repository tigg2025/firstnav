#!/bin/bash

# AI芯片导航 - 自动化部署脚本
# 使用方法: ./scripts/deploy.sh [platform]
# 平台选项: vercel, netlify, github

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 显示banner
echo -e "${BLUE}"
echo "┌─────────────────────────────────────────┐"
echo "│         AI芯片导航部署脚本              │"
echo "│       AI Chip Navigator Deploy          │"
echo "└─────────────────────────────────────────┘"
echo -e "${NC}"

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo -e "${RED}错误: 请在项目根目录运行此脚本${NC}"
    exit 1
fi

# 获取部署平台参数
PLATFORM=${1:-"vercel"}

echo -e "${YELLOW}🚀 开始部署到 $PLATFORM...${NC}"

# 检查依赖
echo -e "${BLUE}📦 检查依赖...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}错误: 请先安装 Node.js${NC}"
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}⚠️  pnpm 未安装，正在安装...${NC}"
    npm install -g pnpm
fi

# 安装项目依赖
echo -e "${BLUE}📥 安装项目依赖...${NC}"
pnpm install

# 运行检查
echo -e "${BLUE}🔍 运行代码检查...${NC}"
echo "  - TypeScript 类型检查..."
pnpm type-check

echo "  - ESLint 代码检查..."
pnpm lint

# 构建项目
echo -e "${BLUE}🏗️  构建项目...${NC}"
pnpm build

echo -e "${GREEN}✅ 本地构建成功！${NC}"

# 根据平台执行部署
case $PLATFORM in
    "vercel")
        echo -e "${BLUE}🌐 部署到 Vercel...${NC}"
        
        # 检查 Vercel CLI
        if ! command -v vercel &> /dev/null; then
            echo -e "${YELLOW}⚠️  Vercel CLI 未安装，正在安装...${NC}"
            npm install -g vercel
        fi
        
        # 部署
        vercel --prod
        ;;
        
    "netlify")
        echo -e "${BLUE}🌐 部署到 Netlify...${NC}"
        
        # 检查 Netlify CLI
        if ! command -v netlify &> /dev/null; then
            echo -e "${YELLOW}⚠️  Netlify CLI 未安装，正在安装...${NC}"
            npm install -g netlify-cli
        fi
        
        # 部署
        netlify deploy --prod --dir=.next
        ;;
        
    "github")
        echo -e "${BLUE}🌐 推送到 GitHub...${NC}"
        
        # 检查 git 状态
        if [ -n "$(git status --porcelain)" ]; then
            echo -e "${YELLOW}📝 发现未提交的更改，正在提交...${NC}"
            git add .
            git commit -m "feat: deploy ready - $(date '+%Y-%m-%d %H:%M:%S')"
        fi
        
        # 推送到远程仓库
        git push origin main
        
        echo -e "${GREEN}✅ 代码已推送到 GitHub！${NC}"
        echo -e "${BLUE}💡 如果配置了 GitHub Actions，部署将自动开始${NC}"
        ;;
        
    *)
        echo -e "${RED}错误: 不支持的平台 '$PLATFORM'${NC}"
        echo -e "${YELLOW}支持的平台: vercel, netlify, github${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 部署完成！${NC}"
echo ""
echo -e "${BLUE}📋 部署后检查清单:${NC}"
echo "  □ 访问网站确认部署成功"
echo "  □ 检查所有页面功能正常"
echo "  □ 验证移动端显示"
echo "  □ 配置自定义域名（如需要）"
echo "  □ 设置 Google Analytics"
echo "  □ 提交站点地图到搜索引擎"
echo ""
echo -e "${YELLOW}💡 有问题？查看部署文档:${NC}"
echo "  - 快速指南: QUICK_DEPLOY.md"
echo "  - 详细文档: DEPLOYMENT.md" 