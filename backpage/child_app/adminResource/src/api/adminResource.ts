import request from '@root/publicMethods/request'


export function adminResourceList(params:any) {
  return request({
    url: '/manage/adminResource/getList',
    method: 'get',
    params
  })
}


export function getOneAdminResource(params:any) {
  return request({
    url: '/manage/adminResource/getOne',
    method: 'get',
    params
  })
}

export function addAdminResource(data:any) {
  return request({
    url: '/manage/adminResource/addOne',
    method: 'post',
    data
  })
}

export function updateAdminResource(data:any) {
  return request({
    url: '/manage/adminResource/updateOne',
    method: 'post',
    data
  })
}

export function updateResourceParentId(data:any) {
  return request({
    url: '/manage/adminResource/updateParentId',
    method: 'post',
    data
  })
}

export function deleteAdminResource(params:any) {
  return request({
    url: '/manage/adminResource/deleteResource',
    method: 'get',
    params
  })
}