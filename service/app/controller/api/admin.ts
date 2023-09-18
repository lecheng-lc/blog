
import { Controller } from 'egg'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import CryptoJS from 'crypto-js'
import adminUserRule from '../../validate/adminUser'

class AdminController extends Controller {
  async home() {
    const { ctx } = this
    ctx.logger.info('拉活接口尝试', Object.assign({ href: decodeURIComponent(ctx.URL.href) }))
    ctx.body = {
      code: 200,
      message: '2222'
    }
  }
  async login() {
    const { ctx } = this
    try {
      if (ctx.session.adminUserInfo) {
        ctx.redirect('/admin/dashboard')
      } else {
        const configs = await ctx.helper.reqJsonData('systemConfig/getConfig')
        const { showImgCode } = configs || [] // 是否展示二维码
        await ctx.render('manage/login.html', {
          staticRootPath: this.app.config.static.prefix,
          showImgCode
        })
      }
    } catch (error) {
      ctx.helper.renderFail(ctx, {
        message: error as string
      })
    }
  }

  async loginAction() {
    const { ctx, service } = this
    try {
      const fields = ctx.request.body || {}
      const systemConfigs = await service.systemConfig.find({
        isPaging: '0'
      })
      const { showImgCode } = systemConfigs[0] // 获取系统配置
      let errMsg = ''
      if (
        showImgCode &&
        (!fields.imageCode || fields.imageCode !== ctx.session.imageCode)
      ) {
        errMsg = ctx.__('validate_inputCorrect',
          [ ctx.__('label_user_imageCode') ] as unknown as string)
      }
      if (errMsg) {
        throw new Error(errMsg)
      }
      const formObj = {
        userName: fields.userName
      }
      // 使用validate插件来进行校验
      ctx.validate(
        adminUserRule.login(ctx),
        Object.assign({}, formObj, {
          password: fields.password
        })
      )
      const user = await ctx.service.adminUser.item(ctx, {
        query: formObj,
        populate: [
          {
            path: 'group',
            select: 'power _id enable name'
          },
          {
            path: 'targetEditor',
            select: 'userName _id'
          }
        ],
        files: 'enable password _id email userName logo'
      })
      // 查询是否有这个用户
      if (!_.isEmpty(user)) {
        const userPsd = user.password
        // 兼容老的加密方式
        if (
          userPsd !==
            CryptoJS.MD5(
              this.app.config.salt_md5_key + fields.password
            ).toString() &&
          fields.password !==
            ctx.helper.decrypt(userPsd, this.app.config.encrypt_key)
        ) {
          throw new Error(ctx.__('validate_login_notSuccess'))
        }
        if (!user.enable) {
          throw new Error(ctx.__('validate_user_forbiden'))
        }
        // 颁发jwt token
        const adminUserToken = jwt.sign(
          {
            _id: user._id
          },
          this.app.config.encrypt_key,
          {
            expiresIn: '30day'
          }
        )
        ctx.cookies.set(
          'admin_' + this.app.config.auth_cookie_name,
          adminUserToken,
          {
            path: '/',
            maxAge: this.app.config.adminUserMaxAge,
            signed: true,
            httpOnly: false,
            encrypt: false
          }
        )
        // 记录登录日志
        const clientIp =
          ctx.header['x-forwarded-for'] ||
          ctx.header['x-real-ip'] ||
          ctx.request.ip
        const loginLog = {
          type: 'login',
          logs: user.userName + ' login，ip:' + clientIp
        }

        if (!_.isEmpty(ctx.service.systemOptionLog)) {
          await ctx.service.systemOptionLog.create(loginLog)
        }
        //  模板渲染成功
        ctx.helper.renderSuccess(ctx, {
          data: {
            token: adminUserToken
          }
        })
      } else {
        ctx.helper.renderFail(ctx, {
          message: ctx.__('validate_login_notSuccess')
        })
      }
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }
}

module.exports = AdminController
