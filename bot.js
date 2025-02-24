const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");
const { SocksProxyAgent } = require("socks-proxy-agent");
const readline = require("readline");
const WebSocket = require('ws');
const crypto = require('crypto');

const banner = `
   ██╗  ██╗██╗ █████╗  ██████╗    ██╗     ██╗███╗   ██╗
   ╚██╗██╔╝██║██╔══██╗██╔═══██╗   ██║     ██║████╗  ██║
    ╚███╔╝ ██║███████║██║   ██║   ██║     ██║██╔██╗ ██║
    ██╔██╗ ██║██╔══██║██║   ██║   ██║     ██║██║╚██╗██║
   ██╔╝ ██╗██║██║  ██║╚██████╔╝   ███████╗██║██║ ╚████║
   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝ ╚═════╝    ╚══════╝╚═╝╚═╝  ╚═══╝
                                
                     小林 推特 @YOYOMYOYOA
                     
                     免责声明：
                     本程序仅供学习交流使用
                     使用本程序产生的任何后果由使用者自行承担
`;

// 配置
const config = {
  token: "",
  baseUrl: "https://app.despeed.net",
  checkInterval: 60000,
  location: {
    latitude: 39.904202,
    longitude: 116.407394
  },
  proxy: {
    enabled: false,
    type: "http",
    host: "",
    port: "",
    username: "",
    password: "",
    timeout: 10000,
    maxRetries: 3,
    testUrl: "https://api.ipify.org?format=json"
  }
};

// 创建readline接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promise化的问题函数
function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

// 解析代理字符串
function parseProxyString(proxyStr) {
  try {
    const [host, port, username, password] = proxyStr.split(':');
    return { host, port, username, password };
  } catch (error) {
    console.error('代理格式解析错误');
    return null;
  }
}

// 验证代理配置
function validateProxyConfig(proxyConfig) {
  return !!(proxyConfig.host && proxyConfig.port);
}

// 检查代理可用性
async function isProxyAlive(proxyAgent) {
  try {
    const response = await fetch(config.proxy.testUrl, {
      agent: proxyAgent,
      timeout: config.proxy.timeout
    });
    return response.ok;
  } catch {
    return false;
  }
}

