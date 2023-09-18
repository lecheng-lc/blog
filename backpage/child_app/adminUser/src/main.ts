import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './lang'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';

import 'ant-design-vue/dist/reset.css';
const app = createApp(App)
app.use(Antd)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#admin-user')
