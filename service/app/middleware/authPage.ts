
export default () => {
  return async function authPage(ctx, next) {
    if (ctx.session.logined) {
      await next()
    } else {
      ctx.redirect('/users/login')
    }
  }
}
