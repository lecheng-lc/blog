
// 通用数据模型
'use strict'
import shortid from 'shortid'
import _ from 'lodash'

// 关键操作记录日志
const _addActionUserInfo = (ctx, params = {}) => {
  let infoStr = ''

  if (!_.isEmpty(ctx.session.adminUserInfo)) {
    infoStr += 'actionUser: ' + JSON.stringify(ctx.session.adminUserInfo) + ','
  }

  if (!_.isEmpty(params)) {
    infoStr += 'actionParams: ' + JSON.stringify(params) + ','
  }

  return infoStr
}

/**
 * 通用列表
 * @method list
 * @param  {[type]} req     [description]
 * @param  {[type]} res     [description]
 * @param  {[type]} Model 数据库表模型
 * @param  {[type]} sort 排序
 * @return {[type]}
 */

export const _list = async (
  Model,
  payload,
  {
    sort = {
      date: -1
    },
    files = null,
    query = {},
    searchKeys = [],
    populate = []
  }:any = {}
) => {
  let { current, pageSize, searchkey, isPaging, skip, lean } = payload
  // current->当前页数
  // pageSize->页面显示条数
  // searchkey->查询限制条件
  // isPaging isPaging是否是分页数据
  // skip 判定是否是分页
  // lean 判定是否进行高性能查询，返回平常的js对象
  let docs = []
  let count = 0
  query = query || {};
  (current = current || 1);
  (pageSize = Number(pageSize) || 10)
  isPaging = isPaging !== '0'
  lean = lean === '1'
  const skipNum = skip ? skip : (Number(current) - 1) * Number(pageSize)
  sort = !_.isEmpty(sort)
    ? sort
    : {
      date: -1
    }
  if (searchkey) {
    // 查询条件
    if (searchKeys) {
      if (typeof searchKeys === 'object' && searchKeys.length > 0) {
        const searchStr:any = []
        for (let i = 0; i < searchKeys.length; i++) {
          const keyItem = searchKeys[i]
          searchStr.push({
            [keyItem]: {
              $regex: searchkey
            }
          })
        }
        (query as any).$or = searchStr
      } else {
        (query as any)[searchKeys as any] = {
          $regex: new RegExp(searchkey, 'i')
        }
      }
    }
  }
  if (isPaging) {
    docs = !lean
      ? await Model.find(query, files)
        .skip(skipNum)
        .limit(Number(pageSize))
        .sort(sort)
        .populate(populate) // 联合查询文档
        .exec()
      : await Model.find(query, files)
        .skip(skipNum)
        .limit(Number(pageSize))
        .sort(sort)
        .populate(populate)
        .lean()
        .exec()
  } else {
    if (payload.pageSize > 0) {
      docs = !lean
        ? await Model.find(query, files)
          .skip(skipNum)
          .limit(pageSize)
          .sort(sort)
          .populate(populate)
          .exec()
        : await Model.find(query, files)
          .skip(skipNum)
          .limit(pageSize)
          .sort(sort)
          .populate(populate)
          .lean()
          .exec()
    } else {
      docs = !lean
        ? await Model.find(query, files)
          .skip(skipNum)
          .sort(sort)
          .populate(populate)
          .exec()
        : await Model.find(query, files)
          .skip(skipNum)
          .sort(sort)
          .populate(populate)
          .lean()
          .exec()
    }
  }
  count = await Model.countDocuments(query).exec() // 查询符合条件的一共有多少条

  if (isPaging) {
    const pageInfoParams = {
      totalItems: count,
      pageSize: Number(pageSize),
      current: Number(current),
      searchkey: searchkey || '',
      totalPage: Math.ceil(count / Number(pageSize))
    }
    for (const querykey in query) {
      if (query.hasOwnProperty(querykey)) {
        const queryValue = query[querykey]
        if (typeof queryValue !== 'object') {
          _.assign(pageInfoParams, {
            [querykey]: queryValue || ''
          })
        }
      }
    }
    return {
      docs,
      pageInfo: pageInfoParams
    }
  }
  return docs
}

export const _count = async (Model, query = {}) => {
  return await Model.countDocuments(query)
}

export const _create = async (Model, payload) => {
  return await Model.create(payload)
}

/**
 * 通用单个
 * @method item
 * @param  {[type]} res [description]
 * @param  {[type]} Model [description]
 * @return {[type]}         [description]
 */

export const _item = async (
  ctx,
  Model,
  { files = null, query = {}, populate = [] }:any = {}
) => {
  if ((query as any)._id && !shortid.isValid((query as any)._id)) {
    throw new Error(ctx.__('validate_error_params'))
  }
  return await Model.findOne(query, files).populate(populate).exec()
}

