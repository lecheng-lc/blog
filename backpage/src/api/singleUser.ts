import request from '@root/publicMethods/request'
import * as Interface from './interface' 
import { awaitWraper } from '@root/publicMethods/common'
export function getUserInfo(params:Interface.GetUserInfoReq = {}) {
  return awaitWraper<Interface.GetUserInfoRes>(request({
    url: '/manage/singleUser/getUserInfo',
    method: 'get',
    params
  }))
}

export function logOut(params:Interface.LogoutReq = {}) {
  return awaitWraper<Interface.LogoutRes>(request({
    url: '/manage/singleUser/logOut',
    method: 'get',
    params
  }))
}


export function addSingleUser(data:{}) {
  return awaitWraper<{}>(request({
    url: '/manage/singleUser/doReg',
    data,
    method: 'post'
  }))
}

export function loginSingleUser(data:{}) {
  return awaitWraper<{}>(request({
    url: '/manage/singleUser/doLogin',
    data,
    method: 'post'
  }))
}

export function sendVerificationCode(data:{}) {
  return awaitWraper<{}>(request({
    url: '/manage/singleUser/sendVerificationCode',
    data,
    method: 'post'
  }))
}