export default () => {
  return async function crossHeader(ctx, next) {
    ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8090')
    ctx.set('Access-Control-Allow-Credentials', 'true')
    ctx.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
    )
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    if (ctx.method === 'OPTIONS') {
      ctx.body = 200
    } else {
      await next()
    }
  }
}
