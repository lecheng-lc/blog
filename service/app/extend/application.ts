
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
// import muri from 'muri'
import restore from '@cdxoo/mongodb-restore' // Simple module to restore MongoDB dumps from BSON files.
// import child from 'child_process'
import siteFunc from '../utils/siteFunc'
import { Application } from 'egg'

export default {
  async init(this: Application, ctx) {
    console.log('app init')
    try {
      const checkSystemInfo = await ctx.service.systemConfig.count()
      if (checkSystemInfo === 0) {
        const uri = this.config.mongoose.client?.url
        const datafile = path.join(__dirname, '../../databackup/blog')
        await restore.database({
          uri,
          database: 'blog',
          from: datafile
        })
      }
    } catch (error:any) {
      if (
        error &&
        error?.message === 'Invalid Operation, no operations specified'
      ) {
        console.log('init data success')
      } else {
        console.log('init data error:', error.message)
      }
    }
  },
  // 获取插件api白名单
  // return {
  //  plugins, // 该系统中启用了哪些插件
  //  adminApiWhiteList  // 系统使用的白名单
  // }
  async getExtendApiList(this: Application) {
    const pluginFile = path.join(this.config.baseDir, 'config/plugin.ts')
    const pluginInfo = (await import(pluginFile)).default
    const plugins:any = []
    const pluginAdminApiWhiteList:any = []
    for (const pluginItem in pluginInfo) {
      // 1、开启插件，2、已成功加载，3、内部(dora)插件
      if (
        pluginInfo.hasOwnProperty(pluginItem) &&
        pluginInfo[pluginItem].enable &&
        !_.isEmpty(this.config[pluginItem]) &&
        pluginItem.indexOf('lc') === 0
      ) {
        const { adminApi } = this.config[pluginItem] // 去取插件当中api
        // 获取后台接口白名单
        for (const item of adminApi) {
          if (item.noPower && item.url) {
            pluginAdminApiWhiteList.push(item.url)
          }
        }

        plugins.push(pluginItem)
      }
    }
    return {
      plugins,
      adminApiWhiteList: pluginAdminApiWhiteList
    }
  },

  // 插件初始数据导入
  // async initExtendData(this:Application, ctx, pluginInfos:any = {}, type = 'install') {
  //   if (!_.isEmpty(pluginInfos)) {
  //     if (type === 'install') {
  //       const targetPluginFolder = path.join(
  //         this.config.baseDir,
  //         `lib/plugin/${pluginInfos.pkgName}`
  //       )
  //       const tabname = path.basename(pluginInfos.initData, '.json')
  //       const dataPath = path.join(
  //         targetPluginFolder,
  //         `./app/db/${pluginInfos.initData}`
  //       )

  //       if (pluginInfos.initData && fs.existsSync(dataPath)) {
  //         const parsedUri = muri(this.config.mongoose.client.url)
  //         const parameters:string[] = []
  //         if (parsedUri.auth) {
  //           parameters.push(`-u "${parsedUri.auth.user}"`, `-p "${parsedUri.auth.pass}"`)
  //         }
  //         if (parsedUri.db) {
  //           parameters.push(`-d "${parsedUri.db}"`)
  //         }
  //         const cmdstr = `${this.config.mongodb.binPath}mongoimport ${parameters.join(' ')} -c ${tabname} --upsert --drop "${dataPath}"`
  //         child.execSync(cmdstr)import default from '../../../../multi-tab/src/library/components/multiTab/demo/mock';

  //       }
  //     } else {
  //       // TODO 插件卸载暂不清除数据
  //       // await ctx.service[pluginInfos.alias].removeAll()
  //     }
  //   }
  // },

  // 初始化资源管理数据
  async initResourceData(ctx, pluginInfos:any = {}, type = 'install') {
    if (!_.isEmpty(pluginInfos)) {
      const { alias, adminApi, iconName } = pluginInfos

      // 安装
      if (type === 'install') {
        const randomResource = await ctx.service.adminResource.item(ctx, {
          query: {
            parentId: '0'
          },
          files: '_id'
        })
        if (_.isEmpty(randomResource)) {
          throw new Error(ctx.__('validate_error_params'))
        }

        const targetResourceId = randomResource._id

        let sortId = 0
        // 插入主菜单
        const thisParentId = await ctx.service.adminResource.create({
          label: `${alias}Manage`,
          type: '0',
          api: '',
          isExt: true,
          parentId: targetResourceId,
          sortId: 0,
          routePath: alias,
          icon: iconName,
          componentPath: `${alias}/index`,
          enable: true,
          comments: `${pluginInfos.name}`
        })

        for (const apiItem of adminApi) {
          sortId++
          // 插入功能菜单
          const ctrlName =
            apiItem.controllerName.charAt(0).toUpperCase() +
            apiItem.controllerName.slice(1)
          await ctx.service.adminResource.create({
            label: `${alias}${ctrlName}`,
            type: '1',
            api: apiItem.url,
            isExt: true,
            parentId: thisParentId,
            sortId,
            routePath: '',
            icon: '',
            componentPath: '',
            enable: true,
            comments: apiItem.details
          })
        }
      } else {
        const targetParentResource = await ctx.service.adminResource.item(ctx, {
          query: {
            routePath: alias,
            label: `${alias}Manage`
          }
        })
        if (!_.isEmpty(targetParentResource)) {
          await ctx.service.adminResource.removes(
            ctx,
            targetParentResource._id,
            'parentId'
          )
          await ctx.service.adminResource.removes(
            ctx,
            targetParentResource._id
          )
        }
      }
    }
  },

  // 添加插件配置
  async initPluginConfig(this:Application, pluginInfos:any = {}, type = 'install') {
    if (!_.isEmpty(pluginInfos)) {
      const configPluginPath = path.join(
        this.config.baseDir,
        `config/ext/config/${pluginInfos.alias}.js`
      )
      const extConfigPath = path.join(
        this.config.baseDir,
        `config/ext/plugin/${pluginInfos.alias}.js`
      )
      if (type === 'install') {
        if (pluginInfos.pluginsConfig) {
          siteFunc.createFileByStr(extConfigPath, pluginInfos.pluginsConfig)
        }

        if (pluginInfos.defaultConfig) {
          siteFunc.createFileByStr(configPluginPath, pluginInfos.defaultConfig)
        }
      } else {
        if (fs.existsSync(extConfigPath)) {
          fs.unlinkSync(extConfigPath)
        }

        if (fs.existsSync(configPluginPath)) {
          fs.unlinkSync(configPluginPath)
        }
      }
    }
  },

  // // 初始化数据模型
  initExtendModel(this:Application, modelsPath) {
    fs.readdirSync(modelsPath).forEach((extendName: string) => {
      if (extendName) {
        const filePath = `${modelsPath}/${extendName}`
        if (fs.existsSync(filePath)) {
          const modelKey = path.basename(
            extendName.charAt(0).toUpperCase() + extendName.slice(1),
            '.js'
          )
          if (_.isEmpty(this.model[modelKey])) {
            const targetModel = this.loader.loadFile(filePath)
            this.model[modelKey] = targetModel
          }
        }
      }
    })
  },

  // 初始化插件路由
  async initPluginRouter(
    this:Application,
    ctx,
    pluginConfig:any = {},
    pluginManageController = {},
    pluginApiController = {},
    next = {}
  ) {
    let isFontApi = false
    let isAdminApi = false
    let targetControllerName = ''
    let targetApiItem:any = {}
    if (!_.isEmpty(pluginConfig)) {
      if (!_.isEmpty(pluginConfig)) {
        const { adminApi, fontApi } = pluginConfig

        const targetRequestUrl = ctx.request.url
        if (targetRequestUrl.indexOf('/api/') >= 0) {
          for (const fontApiItem of fontApi) {
            const { url, method, controllerName } = fontApiItem

            const targetApi = targetRequestUrl
              .replace('/api/', '')
              .split('?')[0]
            if (
              ctx.request.method === method.toUpperCase() &&
              targetApi === url &&
              controllerName
            ) {
              isFontApi = true
              targetControllerName = controllerName
              targetApiItem = fontApiItem
              break
            }
          }
        } else if (targetRequestUrl.indexOf('/manage/') >= 0) {
          for (const adminApiItem of adminApi) {
            const { url, method, controllerName } = adminApiItem

            const targetApi = targetRequestUrl
              .replace('/manage/', '')
              .split('?')[0]
            if (
              ctx.request.method === method.toUpperCase() &&
              targetApi === url &&
              controllerName
            ) {
              isAdminApi = true
              targetControllerName = controllerName
              targetApiItem = adminApiItem
              break
            }
          }
        }
      }
    }
    if (
      isAdminApi &&
      !_.isEmpty(pluginManageController) &&
      targetControllerName
    ) {
      await pluginManageController[targetControllerName](ctx, this)
    } else if (
      isFontApi &&
      !_.isEmpty(pluginApiController) &&
      targetControllerName
    ) {
      if (targetApiItem.authToken) {
        if (ctx.session.logined) {
          await pluginApiController[targetControllerName](ctx, this, next)
        } else {
          ctx.helper.renderFail(ctx, {
            message: ctx.__('label_notice_asklogin')
          })
        }
      } else {
        await pluginApiController[targetControllerName](ctx, this, next)
      }
    }
  },

  // 添加钩子
  async hooks(ctx, hooks, params = {}) {
    try {
      const targetHook = await ctx.service.hook.item(ctx, {
        query: {
          name: hooks
        },
        files: '_id'
      })

      if (!_.isEmpty(targetHook)) {
        // 暂时遍历开发环境插件列表
        // console.log('-----', app.config)
        // 通过钩子获取是哪个插件在挂载
        const plugins = await ctx.service.plugin.find(
          {
            isPaging: '0'
          },
          {
            query: {
              state: true,
              hooks
            }
          }
        )

        // console.log('--plugins--', plugins)

        if (!_.isEmpty(plugins)) {
          // let targetPluginConfig = this.config.doraValine
          // let targetHook = await ctx.service[targetPluginConfig.alias].item(ctx, {
          //     query: {
          //         name: hooks
          //     },
          //     files: '_id'
          // })
          const targetPluginConfig = plugins[0]

          const targetHtml = await this.hookRender(
            ctx,
            hooks,
            targetPluginConfig.alias,
            params
          )
          // console.log('--targetHtml--', targetHtml)
          if (targetHtml) {
            ctx.locals['HOOK@' + hooks] = targetHtml
          }
        } else {
          throw new Error(ctx.__('validate_error_params'))
        }
      } else {
        console.log('非法钩子')
      }
    } catch (error) {
      console.log('暂无插件挂载')
    }
  },

  // 插件渲染
  async hookRender(ctx, hookname, plugin, args) {
    try {
      const html = await ctx.helper.reqJsonData(
        `${plugin}/hookRender`,
        Object.assign(
          {
            hookname
          },
          args
        )
      )
      return html
    } catch (error) {
      return ''
    }
  }
}
