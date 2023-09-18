
import validator from 'validator'
export function isExternal(path:string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function checkEmail(str:string) {
  return str && validator.isEmail(str);
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