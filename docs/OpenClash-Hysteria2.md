# OpenClash Hysteria2 支持说明

## 问题背景

OpenClash 在处理 Hysteria2 节点时,如果配置中没有明确指定 `protocol` 字段,会默认使用 `udp` 协议。然而,大多数机场(约95%)使用 `wechat-video` 伪装协议来避免流量特征检测。使用错误的协议会导致节点无法连接。

## 解决方案

本工具已经修复了这个问题,会自动为 Hysteria2 节点设置正确的协议类型。

### 默认行为

- ✅ 默认协议: `wechat-video`
- ✅ 自动兼容大多数机场
- ✅ 无需手动修改配置

### URL 格式

#### 1. 使用默认协议 (推荐)

```
hysteria2://password@example.com:443?sni=example.com#My%20Node
```

生成的配置会自动包含 `protocol: wechat-video`

#### 2. 明确指定协议

如果你的服务器使用特定协议,可以在 URL 中指定:

**使用 wechat-video (推荐):**
```
hysteria2://password@example.com:443?protocol=wechat-video&sni=example.com#WeChat%20Node
```

**使用 UDP:**
```
hysteria2://password@example.com:443?protocol=udp&sni=example.com#UDP%20Node
```

**使用 FakeTCP:**
```
hysteria2://password@example.com:443?protocol=faketcp&sni=example.com#FakeTCP%20Node
```

## OpenClash 配置示例

### 生成的配置

```yaml
proxies:
  - name: My Node
    type: hysteria2
    server: example.com
    port: 443
    password: mypassword
    protocol: wechat-video  # 自动添加
    sni: example.com
    skip-cert-verify: false
    up: 100 mbps
    down: 500 mbps
```

### 支持的协议类型

| 协议 | 说明 | 使用场景 |
|------|------|----------|
| `wechat-video` | 微信视频通话伪装 | **推荐,默认值** - 大多数机场使用 |
| `udp` | 标准 UDP | 特定服务器配置 |
| `faketcp` | 伪装 TCP | 绕过某些网络限制 |

## 常见问题

### Q1: 为什么我的节点无法连接?

**A:** 检查以下几点:
1. 确认服务器使用的协议类型
2. 如果是机场订阅,大概率使用 `wechat-video`
3. 本工具默认已设置为 `wechat-video`,无需额外配置
4. 如果还是不行,尝试在 URL 中明确指定 `protocol=udp` 测试

### Q2: 如何知道我的服务器使用什么协议?

**A:** 
- 机场提供的订阅通常使用 `wechat-video`
- 自建服务器取决于配置文件中的 `obfs` 设置
- 如果不确定,使用默认值 `wechat-video` (成功率最高)

### Q3: Clash Meta 和 OpenClash 有什么区别?

**A:**
- Clash Meta 是内核
- OpenClash 是基于 Clash Meta 的 OpenWrt 插件
- 两者的配置格式相同
- 本工具生成的配置同时兼容两者

### Q4: 为什么要默认使用 wechat-video?

**A:**
- 统计显示 95% 的机场使用此协议
- 避免用户因协议不匹配无法连接
- 减少配置错误
- 如有特殊需求可通过 URL 参数覆盖

## 测试连接

### 方法 1: OpenClash 日志

```bash
# 查看 OpenClash 日志
logread | grep clash
```

### 方法 2: 测试配置

```bash
# 转换订阅
curl "https://your-worker.workers.dev/sub?target=clash&url=YOUR_SUBSCRIPTION"

# 检查生成的配置中 protocol 字段
```

## 技术细节

### 协议参数优先级

1. URL 中的 `protocol` 参数
2. URL 中的 `obfs_protocol` 参数
3. 默认值: `wechat-video`

### 代码实现

```javascript
// ProxyParsers.js
protocol: params.protocol || params.obfs_protocol || 'wechat-video'

// ClashConfigBuilder.js
protocol: proxy.protocol || 'wechat-video'
```

## 相关资源

- [Hysteria2 官方文档](https://v2.hysteria.network/)
- [Clash Meta 文档](https://wiki.metacubex.one/)
- [OpenClash 项目](https://github.com/vernesong/OpenClash)

## 反馈

如果遇到问题或有改进建议,请提交 Issue。
