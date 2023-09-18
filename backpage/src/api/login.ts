import request from '@root/publicMethods/request'
import { awaitWraper } from '@root/publicMethods/common'
import * as Interface from './interface' 

export function loginAdmin(data:Interface.DoLoginReq){
  return awaitWraper<Interface.DoLoginRes>(request({
    url: '/api/admin/doLogin',
    method: 'post',
    data
  }))
}