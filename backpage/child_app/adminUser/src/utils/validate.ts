
import validator from 'validator'
export function isExternal(path:string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function checkEmail(str:string) {
  return str && validator.isEmail(str);
}
// 校验用户名
export function checkUserName(str: string) {
  return /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/.test(str);
}


// 校验资源名称 必须是英文
export function checkUrl(str:string) {
  return str && validator.isURL(str);
}
// 校验中文GBK
export function checkName(str:string, min = 2, max = 6) {
  return str && validator.isLength(str, {
    min,max
  }) && /[\u4e00-\u9fa5]/.test(str);
}

// 校验密码
export function checkPwd(str:string, min = 6, max = 32) {
  return str && validator.isLength(str, {
min,max
  }) && /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,}/.test(str);
}


// 校验手机号
export function checkPhoneNum(str: string) {
  return str && validator.isNumeric(str.toString());
  // return str && validator.isMobilePhone(str.toString(), 'zh-CN');
}

// 校验QQ号
export function checkQqNum(str: string) {
  return RegExp(/^[1-9][0-9]{4,9}$/).test(str);
}
