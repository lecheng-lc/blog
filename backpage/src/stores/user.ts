import { getRoleResources, logout, getInfo } from '@/api/user'
import { getToken, removeToken } from '@root/publicMethods/auth';
import { constantRoutes, resetRouter } from '@/router'
import { isEmpty, uniq, filter } from 'lodash'
import { defineStore } from 'pinia'
import { type GetListByPower } from '@/api/interface'
import { type  RouteLocationNormalized } from 'vue-router'
interface SetTabs {
  to :RouteLocationNormalized
  action: 'add'
}
interface StateObj {
  token: string | undefined
  routes: GetListByPower[]
  name: string,
  avatar: string
  showAppSideBar: boolean
  addRoutes: GetListByPower[]
  tabs: GetListByPower[]
  activeTab: GetListByPower
}
const state:StateObj = {
  token: getToken(),
  routes:[],
  name: '',
  avatar: '',
  addRoutes: [],
  showAppSideBar: false,
  tabs: [],
  activeTab: <GetListByPower>{},
};
export const userStore = defineStore('user', {
  state:()=>(state),
  actions: {
    SET_ROUTES(routes:GetListByPower[] | []) {
      this.addRoutes = routes;
      this.routes = (constantRoutes as unknown as GetListByPower[]).concat(routes);
    },
    SET_TOKEN(token:string){
      this.token = token;
    },
    SET_NAME(name:string) {
      this.name = name;
    },
    SET_AVATAR(avatar:string) {
      this.avatar = avatar
    },
    SET_SIDEBAR(show: boolean) {
      this.showAppSideBar = show
    },
    SET_TBS(payload:GetListByPower[]) {
      this.tabs = payload
    },
    SET_ACTIVE_TAB (payload:GetListByPower) {
      this.activeTab = payload;
    },
    async getInfo() {
      try {
        const [, res] = await getInfo()
        if (!res) {
          console.log('Verification failed, please Login again.');
        }
        const { userName, logo } = res!.userInfo
        this.SET_NAME(userName) 
        this.SET_AVATAR(logo)
      }catch(err){
        console.log(err)
      }
    },
    async logout() {
      try{
        await logout()
        this.SET_TOKEN('')
        this.SET_ROUTES([])
        removeToken('1')
        resetRouter()
      }catch(err){
        console.log(err)
      }
    },
  
    async getResources() {
      const [, res ] = await getRoleResources()
      if (res) {
        this.SET_ROUTES(res)
        return res
      } 
    },
  
    showSideBar() {
      const showSideBarState = getToken() ? true : false;
      this.SET_SIDEBAR(showSideBarState)
    },
  
    // remove token
    resetToken() {
      this.SET_TOKEN('')
      removeToken()
    },
  
    // 记录tabs
    setTabs(payload: SetTabs) {
      console.error('payload', payload)
      let targetRoute = {}
      const { to, action } = payload
      const searchRouteInfo = (routePath:string, routes:GetListByPower[]) => {
        for (const element of routes) {
          if (routePath == element.path || routePath == element.redirect) {
            targetRoute = element
            break
          } else {
            if (
              isEmpty(targetRoute) &&
              element.children &&
              element.children.length > 0
            ) {
              searchRouteInfo(routePath, element.children)
            }
          }
        }
        return targetRoute
      }
      const routeItem = <GetListByPower>searchRouteInfo(to.path, state.routes)
      if (!isEmpty(routeItem)) {
        let thisTabs:GetListByPower[] = [...state.tabs]
        if (action == 'add') {
          const oldTabs = filter(thisTabs, (item:GetListByPower) => {
            return item.path == routeItem.path
          });
          if (oldTabs.length) {
            this.SET_ACTIVE_TAB(JSON.parse(JSON.stringify(routeItem)))
            return
          }
          thisTabs.push(routeItem)
        } else if (action == 'remove') {
          thisTabs = filter(thisTabs, (item) => {
            return item.path != routeItem.path;
          })
        }
        console.log(thisTabs)
        thisTabs = uniq(thisTabs)
        this.SET_TBS(thisTabs)
      }
    },
    // 设置当前激活的tab
    setActiveTab(payload:GetListByPower) {
      if (!isEmpty(payload)) {
        this.SET_ACTIVE_TAB(payload)
      }
    },
  }
})