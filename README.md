# DeSpeed Validator 自动化脚本

[![Node Version](https://img.shields.io/badge/node-%3E%3D16.13.2-brightgreen.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

这是一个使用 Puppeteer 自动化运行 DeSpeed Validator 插件的脚本，支持在 VPS 服务器上运行。本指南将帮助新手用户快速上手使用该脚本。

## 功能特点

- ✨ 自动化运行 DeSpeed Validator 插件
- 🔄 定时自动刷新（每1小时）
- 🔒 支持代理服务器
- 💻 适配 VPS 环境
- 🛡️ 内存占用优化

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/mumumusf/despeed.git
cd despeed
```

### 2. 环境要求

- Node.js >= 16.13.2
- Chrome 浏览器
- 2GB 以上内存
- Ubuntu/Debian/CentOS 系统

### 3. 安装依赖

```bash
# 安装 Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# 安装 Chrome（Ubuntu/Debian）
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb

# 安装系统依赖
sudo apt-get update
sudo apt-get install -y ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils

# 安装项目依赖
npm install
```

### 4. 配置准备

1. [注册 DeSpeed 账号](https://app.despeed.net/register?ref=2kNPSl8sHTNG)
2. 准备代理信息（格式：`IP:端口:用户名:密码`）
3. 获取登录令牌（两种方法）：

#### 方法一：从网络请求获取（推荐）
1. 访问 [DeSpeed](https://app.despeed.net) 并登录您的账号
2. 按 F12 打开浏览器开发者工具（或右键点击页面 → 检查）
3. 切换到 Network（网络）标签页
4. 在过滤器中输入 `dashboard-stats` 或 `api` 来筛选请求
5. 在右侧找到任意一个请求（例如：`/v1/api/dashboard-stats`）
6. 点击该请求，在右侧面板中找到 Headers（标头）部分
7. 在 Request Headers（请求标头）中找到 `authorization` 字段
8. 复制 `Bearer ` 后面的内容（示例：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx...`）

> 提示：如果看不到请求，可以刷新页面后再观察

#### 方法二：从本地存储获取
1. 访问 [DeSpeed](https://app.despeed.net) 并登录您的账号
2. 按 F12 打开开发者工具（或右键点击页面 → 检查）
3. 切换到 Application（应用程序）标签页
   - Chrome：点击 Application → Local Storage
   - Firefox：点击 Storage → Local Storage
   - Edge：点击 Application → Local Storage
4. 在左侧边栏找到 `https://app.despeed.net`
5. 在右侧的键值对列表中找到 `token` 项
6. 双击值部分，全选并复制令牌内容

> 注意：令牌格式说明
> - 以 `eyJ` 开头的一长串字符
> - 通常包含两个点号 (.)
> - 长度大约在 150-250 字符之间
> - 示例：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njc1NSwiZW1haWwiOiJ...`

#### 令牌使用注意事项
1. 安全性
   - 令牌等同于您的登录凭证，请勿泄露
   - 不要在公共场所复制或展示令牌
   - 定期更换令牌以提高安全性

2. 有效期
   - 令牌一般有效期为 7 天
   - 在以下情况需要重新获取：
     * 更换密码后
     * 退出登录后
     * 令牌过期后
     * 脚本提示令牌无效时

3. 故障排除
   - 如果令牌无法使用，请尝试重新登录获取
   - 确保复制时不包含多余的空格
   - 验证令牌格式是否正确（以 eyJ 开头）

### 5. 运行脚本

```bash
# 创建 Screen 会话
screen -S despeed

# 启动脚本
npm start

# 后台运行（Ctrl+A 然后按 D）
# 重新连接：screen -r despeed
```

## 常见问题

<details>
<summary>1. 如何检查安装是否正确？</summary>

```bash
# 检查 Node.js
node --version  # 应 >= 16.13.2

# 检查 Chrome
google-chrome --version

# 检查依赖
npm list
```
</details>

<details>
<summary>2. 内存占用过高怎么办？</summary>

- 确保系统内存 >= 2GB
- 脚本已优化内存使用
- 每小时自动清理内存
</details>

<details>
<summary>3. 代理连接失败？</summary>

- 检查代理格式是否正确
- 确认代理是否可用
- 检查网络连接
</details>

## 注意事项

- ⚠️ 令牌为重要凭证，请勿泄露
- 🔄 建议使用 Screen/Tmux 运行
- 💾 定期检查运行状态
- 🛡️ 建议开启防火墙

## 技术支持

如遇问题，请提供：
- 系统信息：`uname -a`
- Node.js 版本：`node -v`
- Chrome 版本：`google-chrome --version`
- 错误日志

## 更新日志

- 2025-01-xx：优化内存占用
- 2025-01-xx：添加自动刷新（1小时）
- 2025-01-xx：完善错误处理
- 2025-01-xx：支持本地插件

## License

[MIT](LICENSE)