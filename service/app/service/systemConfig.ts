'use strict'
import { Service } from 'egg'

import { _list, _item, _count, _create, _update, _removes, _safeDelete } from './general'
export class SystemConfigService extends Service {
  async find(
    payload,
    { query = {}, searchKeys = [], populate = [], files = null }:any = {}
  ) {
    console.log(this.ctx.model, '111看下this')
    const listdata = _list(this.ctx.model.SystemConfig, payload, {
      query,
      searchKeys,
      populate,
      files
    })
    return listdata
  }

  async count(params = {}) {
    return _count(this.ctx.model.SystemConfig, params)
  }

  async create(payload) {
    return _create(this.ctx.model.SystemConfig, payload)
  }

  async removes(res, values, key = '_id') {
    return _removes(res, this.ctx.model.SystemConfig, values, key)
  }

  async safeDelete(res, values) {
    return _safeDelete(res, this.ctx.model.SystemConfig, values)
  }

  async update(res, _id, payload) {
    return _update(res, this.ctx.model.SystemConfig, _id, payload)
  }

  async item(res, params = {}) {
    return _item(res, this.ctx.model.SystemConfig, params)
  }
}

export default SystemConfigService
