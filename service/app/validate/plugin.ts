import { Context } from 'egg'

const form = (ctx: Context) => {
  return {
    name: {
      type: 'string',
      required: true,
      min: 1,
      max: 50,
      message: ctx.__('validate_error_field', [ ctx.__('label_tag_name') ] as unknown as string)
    },
    description: {
      type: 'string',
      required: true,
      min: 2,
      max: 50,
      message: ctx.__('validate_inputCorrect', [ ctx.__('label_comments') ] as unknown as string)
    }
  }
}
export default {
  form
}
