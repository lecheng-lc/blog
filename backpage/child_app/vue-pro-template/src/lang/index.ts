import { createI18n } from 'vue-i18n';
import Cookies from 'js-cookie'
import {
  baseEn,
  baseJa,
  baseZh
} from '@root/publicMethods/baseLang/index'
import enLocale from './en'
import zhLocale from './zh'
import jaLocale from './ja'


const messages = {
  en: {
    ...baseEn,
    ...enLocale,
  },
  zh: {
    ...baseZh,
    ...zhLocale,
  },
  ja: {
    ...baseJa,
    ...jaLocale,
  }
}

const i18n =  createI18n({
  // set locale
  // options: en or zh
  locale: Cookies.get('language') || 'zh',
  // set locale messages
  messages
})
// 监听函数
const dataListener = (data: {type: 'en' | 'ja' | 'zh'}) => {
  console.log('全局数据', data)
  i18n.global.locale = data.type
}
// 监听数据变化
(window as any).microApp.addGlobalDataListener(dataListener, false)

export default i18n