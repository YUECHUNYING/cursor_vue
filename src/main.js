import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/styles/index.scss'

// 按需引入 Vant 组件
import { Button, Field, Icon, Checkbox, Cell, CellGroup, Toast } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)
const pinia = createPinia()

// 注册 Vant 组件
app.use(Button)
app.use(Field)
app.use(Icon)
app.use(Checkbox)
app.use(Cell)
app.use(CellGroup)
app.use(Toast)

app.use(pinia)
app.use(router)

app.mount('#app')

