import { nanoid } from 'nanoid'
import CryptoJS from 'crypto-js'
import { Application } from 'typings/app'
export default function(app:Application) {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const SystemConfigSchema = new Schema({
    _id: {
      type: String,
      default: nanoid()
    },
    date: {
      type: Date,
      default: Date.now
    },
    siteName: {
      type: String,
      default: '前端开发俱乐部'
    },
    ogTitle: {
      type: String,
      default: ''
    },
    siteLogo: {
      type: String,
      default: '/static/themes/dorawhite/images/logo.png'
    }, // 站点logo
    siteDomain: {
      type: String,
      default: 'http://127.0.0.1'
    },
    siteDiscription: {
      type: String,
      default: '前端开发'
    },
    siteKeywords: String,
    siteAltKeywords: String,
    siteEmailServer: String,
    siteEmail: String,
    siteEmailPwd: {
      type: String,
      set(data) {
        return CryptoJS.AES.encrypt(data, app.config.encrypt_key).toString()
      }
    },
    registrationNo: {
      type: String,
      default: ''
    },
    mongodbInstallPath: String,
    databackForderPath: String,
    showImgCode: {
      type: Boolean,
      default: false
    }, // 是否显示验证码
    bakDatabyTime: {
      type: Boolean,
      default: false
    }, // 是否自动备份数据
    bakDataRate: {
      type: String,
      default: '1'
    }, // 数据备份频率
    statisticalCode: {
      type: String,
      default: ''
    } // 百度统计链接
  })
  return mongoose.model('SystemConfig', SystemConfigSchema, 'systemconfigs')
}
