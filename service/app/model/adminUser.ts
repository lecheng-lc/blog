import { Application } from 'egg'
import CryptoJS from 'crypto-js'
import { nanoid } from 'nanoid'
import './adminGroup'
export default function(app: Application) {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const AdminUserSchema = new Schema({
    id: String,
    _id: {
      type: String,

      default: nanoid()
    },
    name: String,
    userName: String,
    password: {
      type: String,
      set(val) {
        return CryptoJS.AES.encrypt(val, app.config.encrypt_key).toString()
      }
    },
    email: String,
    phoneNum: String,
    countryCode: {
      type: String
    }, // 手机号前国家代码
    comments: String,
    date: {
      type: Date,
      default: Date.now
    },
    logo: {
      type: String,
      default: '/static/upload/images/defaultlogo.png'
    },
    enable: {
      type: Boolean,
      default: false
    },
    state: {
      type: String,
      default: '1' // 1正常，0删除
    },
    auth: {
      type: Boolean,
      default: false
    },
    group: {
      type: String,
      ref: 'AdminGroup' // 指向另一个表结构
    },
    targetEditor: {
      type: String,
      ref: 'User'
    }
  })
  return mongoose.model('AdminUser', AdminUserSchema, 'adminusers')
}

