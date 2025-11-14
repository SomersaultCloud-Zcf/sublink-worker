# Hysteria2 协议支持 - 快速指南

## 🎉 已完成的改进

本次更新全面增强了 Sublink Worker 对 Hysteria2 协议的支持。

## 📋 修改的文件

### 核心文件
1. **src/ProxyParsers.js** - 增强 URL 解析
2. **src/ClashConfigBuilder.js** - 改进 Clash 配置
3. **src/SurgeConfigBuilder.js** - 改进 Surge 配置
4. **src/SingboxConfigBuilder.js** - 优化输出格式

### 文档文件
1. **docs/Hysteria2-Support.md** - 详细使用文档
2. **docs/Hysteria2-Improvements.md** - 改进说明
3. **docs/UpdateLogs.md** - 更新日志

### 测试文件
1. **test-hysteria2.js** - 测试脚本

## ✨ 主要特性

### 支持的协议
```
hysteria://
hysteria2://
hy2://
```

### 支持的参数
- ✅ 密码认证 (password/auth)
- ✅ TLS 配置 (sni, insecure, alpn)
- ✅ 混淆 (obfs, obfs-password)
- ✅ 带宽控制 (up, down)
- ✅ 接收窗口 (recv-window, recv-window-conn)
- ✅ MTU 发现
- ✅ UDP 支持
- ✅ IPv6 地址

## 🚀 使用示例

### 基础配置
```
hysteria2://password@example.com:443?sni=example.com#节点名称
```

### 带混淆
```
hysteria2://pass@host.com:443?obfs=salamander&obfs-password=secret&sni=host.com#混淆节点
```

### 带速度限制
```
hysteria2://pass@server.com:443?up=100&down=500&sni=server.com#限速节点
```

## 🔧 测试

运行测试脚本:
```bash
node test-hysteria2.js
```

## 📚 详细文档

查看完整文档: [docs/Hysteria2-Support.md](./Hysteria2-Support.md)

## ⚠️ 注意事项

1. 所有修改保持向后兼容
2. 支持三大客户端: Sing-box, Clash Meta, Surge
3. 自动处理未定义字段,输出更简洁
4. 使用安全的可选链操作符,提高代码健壮性

## 🎯 客户端支持

| 客户端 | 支持等级 |
|--------|---------|
| Sing-box | ⭐⭐⭐⭐⭐ (完整) |
| Clash Meta | ⭐⭐⭐⭐ (主要特性) |
| Surge | ⭐⭐⭐ (基础特性) |
