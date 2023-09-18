
import { Controller } from 'egg'
export default class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = {
      status: 200,
      data: 22,
      message: 222
    }
  }
}
