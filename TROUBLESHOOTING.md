# 🔧 故障排除指南

## pnpm 构建脚本权限问题

### 🚨 问题描述
启动开发服务器时出现警告：
```
Ignored build scripts: sharp, unrs-resolver.
Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.
```

### 🔍 问题原因
pnpm v8+ 引入了安全机制，默认阻止包的构建脚本运行，需要手动批准。这是为了防止恶意包执行危险代码。

### ✅ 解决方案

#### 方法1：交互式批准（推荐）
```bash
pnpm approve-builds
```
然后：
- 按 `<a>` 键全选所有包
- 按 `<Enter>` 回车确认

#### 方法2：命令行批准
```bash
pnpm install --ignore-scripts=false
```

#### 方法3：永久配置
在项目根目录创建 `.npmrc` 文件：
```bash
echo "enable-pre-post-scripts=true" >> .npmrc
```

### 📦 涉及的包说明

- **sharp**: Next.js 图片优化库，用于自动压缩和转换图片格式
- **unrs-resolver**: 依赖解析工具，帮助处理复杂的模块依赖关系

这两个包都是项目正常运行必需的，可以安全批准。

### 🚀 验证解决
批准后重新运行：
```bash
pnpm dev
```

应该看到正常的启动输出：
```
> ai-chip-navigator@1.0.0 dev
> next dev

   ▲ Next.js 15.2.4
   - Local:        http://localhost:3000
   - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.5s
```

---

## 其他常见问题

### 端口占用
```bash
# 查看端口占用
lsof -i :3000

# 终止占用进程
kill -9 <PID>

# 或者使用不同端口
pnpm dev -- -p 3001
```

### 依赖问题
```bash
# 清理并重新安装
rm -rf node_modules .next pnpm-lock.yaml
pnpm install
```

### 构建错误
```bash
# 检查代码质量
pnpm type-check
pnpm lint

# 清理构建缓存
pnpm clean
pnpm build
```

### 权限问题（macOS/Linux）
```bash
# 给脚本执行权限
chmod +x scripts/*.sh

# 如果遇到权限错误
sudo chown -R $(whoami) ./
```

---

## 🎯 快速诊断清单

遇到问题时按顺序检查：

1. **检查 Node.js 版本**: `node --version` (需要 >= 18)
2. **检查 pnpm 版本**: `pnpm --version` (需要 >= 8)
3. **检查端口占用**: `lsof -i :3000`
4. **批准构建脚本**: `pnpm approve-builds`
5. **重新安装依赖**: `rm -rf node_modules && pnpm install`
6. **检查代码错误**: `pnpm type-check && pnpm lint`

## 📞 获得帮助

如果问题仍然存在：
1. 查看 `CLAUDE.md` 了解项目架构
2. 查看 `DEPLOY_QUICK_START.md` 了解部署流程
3. 检查 GitHub Issues 是否有类似问题