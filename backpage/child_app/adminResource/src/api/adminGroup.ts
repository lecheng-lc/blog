import request from '@root/publicMethods/request'
import { awaitWraper } from '@root/publicMethods/common';
import * as Interface from './interface'
export function adminGroupList(params:Interface.GroupGetListReq) {
  return awaitWraper<Interface.GroupGetListRes>(request({
    url: '/manage/adminGroup/getList',
    method: 'get',
    params
  }))
}

export function getOneAdminGroup(params:Interface.GroupGetOneReq) {
  return awaitWraper<Interface.GroupGetOneRes>(request({
    url: '/manage/adminGroup/getOne',
    method: 'get',
    params
  }))
}

export function addAdminGroup(data:Interface.GroupAddOneReq) {
  return awaitWraper<Interface.GroupAddOneRes>(request({
    url: '/manage/adminGroup/addOne',
    method: 'post',
    data
  }))
}

export function updateAdminGroup(data:Interface.GroupUpdateOneReq) {
  return awaitWraper<Interface.GroupUpdateOneRes>(request({
    url: '/manage/adminGroup/updateOne',
    method: 'post',
    data
  }))
}

export function deleteAdminGroup(params:Interface.GroupDeleteGroupReq) {
  return awaitWraper<Interface.GroupDeleteGroupRes>(request({
    url: '/manage/adminGroup/deleteGroup',
    method: 'get',
    params
  }))
}