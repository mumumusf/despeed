# DeSpeed 测速脚本 - 新手友好版

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

## 📖 简介

这是一个简单易用的 DeSpeed 测速脚本，主要用于自动化测速和积分获取。支持在 Windows 本地和 Linux VPS 上运行，即使你是编程新手，按照下面的步骤也能轻松使用！

## ✨ 功能特点

- 📊 全自动测速和上报
- ⏰ 可自定义测速间隔（建议30分钟以上）
- 🔒 支持代理（HTTP/SOCKS）
- 🌍 自动随机位置
- 💪 稳定可靠，内存占用小
- 🖥️ 支持 Windows/Linux 系统

## 🚀 快速开始

## Windows 本地运行

### 1️⃣ 安装必要软件

1. **安装 Node.js**
   - 访问 [Node.js官网](https://nodejs.org/)
   - 下载并安装 "LTS" 版本（长期支持版）
   - 安装时全部默认选项即可
   - 安装完成后，按 `Win + R`，输入 `cmd`，输入以下命令检查：
     ```bash
     node --version  # 应显示 v18.x.x 或更高
     npm --version   # 应显示 8.x.x 或更高
     ```

2. **下载本脚本**
   - 点击本页面右上角的绿色 "Code" 按钮
   - 选择 "Download ZIP"
   - 解压下载的文件到任意目录（例如：D:\despeed）

### 2️⃣ 安装依赖

1. 打开命令提示符（CMD）：
   - 按 `Win + R`
   - 输入 `cmd` 并回车
   
2. 进入脚本目录：
   ```bash
   # 假设你解压到了 D:\despeed
   cd /d D:\despeed
   ```

3. 安装必需的包：
   ```bash
   npm install node-fetch@2 https-proxy-agent socks-proxy-agent ws
   ```

### 3️⃣ 获取 DeSpeed 令牌

1. **注册账号**
   - 访问 [DeSpeed官网](https://app.despeed.net/register?ref=2kNPSl8sHTNG)
   - 完成注册并登录

2. **获取令牌**（简单方法）
   - 按 F12 打开开发者工具
   - 点击 "Application"（应用程序）
   - 左侧找到 "Local Storage" → "https://app.despeed.net"
   - 找到 "token" 并复制其值

### 4️⃣ 运行脚本

1. 在命令提示符中运行：
   ```bash
   node bot.js
   ```

2. 根据提示输入：
   - 粘贴你的令牌
   - 是否使用代理（y/n）
   - 如果使用代理，输入代理信息
   - 设置检查间隔（建议30分钟以上）

## 🌟 使用建议

1. **测速间隔**
   - 建议设置 30 分钟或更长
   - 过于频繁可能导致账号风险

2. **代理设置**
   - 使用稳定的代理服务器
   - 代理格式：`IP:端口:用户名:密码`
   - 例如：`1.2.3.4:8080:user:pass`

3. **长期运行**
   - Windows 用户建议使用管理员权限运行
   - 可以最小化窗口，但不要关闭
   - 如需后台运行，可使用 PM2（进阶用户）

## 🖥️ Linux VPS 运行教程

### 1️⃣ 准备工作

1. **VPS 要求**
   - 内存：512MB 以上
   - 系统：Ubuntu/Debian/CentOS
   - 架构：支持 x86_64 和 ARM
   - 带宽：推荐 1Mbps 以上

2. **连接 VPS**
   - Windows 用户推荐使用 [Xshell](https://www.netsarang.com/xshell/) 或 [PuTTY](https://putty.org/)
   - Mac/Linux 用户直接使用终端：`ssh root@你的服务器IP`

### 2️⃣ 安装 Node.js

1. **Ubuntu/Debian 系统**：
```bash
# 添加 Node.js 官方源
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# 安装 Node.js
sudo apt update
sudo apt install -y nodejs

# 验证安装
node --version  # 应显示 v18.x.x
npm --version   # 应显示 8.x.x 或更高
```

2. **CentOS/RHEL 系统**：
```bash
# 添加 Node.js 官方源
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -

# 安装 Node.js
sudo yum install -y nodejs

# 验证安装
node --version
npm --version
```

### 3️⃣ 下载和配置脚本

1. **安装 Git 并克隆项目**：
```bash
# Ubuntu/Debian
sudo apt install -y git

# CentOS
sudo yum install -y git

# 克隆项目
git clone https://github.com/mumumusf/despeed.git
cd despeed
```

2. **安装依赖**：
```bash
# 方法一：直接安装（推荐）
npm install

# 方法二：使用国内镜像（如果安装太慢）
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install

# 方法三：手动安装核心依赖
npm install node-fetch@2 https-proxy-agent socks-proxy-agent ws
```

### 4️⃣ 使用 Screen 运行

1. **安装 Screen**：
```bash
# Ubuntu/Debian
sudo apt install -y screen

# CentOS
sudo yum install -y screen
```

2. **创建新会话**：
```bash
# 创建新的 screen 会话
screen -S despeed

# 如果出现提示按回车继续
```

3. **运行脚本**：
```bash
# 确保在 despeed 目录下
cd ~/despeed
node bot.js
```

4. **后台运行**：
- 按 `Ctrl + A`，然后按 `D`，将程序放入后台
- 使用 `screen -ls` 查看所有会话
- 使用 `screen -r despeed` 重新连接会话
- 使用 `screen -X -S despeed quit` 结束会话

### 5️⃣ 使用 PM2 运行（推荐）

1. **安装 PM2**：
```bash
# 全局安装 PM2
npm install -g pm2
```

2. **启动脚本**：
```bash
# 启动程序
pm2 start bot.js --name despeed

# 其他常用命令
pm2 list            # 查看运行状态
pm2 logs despeed    # 查看日志
pm2 stop despeed    # 停止程序
pm2 restart despeed # 重启程序
pm2 delete despeed  # 删除程序

# 设置开机自启
pm2 save
pm2 startup
```

## 📝 VPS 使用建议

1. **系统配置**
   - 建议使用 Ubuntu 20.04/22.04 LTS
   - 确保系统时间正确：`timedatectl set-timezone Asia/Shanghai`
   - 建议开启防火墙：
     ```bash
     # Ubuntu/Debian
     sudo ufw allow ssh
     sudo ufw enable
     
     # CentOS
     sudo firewall-cmd --permanent --add-service=ssh
     sudo firewall-cmd --reload
     ```

2. **代理设置**
   - 使用稳定的代理服务器
   - 推荐使用 HTTP 代理（更稳定）
   - 定期检查代理可用性
   - 代理格式示例：
     ```
     HTTP代理：1.2.3.4:8080:user:pass
     SOCKS代理：5.6.7.8:1080:user:pass
     ```

3. **性能优化**
   - 测速间隔建议 30-60 分钟
   - 内存占用监控：`free -h`
   - 进程监控：`top` 或 `htop`
   - 如果内存不足，可以添加交换空间：
     ```bash
     # 创建 2GB 交换空间
     sudo fallocate -l 2G /swapfile
     sudo chmod 600 /swapfile
     sudo mkswap /swapfile
     sudo swapon /swapfile
     ```

4. **日志管理**
   - 使用 PM2 时查看日志：`pm2 logs despeed`
   - 保存日志到文件：`node bot.js > despeed.log 2>&1`
   - 定期清理日志：`echo "" > despeed.log`

5. **安全建议**
   - 修改默认 SSH 端口
   - 禁用密码登录，使用密钥登录
   - 安装和配置 fail2ban
   - 定期更新系统：
     ```bash
     # Ubuntu/Debian
     sudo apt update && sudo apt upgrade -y
     
     # CentOS
     sudo yum update -y
     ```

## 🔍 VPS 常见问题

### 1. 连接问题
- **无法连接 VPS**
  - 检查 IP 地址是否正确
  - 检查 SSH 端口是否正确
  - 检查防火墙设置

- **SSH 连接不稳定**
  ```bash
  # 编辑 SSH 配置
  vim ~/.ssh/config
  
  # 添加以下内容
  Host *
    ServerAliveInterval 30
    ServerAliveCountMax 3
  ```

### 2. 性能问题
- **内存占用过高**
  - 使用 `free -h` 检查内存
  - 考虑增加交换空间
  - 适当增加测速间隔

- **CPU 占用过高**
  - 使用 `top` 查看进程
  - 检查是否有其他程序占用
  - 适当降低并发数

### 3. 网络问题
- **测速失败**
  - 检查服务器带宽
  - 验证代理可用性
  - 检查防火墙设置

- **代理连接失败**
  ```bash
  # 测试代理连接
  curl -x http://user:pass@ip:port https://api.ipify.org
  
  # 或使用 SOCKS 代理
  curl --socks5 user:pass@ip:port https://api.ipify.org
  ```

## 📞 获取帮助

1. **查看错误日志**
   ```bash
   # PM2 日志
   pm2 logs despeed
   
   # 直接运行日志
   tail -f despeed.log
   ```

2. **收集系统信息**
   ```bash
   # 系统信息
   uname -a
   
   # 内存使用
   free -h
   
   # 磁盘使用
   df -h
   ```

3. **联系作者**
   - 推特：[@YOYOMYOYOA](https://twitter.com/YOYOMYOYOA)
   - 提供以上收集的信息

## ⚠️ 免责声明

本程序仅供学习交流使用，使用本程序产生的任何后果由使用者自行承担。请合理使用，避免滥用。

## 📝 License

[MIT](LICENSE) 
