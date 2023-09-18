import request from '@root/publicMethods/request'


export function adminGroupList(params: any) {
  return request({
    url: '/manage/adminGroup/getList',
    method: 'get',
    params
  })
}