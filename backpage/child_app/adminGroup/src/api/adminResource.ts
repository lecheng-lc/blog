import request from '@root/publicMethods/request'
import { awaitWraper } from '@root/publicMethods/common'
import * as Interface from './interface'
export function adminResourceList(params:Interface.ResourceGetListReq) {
  return awaitWraper<Interface.ResourceGetListRes>(request({
    url: '/manage/adminResource/getList',
    method: 'get',
    params
  }))
}
