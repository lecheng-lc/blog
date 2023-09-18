import router from './index'
import { message } from 'ant-design-vue'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@root/publicMethods/auth' // get token from cookie
import getPageTitle from '@root/publicMethods/get-page-title'
import settings from '@root/publicMethods/settings'
import { userStore } from '@/stores/user'
NProgress.configure({
  showSpinner: false,
})

const whiteList = ["/admin/login"]

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  const userStoreIns = userStore()
  document.title = getPageTitle(to.meta.title as string || '')
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/admin/login') {
      next({
        path: 'admin/dashbord'
      })
      NProgress.done()
    } else {
      const hasGetUserInfo = userStoreIns.name;
      if (hasGetUserInfo) {
        userStoreIns.setTabs({ to, action: 'add' })
        next()
      } else {
        try {
          const hasRoles =
          userStoreIns.routes && userStoreIns.routes.length > 0
          if (hasRoles) {
            userStoreIns.setTabs({ to, action: 'add' })
            next()
          } else {
            await userStoreIns.getInfo()
            await userStoreIns.getResources()

            next({
              ...to,
              replace: true,
            });
          }
        } catch (error) {
          userStoreIns.resetToken()
          message.error(error as string || "Has Error")
          window.location.href = `${settings.server_api}${settings.admin_base_path}/login`
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      console.log(whiteList.indexOf(to.path), '---11')
      window.location.href = `${settings.server_api}${settings.admin_base_path}/login?redirect=${to.path}`;
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
