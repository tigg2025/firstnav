#!/bin/bash

# AI芯片导航 - 项目初始化脚本
# 使用方法: ./scripts/setup.sh

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "┌─────────────────────────────────────────┐"
echo "│       AI芯片导航初始化脚本              │"
echo "│     AI Chip Navigator Setup             │"
echo "└─────────────────────────────────────────┘"
echo -e "${NC}"

# 检查 Node.js
echo -e "${BLUE}🔍 检查环境...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js 未安装${NC}"
    echo -e "${YELLOW}请访问 https://nodejs.org 安装 Node.js 18+${NC}"
    exit 1
else
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js $NODE_VERSION${NC}"
fi

# 检查或安装 pnpm
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}📦 安装 pnpm...${NC}"
    npm install -g pnpm
else
    PNPM_VERSION=$(pnpm --version)
    echo -e "${GREEN}✅ pnpm $PNPM_VERSION${NC}"
fi

# 安装依赖
echo -e "${BLUE}📥 安装项目依赖...${NC}"
pnpm install

# 创建必要的目录
echo -e "${BLUE}📁 创建目录结构...${NC}"
mkdir -p .next
mkdir -p public/images
mkdir -p logs

# 环境配置
echo -e "${BLUE}⚙️  配置环境...${NC}"
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}📝 创建本地环境配置...${NC}"
    cat > .env.local << EOF
# 本地开发环境配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development

# 可选：分析工具配置
# NEXT_PUBLIC_GA_ID=your-google-analytics-id
# NEXT_PUBLIC_GTAG_ID=your-gtag-id

# 开发工具
NEXT_TELEMETRY_DISABLED=1
EOF
fi

# Git 配置
if [ -d ".git" ]; then
    echo -e "${GREEN}✅ Git 仓库已存在${NC}"
else
    echo -e "${BLUE}🔧 初始化 Git 仓库...${NC}"
    git init
    git add .
    git commit -m "feat: initial commit - AI chip navigator"
    echo -e "${YELLOW}💡 记得设置远程仓库: git remote add origin <your-repo-url>${NC}"
fi

# 运行测试
echo -e "${BLUE}🧪 运行测试...${NC}"
echo "  - TypeScript 类型检查..."
pnpm type-check

echo "  - ESLint 代码检查..."
pnpm lint

echo "  - 构建测试..."
pnpm build

# 清理构建文件（保持开发环境干净）
rm -rf .next

echo ""
echo -e "${GREEN}🎉 项目初始化完成！${NC}"
echo ""
echo -e "${BLUE}🚀 接下来可以:${NC}"
echo ""
echo -e "${YELLOW}开发相关:${NC}"
echo "  pnpm dev           # 启动开发服务器"
echo "  pnpm build         # 构建生产版本"
echo "  pnpm start         # 启动生产服务器"
echo "  pnpm lint          # 代码检查"
echo "  pnpm type-check    # 类型检查"
echo ""
echo -e "${YELLOW}部署相关:${NC}"
echo "  ./scripts/deploy.sh vercel   # 部署到 Vercel"
echo "  ./scripts/deploy.sh netlify  # 部署到 Netlify"
echo "  ./scripts/deploy.sh github   # 推送到 GitHub"
echo ""
echo -e "${YELLOW}📚 查看文档:${NC}"
echo "  README.md          # 项目说明"
echo "  QUICK_DEPLOY.md    # 快速部署指南"
echo "  DEPLOYMENT.md      # 详细部署文档"
echo "  CONTRIBUTING.md    # 贡献指南"
echo ""
echo -e "${BLUE}🌐 开发服务器地址: http://localhost:3000${NC}" 