import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import {
  getSiteBasicInfo,
  getUserSession,
  getClientNotice,
  getVersionMaintenanceInfo
} from '@/api/dashbord'
import { type ThemeConfigProp } from '@root/types/store'
const state:any = {
  basicInfo: {
    adminUserCount: 0,
    regUserCount: 0,
    contentCount: 0,
    messageCount: 0,
    resources: <any>{}
  },
  layoutSize: Cookies.get('layoutSize') || 'middle',
  themeConfig: {},
  loginState: <any>{
    state: false,
    userInfo: {
      userName: '',
      email: '',
      logo: '',
      group: []
    },
    noticeCounts: 0
  },
  notice: [],
  versionInfo: {}
}

export const dashbordStore = defineStore('dashbord', {
  state:()=>(state),
  actions: {
    MAIN_SITEBASIC_INFO(list:any) {
      this.basicInfo = list
    },
    ADMING_LOGINSTATE (params: any)  {
      this.loginState = Object.assign({
        userInfo: {
          userName: '',
          email: '',
          logo: '',
          group: []
        },
        state: false
      }, {
        userInfo: params.userInfo,
        state: params.loginState || false,
        noticeCounts: params.noticeCounts
      });
    },
    CLIENT_NOTICE(list:any) {
      this.notice = list
    },
    SYSTEM_VERSION_INFO(list:any) {
      this.versionInfo = list.length > 0 ? list[0] : {}
    },
    getSiteBasicInfo(params = {}) {
      getSiteBasicInfo(params).then((result) => {
        this.MAIN_SITEBASIC_INFO(result.data)
      })
    },
    getLoginState (params = {
      userInfo: {},
      state: false
    }) {
      getUserSession(params).then((result) => {
       this.ADMING_LOGINSTATE(result.data)
      })
    },
    getNotice(params = {}) {
      getClientNotice(params).then((result) => {
        this.CLIENT_NOTICE(result.data)
      })
    },
    
    getVersionMaintenanceInfo( params = {}){
      getVersionMaintenanceInfo(params).then((result) => {
        this.SYSTEM_VERSION_INFO(result.data)
      })
    },
    updateLayoutSize(type: string){
      // 监听函数
      this.layoutSize = type
      console.log(this.layoutSize)
    },
    updateLayoutTheme(data: ThemeConfigProp) {
      this.themeConfig = data
    }
  }
})
