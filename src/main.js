import {createApp} from 'vue'
// 全局CSS样式
import './style.css'
// px转rem适配
import 'amfe-flexible'

import App from './App.vue'

const app = createApp(App)
// 引入路由
import router from "@/router/index.js";

app.use(router)

app.mount('#app')
