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


export function getOneAdminResource(params:Interface.ResourceGetOneReq) {
  return awaitWraper<Interface.ResourceGetOneRes>(request({
    url: '/manage/adminResource/getOne',
    method: 'get',
    params
  }))
}

export function addAdminResource(data:Interface.ResourceAddOneReq) {
  return awaitWraper<Interface.ResourceAddOneReq>(request({
    url: '/manage/adminResource/addOne',
    method: 'post',
    data
  }))
}

export function updateAdminResource(data:Interface.ResourceUpdateOneReq) {
  return awaitWraper<Interface.ResourceUpdateOneRes>(request({
    url: '/manage/adminResource/updateOne',
    method: 'post',
    data
  }))
}

export function updateResourceParentId(data:Interface.ReourceUpdateParentIdReq) {
  return awaitWraper<Interface.ResourceUpdateParentIdRes>(request({
    url: '/manage/adminResource/updateParentId',
    method: 'post',
    data
  }))
}

export function deleteAdminResource(params:Interface.ResourceDeleteResourceReq) {
  return awaitWraper<Interface.ResourceDeleteResourceRes>(request({
    url: '/manage/adminResource/deleteResource',
    method: 'get',
    params
  }))
}