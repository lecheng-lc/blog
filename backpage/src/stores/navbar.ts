import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!Cookies.get('sidebarStatus') : true,
    withoutAnimation: true
  },
  device: 'desktop'
}
export const navbarStore = defineStore('navbar', {
  state:()=>(state),
  actions: {
    TOGGLE_SIDEBAR() {
      this.sidebar.opened = !state.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', '1')
      } else {
        Cookies.set('sidebarStatus', '0')
      }
    },
    CLOSE_SIDEBAR (withoutAnimation: boolean)  {
      Cookies.set('sidebarStatus', '0')
      this.sidebar.withoutAnimation = withoutAnimation
       this.sidebar.opened = false
    },
    TOGGLE_DEVICE(device:string) {
      this.device = device
    }
  }
})