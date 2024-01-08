import request from '@root/publicMethods/request'
import { awaitWraper } from '@root/publicMethods/common'
import * as Interface from './interface'

export function adminGroupList(params: Interface.GroupGetListReq) {
  return awaitWraper<Interface.GroupGetListRes>(request({
    url: '/manage/adminGroup/getList',
    method: 'get',
    params
  }))
}