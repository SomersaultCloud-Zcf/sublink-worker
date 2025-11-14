# Hysteria2 支持改进总结

## 改进内容

本次更新完善了 Sublink Worker 对 Hysteria2 协议的支持,涉及以下文件的修改:

### 1. ProxyParsers.js - Hysteria2Parser 类

**主要改进:**
- ✅ 支持多种密码参数格式 (`password`, `auth`)
- ✅ 改进混淆参数处理,支持 `obfs` 和 `obfs-password`
- ✅ 支持多种带宽参数格式 (`up`/`upmbps`, `down`/`downmbps`)
- ✅ 新增接收窗口配置 (`recv_window`, `recv_window_conn`)
- ✅ 新增 MTU 发现控制 (`disable_mtu_discovery`)
- ✅ 新增 UDP 支持配置
- ✅ 自动清理未定义的字段

### 2. ClashConfigBuilder.js - Hysteria2 配置转换

**主要改进:**
- ✅ 密码字段回退机制 (password || auth)
- ✅ 安全的可选链操作符,避免空值错误
- ✅ 带宽单位自动添加 (mbps)
- ✅ 支持混淆配置输出
- ✅ 支持接收窗口配置
- ✅ 支持 MTU 发现配置
- ✅ 支持 ALPN 和指纹伪装
- ✅ 改进证书验证配置

### 3. SurgeConfigBuilder.js - Hysteria2 配置转换

**主要改进:**
- ✅ 密码字段回退机制 (password || auth)
- ✅ 支持混淆参数 (obfs, obfs-password)
- ✅ 支持带宽配置 (download-bandwidth, upload-bandwidth)
- ✅ 支持 ALPN 配置
- ✅ 支持证书验证配置
- ✅ 新增 ECN 支持

### 4. SingboxConfigBuilder.js - 配置优化

**主要改进:**
- ✅ 新增 convertProxy 方法优化
- ✅ 自动清理 undefined 字段
- ✅ Hysteria2 特殊处理:清理空的 obfs 对象
- ✅ 去除冗余的 auth 字段(当与 password 相同时)
- ✅ 改进 JSON 输出质量

## 支持的 Hysteria2 特性

### 协议前缀
- `hysteria://`
- `hysteria2://`
- `hy2://`

### 认证
- URL 中的密码 (password@server)
- auth 参数
- 自动回退机制

### TLS 配置
- SNI (Server Name Indication)
- 跳过证书验证
- ALPN 协议
- 指纹伪装

### 混淆
- 混淆类型 (obfs)
- 混淆密码 (obfs-password)

### 性能配置
- 上行带宽限制
- 下行带宽限制
- 接收窗口大小
- MTU 发现控制

### 网络配置
- UDP 支持
- IPv6 地址支持

## 兼容性

| 客户端 | 支持程度 | 说明 |
|--------|---------|------|
| **Sing-box** | ⭐⭐⭐⭐⭐ | 完整支持所有特性 |
| **Clash Meta** | ⭐⭐⭐⭐ | 支持主要特性 |
| **Surge** | ⭐⭐⭐ | 支持基础特性 |

## 测试建议

使用提供的测试脚本验证各种 URL 格式:

```bash
node test-hysteria2.js
```

测试场景包括:
- 标准格式(带密码)
- hy2 协议前缀
- 混淆配置
- 带宽限制
- auth 参数
- IPv6 地址

## 文档

详细文档请参阅:
- [Hysteria2 支持说明](./Hysteria2-Support.md)
- [更新日志](./UpdateLogs.md)

## 注意事项

1. **向后兼容**: 所有改进都保持向后兼容,不会破坏现有配置
2. **容错处理**: 使用可选链操作符和回退机制,提高代码健壮性
3. **字段清理**: 自动移除未定义字段,生成更简洁的配置文件
4. **格式规范**: 遵循各客户端的配置规范和最佳实践

## 未来改进

可能的未来改进方向:
- [ ] 支持更多 Hysteria2 高级特性
- [ ] 添加配置验证功能
- [ ] 支持配置模板自定义
- [ ] 添加性能测试和基准测试
