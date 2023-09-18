
import _ from 'lodash'
export default () => {
  return async function notFoundHandler(ctx, next) {
    await next()
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = {
          error: 'Not Found'
        }
      } else {
        if (ctx.originalUrl.indexOf('/admin/') === 0) {
          ctx.redirect('/lc-admin')
        } else {
          try {
            const defaultTemp = await ctx.helper.reqJsonData(
              'contentTemplate/getDefaultTempInfo'
            )
            const configs = await ctx.helper.reqJsonData(
              'systemConfig/getConfig'
            )
            if (!_.isEmpty(defaultTemp) && !_.isEmpty(configs)) {
              await ctx.render(`${defaultTemp.alias}/404`, {
                domain: configs.siteDomain,
                siteName: configs.siteName
              })
            } else {
              ctx.body = '<h1>Page Not Found</h1>'
            }
          } catch (error) {
            ctx.body = '<h1>Page Not Found</h1>'
          }
        }
      }
    }
  }
}
