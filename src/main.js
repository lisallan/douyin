import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app = createApp(App)
// 导入
import { createPinia } from 'pinia'
// 赋值给常量
const pinia = createPinia()
// 1. 引入你需要的组件
import { Swipe, SwipeItem, Button, Grid, GridItem, Image as VanImage, Col,
Row, Divider } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
app.config.devtools = true;
// 3. 注册你需要的组件
app.use(pinia).use(Swipe).use(SwipeItem).use(Grid).use(GridItem).use(VanImage).use(Col).use(Row).use(Divider).use(Button);;
app.mount('#app')