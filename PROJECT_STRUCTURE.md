# 项目结构说明

## 目录结构

```
cursor_vue/
├── public/                 # 静态资源目录
├── src/                    # 源代码目录
│   ├── api/               # 接口调用管理
│   │   ├── index.js       # API统一导出
│   │   └── user.js        # 用户相关接口
│   ├── assets/            # 静态资源
│   │   └── styles/        # 样式文件
│   │       └── index.scss # 全局样式
│   ├── components/        # 公共组件
│   ├── pages/             # 页面管理
│   │   ├── Login/         # 登录页面
│   │   │   └── index.vue
│   │   └── Home/          # 首页
│   │       └── index.vue
│   ├── router/            # 路由管理
│   │   └── index.js       # 路由配置
│   ├── store/             # 状态管理 (Pinia)
│   │   └── user.js        # 用户状态
│   ├── utils/             # 工具函数
│   │   ├── index.js       # 通用工具函数
│   │   └── request.js     # Axios请求封装
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── .gitignore             # Git忽略文件
├── index.html             # HTML模板
├── package.json           # 依赖管理
├── postcss.config.js      # PostCSS配置
├── vite.config.js         # Vite配置（包含代理配置）
└── README.md              # 项目说明
```

## 功能模块说明

### 1. 页面管理 (`src/pages/`)
- 所有页面组件存放在此目录
- 每个页面有独立的文件夹，包含 `index.vue`
- 通过路由配置进行页面导航

### 2. 接口调用 (`src/api/`)
- 统一管理所有 API 接口
- 使用 `src/utils/request.js` 封装的 axios 实例
- 按业务模块划分文件（如 `user.js`）

### 3. 打包管理
- **开发环境**: `npm run dev`
  - 启动开发服务器，支持热更新
  - 默认端口: 3000
- **生产环境**: `npm run build:prod`
  - 构建生产版本，代码压缩优化
- **测试环境**: `npm run build:test`
  - 构建测试版本

### 4. 代理管理 (`vite.config.js`)
- 开发环境代理配置在 `server.proxy` 中
- 默认代理规则:
  ```javascript
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
  ```
- 可根据实际后端地址修改 `target`

## 使用指南

### 添加新页面
1. 在 `src/pages/` 下创建新文件夹
2. 创建 `index.vue` 文件
3. 在 `src/router/index.js` 中添加路由配置

### 添加新接口
1. 在 `src/api/` 下创建或修改对应业务模块文件
2. 使用 `request` 工具发送请求
3. 在 `src/api/index.js` 中导出（可选）

### 修改代理配置
编辑 `vite.config.js` 中的 `server.proxy` 配置

### 修改打包配置
编辑 `vite.config.js` 中的 `build` 配置

