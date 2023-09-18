import { EggPlugin } from 'egg'
import path from 'path'

const plugin: EggPlugin = {
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  },
  validate: {
    enable: true,
    package: 'egg-lc-validate',
    path: path.join(__dirname, '../lib/plugin/egg-lc-validate')
  },
  lcMiddleStage: {
    enable: true,
    package: 'egg-lc-middlestage',
    path: path.join(__dirname, '../lib/plugin/egg-lc-middlestage')
  },
  lcRegUser: {
    enable: true,
    package: 'egg-lc-reguser',
    path: path.join(__dirname, '../lib/plugin/egg-lc-reguser')
  },
  lcBackUpData: {
    enable: true,
    package: 'egg-lc-backupdata',
    path: path.join(__dirname, '../lib/plugin/egg-lc-backupdata')
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  },
  lcUploadFile: {
    enable: true,
    package: 'egg-lc-uploadfile',
    path: path.join(__dirname, '../lib/plugin/egg-lc-uploadfile')
  }
}

export default plugin
