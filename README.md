# AI芯片导航 (AI Chip Navigator)

专业的AI芯片信息导航平台，为用户提供全面的AI芯片技术资讯、性能对比和最新动态。

## 🚀 项目特色

- **全面的芯片数据库** - 收录全球主流AI芯片信息
- **多维度分类** - 按应用场景、硬件类型、部署位置等分类
- **智能搜索** - 支持芯片型号、厂商、技术规格搜索
- **性能对比** - 详细的技术参数和性能对比功能
- **多语言支持** - 支持中文、英文、日文、韩文等多种语言
- **响应式设计** - 适配桌面端和移动端设备
- **SEO优化** - 针对搜索引擎进行优化

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **前端**: React 19, TypeScript
- **样式**: Tailwind CSS + shadcn/ui 组件库
- **国际化**: 自定义i18n解决方案
- **构建工具**: Next.js 内置构建系统
- **包管理**: pnpm

## 📁 项目结构

```
├── app/                    # Next.js App Router 目录
│   ├── categories/         # 芯片分类页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── loading.tsx        # 加载页面
│   └── page.tsx           # 首页
├── components/            # 可复用组件
│   ├── ui/               # shadcn/ui 组件
│   ├── language-switcher.tsx  # 语言切换器
│   └── theme-provider.tsx     # 主题提供者
├── hooks/                # 自定义Hook
│   ├── use-mobile.tsx    # 移动端检测
│   ├── use-toast.ts      # Toast通知
│   └── useLanguage.ts    # 语言Hook
├── lib/                  # 工具库
│   ├── i18n.ts          # 国际化配置
│   └── utils.ts         # 工具函数
├── public/              # 静态资源
└── styles/              # 样式文件
```

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- pnpm (推荐) 或 npm/yarn

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

## 📱 功能模块

### 1. 首页展示
- Hero区域展示项目介绍
- 智能搜索框
- 芯片分类展示
- 热门芯片推荐
- 统计数据展示

### 2. 芯片分类
- 按应用场景分类（训练、推理、边缘等）
- 按硬件类型分类（GPU、NPU、ASIC等）
- 按部署位置分类（数据中心、本地服务器、端侧设备）
- 按厂商类型分类（商业化厂商、自研芯片）

### 3. 搜索与筛选
- 智能搜索芯片型号、厂商
- 多维度筛选功能
- 排序功能（按名称、厂商、发布时间）
- 网格/列表视图切换

### 4. 多语言支持
- 中文 (简体)
- English
- 日本語
- 한국어
- Deutsch
- Français

## 🌐 SEO优化

项目采用了多种SEO优化策略：

- **语义化HTML结构** - 使用合适的HTML标签
- **元数据优化** - 针对每个页面配置meta信息
- **结构化数据** - 符合搜索引擎爬虫标准
- **响应式设计** - 移动端友好
- **快速加载** - 优化性能和加载速度
- **多语言支持** - 国际化SEO

## 🎨 UI/UX设计

- **现代化设计** - 简洁美观的界面设计
- **响应式布局** - 适配各种屏幕尺寸
- **无障碍访问** - 支持键盘导航和屏幕阅读器
- **交互反馈** - 丰富的hover和点击效果
- **加载状态** - 优雅的加载动画

## 🤝 贡献指南

欢迎提交Issue和Pull Request来帮助改进项目。

### 开发规范

1. 使用TypeScript进行类型安全的开发
2. 遵循ESLint和Prettier配置
3. 提交代码前请确保通过所有检查
4. 新增功能请添加相应的文档

### 提交规范

使用语义化的commit信息：
- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建或辅助工具变动

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 📞 联系方式

- 项目地址: [GitHub Repository]
- 问题反馈: [GitHub Issues]
- 邮箱: [your-email@example.com]

---

⭐ 如果这个项目对你有帮助，请给它一个星标！ 