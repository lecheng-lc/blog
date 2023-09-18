
import { Application } from 'egg'
import authToken from '../utils/authToken'
import _ from 'lodash'
export default (_options: any, app:Application) => {
  return async function authUserToken(ctx, next) {
    try {
      ctx.session.user = ''
      let userToken = ''
      const getTokenFromCookie = ctx.cookies.get(
        'api_' + app.config.auth_cookie_name
      )

      if (ctx.request.method === 'GET') {
        userToken = ctx.query.token || getTokenFromCookie
      } else if (ctx.request.method === 'POST') {
        userToken = ctx.request.body.token || getTokenFromCookie
      }

      if (userToken) {
        const checkToken:any = await authToken.checkToken(
          userToken,
          app.config.encrypt_key
        )

        if (checkToken) {
          if (typeof checkToken === 'object') {
            const targetUser = await ctx.service.user.item(ctx, {
              query: {
                _id: checkToken.userId
              },
              files: '_id userName email'
            })
            if (!_.isEmpty(targetUser)) {
              const { _id, userName, email, logo } = targetUser
              ctx.session.user = {
                _id,
                userName,
                email,
                logo
              }
              ctx.session.user.token = userToken
              ctx.session.logined = true
            }
          }
        }
      }

      await next()
    } catch (error) {
      console.log(
        '🚀 ~ file: authUserToken.js ~ line 57 ~ authUserToken ~ error',
        error
      )

      ctx.helper.renderFail(ctx, {
        message: `${(error as any).message}`
      })
      // await next()
    }
  }
}
