// 测试 Hysteria2 转换为 Clash 配置
import { ProxyParser } from './src/ProxyParsers.js';
import { ClashConfigBuilder } from './src/ClashConfigBuilder.js';

console.log('测试 Hysteria2 转换为 Clash 配置\n');

// 测试用例
const testCases = [
    {
        name: '标准配置',
        url: 'hysteria2://password@example.com:443?sni=example.com&insecure=1#Test%20Node'
    },
    {
        name: '带混淆',
        url: 'hysteria2://pass123@host.com:443?obfs=salamander&obfs-password=obfspass&sni=host.com#Obfs%20Node'
    },
    {
        name: '带速度限制和 ALPN',
        url: 'hysteria2://mypassword@example.net:443?up=100&down=500&sni=example.net&alpn=h3#Speed%20Node'
    },
    {
        name: '完整配置',
        url: 'hysteria2://pass@example.com:443?sni=example.com&alpn=h3&fingerprint=chrome&up=200&down=1000&obfs=salamander&obfs-password=obfs123#Full%20Config'
    }
];

const builder = new ClashConfigBuilder();

testCases.forEach((testCase, index) => {
    console.log(`\n=== 测试 ${index + 1}: ${testCase.name} ===`);
    console.log(`URL: ${testCase.url}\n`);
    
    try {
        // 解析 URL
        const parsedProxy = ProxyParser.parse(testCase.url);
        console.log('解析结果:');
        console.log(JSON.stringify(parsedProxy, null, 2));
        
        // 转换为 Clash 配置
        const clashProxy = builder.convertProxy(parsedProxy);
        console.log('\nClash 配置:');
        console.log(JSON.stringify(clashProxy, null, 2));
        console.log('\n' + '='.repeat(80));
        
    } catch (error) {
        console.error('错误:', error.message);
        console.error(error.stack);
    }
});
