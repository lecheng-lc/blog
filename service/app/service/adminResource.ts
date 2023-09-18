import { Service } from 'egg'
import { _list, _item, _count, _create, _update, _removes, _safeDelete } from './general'

class AdminResourceService extends Service {
  async find(
    payload:any,
    { query = {}, searchKeys = [], populate = [], files = null }:any = {}
  ) {
    const listdata = _list(this.ctx.model.AdminResource, payload, {
      query,
      searchKeys,
      populate,
      files,
      sort: {
        sortId: 1
      }
    })
    return listdata
  }

  async count(params = {}) {
    return _count(this.ctx.model.AdminResource, params)
  }

  async create(payload) {
    return _create(this.ctx.model.AdminResource, payload)
  }

  async removes(res, values, key = '_id') {
    return _removes(res, this.ctx.model.AdminResource, values, key)
  }

  async safeDelete(res, values) {
    return _safeDelete(res, this.ctx.model.AdminResource, values)
  }

  async update(res, _id, payload) {
    return _update(res, this.ctx.model.AdminResource, _id, payload)
  }

  async item(res, params = {}) {
    return _item(res, this.ctx.model.AdminResource, params)
  }
}

export default AdminResourceService
