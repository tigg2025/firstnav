# 快速部署指南

## 立即部署到GitHub Pages

### 第一步：检查文件
在终端中运行：
```zsh
cd /Users/bai/Downloads/project/daohang
ls -la
```

应该看到：
- ✅ `index.html`
- ✅ `data.js` 
- ✅ `script.js`
- ✅ `README.md`
- ✅ `deploy.sh`
- ✅ `DEPLOY_TO_GITHUB.md`

### 第二步：检查git状态
```zsh
git status
git remote -v
```

### 第三步：运行部署脚本
```zsh
# 给脚本执行权限
chmod +x deploy.sh

# 运行部署
./deploy.sh
```

或者手动执行以下命令：

### 手动部署步骤

#### 1. 保存当前更改
```zsh
git add .
git commit -m "feat: complete migration to static HTML version

- Convert from 88MB Next.js to 50KB static site
- Maintain all features: multi-language, search, responsive
- Add deployment scripts and documentation

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
```

#### 2. 创建gh-pages分支
```zsh
# 创建新的孤立分支
git checkout --orphan gh-pages

# 清理所有文件
git rm -rf . 2>/dev/null || true

# 从main分支复制关键文件
git checkout main -- index.html data.js script.js README.md

# 创建.nojekyll文件
touch .nojekyll

# 添加文件
git add .

# 提交
git commit -m "deploy: initial GitHub Pages deployment

Lightweight AI chip navigator with:
- Multi-language support (zh/en/ja/ko)  
- Real-time search functionality
- Responsive design with Tailwind CSS
- 50KB total size vs 88MB Next.js version

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
```

#### 3. 推送到GitHub
```zsh
git push origin gh-pages
```

#### 4. 返回主分支
```zsh
git checkout main
```

### 第四步：配置GitHub Pages

1. 打开浏览器，访问你的GitHub仓库
2. 点击 **Settings** 标签
3. 左侧菜单找到 **Pages**
4. **Source** 选择 **Deploy from a branch**
5. **Branch** 选择 `gh-pages`
6. **Folder** 选择 `/ (root)`
7. 点击 **Save**

### 第五步：验证部署

几分钟后，访问：
`https://yourusername.github.io/your-repo-name`

应该看到完整的AI芯片导航网站！

## 故障排除

### 如果部署脚本执行失败
```zsh
# 检查脚本权限
ls -la deploy.sh

# 如果没有执行权限，添加权限
chmod +x deploy.sh

# 如果zsh不可用，尝试bash
bash deploy.sh
```

### 如果git push失败
```zsh
# 检查远程仓库
git remote -v

# 如果没有设置远程仓库
git remote add origin https://github.com/yourusername/your-repo-name.git

# 强制推送（仅第一次）
git push -f origin gh-pages
```

### 如果网站显示404
1. 确认GitHub Pages设置正确
2. 等待几分钟让缓存更新
3. 检查 `index.html` 文件是否在根目录

## 文件大小检查

运行以下命令查看文件大小：
```zsh
du -h index.html data.js script.js
```

应该看到总计约50KB的文件大小。

## 成功标志

部署成功后，网站应该具备：
- ✅ 中英日韩四语言切换
- ✅ 实时搜索功能  
- ✅ 响应式布局
- ✅ 快速加载(<1秒)
- ✅ 芯片分类展示

---

**如果遇到任何问题，请检查：**
1. 网络连接
2. GitHub权限
3. 文件路径正确性