/**
 * 通用删除
 * @method deletes
 * @param  {[type]}   Model [description]
 * @param  {[type]}   ids [description]
 */

export const _removes = async (ctx, Model, ids, key) => {
  if (!global.checkCurrentId(ids)) {
    throw new Error(ctx.__('validate_error_params'))
  } else {
    ids = ids.split(',')
  }

  ctx.logger.warn(
    _addActionUserInfo(ctx, {
      ids,
      key
    })
  )

  return await Model.deleteMany({
    [key]: {
      $in: ids
    }
  })
}

/**
 * 通用删除
 * @method deletes
 * @param  {[type]}   Model [description]
 */

export const _removeAll = async (Model:any) => {
  return await Model.deleteMany({})
}

/**
 * 通用删除
 * @method deletes
 * @param  {[type]}   Model [description]
 * @param  {[type]}   ids [description]
 */

export const _safeDelete = async (ctx, Model, ids, updateObj = {}) => {
  if (!global.checkCurrentId(ids)) {
    throw new Error(ctx.__('validate_error_params'))
  } else {
    ids = ids.split(',')
  }

  let queryObj:any = {
    state: '0'
  }

  if (!_.isEmpty(updateObj)) {
    queryObj = updateObj
  }

  return await Model.updateMany(
    {
      _id: {
        $in: ids
      }
    },
    {
      $set: queryObj
    }
  )
}

/**
 * 通用编辑
 * @method update
 * @param  {[type]} Model [description]
 * @param  {[type]} _id     [description]
 * @param  {[type]} data    [description]
 */

export const _update = async (ctx, Model, _id, data, query = {}) => {
  if (_id) {
    query = _.assign({}, query, {
      _id
    })
  } else {
    if (_.isEmpty(query)) {
      throw new Error(ctx.__('validate_error_params'))
    }
  }

  const user = await _item(ctx, Model, {
    query
  })

  if (_.isEmpty(user)) {
    throw new Error(ctx.__('validate_error_params'))
  }

  return await Model.findOneAndUpdate(query, {
    $set: data
  })
}

/**
 * 通用编辑
 * @method update
 * @param  {[type]} Model [description]
 * @param  {[type]} ids     [description]
 * @param  {[type]} data    [description]
 */

export const _updateMany = async (ctx, Model, ids = '', data, query = {}) => {
  if (_.isEmpty(ids) && _.isEmpty(query)) {
    throw new Error(ctx.__('validate_error_params'))
  }
  let newIds:string[] = []
  if (!_.isEmpty(ids)) {
    if (!global.checkCurrentId(ids)) {
      throw new Error(ctx.__('validate_error_params'))
    } else {
      newIds = ids.split(',')
    }
    query = _.assign({}, query, {
      _id: {
        $in: newIds
      }
    })
  }

  return await Model.updateMany(query, {
    $set: data
  })
}

/**
 * 通用数组字段添加
 * @method update
 * @param  {[type]} Model [description]
 * @param  {[type]} id     [description]
 * @param  {[type]} data    [description]
 */

export const _addToSet = async (ctx, Model, id, data, query = {}) => {
  if (_.isEmpty(id) && _.isEmpty(query)) {
    throw new Error(ctx.__('validate_error_params'))
  }

  if (!_.isEmpty(id)) {
    query = _.assign({}, query, {
      _id: id
    })
  }

  return await Model.updateMany(query, {
    $addToSet: data
  })
}

/**
 * 通用数组字段删除
 * @method update
 * @param  {[type]} Model [description]
 * @param  {[type]} id     [description]
 * @param  {[type]} data    [description]
 */

export const _pull = async (ctx, Model, id, data, query = {}) => {
  if (_.isEmpty(id) && _.isEmpty(query)) {
    throw new Error(ctx.__('validate_error_params'))
  }

  if (!_.isEmpty(id)) {
    query = _.assign({}, query, {
      _id: id
    })
  }

  return await Model.updateMany(query, {
    $pull: data
  })
}

/**
 * 通用属性加值
 * @method update
 * @param  {[type]} Model [description]
 * @param  {[type]} id     [description]
 * @param  {[type]} data    [description]
 */

export const _inc = async (ctx, Model, id, data, { query = {} } = {}) => {
  if (_.isEmpty(id) && _.isEmpty(query)) {
    throw new Error(ctx.__('validate_error_params'))
  }

  if (!_.isEmpty(id)) {
    query = _.assign(
      {},
      {
        _id: id
      },
      query
    )
  }

  return await Model.updateMany(query, {
    $inc: data
  })
}
