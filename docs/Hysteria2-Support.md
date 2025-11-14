# Hysteria2 协议支持说明

## 概述

本项目已完整支持 Hysteria2 协议的解析和配置转换,可以将 Hysteria2 订阅链接转换为 Sing-box、Clash 和 Surge 配置格式。

## 支持的协议前缀

- `hysteria://`
- `hysteria2://`
- `hy2://`

## URL 格式

### 标准格式

```
hysteria2://password@server:port?params#name
```

### 参数说明

| 参数 | 说明 | 示例 |
|------|------|------|
| `password` | 认证密码(在@前面) | `mypassword` |
| `auth` | 认证密码(URL参数,如果没有@) | `auth=mypassword` |
| `protocol` | 传输协议类型 | `protocol=wechat-video` |
| `sni` | TLS Server Name | `sni=example.com` |
| `insecure` | 跳过证书验证 | `insecure=1` |
| `alpn` | ALPN协议 | `alpn=h3` |
| `obfs` | 混淆类型 | `obfs=salamander` |
| `obfs-password` | 混淆密码 | `obfs-password=obfspass` |
| `up` / `upmbps` | 上行带宽(Mbps) | `up=100` |
| `down` / `downmbps` | 下行带宽(Mbps) | `down=500` |
| `recv-window-conn` | 接收窗口(连接) | `recv-window-conn=12582912` |
| `recv-window` | 接收窗口 | `recv-window=52428800` |
| `disable-mtu-discovery` | 禁用MTU发现 | `disable-mtu-discovery=true` |

## 示例

### 基础配置

```
hysteria2://mypassword@example.com:443?sni=example.com#My%20Node
```

### 带混淆

```
hysteria2://pass@host.com:443?obfs=salamander&obfs-password=obfspass&sni=host.com#Obfs%20Node
```

### 带速度限制

```
hysteria2://pass@example.net:443?up=100&down=500&sni=example.net#Speed%20Limited
```

### IPv6 地址

```
hysteria2://password@[2001:db8::1]:443?sni=example.com#IPv6%20Node
```

### 使用 auth 参数

```
hysteria2://server.com:443?auth=myauth&sni=server.com#Auth%20Node
```

### 指定协议类型 (推荐用于 OpenClash)

```
hysteria2://pass@example.com:443?protocol=wechat-video&sni=example.com#WeChat%20Video
```

**重要**: 对于 OpenClash,强烈建议指定 `protocol=wechat-video`,否则会默认使用 `udp` 协议,这可能导致大多数使用伪装协议的机场无法连接。

支持的协议类型:
- `wechat-video` (推荐,默认值) - 微信视频通话伪装
- `udp` - 标准 UDP
- `faketcp` - 伪装 TCP

## 支持的客户端

### Sing-box

完整支持所有 Hysteria2 参数,包括:
- 基础认证(password/auth)
- TLS配置(sni, insecure, alpn)
- 混淆(obfs)
- 带宽控制(up_mbps, down_mbps)
- 接收窗口配置
- MTU发现设置

### Clash Meta

支持 Hysteria2 的主要特性:
- 基础认证
- TLS配置
- 混淆
- 带宽控制
- 指纹伪装

### Surge

支持 Hysteria2 的基础特性:
- 基础认证
- TLS配置
- 混淆
- 带宽控制

## 配置转换示例

### Sing-box 输出

```json
{
  "tag": "My Node",
  "type": "hysteria2",
  "server": "example.com",
  "server_port": 443,
  "password": "mypassword",
  "tls": {
    "enabled": true,
    "server_name": "example.com",
    "insecure": false
  },
  "up_mbps": 100,
  "down_mbps": 500
}
```

### Clash Meta / OpenClash 输出

```yaml
- name: My Node
  type: hysteria2
  server: example.com
  port: 443
  password: mypassword
  protocol: wechat-video  # 默认值，确保 OpenClash 兼容性
  sni: example.com
  skip-cert-verify: false
  up: 100 mbps
  down: 500 mbps
```

### Surge 输出

```
My Node = hysteria2, example.com, 443, password=mypassword, sni=example.com, download-bandwidth=500, upload-bandwidth=100
```

## 测试

运行测试脚本验证 Hysteria2 解析功能:

```bash
node test-hysteria2.js
```

## 注意事项

1. **OpenClash 协议兼容性** ⚠️: 
   - 本工具默认将 Hysteria2 的 `protocol` 设置为 `wechat-video`
   - 这是因为大多数机场(95%+)使用 `wechat-video` 伪装协议
   - 如果不指定,OpenClash 会默认使用 `udp`,导致连接失败
   - 如果你的服务器确实使用 UDP,可以在 URL 中添加 `protocol=udp` 参数

2. **密码优先级**: 如果同时存在 URL 中的密码(@ 前)和 `auth` 参数,优先使用 URL 中的密码

3. **带宽单位**: 带宽参数单位为 Mbps,在 Clash 配置中会自动添加单位

4. **TLS**: Hysteria2 默认启用 TLS,`sni` 参数用于指定服务器名称
4. **混淆**: 如果设置了混淆,需要同时提供 `obfs` 和 `obfs-password` 参数
5. **IPv6**: 支持 IPv6 地址,需要用方括号包裹,如 `[2001:db8::1]`

## 更新日志

### 2025年11月14日
- ✅ 完善 Hysteria2Parser 解析逻辑,支持更多参数
- ✅ 改进 ClashConfigBuilder 的 Hysteria2 配置转换
- ✅ 改进 SurgeConfigBuilder 的 Hysteria2 配置转换
- ✅ 优化 SingboxConfigBuilder 的配置输出,清理未定义字段
- ✅ 支持 `hysteria://`、`hysteria2://` 和 `hy2://` 三种协议前缀
- ✅ 支持混淆、带宽控制、接收窗口等高级特性
