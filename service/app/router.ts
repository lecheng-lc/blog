import { Application } from 'egg'
import apiRouter from './router/api'
import homeRouter from './router/home'
import manageRouter from './router/manage'
export default (app: Application) => {
  apiRouter(app)
  homeRouter()
  manageRouter(app)
}
