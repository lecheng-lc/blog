
export default () => {
  return async function staticHeader(ctx, next) {
    if (ctx.originalUrl.indexOf('/static/') === 0) {
      ctx.set('Access-Control-Allow-Origin', '*')
      ctx.set('Access-Control-Allow-Credentials', 'true')
      await next()
    } else {
      await next()
    }
  }
}

