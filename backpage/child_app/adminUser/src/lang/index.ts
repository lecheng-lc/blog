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
import type { LanguageType } from '@root/types/store';


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
  legacy: false,
  locale: Cookies.get('language') || 'zh',
  // set locale messages
  messages
})
// 监听函数
const dataListener = (data: {type: LanguageType}) => {
  console.log('全局数据', data)
  i18n.global.locale = data.type as any
}
// 监听数据变化
(window as any).microApp.addGlobalDataListener(dataListener, false)

export default i18n