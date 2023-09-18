import { Context } from 'egg'
const form = (ctx: Context) => {
  return {
    siteEmailServer: {
      type: 'string',
      required: true,
      message: 'invite email server'
    },
    siteEmail: {
      type: 'email',
      required: true,
      message: ctx.__('validate_inputCorrect', [ ctx.__('label_user_email') ] as unknown as string)
    },
    siteName: {
      type: 'string',
      required: true,
      min: 5,
      max: 100,
      message: ctx.__('validate_inputCorrect', [ ctx.__('label_sysconfig_site_name') ] as unknown as string)
    },
    siteDiscription: {
      type: 'string',
      required: true,
      min: 5,
      max: 200,
      message: ctx.__('validate_inputCorrect', [ ctx.__('label_sysconfig_site_dis') ] as unknown as string)
    },
    siteKeywords: {
      type: 'string',
      required: true,
      min: 5,
      max: 100,
      message: ctx.__('validate_inputCorrect', [ ctx.__('label_sysconfig_site_keyWords') ] as unknown as string)
    },
    siteAltKeywords: {
      type: 'string',
      required: true,
      min: 5,
      max: 100,
      message: ctx.__('validate_inputCorrect', [ ctx.__('label_sysconfig_site_tags') ] as unknown as string)
    },
    registrationNo: {
      type: 'string',
      required: true,
      min: 5,
      max: 30,
      message: ctx.__('validate_inputCorrect', [ ctx.__('label_sysconfig_site_icp') ] as unknown as string)
    },
    mongodbInstallPath: {
      type: 'string',
      required: true,
      min: 5,
      max: 300,
      message: ctx.__('validate_inputCorrect', [ ctx.__('label_sysconfig_mongoPath') ] as unknown as string)
    },
    databackForderPath: {
      type: 'string',
      required: true,
      min: 5,
      max: 300,
      message: ctx.__('validate_inputCorrect', [ ctx.__('label_sysconfig_databakPath') ] as unknown as string)
    }
  }
}

export default {
  form
}
