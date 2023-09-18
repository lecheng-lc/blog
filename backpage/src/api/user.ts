import request from '@root/publicMethods/request'
import { awaitWraper } from '@root/publicMethods/common'
import * as Interface from './interface'
export function getInfo(params :Interface.GetUserSessionReq = {state: false}) {
  return awaitWraper<Interface.GetUserSessionRes>(request({
    url: '/manage/getUserSession',
    data: params,
    method: 'get'
  }))
}

export function logout() {
  return request({
    url: '/manage/logout',
    method: 'get'
  })
}

export function getRoleResources() {
  return awaitWraper<Interface.GetListByPower[]>(request({
    url: '/manage/adminResource/getListByPower',
    method: 'get'
  }))
}