import { Controller } from 'egg'
class SystemConfigController extends Controller {
  async list() {
    const ctx = this.ctx
    const systemConfigList = await ctx.service.systemConfig.find(
      {
        isPaging: '0'
      },
      {
        files:
          'siteName ogTitle siteDomain siteDiscription siteKeywords siteAltKeywords registrationNo showImgCode statisticalCode siteLogo'
      }
    )
    // 获取配置数据
    ctx.helper.renderSuccess(ctx, {
      data: systemConfigList[0]
    })
  }
}

export default SystemConfigController
