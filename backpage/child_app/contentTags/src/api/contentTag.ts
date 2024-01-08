import request from '@root/publicMethods/request'
import { awaitWraper } from '@root/publicMethods/common'
import * as Interface from './interface'

export function contentTagList(params:any) {
  return request({
    url: '/manage/contentTag/getList',
    params,
    method: 'get'
  })
}

export function getOneContentTag(params:any) {
  return request({
    url: '/manage/contentTag/getOne',
    params,
    method: 'get'
  })
}

export function addContentTag(data:any) {
  return request({
    url: '/manage/contentTag/addOne',
    data,
    method: 'post'
  })
}

export function updateContentTag(data:any) {
  return request({
    url: '/manage/contentTag/updateOne',
    data,
    method: 'post'
  })
}

export function deleteContentTag(params:any) {
  return request({
    url: '/manage/contentTag/deleteTag',
    params,
    method: 'get'
  })
}