// 改进的代理创建函数
async function getProxyAgent(retries = config.proxy.maxRetries) {
  if (!config.proxy.enabled) return undefined;
  
  if (!validateProxyConfig(config.proxy)) {
    console.error('代理配置无效');
    return undefined;
  }

  for (let i = 0; i < retries; i++) {
    try {
      let proxyUrl;
      const auth = config.proxy.username && config.proxy.password 
        ? `${encodeURIComponent(config.proxy.username)}:${encodeURIComponent(config.proxy.password)}@`
        : '';
        
      if (config.proxy.type === 'http') {
        proxyUrl = `http://${auth}${config.proxy.host}:${config.proxy.port}`;
        const agent = new HttpsProxyAgent({
          proxy: proxyUrl,
          timeout: config.proxy.timeout,
          keepAlive: true,
          maxFreeSockets: 256,
          maxSockets: 256
        });
        
        if (await isProxyAlive(agent)) {
          return agent;
        }
      } else {
        proxyUrl = `socks://${auth}${config.proxy.host}:${config.proxy.port}`;
        const agent = new SocksProxyAgent({
          proxy: proxyUrl,
          timeout: config.proxy.timeout,
          keepAlive: true
        });
        
        if (await isProxyAlive(agent)) {
          return agent;
        }
      }
      
      console.warn(`代理检测失败，重试 ${i + 1}/${retries}`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      
    } catch (error) {
      console.error(`代理创建错误 (${i + 1}/${retries}):`, error.message);
      if (i === retries - 1) {
        throw new Error('代理创建失败，已达到最大重试次数');
      }
    }
  }
  
  return undefined;
}

// 生成随机位置
function generateRandomLocation() {
  const bounds = {
    minLat: 18.0,
    maxLat: 53.55,
    minLng: 73.66,
    maxLng: 135.05
  };
  
  const latitude = bounds.minLat + Math.random() * (bounds.maxLat - bounds.minLat);
  const longitude = bounds.minLng + Math.random() * (bounds.maxLng - bounds.minLng);
  
  return {
    latitude: Math.round(latitude * 1000000) / 1000000,
    longitude: Math.round(longitude * 1000000) / 1000000
  };
}

// 初始化配置
async function initConfig() {
  console.log('请按提示输入配置信息...\n');

  config.token = await question('请输入您的 DeSpeed token: ');
  
  const useProxy = (await question('是否使用代理? (y/n): ')).toLowerCase() === 'y';
  
  if (useProxy) {
    config.proxy.enabled = true;
    
    let proxyType;
    do {
      proxyType = (await question('请选择代理类型 (http/socks): ')).toLowerCase();
    } while (proxyType !== 'http' && proxyType !== 'socks');
    
    config.proxy.type = proxyType;
    
    const proxyStr = await question('请输入代理配置 (格式: ip:port:username:password): ');
    const proxyInfo = parseProxyString(proxyStr);
    
    if (proxyInfo) {
      Object.assign(config.proxy, proxyInfo);
    } else {
      console.log('代理格式错误，将不使用代理');
      config.proxy.enabled = false;
    }
  }

  const interval = await question('请输入检查间隔(分钟，默认1分钟): ');
  config.checkInterval = (parseInt(interval) || 1) * 60000;

  config.location = generateRandomLocation();
  console.log('\n已随机生成测速位置:', config.location);

  rl.close();
  
  console.log('\n配置信息已保存！');
  console.log('当前配置：');
  console.log(JSON.stringify(config, null, 2));
  console.log('\n');
}

// 获取通用请求头
function getCommonHeaders() {
  return {
    'Authorization': `Bearer ${config.token}`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'sec-ch-ua': '"Microsoft Edge";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'Origin': 'https://app.despeed.net',
    'Referer': 'https://app.despeed.net/dashboard'
  };
}

// 验证token
async function validateToken() {
  if (!config.token) {
    throw new Error('Token not found');
  }
  
  const tokenData = JSON.parse(atob(config.token.split('.')[1]));
  if ((tokenData.exp - 90) * 1000 < Date.now()) {
    throw new Error('Token expired');
  }

  const proxyAgent = await getProxyAgent();
  const profileResponse = await fetch(`${config.baseUrl}/v1/api/auth/profile`, {
    headers: getCommonHeaders(),
    agent: proxyAgent,
    timeout: 30000
  });

  if (!profileResponse.ok) {
    throw new Error('Token invalid');
  }
}

// 执行测速
async function performSpeedTest() {
  try {
    console.log('正在测试网络速度...');
    
    const metadata = {
      client_name: 'speed-measurementlab-net-1',
      client_session_id: crypto.randomUUID()
    };

    const proxyAgent = await getProxyAgent();
    
    const locateUrl = new URL('https://locate.measurementlab.net/v2/nearest/ndt/ndt7');
    locateUrl.search = new URLSearchParams(metadata).toString();
    
    console.log('获取测速服务器...');
    const locateResponse = await fetch(locateUrl, {
      agent: proxyAgent,
      timeout: 30000
    });

    if (!locateResponse.ok) {
      throw new Error(`获取测速服务器失败: ${locateResponse.status}`);
    }

    const serverData = await locateResponse.json();
    if (!serverData.results || !serverData.results[0]) {
      throw new Error('没有可用的测速服务器');
    }

    const server = serverData.results[0];
    console.log(`选择测速服务器: ${server.machine}`);

    const downloadUrl = server.urls['wss:///ndt/v7/download'];
    const uploadUrl = server.urls['wss:///ndt/v7/upload'];

    // 执行下载测速
    console.log('开始下载测速...');
    let downloadSpeed = 0;
    await new Promise((resolve) => {
      const wsOptions = config.proxy.enabled ? {
        agent: proxyAgent
      } : undefined;
      
      const ws = new WebSocket(downloadUrl, 'net.measurementlab.ndt.v7', wsOptions);
      let startTime = Date.now();
      let totalBytes = 0;
      let lastMeasurement = null;

      ws.on('open', () => {
        startTime = Date.now();
        totalBytes = 0;
      });

      ws.on('message', (data) => {
        if (typeof data === 'string') {
          lastMeasurement = JSON.parse(data);
          return;
        }
        totalBytes += data.length;
        const now = Date.now();
        const duration = (now - startTime) / 1000;
        if (duration >= 10) {
          downloadSpeed = (totalBytes * 8) / (duration * 1000000);
          ws.close();
        }
      });

      ws.on('close', () => {
        console.log(`下载速度: ${downloadSpeed.toFixed(2)} Mbps`);
        resolve();
      });

      ws.on('error', (error) => {
        console.error('下载测速错误:', error);
        resolve();
      });
    });

    // 执行上传测速
    console.log('开始上传测速...');
    let uploadSpeed = 0;
    await new Promise((resolve) => {
      const wsOptions = config.proxy.enabled ? {
        agent: proxyAgent
      } : undefined;
      
      const ws = new WebSocket(uploadUrl, 'net.measurementlab.ndt.v7', wsOptions);
      let startTime = Date.now();
      let totalBytes = 0;
      let lastMeasurement = null;
      let uploadData = Buffer.alloc(32768);
      crypto.randomFillSync(uploadData);

      ws.on('open', () => {
        startTime = Date.now();
        totalBytes = 0;
        const sendData = () => {
          if (ws.readyState === WebSocket.OPEN) {
            const now = Date.now();
            const duration = (now - startTime) / 1000;
            
            if (duration >= 10) {
              uploadSpeed = (totalBytes * 8) / (duration * 1000000);
              ws.close();
              return;
            }

            while (ws.bufferedAmount < 1024 * 1024) {
              ws.send(uploadData);
              totalBytes += uploadData.length;
            }

            setImmediate(sendData);
          }
        };
        sendData();
      });

      ws.on('message', (data) => {
        if (typeof data === 'string') {
          try {
            lastMeasurement = JSON.parse(data);
            if (lastMeasurement.TCPInfo) {
              const tcpInfo = lastMeasurement.TCPInfo;
              const tmpSpeed = (tcpInfo.BytesReceived / tcpInfo.ElapsedTime) * 8;
              if (tmpSpeed > uploadSpeed) {
                uploadSpeed = tmpSpeed;
              }
            }
          } catch (e) {
            console.error('解析服务器消息错误:', e);
          }
        }
      });

      ws.on('close', () => {
        console.log(`上传速度: ${uploadSpeed.toFixed(2)} Mbps`);
        resolve();
      });

      ws.on('error', (error) => {
        console.error('上传测速错误:', error);
        resolve();
      });
    });

    return {
      downloadSpeed,
      uploadSpeed
    };

  } catch (error) {
    console.error('测速过程出错:', error.message);
    return {
      downloadSpeed: 0,
      uploadSpeed: 0
    };
  }
}

// 上报测速结果
async function reportResults(downloadSpeed, uploadSpeed) {
  try {
    console.log('正在上报...');

    const proxyAgent = await getProxyAgent();
    const response = await fetch(`${config.baseUrl}/v1/api/points`, {
      method: 'POST',
      headers: {
        ...getCommonHeaders(),
        'Content-Type': 'application/json'
      },
      agent: proxyAgent,
      timeout: 30000,
      body: JSON.stringify({
        download_speed: Math.round(downloadSpeed * 100) / 100,
        upload_speed: Math.round(uploadSpeed * 100) / 100,
        latitude: config.location.latitude,
        longitude: config.location.longitude,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`上报失败: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ 上报成功');
      return data;
    } else {
      throw new Error(data.message || '上报失败');
    }

  } catch (error) {
    console.error('上报结果错误:', error.message);
    return null;
  }
}

// 显示用户账户信息
async function displayAccountInfo() {
  try {
    console.log('\n=== 账户信息 ===');
    
    const proxyAgent = await getProxyAgent();
    const profileResponse = await fetch(`${config.baseUrl}/v1/api/auth/profile`, {
      headers: getCommonHeaders(),
      agent: proxyAgent,
      timeout: 30000
    });

    if (profileResponse.ok) {
      const profile = await profileResponse.json();
      console.log(`用户名: ${profile.data.username || '未设置'}`);
      console.log(`邮箱: ${profile.data.email || '未设置'}`);
    }
    
    console.log('=== ======== ===\n');
  } catch (error) {
    console.error('获取账户信息失败:', error.message);
  }
}

// 主循环
async function main() {
  try {
    console.log('\n=== 开始测速 ===');
    console.log('时间:', new Date().toLocaleString());
    
    await validateToken();
    console.log('Token 验证: ✅ 有效');
    
    await displayAccountInfo();
    
    config.location = generateRandomLocation();
    console.log(`测速位置: 纬度 ${config.location.latitude}, 经度 ${config.location.longitude}`);
    
    console.log('\n开始执行测速...');
    const { downloadSpeed, uploadSpeed } = await performSpeedTest();
    console.log('\n测速结果:');
    console.log(`- 下载速度: ${downloadSpeed.toFixed(2)} Mbps`);
    console.log(`- 上传速度: ${uploadSpeed.toFixed(2)} Mbps`);
    
    console.log('\n正在上报结果...');
    const result = await reportResults(downloadSpeed, uploadSpeed);
    
    if (result && result.success) {
      console.log('\n结果上报: ✅ 成功');
      await displayAccountInfo();
    } else {
      console.log('\n结果上报: ❌ 失败');
      if (result && result.message) {
        console.log('失败原因:', result.message);
      }
    }
    
  } catch (error) {
    console.error('\n❌ 错误:', error.message);
    if (error.response) {
      try {
        const errorData = await error.response.json();
        console.error('服务器返回:', errorData);
      } catch {
        console.error('状态码:', error.response.status);
      }
    }
  } finally {
    const nextTime = new Date(Date.now() + config.checkInterval);
    console.log(`\n下次测速时间: ${nextTime.toLocaleString()}`);
    console.log('间隔时间:', Math.round(config.checkInterval / 1000 / 60), '分钟');
    console.log('=== 测速结束 ===\n');
    setTimeout(main, config.checkInterval);
  }
}

// 处理进程退出
process.on('SIGINT', () => {
  console.log('\n收到退出信号');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n收到终止信号');
  process.exit(0);
});

// 启动程序
console.clear();
console.log(banner);
console.log('正在启动...');
initConfig().then(() => {
  main();
});
