# AI芯片导航 - 操作手册

## 🚀 日常操作流程

### 更新网站内容

#### 1. 添加新芯片数据
编辑 `data.js` 文件，在 `featuredChips` 数组中添加：
```javascript
{
    id: 'new-chip-2024',
    vendor: '厂商名称',
    model: '型号',
    type: 'GPU', // GPU/NPU/ASIC/FPGA/SoC
    performance: '性能数据',
    power: '功耗',
    process: '制程',
    memory: '内存',
    applications: ['training', 'inference'], // 应用场景
    releaseYear: 2024
}
```

#### 2. 修改分类数据
在 `data.js` 中更新：
- `applicationScenarios` - 应用场景
- `hardwareTypes` - 硬件类型
- `deploymentTypes` - 部署位置

#### 3. 添加新语言
在 `translations` 对象中添加新语言支持。

### 部署更新

#### 简单命令
```bash
# 提交更改
git add .
git commit -m "update: 描述你的更改"
git push origin main
```

#### 等待部署
- GitHub Pages: 2-5分钟自动更新
- Cloudflare: 1-3分钟自动更新

## 🔧 文件说明

### 核心文件（不要删除）
- `index.html` - 网站主页面
- `data.js` - 所有数据和翻译
- `script.js` - 网站功能逻辑

### 文档文件（可选）
- `README.md` - 项目说明
- `PROJECT_MIGRATION_GUIDE.md` - 迁移详细过程
- `OPERATION_MANUAL.md` - 本操作手册
- `deploy.sh` - 自动部署脚本

## ⚡ 快速操作示例

### 示例1：添加新芯片 "NVIDIA RTX 5090"
```javascript
// 在data.js的featuredChips数组末尾添加
{
    id: 'rtx-5090',
    vendor: 'NVIDIA',
    model: 'RTX 5090',
    type: 'GPU',
    performance: '2000 TOPS',
    power: '600W',
    process: '3nm',
    memory: '48GB GDDR7',
    applications: ['training', 'inference'],
    releaseYear: 2024
}
```

### 示例2：更新统计数据
在 `index.html` 中找到统计部分，修改数字：
```html
<div class="text-4xl font-bold text-blue-600 mb-2">600+</div>
<div class="text-gray-600" id="stat-chips">AI芯片型号</div>
```

### 示例3：修改网站标题
在 `data.js` 的 `translations` 中修改：
```javascript
zh: {
    siteTitle: '新的网站标题',
    heroTitle: '新的主标题',
    // ...
}
```

## 🌐 网站地址

- **GitHub**: https://github.com/tigg2025/firstnav
- **GitHub Pages**: https://tigg2025.github.io/firstnav
- **Cloudflare**: 你的自定义域名

## 📋 定期维护

### 每月检查
- [ ] 检查网站正常访问
- [ ] 验证所有功能正常
- [ ] 更新芯片数据
- [ ] 检查搜索功能

### 每季度检查
- [ ] 检查CDN资源是否正常
- [ ] 更新浏览器兼容性
- [ ] 优化网站性能
- [ ] 备份重要数据

## 🆘 紧急问题处理

### 网站无法访问
1. 检查GitHub仓库状态
2. 检查Cloudflare服务状态
3. 检查域名解析设置

### 功能异常
1. 打开浏览器开发者工具
2. 查看Console错误信息
3. 检查最近的代码更改
4. 回滚到上一个正常版本

### 回滚操作
```bash
# 查看提交历史
git log --oneline

# 回滚到指定版本
git reset --hard <commit-hash>
git push -f origin main
```

## 📞 技术支持

如遇到技术问题：
1. 检查本手册的故障排除部分
2. 查看详细的 `PROJECT_MIGRATION_GUIDE.md`
3. 检查GitHub Issues
4. 查看浏览器控制台错误信息

---

**保持简单，专注内容，享受极速体验！** 🚀