import { Context } from 'egg'

const form = (ctx: Context) => {
  return {
    name: {
      type: 'string',
      required: true,
      min: 2,
      max: 50,
      message: ctx.__('validate_error_field', [ ctx.__('label_name') ] as unknown as string)
    },
    comments: {
      type: 'string',
      required: true,
      message: ctx.__('validate_inputCorrect', [ ctx.__('label_comments') ] as unknown as string)
    }
  }
}

export default {
  form
}
