import { Controller } from 'egg'
import adminResourceRule from '../../validate/adminResource'
import _ from 'lodash'
import siteFunc from 'app/utils/siteFunc'

class AdminResourceController extends Controller {
  async list() {
    const { ctx } = this
    try {
      const payload = ctx.query
      _.assign(payload, {
        pageSize: 1000
      })
      const adminResourceList = await ctx.service.adminResource.find(payload)

      ctx.helper.renderSuccess(ctx, {
        data: adminResourceList
      })
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }

  async listByPower() {
    const { ctx } = this
    try {
      const payload = {
        isPaging: '0'
      }
      _.assign(payload, {
        pageSize: 1000
      })
      const manageCates = await ctx.service.adminResource.find(payload, {
        files: 'api _id label enable routePath parentId type icon comments'
      })
      const adminPower = await ctx.helper.getAdminPower(ctx)
      const currentCates = await siteFunc.renderNoPowerMenus(
        manageCates,
        adminPower
      )

      ctx.helper.renderSuccess(ctx, {
        data: currentCates
      })
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }

  async alllist() {
    const { ctx } = this
    return await ctx.service.adminResource.find(
      {
        isPaging: '0'
      },
      {
        type: '1'
      }
    )
  }

  async create() {
    const { ctx } = this
    try {
      const fields = ctx.request.body || {}
      const formObj = {
        label: fields.label,
        type: fields.type,
        api: fields.api,
        parentId: fields.parentId,
        sortId: fields.sortId,
        routePath: fields.routePath,
        icon: fields.icon,
        componentPath: fields.componentPath,
        enable: fields.enable,
        comments: fields.comments
      }

      ctx.validate(adminResourceRule.form(ctx), formObj)

      if (fields.type === '0' && !fields.label) {
        formObj.label = fields.routePath
      }

      await ctx.service.adminResource.create(formObj)

      ctx.helper.renderSuccess(ctx)
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }

  async getOne() {
    const { ctx } = this
    try {
      const _id = ctx.query.id

      const targetItem = await ctx.service.adminResource.item(ctx, {
        query: {
          _id
        }
      })

      ctx.helper.renderSuccess(ctx, {
        data: targetItem
      })
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }

  async update() {
    const { ctx } = this
    try {
      const fields = ctx.request.body || {}
      const formObj = {
        label: fields.label,
        type: fields.type,
        api: fields.api,
        parentId: fields.parentId,
        sortId: fields.sortId,
        routePath: fields.routePath,
        icon: fields.icon,
        componentPath: fields.componentPath,
        enable: fields.enable,
        comments: fields.comments
      }

      ctx.validate(adminResourceRule.form(ctx), formObj)

      let oldResource
      if (fields.type === '0') {
        oldResource = await ctx.service.adminResource.item(ctx, {
          query: {
            _id: fields._id
          }
        })
        console.error('进到这里了', oldResource)
      } else {
        oldResource = await ctx.service.adminResource.item(ctx, {
          query: {
            parentId: fields.parentId,
            comments: fields.comments
          }
        })
        console.error('HHHH', oldResource)
      }

      if (!_.isEmpty(oldResource) && oldResource._id !== fields._id) {
        console.error('进到这里面了', oldResource, fields)
        throw new Error(
          ctx.__('user_action_tips_repeat', [ ctx.__('label_resourceName') ] as unknown as string)
        )
      }

      await ctx.service.adminResource.update(ctx, fields._id, formObj)

      ctx.helper.renderSuccess(ctx)
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }

  async updateParentId() {
    const { ctx } = this

    try {
      const fields = ctx.request.body || {}

      const formObj = {
        parentId: fields.parentId
      }

      const oldResource = await ctx.service.adminResource.item(ctx, {
        query: {
          label: fields.label
        }
      })

      if (!_.isEmpty(oldResource) && oldResource._id !== fields._id) {
        throw new Error(
          ctx.__('user_action_tips_repeat', [ ctx.__('label_resourceName') ] as unknown as string)
        )
      }

      await ctx.service.adminResource.update(ctx, fields._id, formObj)

      ctx.helper.renderSuccess(ctx)
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }

  async removes() {
    const { ctx } = this
    try {
      const targetIds = ctx.query.ids
      // 删除主类
      await ctx.service.adminResource.removes(ctx, targetIds)
      // 删除子类
      await ctx.service.adminResource.removes(ctx, targetIds, 'parentId')
      ctx.helper.renderSuccess(ctx)
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }
}

module.exports = AdminResourceController
