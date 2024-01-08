import { Application, EggAppConfig, PowerPartial } from 'egg'
import path from 'path'

export default (appInfo: Application) => {
  const config: PowerPartial<EggAppConfig> = {}
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/doracms2',
      options: {
      }
    }
  }
  config.admin_root_path = 'http://localhost'
  // 'dashbord',
  config.dev_module = [
    'backUpData',
    'adminGroup',
    'adminResource',
    'adminUser',
    'contentTags'
  ]
  // 设置静态服务器资源路径
  config.static = {
    prefix: '/static',
    dir: [
      path.join(appInfo.baseDir, 'app/public'),
      path.join(appInfo.baseDir, '../backpage/dist')
    ],
    maxAge: 31536000
  }
  // 服务器请求资源路径
  config.server_path = 'http://127.0.0.1:8089'
  // 服务器api路径
  config.server_api = 'http://127.0.0.1:8089/api'
  return config
}
