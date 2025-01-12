# DeSpeed 测速脚本

[![Node Version](https://img.shields.io/badge/node-%3E%3D16.13.2-brightgreen.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

```
   ██╗  ██╗██╗ █████╗  ██████╗    ██╗     ██╗███╗   ██╗
   ╚██╗██╔╝██║██╔══██╗██╔═══██╗   ██║     ██║████╗  ██║
    ╚███╔╝ ██║███████║██║   ██║   ██║     ██║██╔██╗ ██║
    ██╔██╗ ██║██╔══██║██║   ██║   ██║     ██║██║╚██╗██║
   ██╔╝ ██╗██║██║  ██║╚██████╔╝   ███████╗██║██║ ╚████║
   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝ ╚═════╝    ╚══════╝╚═╝╚═╝  ╚═══╝
```

这是一个使用 NDT7 协议的 DeSpeed 测速脚本，支持在 VPS 服务器上运行。本指南将帮助新手用户快速上手使用该脚本。

## 功能特点

- ✨ 自动化测速上报
- 🔄 支持自定义测速间隔
- 🔒 支持 HTTP/SOCKS 代理
- 💻 适配 VPS 环境
- 🛡️ 内存占用优化
- 🌍 自动随机位置

## 快速开始

### 1. 环境要求

- Node.js >= 16.13.2
- 512MB 以上内存
- Ubuntu/Debian/CentOS 系统

### 2. 克隆代码

```bash
# 克隆仓库
git clone https://github.com/mumumusf/despeed.git

# 进入项目目录
cd despeed

# 安装依赖
npm install
```

### 3. 安装依赖

如果你想手动配置，也可以按照以下步骤操作：

```bash
# 安装 Node.js（Ubuntu/Debian）
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# 或 CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs

# 创建工作目录
mkdir despeed && cd despeed

# 安装项目依赖
npm init -y
npm install node-fetch@2 https-proxy-agent socks-proxy-agent ws
```

### 4. 配置准备

1. [注册 DeSpeed 账号](https://app.despeed.net/register?ref=2kNPSl8sHTNG)
2. 准备代理信息（可选，格式：`IP:端口:用户名:密码`）
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

### 5. 运行脚本

```bash
# 创建 Screen 会话
screen -S despeed

# 启动脚本
node bot.js

请设置120分钟 保证你的代理是干净的
# 后台运行（Ctrl+A 然后按 D）
# 重新连接：screen -r despeed
```

## 常见问题

<details>
<summary>1. 如何检查安装是否正确？</summary>

```bash
# 检查 Node.js
node --version  # 应 >= 16.13.2

# 检查依赖
npm list
```
</details>

<details>
<summary>2. Token 相关问题</summary>

- 确保复制完整的 token
- token 有效期一般为 7 天
- 如果提示无效请重新获取
- 注意不要泄露你的 token
</details>

<details>
<summary>3. 代理连接失败？</summary>

- 检查代理格式是否正确
- 确认代理是否可用
- 检查网络连接
</details>

<details>
<summary>4. 测速失败或速度异常？</summary>

- 检查服务器带宽
- 确认防火墙设置
- 尝试更换测速服务器
- 检查代理速度（如果使用代理）
</details>

## 注意事项

- ⚠️ 令牌为重要凭证，请勿泄露
- 🔄 建议使用 Screen/PM2 运行
- 💾 定期检查运行状态
- 🛡️ 建议开启防火墙

## 技术支持

如遇问题，请提供：
- 系统信息：`uname -a`
- Node.js 版本：`node -v`
- 错误日志
- 代理配置（如有）

## 更新日志

- 2024-01-11：初始版本发布
  - 支持 HTTP/SOCKS 代理
  - 自动随机位置
  - NDT7 测速协议
  - 优化内存占用

## 联系方式

- 作者推特：[@YOYOMYOYOA](https://twitter.com/YOYOMYOYOA)

## 免责声明

本程序仅供学习交流使用，使用本程序产生的任何后果由使用者自行承担。

## License

[MIT](LICENSE) 
