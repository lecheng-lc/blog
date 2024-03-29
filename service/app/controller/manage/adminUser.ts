
import { Controller } from 'egg'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import siteFunc from 'app/utils/siteFunc'
import fileUtils from '../../../app/utils/file'
import adminUserRule from 'app/validate/adminUser'
import validatorUtil from 'app/validate/validatorUtil'

class AdminUserController extends Controller {
  async list() {
    const { ctx } = this
    try {
      const payload = ctx.query
      const adminUserList = await ctx.service.adminUser.find(payload, {
        query: {
          state: '1'
        },
        populate: [
          {
            path: 'group',
            select: 'name _id'
          }
        ],
        files: {
          password: 0
        }
      })

      ctx.helper.renderSuccess(ctx, {
        data: adminUserList
      })
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }

  async logOutAction() {
    const ctx = this.ctx
    ctx.session = null
    ctx.cookies.set('admin_' + this.app.config.auth_cookie_name, null)
    ctx.cookies.set('admin_doracmsapi', null)
    ctx.helper.renderSuccess(ctx)
  }

  async create() {
    const { ctx } = this
    try {
      const fields = ctx.request.body || {}
      const formObj = {
        userName: fields.userName,
        name: fields.name,
        email: fields.email,
        phoneNum: fields.phoneNum,
        countryCode: fields.countryCode,
        password: fields.password,
        confirm: fields.confirm,
        group: fields.group,
        enable: fields.enable,
        comments: fields.comments
      }

      ctx.validate(adminUserRule.form(ctx), formObj)

      const oldItem = await ctx.service.adminUser.item(ctx, {
        query: {
          userName: fields.userName
        }
      })

      if (!_.isEmpty(oldItem)) {
        throw new Error(ctx.__('validate_hadUse_userName'))
      }

      await ctx.service.adminUser.create(formObj)

      ctx.helper.renderSuccess(ctx)
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }

  async getOne() {
    const { ctx } = this
    try {
      const _id = ctx.query.id
      const password = ctx.query.password
      const queryObj = {
        _id
      }

      if (password) {
        _.assign(queryObj, {
          password
        })
      }

      const targetItem = await ctx.service.adminUser.item(ctx, {
        query: queryObj,
        files: '-password'
      })

      ctx.helper.renderSuccess(ctx, {
        data: targetItem
      })
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }

  async update() {
    const { ctx } = this
    try {
      const fields = ctx.request.body || {}
      const formObj = {
        userName: fields.userName,
        name: fields.name,
        email: fields.email,
        logo: fields.logo,
        phoneNum: fields.phoneNum,
        countryCode: fields.countryCode,
        group: fields.group,
        enable: fields.enable,
        comments: fields.comments,
        password: fields.password
      }

      ctx.validate(adminUserRule.form(ctx), formObj)

      // 单独判断密码
      if (fields.password) {
        if (!validatorUtil.checkPwd(fields.password)) {
          throw new Error(
            ctx.__('validate_inputCorrect', [ ctx.__('label_password') ] as unknown as string)
          )
        } else {
          formObj.password = fields.password
        }
      }

      const oldResource = await ctx.service.adminUser.item(ctx, {
        query: {
          userName: fields.userName
        }
      })
      if (!_.isEmpty(oldResource) && oldResource._id !== fields._id) {
        throw new Error(ctx.__('validate_hadUse_userName'))
      }

      await ctx.service.adminUser.update(ctx, fields._id, formObj)

      ctx.helper.renderSuccess(ctx)
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }

  async removes() {
    const { ctx } = this
    try {
      const targetId = ctx.query.ids
      // TODO 目前只针对删除单一管理员逻辑
      const oldUser = await ctx.service.adminUser.item(ctx, {
        query: {
          _id: targetId
        }
      })
      const leftAdminUser = await ctx.service.adminUser.count()
      if (!_.isEmpty(oldUser)) {
        if (
          oldUser._id === ctx.session.adminUserInfo._id ||
          leftAdminUser === 1
        ) {
          throw new Error('当前场景不允许删除该管理员用户')
        }
      } else {
        throw new Error(ctx.__('validate_error_params'))
      }
      await ctx.service.adminUser.removes(ctx, targetId)
      ctx.helper.renderSuccess(ctx)
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }

  // 查询站点信息接口
  async getBasicSiteInfo() {
    const { ctx } = this
    try {
      let adminUserCount = 0,
        regUserCount = 0,
        contentCount = 0,
        messageCount = 0,
        messages = [],
        regUsers = [],
        loginLogs = []

      adminUserCount = await ctx.service.adminUser.count({
        state: '1'
      })
      if (!_.isEmpty(ctx.service.user)) {
        regUserCount = await ctx.service.user.count({
          state: '1'
        })
        regUsers = await ctx.service.user.find(
          {
            isPaging: '0',
            pageSize: 10
          },
          {
            files: {
              email: 0
            }
          }
        )
      }
      if (!_.isEmpty(ctx.service.content)) {
        contentCount = await ctx.service.content.count({
          state: '2'
        })
      }
      if (!_.isEmpty(ctx.service.message)) {
        messageCount = await ctx.service.message.count()
        messages = await ctx.service.message.find(
          {
            isPaging: '0',
            pageSize: 8
          },
          {
            // 进行多表查询
            populate: [
              {
                path: 'contentId',
                select: 'stitle _id'
              },
              {
                path: 'author',
                select: 'userName _id enable date logo'
              },
              {
                path: 'replyAuthor',
                select: 'userName _id enable date logo'
              },
              {
                path: 'adminAuthor',
                select: 'userName _id enable date logo'
              },
              {
                path: 'adminReplyAuthor',
                select: 'userName _id enable date logo'
              }
            ]
          }
        )
      }
      const reKey = new RegExp(ctx.session.adminUserInfo.userName, 'i')

      loginLogs = []
      // TODO 作为插件需要优先判断是否存在
      if (!_.isEmpty(ctx.service.systemOptionLog)) {
        loginLogs = await ctx.service.systemOptionLog.find(
          {
            isPaging: '0',
            pageSize: 1
          },
          {
            query: {
              type: 'login',
              logs: {
                $regex: reKey
              }
            }
          }
        )
      }
      // 权限标记
      const fullResources: any = await ctx.service.adminResource.find({
        isPaging: '0'
      })
      const newResources: any = []
      for (let i = 0; i < fullResources.length; i++) {
        const resourceObj: any = JSON.parse(JSON.stringify(fullResources[i]))
        if (resourceObj.type === '1' && !_.isEmpty(ctx.session.adminUserInfo)) {
          const adminPower = await ctx.helper.getAdminPower(ctx)
          if (adminPower && adminPower.indexOf(resourceObj._id) > -1) {
            resourceObj.hasPower = true
          } else {
            resourceObj.hasPower = false
          }
          newResources.push(resourceObj)
        } else {
          newResources.push(resourceObj)
        }
      }
      const renderBasicInfo = {
        adminUserCount,
        regUserCount,
        regUsers,
        contentCount,
        messageCount,
        messages,
        loginLogs,
        resources: newResources
      }

      ctx.helper.renderSuccess(ctx, {
        data: renderBasicInfo
      })
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }

  async getUserSession() {
    const { ctx, service } = this
    try {
      let noticeCounts = 0
      if (!_.isEmpty(service.systemNotify)) {
        noticeCounts = await ctx.service.systemNotify.count({
          systemUser: ctx.session.adminUserInfo._id,
          isRead: false
        })
      }
      // 查询
      const adminUserInfo = await ctx.service.adminUser.item(ctx, {
        query: {
          _id: ctx.session.adminUserInfo._id
        },
        populate: [
          {
            path: 'group', // 代表关联表的字段
            select: 'power _id enable name'
          },
          {
            path: 'targetEditor',
            select: 'userName _id'
          }
        ],
        files: 'enable password _id email userName logo'
      })

      const renderData = {
        noticeCounts,
        loginState: true,
        userInfo: adminUserInfo
      }

      ctx.helper.renderSuccess(ctx, {
        data: renderData
      })
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }

  async dashboard() {
    const { ctx } = this
    let renderMap: any = []
    const payload = {
      isPaging: '0'
    }
    _.assign(payload, {
      pageSize: 1000
    })
    const manageCates = await ctx.service.adminResource.find(payload, {
      files: 'api _id label enable routePath parentId type icon comments'
    })
    console.log('走到这里了么')
    const adminPower = await ctx.helper.getAdminPower(ctx)
    const currentCates = await siteFunc.renderNoPowerMenus(
      manageCates,
      adminPower,
      false
    )
    if (!_.isEmpty(currentCates)) {
      const powerPathMaps: any = []
      for (const cateItem of currentCates) {
        if (cateItem.parentId !== 0 && cateItem.enable) {
          powerPathMaps.push(cateItem.routePath)
        }
      }
      powerPathMaps.splice(0, 0, 'dashboard')
      powerPathMaps.splice(0, 0, 'navbar')
      console.log(powerPathMaps)
      console.log(this.app.config.env)
      for (const pathItem of powerPathMaps) {
        if (this.app.config.env === 'local') {
          // 读取本地文件获取调试端口号
          const admin_micro_path = path.join(
            this.app.config.baseDir,
            'backpage'
          )
          const modulePkgPath = `${admin_micro_path}/${pathItem}/package.json` // 已dashbord为例，/Users/mmbang/Desktop/lecheng-github/blog/service/backpage/dashbord/package.json
          if (fs.existsSync(modulePkgPath)) {
            let modulePkg = <PackageJson>{}
            const getPackInfo = async function() {
              modulePkg = await fileUtils.readPackageJson(path.resolve(process.cwd(), '../../package.json'))
            }
            await getPackInfo()
            const moduleDevInfo = modulePkg.scripts.dev
            const modulePort = moduleDevInfo.split(' --port ')[1]
            if (this.app.config.dev_modules.indexOf(pathItem) >= 0) {
              // 如果你想要本地开发就使用在app/config/config.local.js文件件中的dev_modules属性中放开，这里就以dashbord为例
              renderMap.push({
                name: pathItem,
                path: `${this.app.config.admin_root_path}:${modulePort}/app.js`
              })
            } else {
              renderMap.push({
                name: pathItem,
                path: `${this.app.config.server_path + this.app.config.static.prefix
                }/${pathItem}/js/app.js`
              })
            }
          } else {
            renderMap.push({
              name: pathItem,
              path: `${this.app.config.origin +
                '/cms/plugins' +
                this.app.config.static.prefix
              }/admin/${pathItem}/js/app.js`
            })
          }
        } else {
          // 已安装的插件优先级最高
          const { plugins } = await this.app.getExtendApiList()
          const pluginStr = `dora${pathItem.charAt(0).toUpperCase() + pathItem.slice(1)
          }`
          if (
            plugins.indexOf(pluginStr) >= 0 &&
            this.app.config[pluginStr].adminUrl
          ) {
            const adminUrlItem =
              this.app.config.admin_root_path +
              this.app.config[pluginStr].adminUrl
            if (adminUrlItem instanceof Array) {
              for (const routerItem of adminUrlItem) {
                renderMap.push({
                  name: routerItem.path,
                  path: routerItem.url
                })
              }
            } else {
              renderMap.push({
                name: pathItem,
                path: adminUrlItem
              })
            }
          } else {
            renderMap.push({
              name: pathItem,
              path: `${this.app.config.admin_root_path}/${pathItem}/js/app.js`
            })
          }
        }
      }
    }

    renderMap = _.uniqWith(renderMap, _.isEqual)
    await ctx.render('manage/index.html', {
      renderMap,
      renderMapJson: JSON.stringify(renderMap),
      staticRootPath: this.app.config.static.prefix,
      adminBasePath: this.app.config.admin_base_path,
      appVersion: this.app.config.pkg.version,
      appName: this.app.config.pkg.name
    })
  }
}

export default AdminUserController
