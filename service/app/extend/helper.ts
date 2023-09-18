'use strict'
import _ from 'lodash'
import Axios from 'axios'
import { IHelper } from 'egg'
import CryptoJS from 'crypto-js'
import fs from 'fs'
export default {
  /**
   * @description  请求接口
   * @param {*} url
   * @param {*} params
   * @param {*} method
   * @returns
   */

  async reqJsonData(this: IHelper, url, params = {}, method = 'get') {
    let responseData
    let targetUrl = ''
    if (url.indexOf('manage/') === 0) {
      targetUrl = this.app.config.server_path + '/' + url
    } else if (url.indexOf('http') === 0) {
      targetUrl = url
    } else {
      targetUrl = this.app.config.server_api + '/' + url
    }
    if (method === 'get') {
      // 内部请求，获取整个的配置数据
      responseData = await Axios.get(targetUrl, {
        params
      })
      // console.log('29919100', targetUrl)
    } else if (method === 'post') {
      responseData = await Axios.post(targetUrl, params)
    }
    if (
      responseData &&
      responseData.status === 200 &&
      !_.isEmpty(responseData.data) &&
      responseData.data.status === 200
    ) {
      return responseData.data.data
    }
    throw new Error(responseData.data.message)
  },
  renderSuccess(this: IHelper, ctx, { data = {}, message = '' } = {}) {
    ctx.body = {
      status: 200,
      data: data || {},
      message: message || ''
    }
    ctx.status = 200
  },
  /**
   * @description 渲染失败
   * @param {*} ctx
   * @param {*} param1
   */
  renderFail(this: IHelper, ctx, { message = '', data = {} } = {}) {
    if (message) {
      if (typeof message === 'object') {
        message = (message as any).message
      }
      ctx.body = {
        status: 500,
        message,
        data: data || {}
      }
      ctx.status = 200
    } else {
      throw new Error(message)
    }
  },
  decrypt(data, key) {
    // 密码解密
    const bytes = CryptoJS.AES.decrypt(data, key)
    return bytes.toString(CryptoJS.enc.Utf8)
  },
  // 获取当前管理员权限都有哪些
  async getAdminPower(ctx) {
    const adminUserInfo = await ctx.service.adminUser.item(ctx, {
      query: {
        _id: ctx.session.adminUserInfo._id
      },
      populate: [
        {
          path: 'group',
          select: 'power _id enable name'
        }
      ],
      files: 'group'
    })
    // console.log(adminUserInfo);
    const adminPower = adminUserInfo.group.power || {}
    // console.log(adminPower)
    // console.log('001222')
    return adminPower
  },
  deleteFolder(path) {
    // console.log("---del path--" + path);
    return new Promise<void>(resolve => {
      let files:any = []
      if (fs.existsSync(path)) {
        // console.log("---begin to del--");
        if (fs.statSync(path).isDirectory()) {
          const walk = function(path) {
            files = fs.readdirSync(path)
            files.forEach(function(file) {
              const curPath = path + '/' + file
              if (fs.statSync(curPath).isDirectory()) {
                // recurse
                walk(curPath)
              } else {
                // delete file
                fs.unlinkSync(curPath)
              }
            })
            fs.rmdirSync(path)
          }
          walk(path)
          // console.log("---del folder success----");
          resolve()
        } else {
          fs.promises.unlink(path).then((res:any) => {
            if (res) {
              console.log(res)
            } else {
              console.log('del file success');
              resolve()
            }
          })
        }
      } else {
        resolve();
      }
    });
  },
}
