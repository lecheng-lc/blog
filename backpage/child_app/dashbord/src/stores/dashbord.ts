import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import {
  getSiteBasicInfo,
  getUserSession,
  getClientNotice,
  getVersionMaintenanceInfo
} from '@/api/dashbord'
import { type ThemeConfigProp } from '@root/types/store'
import {type GetClientNoticeRes, type GetVersionMaintenanceInfoRes, type GetSitBasicInfoRes, type GetUserSessionRes } from '../api/interface';
const state = {
  basicInfo: <GetSitBasicInfoRes>{
    adminUserCount: 0,
    regUserCount: 0,
    contentCount: 0,
    messageCount: 0,
    regUsers: {},
    resources: {},
    messages: {}
  },
  layoutSize: Cookies.get('layoutSize') || 'middle',
  themeConfig: {},
  loginState: {
    state: false,
    userInfo: {
      userName: '',
      email: '',
      logo: '',
      group: []
    },
    noticeCounts: 0
  },
  notice: <GetClientNoticeRes>[],
  versionInfo: {}
}

export const dashbordStore = defineStore('dashbord', {
  state:()=>(state),
  actions: {
    MAIN_SITEBASIC_INFO(list:GetSitBasicInfoRes) {
      this.basicInfo = list
    },
    ADMING_LOGINSTATE (params: GetUserSessionRes)  {
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
    CLIENT_NOTICE(list:GetClientNoticeRes) {
      this.notice = list
    },
    SYSTEM_VERSION_INFO(list: GetVersionMaintenanceInfoRes) {
      this.versionInfo = list.length > 0 ? list[0] : {}
    },
    async getSiteBasicInfo(params = {}) {
      const [, res] = await getSiteBasicInfo(params)
      if(res) {
        this.MAIN_SITEBASIC_INFO(res)
      }
    },
    async getLoginState (params = {
      userInfo: {},
      state: false
    }) {
      const [, res] = await getUserSession(params)
      if(res) {
        this.ADMING_LOGINSTATE(res)
      }
    },
    async getNotice(params = {}) {
      const [, res] = await getClientNotice(params)
      if(res) {
        this.CLIENT_NOTICE(res)
      }
    },
    
    async getVersionMaintenanceInfo(params = {}){
      const [, res] = await getVersionMaintenanceInfo(params)
      if(res) {
        this.SYSTEM_VERSION_INFO(res)
      }
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
