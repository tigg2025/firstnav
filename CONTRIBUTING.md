# 贡献指南

感谢您对AI芯片导航项目的关注！我们欢迎所有形式的贡献，包括但不限于：

- 🐛 Bug修复
- ✨ 新功能开发
- 📚 文档改进
- 🌐 多语言翻译
- 💡 功能建议
- 📊 芯片数据更新

## 开发环境设置

### 前提条件

- Node.js 18.17+ 
- pnpm 8.0+ (推荐) 或 npm/yarn

### 安装步骤

1. Fork 并克隆仓库

```bash
git clone https://github.com/your-username/ai-chip-navigator.git
cd ai-chip-navigator
```

2. 安装依赖

```bash
pnpm install
```

3. 启动开发服务器

```bash
pnpm dev
```

4. 在浏览器中访问 `http://localhost:3000`

## 开发规范

### 代码风格

- 使用 TypeScript 进行类型安全的开发
- 遵循 ESLint 和 Prettier 配置
- 使用语义化的变量和函数命名
- 保持代码简洁和可读性

### 组件开发

- 优先使用函数组件和 React Hooks
- 组件名使用 PascalCase
- 文件名使用 kebab-case
- 为复杂组件添加 TypeScript 接口定义

### 样式规范

- 使用 Tailwind CSS 进行样式开发
- 优先使用 shadcn/ui 组件库
- 保持响应式设计
- 遵循无障碍访问标准

## 提交规范

我们使用语义化的提交信息：

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Type 类型

- `feat`: 新功能
- `fix`: Bug修复
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建或辅助工具变动
- `ci`: CI/CD 相关

### 示例

```bash
feat(search): add advanced chip search filters
fix(ui): resolve mobile navigation menu issue
docs(readme): update installation instructions
```

## Pull Request 流程

1. **创建分支**: 从 `main` 分支创建功能分支

```bash
git checkout -b feat/your-feature-name
```

2. **开发功能**: 按照开发规范编写代码

3. **测试验证**: 确保所有测试通过

```bash
pnpm type-check
pnpm lint
pnpm build
```

4. **提交代码**: 使用语义化的提交信息

```bash
git add .
git commit -m "feat: add new chip comparison feature"
```

5. **推送分支**: 推送到您的 Fork 仓库

```bash
git push origin feat/your-feature-name
```

6. **创建 PR**: 在 GitHub 上创建 Pull Request

### PR 模板

请在PR描述中包含：

- 🎯 **目标**: 描述这个PR要解决的问题
- 📝 **变更**: 列出主要的代码变更
- 🧪 **测试**: 说明如何测试这些变更
- 📸 **截图**: 如果有UI变更，请附上截图
- ✅ **检查清单**: 确认已完成的项目

## 问题报告

### Bug 报告

使用 Bug 报告模板，包含：

- 🐛 问题描述
- 📱 设备和浏览器信息
- 🔄 复现步骤
- 🎯 期望行为
- 📸 截图或错误信息

### 功能请求

使用功能请求模板，包含：

- 💡 功能描述
- 🎯 使用场景
- 📋 详细需求
- 🔄 可选方案

## 数据贡献

### 芯片数据更新

我们欢迎芯片数据的更新和补充：

1. 数据格式遵循 `lib/constants.ts` 中的结构
2. 确保数据准确性和来源可靠
3. 添加适当的技术规格说明
4. 包含官方发布时间和价格信息

### 数据验证

- 技术参数需要官方来源
- 性能数据需要标明测试条件
- 价格信息需要包含时间和地区

## 国际化贡献

### 添加新语言

1. 在 `lib/i18n.ts` 中添加语言配置
2. 翻译所有字符串
3. 更新语言切换器组件
4. 测试新语言的显示效果

### 翻译指南

- 保持技术术语的准确性
- 考虑文化差异和表达习惯
- 测试文本长度对UI的影响

## 发布流程

### 版本管理

我们使用语义化版本：

- `MAJOR`: 不兼容的API变更
- `MINOR`: 向后兼容的新功能
- `PATCH`: 向后兼容的Bug修复

### 更新日志

每个版本都会维护 CHANGELOG.md，记录：

- 🎉 新功能
- 🐛 Bug修复
- ⚡ 性能改进
- 💔 破坏性变更
- 🗑️ 废弃功能

## 社区行为准则

### 我们的承诺

为了营造开放友好的环境，我们承诺：

- 尊重不同观点和经验
- 优雅地接受建设性批评
- 专注于最有利于社区的事情
- 对其他社区成员保持同理心

### 不当行为

以下行为被认为是不当的：

- 使用性别化语言或意象
- 人身攻击或政治攻击
- 公开或私下骚扰
- 未经许可发布他人私人信息

## 认可贡献者

我们使用 [All Contributors](https://allcontributors.org/) 规范来认可贡献者。

贡献类型包括：

- 💻 代码
- 📖 文档  
- 🎨 设计
- 💡 想法
- 🐛 Bug报告
- 🌍 翻译
- 📢 推广

## 获取帮助

如果您在贡献过程中遇到问题：

- 📖 查看文档和FAQ
- 💬 在 Discussions 中提问
- 🐛 在 Issues 中报告Bug
- 📧 联系维护者

## 许可证

通过贡献代码，您同意您的贡献将在与项目相同的 MIT 许可证下授权。

---

再次感谢您的贡献！🎉 