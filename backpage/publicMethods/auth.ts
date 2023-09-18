import Cookies from 'js-cookie'
import settings from '@root/publicMethods/settings'
function getCookie(key:string){
  // 1.获取所有cookie
  const strC = document.cookie;
  // 2.使用"; "分隔所有的cookie，单独拿到每一条
  const arrC = strC.split("; ");
  // 3.遍历每一条cookie
  for(let i = 0;i<arrC.length;i++){
    // 4.在此使用"="分隔，分隔成 名字和值的独立的状态
    // 5.判断数组的第一位的名字时否与传进来的获取的cookie的名字一致
    if(arrC[i].split("=")[0] === key){
      // 6.如果一致，返回数组的第二位，也就是对应的值
      return arrC[i].split("=")[1];
    }
  }
  // 7.循环结束后，如果程序还在执行，说明没有找到一致的值，那就返回空字符
  return "";
}
const TokenKey = settings.token_key;
const AdminVipTokenKey = settings.admin_token_key;
// type:0 后管  1: cms中台
export function getToken(type = '0') {
  const currentTokenKey = type == '0' ? TokenKey : AdminVipTokenKey
  return Cookies.get(currentTokenKey)
}

export function setToken(token:string = '', type:string = '0') {
  console.error('hahaha')
  const currentTokenKey = type == '0' ? TokenKey : AdminVipTokenKey
  return Cookies.set(currentTokenKey, token)
}

export function removeToken(type = '0') {
  console.error('jinqule')
  const currentTokenKey = type == '0' ? TokenKey : AdminVipTokenKey
  return Cookies.remove(currentTokenKey)
}