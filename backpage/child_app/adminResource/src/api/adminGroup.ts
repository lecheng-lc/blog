import request from '@root/publicMethods/request'

export function adminGroupList(params:any) {
  return request({
    url: '/manage/adminGroup/getList',
    method: 'get',
    params
  })
}

export function getOneAdminGroup(params:any) {
  return request({
    url: '/manage/adminGroup/getOne',
    method: 'get',
    params
  })
}

export function addAdminGroup(data:any) {
  return request({
    url: '/manage/adminGroup/addOne',
    method: 'post',
    data
  })
}

export function updateAdminGroup(data:any) {
  return request({
    url: '/manage/adminGroup/updateOne',
    method: 'post',
    data
  })
}

export function deleteAdminGroup(params:any) {
  return request({
    url: '/manage/adminGroup/deleteGroup',
    method: 'get',
    params
  })
}