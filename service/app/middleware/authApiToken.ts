export default () => {
  return async function authApiToken(ctx, next) {
    if (ctx.session.logined) {
      await next()
    } else {
      ctx.helper.renderFail(ctx, {
        message: ctx.__('label_notice_asklogin')
      })
    }
  }
}
