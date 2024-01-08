import request from '@root/publicMethods/request'
import { awaitWraper } from '@root/publicMethods/common'
import * as Interface from './interface'

export function getBakDataList(params: Interface.GetBakListReq) {
  return awaitWraper<Interface.GetBakListRes>(request({
    url: '/manage/backupDataManage/getBakList',
    method: 'get',
    params
  }))
}

export function bakUpCMSData(data?:Interface.BackUpReq) {
  return awaitWraper<Interface.BackUpRes>(request({
    url: '/manage/backupDataManage/backUp',
    method: 'post',
    data
  }))
}

export function restoreCMSData(data:Interface.ResStoreReq) {
  return awaitWraper<Interface.ResStoreRes>(request({
    url: '/manage/backupDataManage/restore',
    method: 'post',
    data
  }))
}

export function deletetBakDataItem(params:Interface.DeleteDataItemReq) {
  return awaitWraper<Interface.DeleteDataItemRes>(request({
    url: '/manage/backupDataManage/deleteDataItem',
    method: 'get',
    params
  }))
}