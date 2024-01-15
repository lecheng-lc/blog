import request from '@root/publicMethods/request'



export function contentCategoryList(params: any) {
  return request({
    url: '/manage/contentCategory/getList',
    params,
    method: 'get'
  })
}
