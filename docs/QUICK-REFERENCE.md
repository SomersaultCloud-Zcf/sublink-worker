# OpenClash Hysteria2 快速参考

## 🎯 核心改进

✅ **已修复**: OpenClash 默认使用 `udp` 协议导致的连接失败问题  
✅ **新默认值**: `protocol: wechat-video` (适配 95% 机场)  
✅ **自动兼容**: 无需手动修改配置

---

## 📋 快速使用

### 标准用法 (推荐)
```
hysteria2://password@server.com:443?sni=server.com#节点名称
```
↓ 自动转换为 ↓
```yaml
protocol: wechat-video  # 自动添加
```

### 自定义协议
```
hysteria2://pass@server.com:443?protocol=udp&sni=server.com#节点
```

---

## 🔧 支持的协议

| 协议 | 使用率 | 说明 |
|------|--------|------|
| `wechat-video` | ⭐⭐⭐⭐⭐ | 默认,机场首选 |
| `udp` | ⭐⭐ | 标准协议 |
| `faketcp` | ⭐⭐⭐ | 伪装 TCP |

---

## ⚡ 参数列表

| 参数 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `protocol` | ❌ | `wechat-video` | 传输协议 |
| `sni` | ✅ | - | TLS 服务器名 |
| `password` | ✅ | - | 认证密码 |
| `up` | ❌ | - | 上行带宽(Mbps) |
| `down` | ❌ | - | 下行带宽(Mbps) |
| `obfs` | ❌ | - | 混淆类型 |
| `obfs-password` | ❌ | - | 混淆密码 |

---

## 🐛 故障排查

### 连接失败?
1. ✅ 确认已更新到最新版本
2. ✅ 检查 `protocol` 是否为 `wechat-video`
3. ✅ 尝试添加 `protocol=udp` 测试
4. ✅ 查看 OpenClash 日志

### 验证配置
```bash
# 检查生成的配置
curl "https://your-worker/sub?target=clash&url=订阅链接" | grep protocol
```

---

## 📝 配置示例

### 基础配置
```yaml
- name: 香港节点
  type: hysteria2
  server: hk.example.com
  port: 443
  password: mypassword
  protocol: wechat-video
  sni: hk.example.com
```

### 完整配置
```yaml
- name: 美国节点
  type: hysteria2
  server: us.example.com
  port: 443
  password: mypassword
  protocol: wechat-video
  obfs: salamander
  obfs-password: obfspass
  up: 100 mbps
  down: 500 mbps
  sni: us.example.com
  skip-cert-verify: false
```

---

## 🔗 相关文档

- 📖 [完整文档](./Hysteria2-Support.md)
- 🔧 [OpenClash 专用说明](./OpenClash-Hysteria2.md)
- 📋 [更新日志](./UpdateLogs.md)

---

## ⚠️ 重要提示

> **默认协议已改为 `wechat-video`**  
> 如果你的服务器确实使用 UDP,请在 URL 中明确指定:  
> `?protocol=udp`

---

*更新时间: 2025-11-14*
