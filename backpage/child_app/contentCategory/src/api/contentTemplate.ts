import request from '@root/publicMethods/request'
import { awaitWraper } from '@root/publicMethods/common'
import * as Interface from './interface'
export function getMyTemplateList(params: any) {
  return request({
    url: '/manage/template/getMyTemplateList',
    params,
    method: 'get'
  })
}