# 余粮宝 H5 项目

## 项目介绍
余粮宝数字农业服务平台 H5 前端项目

## 技术栈
- Vue 3
- Vite
- Vue Router
- Pinia
- Axios
- Vant UI

## 项目结构
```
├── src/
│   ├── api/           # 接口调用
│   ├── assets/        # 静态资源
│   ├── components/    # 公共组件
│   ├── pages/         # 页面管理
│   ├── router/        # 路由管理
│   ├── store/         # 状态管理
│   ├── utils/         # 工具函数
│   └── main.js        # 入口文件
├── public/            # 公共资源
├── vite.config.js     # Vite配置（包含代理配置）
└── package.json       # 依赖管理
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build:prod

# 构建测试版本
npm run build:test

# 预览构建结果
npm run preview
```

## 功能模块

### 页面管理
所有页面存放在 `src/pages/` 目录下，通过路由进行管理

### 接口调用
- API 接口统一管理在 `src/api/` 目录
- 使用 Axios 进行 HTTP 请求
- 请求拦截器和响应拦截器配置在 `src/utils/request.js`

### 打包管理
- 开发环境：`npm run dev`
- 生产环境：`npm run build:prod`
- 测试环境：`npm run build:test`

### 代理管理
代理配置在 `vite.config.js` 的 `server.proxy` 中，默认代理 `/api` 到 `http://localhost:8080`

