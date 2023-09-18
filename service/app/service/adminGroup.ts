
import { Service } from 'egg'
import {
  _list,
  _item,
  _count,
  _create,
  _update,
  _removes,
  _safeDelete
} from './general'

class AdminGroupService extends Service {
  async find(
    payload,
    { query = {}, searchKeys = [], populate = [], files = null } = {}
  ) {
    const listdata = _list(this.ctx.model.AdminGroup, payload, {
      query,
      searchKeys,
      populate,
      files
    })
    return listdata
  }

  async count(params = {}) {
    return _count(this.ctx.model.AdminGroup, params)
  }

  async create(payload) {
    return _create(this.ctx.model.AdminGroup, payload)
  }

  async removes(res, values, key = '_id') {
    return _removes(res, this.ctx.model.AdminGroup, values, key)
  }

  async safeDelete(res, values) {
    return _safeDelete(res, this.ctx.model.AdminGroup, values)
  }

  async update(res, _id, payload) {
    return _update(res, this.ctx.model.AdminGroup, _id, payload)
  }

  async item(res, params = {}) {
    return _item(res, this.ctx.model.AdminGroup, params)
  }
}

export default AdminGroupService
