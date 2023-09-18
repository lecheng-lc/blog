import Cookies from "js-cookie"
import { isEmpty } from "lodash"
function _changeSideBar(that:any) {
  const sidebarStatus = Cookies.get("sidebarStatus")
  that.sidebarOpened = sidebarStatus == "1" ? true : false
  if (that.sidebar) {
    that.sidebar.opened = that.sidebarOpened
  }
}

export function initEvent(that:any) {
  const rootVm = that.$root

  setTimeout(() => {
    _changeSideBar(that)
  }, 500)

  if (rootVm && rootVm.eventBus) {
    // 左侧菜单切换
    rootVm.eventBus.$on("toggleSideBar", () => {
      setTimeout(() => {
        _changeSideBar(that)
      }, 500)
    })
    // 屏幕大小切换
    rootVm.eventBus.$on("toggleDevice", (message:string) => {
      that.device = message
    })

    rootVm.eventBus.$on("handleTabInfo", (message:string) => {
      if (!isEmpty(message)) {
        rootVm.eventBus.$emit("globalTabsChange", message)
      }
    })
  }

  // 修改移动端标记
  const { body } = document
  const WIDTH = 992
  const rect = body.getBoundingClientRect()
  that.device = rect.width - 1 < WIDTH ? "mobile" : "desktop"
}
