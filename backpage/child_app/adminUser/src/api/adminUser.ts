import request from '@root/publicMethods/request'


export function adminUserList(params:any) {
  return request({
    url: '/manage/adminUser/getList',
    method: 'get',
    params
  })
}

export function getOneAdminUser(params:any) {
  return request({
    url: '/manage/adminUser/getOne',
    method: 'get',
    params
  })
}

export function addAdminUser(data:any) {
  return request({
    url: '/manage/adminUser/addOne',
    method: 'post',
    data
  })
}

export function updateAdminUser(data: any) {
  return request({
    url: '/manage/adminUser/updateOne',
    method: 'post',
    data
  })
}

export function deleteAdminUser(params: any) {
  return request({
    url: '/manage/adminUser/deleteUser',
    method: 'get',
    params
  })
}