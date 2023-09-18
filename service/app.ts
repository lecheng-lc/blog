import path from 'path'
import Cache from 'js-cache'
import { Application } from 'egg'
class AppBootHook {
  app: Application
  constructor(app) {
    this.app = app
    this.app.config.coreMiddleware.unshift('staticHeader')
  }

  beforeStart() {
    this.app.runSchedule('backup_data') // 进行数据备份
  }

  configWillLoad() {
    // 在配置文件加载之前执行
    this.app.loader.loadFile(
      // 用于加载文件的方法
      path.join(this.app.config.baseDir, 'app/bootstrap/global')
    )
  }

  async willReady() {
    // 请将你的应用项目中 app.beforeStart 中的代码置于此处。
  }

  async didReady() {
    const _theApp:any = this.app
    _theApp.cache = new Cache() // 创建全局的js缓存
    // 缓存设置
    _theApp.messenger.on('refreshCache', by => {
      _theApp.logger.info('start update by %s', by)
      const ctx = _theApp.createAnonymousContext()
      // ctx.runInBackground()
      // 有些时候，我们再处理完用户请求后，希望立即阿返回相应，但同时需要执行一些异步操作，不阻塞当前请求
      ctx.runInBackground(async () => {
        const { key, value, time } = by
        _theApp.cache.set(key, value, time)
      })
    })
    // 缓存清除，进程之间进行通讯
    _theApp.messenger.on('clearCache', (by:any) => {
      _theApp.logger.info('start clear by %s', by)
      const ctx = _theApp.createAnonymousContext()
      ctx.runInBackground(async () => {
        const { key } = by
        key && _theApp.cache.del(key)
      })
    })
    // 应用初始化
    // const thisCtx = this.app.createAnonymousContext()
    // this.app.init(thisCtx)
  }
}

export default AppBootHook
