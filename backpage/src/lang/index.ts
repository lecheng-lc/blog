import { createI18n } from 'vue-i18n';
import Cookies from 'js-cookie'
import microApp from '@micro-zoe/micro-app'

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
  locale: Cookies.get('language') || 'zh',
  messages
})

export const changeLanguage = (type: 'en' | 'zh' | 'ja') =>{
  Cookies.set('language', type)
  i18n.global.locale = type
  microApp.setGlobalData({type})
}
export default i18n