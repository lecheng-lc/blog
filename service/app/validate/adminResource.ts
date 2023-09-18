
import { Context } from 'egg'
const form = (ctx: Context) => {
  return {
    type: {
      type: 'string',
      required: true,
      message: ctx.__('validate_inputCorrect', [ ctx.__('label_resourceType') ] as unknown as string)
    },
    comments: {
      type: 'string',
      required: true,
      min: 2,
      max: 30,
      message: ctx.__('validate_inputCorrect', [ ctx.__('label_comments') ] as unknown as string)
    }
  }
}

export default {
  form
}
