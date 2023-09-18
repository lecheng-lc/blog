import request from '@root/publicMethods/request'

export function getBakDataList(params: any) {
  return request({
    url: '/manage/backupDataManage/getBakList',
    method: 'get',
    params
  })
}

export function bakUpCMSData(data?:any) {
  return request({
    url: '/manage/backupDataManage/backUp',
    method: 'post',
    data
  })
}

export function restoreCMSData(data:any) {
  return request({
    url: '/manage/backupDataManage/restore',
    method: 'post',
    data
  })
}

export function deletetBakDataItem(params:any) {
  return request({
    url: '/manage/backupDataManage/deleteDataItem',
    method: 'get',
    params
  })
}