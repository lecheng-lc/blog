import request from '@root/publicMethods/request'


export function contentTagList(params: any) {
  return request({
    url: '/manage/contentTag/getList',
    params,
    method: 'get'
  })
}
