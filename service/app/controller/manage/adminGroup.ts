
import { Controller } from 'egg'
import adminGroupRule from '../../validate/adminGroup'

class AdminGroupController extends Controller {
  async list() {
    const { ctx } = this
    try {
      const payload = ctx.query
      const adminGroupList = await ctx.service.adminGroup.find(payload)
      ctx.helper.renderSuccess(ctx, {
        data: adminGroupList
      })
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }

  async create() {
    const { ctx } = this
    try {
      const fields = ctx.request.body || {}

      const formObj = {
        name: fields.name,
        comments: fields.comments
      }

      ctx.validate(adminGroupRule.form(ctx), formObj)
      await ctx.service.adminGroup.create(formObj)
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

      const targetUser = await ctx.service.adminGroup.item(ctx, {
        query: {
          _id
        }
      })
      ctx.helper.renderSuccess(ctx, {
        data: targetUser
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
        name: fields.name,
        comments: fields.comments,
        power: fields.power
      }

      ctx.validate(adminGroupRule.form(ctx), formObj)
      await ctx.service.adminGroup.update(ctx, fields._id, formObj)

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
      await ctx.service.adminGroup.removes(ctx, targetIds)
      ctx.helper.renderSuccess(ctx)
    } catch (err) {
      ctx.helper.renderFail(ctx, {
        message: err as string
      })
    }
  }
}

module.exports = AdminGroupController
