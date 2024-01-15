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
  lcContentTags: {
    enable: true,
    package: 'egg-lc-contenttags',
    path: path.join(__dirname, '../lib/plugin/egg-lc-contenttags')
  },
  lcContentCategory: {
    enable: true,
    package: 'egg-lc-contentcategory',
    path: path.join(__dirname, '../lib/plugin/egg-lc-contentcategory')
  },
  lcTemplateConfig: {
    enable: true,
    package: 'egg-lc-templateconfig',
    path: path.join(__dirname, '../lib/plugin/egg-lc-templateconfig')
  },
  lcContentTemp: {
    enable: true,
    package: 'egg-lc-contenttemp',
    path: path.join(__dirname, '../lib/plugin/egg-lc-contenttemp')
  },
  lcContent: {
    enable: true,
    package: 'egg-lc-content',
    path: path.join(__dirname, '../lib/plugin/egg-lc-content')
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
