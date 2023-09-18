import request from '@root/publicMethods/request'


export function adminResourceList(params:any) {
  return request({
    url: '/manage/adminResource/getList',
    method: 'get',
    params
  })
}
