import './assets/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import createStore from './store'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
//全局封装后的axios调用
// import api from './api/api'
// 创建并挂载根实例
const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn
})
//全局注册router
app.use(router)
app.use(createStore)
// 全局设置api借口
// app.config.globalProperties.$http = api
// 应用实例必须在调用了 .mount() 方法后才会渲染出来
app.mount('#app')
