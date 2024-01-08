export interface Result {
	code: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}

// 获取备份数据列表
export interface GetBakListReq {
}
interface BackupInfo {
  _id: string;
  logs: string;
  path: string;
  fileName: string;
  date: string;
  __v: number;
  id: string;
}

interface PageInfo {
  totalItems: number;
  pageSize: number;
  current: number;
  searchkey: string;
  totalPage: number;
}
export interface GetBakListRes {
  docs: BackupInfo[];
  pageInfo: PageInfo;
}

// 备份数据
export interface BackUpReq {}
export interface BackUpRes {}

// 恢复数据
export interface ResStoreReq {
  id: string
}
export interface ResStoreRes {}

// 删除数据项
export interface DeleteDataItemReq {}
export interface DeleteDataItemRes {}