import request from '@root/publicMethods/request'

export function loginAdmin(data:any) {
  return request({
    url: '/api/admin/doLogin',
    method: 'post',
    data
  })
}

export function getSiteBasicInfo(params:any) {
  return request({
    url: '/manage/getSitBasicInfo',
    method: 'get',
    params
  })
}

export function getUserSession(params:any) {
  return request({
    url: '/manage/getUserSession',
    method: 'get',
    params
  })
}

export function getClientNotice(params:any) {
  return request({
    url: '/manage/singleUser/getClientNotice',
    method: 'get',
    params
  })
}

export function getVersionMaintenanceInfo(params:any) {
  return request({
    url: '/manage/singleUser/getVersionMaintenanceInfo',
    method: 'get',
    params
  })
}
