/**
 * Created by PanJiaChen on 16/11/18.
 */
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