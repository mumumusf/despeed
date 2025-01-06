# DeSpeed Validator 自动化脚本

这是一个使用 Puppeteer 自动化运行 DeSpeed Validator 插件的脚本，支持在 VPS 服务器上运行。本指南将帮助新手用户快速上手使用该脚本。

## 开始使用

### 1. 注册 DeSpeed 账号

1. 使用以下链接注册 DeSpeed 账号：
   [点击这里注册 DeSpeed](https://app.despeed.net/register?ref=2kNPSl8sHTNG)

2. 注册步骤：
   - 点击上方链接进入注册页面
   - 填写您的邮箱地址
   - 设置安全的密码
   - 完成注册并验证邮箱
   - 登录您的账号

3. 注册后：
   - 保存好您的登录信息
   - 不要与他人分享账号信息
   - 建议开启二步验证以提高安全性

## 新手使用教学

### 1. VPS 环境准备

在开始使用之前，请确保您的 VPS 已安装以下软件：

- Node.js（版本 14.0 或更高）
- Google Chrome 浏览器
  ```bash
  # Ubuntu/Debian 系统安装 Chrome
  wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
  sudo apt install ./google-chrome-stable_current_amd64.deb

  # CentOS 系统安装 Chrome
  wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
  sudo yum install ./google-chrome-stable_current_x86_64.rpm
  ```
- 必要的依赖库
  ```bash
  # Ubuntu/Debian 系统
  sudo apt-get update
  sudo apt-get install -y ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils

  # CentOS 系统
  sudo yum install -y pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc
  ```

### 2. 下载和安装

1. 使用 Git 克隆项目或直接下载项目文件到 VPS：
   ```bash
   git clone https://github.com/mumumusf/despeed.git
   
   ```
2. 进入项目文件夹：
   ```bash
   cd despeed
   ```
3. 安装项目依赖：
   ```bash
   npm install
   ```

### 3. 配置说明

在运行脚本之前，您需要准备：

1. DeSpeed 账号（如果没有，请参考上方的注册步骤）
2. 代理信息：格式为 `IP:端口:用户名:密码`
3. 登录令牌（Token）

#### 如何获取登录令牌

方法一：从浏览器请求中获取（推荐）
1. 在浏览器中访问 [DeSpeed](https://app.despeed.net) 并登录您的账号
2. 按 F12 打开浏览器开发者工具
3. 切换到 Network（网络）标签页
4. 在筛选框中输入 `dashboard-stats` 或 `api`
5. 找到任意一个请求（例如：`/v1/api/dashboard-stats`）
6. 在请求头（Headers）中找到 `authorization` 字段
7. 复制 `Bearer ` 后面的内容（这就是您的登录令牌）

方法二：从本地存储中获取
1. 在浏览器中访问 DeSpeed 网站并登录您的账号
2. 按 F12 打开浏览器开发者工具
3. 切换到 Application（应用程序）标签页
   - Chrome浏览器：点击 Application
   - Firefox浏览器：点击 Storage（存储）
4. 在左侧边栏找到：
   - Chrome：Local Storage > https://app.despeed.net
   - Firefox：Local Storage > https://app.despeed.net
5. 在右侧找到 `token` 项
6. 复制该项对应的值

注意事项：
- 令牌格式通常以 `eyJ` 开头的一长串字符
- 令牌是您账号的重要凭证，请勿泄露给他人
- 令牌有效期通常较长，但如果更换密码或退出登录会失效
- 如果脚本提示令牌无效，请重新获取新的令牌

### 4. 在 VPS 上运行脚本

1. 使用 Screen 或 Tmux 创建新会话（推荐，防止 SSH 断开后脚本停止）：
   ```bash
   # 使用 Screen
   screen -S despeed
   # 或使用 Tmux
   tmux new -s despeed
   ```

2. 启动脚本：
   ```bash
   npm start
   ```

3. 根据提示输入代理信息

4. 分离会话（保持脚本在后台运行）：
   - Screen: 按 Ctrl+A 然后按 D
   - Tmux: 按 Ctrl+B 然后按 D

5. 重新连接会话（需要时）：
   ```bash
   # Screen
   screen -r despeed
   # Tmux
   tmux attach -t despeed
   ```

### 5. 运行状态说明

脚本运行后，您将看到以下状态信息：
- 代理连接状态
- 登录状态
- 插件状态
- 自动刷新状态（每1小时自动刷新一次）

### 6. VPS 常见问题解答

#### Q1: 为什么脚本启动后显示 Chrome 无法启动？
A: 可能是因为：
- 缺少必要的系统依赖，请检查并安装所需依赖库
- Chrome 安装不完整，尝试重新安装 Chrome
- 系统内存不足，建议使用至少 2GB 内存的 VPS

#### Q2: 如何在 VPS 后台持续运行脚本？
A: 推荐使用 Screen 或 Tmux 工具，具体步骤见上述"运行脚本"部分。

#### Q3: VPS 重启后如何恢复运行？
A: 
1. 重新登录 VPS
2. 进入项目目录
3. 使用 Screen 或 Tmux 创建新会话
4. 重新启动脚本

#### Q4: 如何查看运行日志？
A: 可以使用以下方法：
- 直接通过 Screen/Tmux 会话查看
- 将输出重定向到日志文件：
  ```bash
  npm start > despeed.log 2>&1
  ```

#### Q5: 登录令牌失效怎么办？
A: 请按照以下步骤处理：
1. 按照上述"如何获取登录令牌"的步骤重新获取令牌
2. 停止当前运行的脚本（在 Screen/Tmux 中按 Ctrl+C）
3. 使用新的令牌重新启动脚本

### 7. VPS 环境注意事项

1. 确保 VPS 有足够的内存（建议 2GB 以上）
2. 定期检查 VPS 的资源使用情况
3. 建议使用 Screen 或 Tmux 来管理长期运行的脚本
4. 如果使用防火墙，确保不会阻止脚本的网络连接
5. 建议设置 VPS 自动重启后运行脚本的任务

### 8. 技术支持

如果您在 VPS 上使用过程中遇到任何问题，请：
1. 检查系统日志：`/var/log/syslog` 或 `/var/log/messages`
2. 检查 Chrome 是否正确安装：`google-chrome --version`
3. 确认所有必需的依赖库都已安装
4. 如果问题仍然存在，请联系技术支持并提供以下信息：
   - VPS 系统版本
   - Node.js 版本
   - Chrome 版本
   - 错误日志

### 9. 更新日志

- 2024-01-xx：添加 VPS 环境支持
- 2024-01-xx：添加自动刷新功能（1小时间隔）
- 2024-01-xx：优化登录机制
- 2024-01-xx：添加详细错误处理
- 2024-01-xx：支持本地插件加载
