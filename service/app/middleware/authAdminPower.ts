/*
 * @Author: doramart
 * @Date: 2019-08-16 14:51:46
 * @Last Modified by: doramart
 * @Last Modified time: 2021-04-17 21:40:34
 * getPluginApiWhiteList接口详情如下，
 * {
  plugins: [
    'doraBackUpData',      'doraUploadFile',
    'doraRegUser',         'doraAds',
    'doraAnnounce',        'doraContent',
    'doraContentCategory', 'doraContentMessage',
    'doraContentTags',     'doraContentTemp',
    'doraHelpCenter',      'doraSiteMessage',
    'doraSystemNotify',    'doraSystemOptionLog',
    'doraTemplateConfig',  'doraVersionManage',
    'doraMiddleStage',     'doraMailTemplate',
    'doraMailDelivery',    'doraRenderCms'
  ],
  adminApiWhiteList: [
    'template/createInvoice',
    'template/checkInvoice',
    'template/getTempsFromShop',
    'singleUser/sendVerificationCode',
    'singleUser/doReg',
    'singleUser/doLogin',
    'singleUser/logOut',
    'singleUser/getUserInfo',
    'singleUser/getClientNotice',
    'singleUser/getVersionMaintenanceInfo',
    'renderCms/justdo',
    'renderCms/getProList',
    'renderCms/getAdminResources',
    'renderCms/addOnePro',
    'renderCms/getOnePro',
    'renderCms/updateOnePro',
    'renderCms/deletePro',
    'renderCms/translateWords'
  ]
}
 */
import { Application } from 'egg'
import _ from 'lodash'
export default (_options: any, app:Application) => {
  let routeWhiteList = [
    // api接口白名单，谁都可以调用
    'logout',
    'getUserSession',
    'getSitBasicInfo',
    'adminResource/getListByPower',
    'plugin/pluginHeartBeat',
    'plugin/getPluginShopList',
    'plugin/getOneShopPlugin',
    'plugin/createInvoice',
    'plugin/checkInvoice'
  ]

  return async function authAdminPower(ctx, next) {
    // 添加插件中的白名单
    const getPluginApiWhiteList = await app.getExtendApiList()
    console.log(getPluginApiWhiteList, 'getPluginApiWhiteList')
    console.log(881111)
    if (
      !_.isEmpty(getPluginApiWhiteList) &&
      !_.isEmpty(getPluginApiWhiteList.adminApiWhiteList) &&
      routeWhiteList.indexOf(
        getPluginApiWhiteList.adminApiWhiteList.join(',')
      ) < 0
    ) {
      // getPluginApiWhiteList不为 && adminApiWhiteList不为空 && @todo 第三个条件不知道为啥要这样判定
      routeWhiteList = routeWhiteList.concat(
        getPluginApiWhiteList.adminApiWhiteList
      )
    }

    const resouce = await ctx.service.adminResource.find(
      {
        isPaging: '0'
      },
      {
        query: {
          type: '1'
        },
        files: '_id api'
      }
    )
    let hasPower = false
    ctx.logger.info(routeWhiteList, '1111')
    for (let i = 0; i < resouce.length; i++) {
      const resourceObj = resouce[i]

      const targetApi = ctx.originalUrl.replace('/manage/', '').split('?')[0]

      if (!_.isEmpty(ctx.session.adminUserInfo)) {
        // 判定用户是否是否登录了
        const adminPower = await ctx.helper.getAdminPower(ctx)
        // 用户权限的id集合[xxx,xxx]
        if (
          resourceObj.api === targetApi &&
          adminPower &&
          adminPower.indexOf(resourceObj._id) > -1
        ) {
          hasPower = true
          break
        } else {
          // 没有配置但是包含在白名单内的路由校验，url中有通用路由
          if (!_.isEmpty(routeWhiteList)) {
            const checkWhiteRouter = _.filter(routeWhiteList, item => {
              if (
                item.indexOf('*') > 0 &&
                targetApi.indexOf(item.split('*')[0]) === 0
              ) {
                return true
              }
              return item === targetApi
            })
            if (!_.isEmpty(checkWhiteRouter)) {
              // console.log('解决一下')
              hasPower = true
              break
            }
          }
        }
      } else {
        break
      }
    }

    if (!hasPower) {
      // console.log('跳转到')
      ctx.helper.renderFail(ctx, {
        message: ctx.__('label_systemnotice_nopower')
      })
    } else {
      // console.log('check power success!')
      await next()
    }
  }
}
