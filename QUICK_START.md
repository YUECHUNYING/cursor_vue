# 快速启动指南

## 安装依赖

```bash
npm install
```

## 启动开发服务器

```bash
npm run dev
```

开发服务器将在 `http://localhost:3000` 启动

## 构建项目

### 生产环境构建
```bash
npm run build:prod
```

### 测试环境构建
```bash
npm run build:test
```

构建产物将输出到 `dist/` 目录

## 预览构建结果

```bash
npm run preview
```

## 代理配置

开发环境的 API 代理配置在 `vite.config.js` 中：

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8080',  // 修改为实际后端地址
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

## 项目特性

✅ Vue 3 + Composition API
✅ Vite 快速构建
✅ Vue Router 路由管理
✅ Pinia 状态管理
✅ Axios HTTP 请求
✅ Vant UI 组件库
✅ SCSS 样式支持
✅ 移动端适配
✅ 代理配置
✅ 代码压缩优化

## 目录说明

- `src/pages/` - 页面组件
- `src/api/` - API 接口
- `src/router/` - 路由配置
- `src/store/` - 状态管理
- `src/utils/` - 工具函数
- `src/components/` - 公共组件

## 常见问题

### 1. 端口被占用
修改 `vite.config.js` 中的 `server.port` 配置

### 2. 代理不生效
检查后端服务是否启动，以及代理配置中的 `target` 地址是否正确

### 3. 样式不生效
确保在 `main.js` 中正确导入了样式文件

