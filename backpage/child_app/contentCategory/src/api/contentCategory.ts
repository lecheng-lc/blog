import request from '@root/publicMethods/request'
import { awaitWraper } from '@root/publicMethods/common'
import * as Interface from './interface'
export function contentCategoryList(params:any) {
  return request({
    url: '/manage/contentCategory/getList',
    params,
    method: 'get'
  })
}

export function getOneContentCategory(params: any) {
  return request({
    url: '/manage/contentCategory/getOne',
    params,
    method: 'get'
  })
}

export function addContentCategory(data: any) {
  return request({
    url: '/manage/contentCategory/addOne',
    data,
    method: 'post'
  })
}

export function updateContentCategory(data: any) {
  return request({
    url: '/manage/contentCategory/updateOne',
    data,
    method: 'post'
  })
}

export function deleteContentCategory(params: any) {
  return request({
    url: '/manage/contentCategory/deleteCategory',
    params,
    method: 'get'
  })
}