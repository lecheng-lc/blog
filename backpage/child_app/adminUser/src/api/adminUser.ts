import request from '@root/publicMethods/request'
import * as Interface from './interface'
import { awaitWraper } from '@root/publicMethods/common'

export function adminUserList(params:Interface.UserGetListReq) {
  return awaitWraper<Interface.UserGetListRes>(request({
    url: '/manage/adminUser/getList',
    method: 'get',
    params
  }))
}

export function getOneAdminUser(params:Interface.UserGetOneReq) {
  return awaitWraper<Interface.UserGetOneRes>(request({
    url: '/manage/adminUser/getOne',
    method: 'get',
    params
  }))
}

export function addAdminUser(data:Interface.UserAddOneReq) {
  return awaitWraper<Interface.UserAddOneRes>(request({
    url: '/manage/adminUser/addOne',
    method: 'post',
    data
  }))
}

export function updateAdminUser(data: Partial<Interface.UserUpdateOneReq>) {
  return awaitWraper<Interface.UserUpdateOneRes>(request({
    url: '/manage/adminUser/updateOne',
    method: 'post',
    data
  }))
}

export function deleteAdminUser(params: Interface.UserDeleteUserReq) {
  return awaitWraper<Interface.UserDeleteUserRes>(request({
    url: '/manage/adminUser/deleteUser',
    method: 'get',
    params
  }))
}