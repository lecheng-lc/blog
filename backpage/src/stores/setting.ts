import { defineStore } from 'pinia'
import defaultSettings from '@root/publicMethods/settings'
import Cookies from 'js-cookie'
import { changeLanguage } from '@/lang'
import microApp from '@micro-zoe/micro-app'

import { type LayoutSize, type LanguageType, type ThemeConfigProp } from '@root/types/store'
//  改变布局的size大小
const changeLayoutSize = (type: LayoutSize) =>{
  Cookies.set('layoutSize', type)
  microApp.setGlobalData({size: type, type: 'layoutSize'})
}
const changeLayoutTheme  = (data: ThemeConfigProp) =>{
  Cookies.set('ThemeConfigProp', JSON.stringify(data))
  microApp.setGlobalData({theme: data, type: 'layoutTheme'})
}
const {
  showSettings,
  fixedHeader,
  sidebarLogo
} = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  language:  Cookies.get('language') || 'zh',
  layoutSize: Cookies.get('layoutSize') || 'middle',
  themeConfig: {
    // 默认 primary 主题颜色
		primary: "#1890ff",
		// 深色模式
		isDark: false,
		// 色弱模式(weak) || 灰色模式(gray)
		weakOrGray: "",
		// 面包屑导航
		breadcrumb: true,
		// 标签页
		tabs: true,
		// 页脚
		footer: true
  }
}
export const settingsStore = defineStore('settings', {
  state:()=>(state),
  actions:{
    CHANGE_SETTING ( { key, value }:{key:keyof typeof state, value: boolean})  {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        // state[key] = value
      }
    },
    updateLanguage(type: LanguageType) {
      changeLanguage(type)
      this.language = type
    },
    updateLayoutSize(type: LayoutSize) {
      this.layoutSize = type
      changeLayoutSize(type)
    },
    updateThemeConfig(data: ThemeConfigProp) {
      changeLayoutTheme(data)
      this.themeConfig = data
    }
  }
})