import request from '@root/publicMethods/request'
import { awaitWraper } from '@root/publicMethods/common'
import * as Interface from './interface'
export function loginAdmin(data:Interface.DoLoginRes) {
  return awaitWraper<Interface.DoLoginRes>(request({
    url: '/api/admin/doLogin',
    method: 'post',
    data
  }))
}

export function getSiteBasicInfo(params:Interface.GetSitBasicInfoReq) {
  return awaitWraper<Interface.GetSitBasicInfoRes>(request({
    url: '/manage/getSitBasicInfo',
    method: 'get',
    params
  }))
}

export function getUserSession(params:Interface.GetUserSessionReq) {
  return awaitWraper<Interface.GetUserSessionRes>(request({
    url: '/manage/getUserSession',
    method: 'get',
    params
  }))
}

export function getClientNotice(params:Interface.GetClientNoticeReq) {
  return awaitWraper<Interface.GetClientNoticeRes>(request({
    url: '/manage/singleUser/getClientNotice',
    method: 'get',
    params
  }))
}

export function getVersionMaintenanceInfo(params:Interface.GetVersionMaintenanceInfoReq) {
  return awaitWraper<Interface.GetVersionMaintenanceInfoRes>(request({
    url: '/manage/singleUser/getVersionMaintenanceInfo',
    method: 'get',
    params
  }))
}
