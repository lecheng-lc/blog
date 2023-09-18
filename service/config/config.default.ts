import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
import { Context } from 'mocha'
import path from 'path'
export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>
  config.salt_md5_key = 'lc'
  config.encrypt_key = 'lc'
  config.keys = appInfo.name + '_blog cms'
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  }
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks'
    }
  }
  config.lccms_api = 'https://api.html-js.cn'
  config.auth_cookie_name = 'LCcms'
  config.adminUserMaxAge = 1000 * 60 * 60 * 24 * 1 // 1 day
  config.security = {
    csrf: {
      enable: false
    }
  }
  config.middleware = [
    'notfoundHandler',
    'crossHeader',
    'compress',
    'authUserToken',
    'authAdminToken',
    'authAdminPower'
  ]
  // mongodb相关路径
  config.mongodb = {
    binPath: '/usr/local/mongodb/bin/',
    backUpPath: path.join(appInfo.baseDir, 'databak/')
  }

  // 后台token校验
  config.authAdminToken = {
    match: [ '/manage', '/admin' ]
  }
  // 后台权限校验
  config.authAdminPower = {
    match: [ '/manage' ]
  }
  // api跨域
  config.crossHeader = {
    match: [ '/api', '/manage' ]
  }
  // gzip压缩，2048指的是字节，2kb
  config.compress = {
    threshold: 2048
  }
  // 会员中心权限校验
  config.authPage = {
    threshold: 1024 // 小于 1k 的响应体不压缩
  }
  // 前台用户校验
  config.authUserToken = {
    ignore: [ '/manage', '/admin' ]
  }
  config.i18n = {
    defaultLocale: 'zh-CH' // 默认会设置为en_US，需要清除cookie
  }
  config.regUserRouter = {
    match: [
      (ctx:Context) => ctx.path.startsWith('/manage/regUser'),
      (ctx:Context) => ctx.path.startsWith('/api/user')
    ]
  }
  config.lcMiddleStageRouter = {
    match: [ ctx => ctx.path.startsWith('/manage/singleUser') ]
  }
  config.session = {
    key: 'LC_SESS',
    maxAge: 24 * 3600 * 1000,
    httpOnly: false,
    encrypt: false,
    renew: true
  }
  // config.cors = {
  //   credentials: '*',
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  // }
  config.static = {
    prefix: '/static',
    dir: [
      path.join(appInfo.baseDir, 'app/public'),
      path.join(appInfo.baseDir, 'backstage/dist')
    ],
    maxAge: 31536000
  }
  return {
    ...config,
    ...bizConfig
  }
}
