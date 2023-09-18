import './assets/main.css'
import microApp from '@micro-zoe/micro-app'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import './styles/common.scss'
import './styles/var.scss'
import App from './App.vue'
import router from './router'
import  './router/permission'
import i18n from './lang'
import './assets/iconfont/iconfont.css'
microApp.start()
const app = createApp(App)
app.use(i18n)
app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')
