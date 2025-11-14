// Hysteria2 解析测试
import { ProxyParser } from './src/ProxyParsers.js';

console.log('测试 Hysteria2 协议解析\n');

// 测试用例
const testCases = [
    {
        name: '标准格式 - 带密码',
        url: 'hysteria2://password@example.com:443?sni=example.com&insecure=1#Test%20Node'
    },
    {
        name: 'hy2 协议前缀',
        url: 'hy2://mypass@server.example.com:8443?sni=server.example.com&alpn=h3#HY2%20Node'
    },
    {
        name: '带混淆',
        url: 'hysteria2://pass123@host.com:443?obfs=salamander&obfs-password=obfspass&sni=host.com#Obfs%20Node'
    },
    {
        name: '带上下行速度',
        url: 'hysteria2://mypassword@example.net:443?up=100&down=500&sni=example.net#Speed%20Node'
    },
    {
        name: '不带密码(使用auth参数)',
        url: 'hysteria2://server.com:443?auth=myauth&sni=server.com#Auth%20Node'
    },
    {
        name: 'IPv6 地址',
        url: 'hysteria2://pass@[2001:db8::1]:443?sni=example.com#IPv6%20Node'
    },
    {
        name: '指定协议类型 wechat-video (推荐用于 OpenClash)',
        url: 'hysteria2://mypass@example.com:443?protocol=wechat-video&sni=example.com#Protocol%20WeChat'
    },
    {
        name: '指定协议类型 udp',
        url: 'hysteria2://mypass@example.com:443?protocol=udp&sni=example.com#Protocol%20UDP'
    },
    {
        name: '默认协议 (应该是 wechat-video)',
        url: 'hysteria2://mypass@example.com:443?sni=example.com#Default%20Protocol'
    }
];

testCases.forEach((testCase, index) => {
    console.log(`\n测试 ${index + 1}: ${testCase.name}`);
    console.log(`URL: ${testCase.url}`);
    try {
        const result = ProxyParser.parse(testCase.url);
        console.log('解析结果:', JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('解析失败:', error.message);
    }
    console.log('---');
});
