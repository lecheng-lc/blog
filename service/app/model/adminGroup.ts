import { Application } from 'egg'
import { nanoid } from 'nanoid'
import './adminResource'
export default function(app:Application) {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const AdminGroupSchema = new Schema({
    _id: {
      type: String,
      default: nanoid()
    },
    name: String,
    power: [
      {
        type: String,
        ref: 'AdminResource' // 这句话是错误的 当populate中的下一个表名，没有具体指到某个表的某些字段的时候，就只会查id值
      }
    ],
    date: {
      type: Date,
      default: Date.now
    },
    comments: String
  })
  return mongoose.model('AdminGroup', AdminGroupSchema, 'admingroups')
}
