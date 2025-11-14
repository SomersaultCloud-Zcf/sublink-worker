// 测试生成完整的 Clash 配置（YAML格式）
import { ProxyParser } from './src/ProxyParsers.js';
import { ClashConfigBuilder } from './src/ClashConfigBuilder.js';
import yaml from 'js-yaml';

console.log('测试生成完整的 Clash YAML 配置\n');

// 创建一个简单的测试配置
const testProxies = [
    'hysteria2://test123@example.com:443?sni=example.com&alpn=h3&up=100&down=500#HY2%20Test1',
    'hysteria2://pass@server.net:8443?obfs=salamander&obfs-password=obfs123&sni=server.net#HY2%20Obfs',
];

const builder = new ClashConfigBuilder({
    proxies: [],
    'proxy-groups': [],
    rules: []
});

// 添加代理
testProxies.forEach(url => {
    const proxy = ProxyParser.parse(url);
    if (proxy) {
        builder.addProxyToConfig(proxy);
    }
});

// 添加一个简单的代理组用于测试
builder.config['proxy-groups'] = [{
    name: 'Proxy',
    type: 'select',
    proxies: builder.config.proxies.map(p => p.name)
}];

// 添加基本规则
builder.config.rules = [
    'MATCH,DIRECT'
];

// 生成 YAML
const yamlConfig = yaml.dump(builder.config, {
    indent: 2,
    lineWidth: -1,
    noRefs: true
});

console.log('生成的 Clash 配置（YAML）：\n');
console.log(yamlConfig);

console.log('\n\n单独检查 Proxies 配置：\n');
builder.config.proxies.forEach((proxy, index) => {
    console.log(`\n代理 ${index + 1}:`);
    console.log(yaml.dump(proxy, { indent: 2, lineWidth: -1, noRefs: true }));
});
