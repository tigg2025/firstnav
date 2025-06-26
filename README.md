# AI芯片导航

一个轻量级的AI芯片信息导航网站，使用传统HTML/CSS/JavaScript构建。

## ✨ 特性

- 🌍 **多语言支持** - 中文、英文、日文、韩文
- 🔍 **智能搜索** - 实时搜索建议和结果筛选
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ⚡ **极速加载** - 50KB vs 88MB Next.js版本
- 📊 **分类导航** - 按应用场景、硬件类型、部署位置分类
- 🎨 **现代UI** - 使用Tailwind CSS和Lucide图标

## 🏗️ 文件结构

```
├── index.html              # 主页面
├── data.js                 # 芯片数据和多语言配置
├── script.js               # 交互功能
├── README.md               # 说明文档
├── DEPLOY_TO_GITHUB.md     # GitHub部署指南
└── deploy.sh               # 自动部署脚本
```

## 🚀 快速开始

### 本地预览
```bash
# 方法1: 直接打开
open index.html

# 方法2: 本地服务器
python3 -m http.server 8080
# 访问 http://localhost:8080
```

### GitHub Pages 部署
```bash
# 1. 克隆项目
git clone <your-repo-url>
cd your-repo-name

# 2. 运行部署脚本
chmod +x deploy.sh
./deploy.sh

# 3. 配置GitHub Pages
# 访问: https://github.com/your-username/your-repo/settings/pages
# 选择: gh-pages 分支
```

详细部署说明请查看 [DEPLOY_TO_GITHUB.md](DEPLOY_TO_GITHUB.md)

## 📊 性能对比

| 版本 | 大小 | 加载时间 | 构建时间 | 依赖 |
|------|------|----------|----------|------|
| Next.js | 88MB | 10-30秒 | 2-5分钟 | Node.js生态 |
| 静态版本 | 50KB | <1秒 | 无需构建 | CDN only |

**减少了 99.9% 的体积！**

## 🛠️ 技术栈

- **HTML5** - 语义化标签和无障碍设计
- **CSS3** - Tailwind CSS (CDN) 样式框架
- **JavaScript ES6+** - 原生JS，无框架依赖
- **图标** - Lucide Icons (CDN)
- **字体** - 系统字体栈

## 🌏 浏览器支持

支持所有现代浏览器：
- Chrome 60+
- Firefox 60+  
- Safari 12+
- Edge 79+

## 🔧 自定义和扩展

### 添加新芯片数据
编辑 `data.js` 文件中的 `featuredChips` 数组：
```javascript
{
    id: 'new-chip',
    vendor: 'New Vendor',
    model: 'New Model',
    type: 'GPU',
    performance: '1500 TOPS',
    // ... 更多属性
}
```

### 添加新语言
在 `data.js` 中的 `translations` 对象添加新语言：
```javascript
fr: {
    siteTitle: 'Navigateur de Puces IA',
    // ... 其他翻译
}
```

### 添加新功能
修改 `script.js` 文件，所有交互逻辑都在此文件中。

## 📂 部署选项

### 静态托管服务
- ✅ **GitHub Pages** (推荐) - 免费，自动HTTPS
- ✅ **Cloudflare Pages** - 全球CDN，极速访问
- ✅ **Netlify** - 简单部署，持续集成
- ✅ **Vercel** - 边缘计算，即时部署
- ✅ **任何静态文件服务器** - 只需上传3个文件

### 自定义域名
大多数托管服务都支持自定义域名配置。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**从88MB到50KB的完美蜕变 🦋**  
*享受极速的AI芯片导航体验！*