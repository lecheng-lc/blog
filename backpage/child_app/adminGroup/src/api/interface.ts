export interface Result {
	code: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}
// 获取角色列表
export interface GroupGetListReq {
}
export interface PowerGroup {
  _id: string;
  name: string;
  power: string[];
  date: string;
  __v: number;
  comments: string;
  enable?: boolean; // 可选字段，根据数据可能存在或不存在
}

export interface PageInfo {
  totalItems: number;
  pageSize: number;
  current: number;
  searchkey: string;
  totalPage: number;
}
export interface GroupGetListRes {
  docs: PowerGroup[];
  pageInfo: PageInfo;
}

// 获取当前角色信息
export interface GroupGetOneReq {
  id: string
} 
export interface GroupGetOneRes {
    _id: string;
    name: string;
    power: string[];
    date: string;
    enable?: boolean;
    comments: string;
    __v: number;
}
// 删除角色
export interface GroupDeleteGroupReq {
  ids: string
}
export interface GroupDeleteGroupRes{
}

// 更新角色
export interface GroupUpdateOneReq {
  comments: string
  date?: string
  enable: boolean
  name: string
  power: string[]
  __v?: string
  _id?: string
}
export interface GroupUpdateOneRes {

}
// 删除角色
export interface GroupAddOneReq {
  comments: string
  enable: boolean
  name:string
  power:string[]
}
export interface GroupAddOneRes {
  
}
// 获取资源列表
export interface ResourceGetListReq {

}
interface ResourceDocs {
  children?: ResourceDocs[];
  id: string;
  _id: string;
  isExt: boolean;
  enable: boolean;
  sortId: number;
  label: string;
  type: string;
  api: string;
  parentId: string;
  routePath: string;
  icon: string;
  componentPath: string;
  comments: string;
  date: string;
  __v: number;
}

interface ReSourcePageInfo {
  totalItems: number;
  pageSize: number;
  current: number;
  searchkey: string;
  totalPage: number;
}
export interface ResourceGetListRes {
  pageInfo: ReSourcePageInfo
  docs: ResourceDocs[]
}