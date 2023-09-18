import { Application } from 'egg'
import { AxiosHeaders } from 'axios'
new AxiosHeaders()
export default (app: Application) => {
  const { controller, router } = app
  router.get([ '/lc-admin', '/admin/login' ], controller.api.admin.login)
  router.get('/api/systemConfig/getConfig', controller.api.systemConfig.list)
  router.post('/api/admin/doLogin', controller.api.admin.loginAction) // 做登录操作
  router.get('/home', controller.api.admin.home)
  router.get('/api/getImgCode', controller.page.home.getImgCode) // 获取图片验证码，图片验证码被塞入到session当中去
}
