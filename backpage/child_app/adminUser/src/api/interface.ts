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

// ----------------------------------------------------------------
// 获取用户列表
export interface  UserGetListReq {}
interface UserGroup {
  _id: string;
  name: string;
}

interface UserInfo {
  _id: string;
  userName: string;
  name: string;
  email: string;
  phoneNum: string;
  group: UserGroup;
  comments: string;
  enable: boolean;
  logo?: string;
  date: string;
  auth: boolean;
  state: string;
  countryCode: string;
  targetEditor?: string;
}

interface UserPageInfo {
  totalItems: number;
  pageSize: number;
  current: number;
  searchkey: string;
  totalPage: number;
  state: string;
}
export interface UserGetListRes {
  docs: UserInfo[];
  pageInfo: UserPageInfo;
}

// 获取单个用户详情
export  interface UserGetOneReq {
  id: string
}
interface UserAddGroup {
  _id: string;
  name: string;
  power: string[];
}

export interface UserGetOneRes{
  _id: string;
  logo: string;
  enable: boolean;
  state: string;
  auth: boolean;
  userName: string;
  name: string;
  email: string;
  phoneNum: string;
  countryCode: string;
  group: UserAddGroup;
  comments: string;
  date: string;
  __v: number;
}

// 删除单个用户
export interface UserDeleteUserReq {
 ids: string
}
export  interface UserDeleteUserRes {

}

// 更新单个用户
interface UserUpdateGroup {
  _id: string;
  name: string;
}

export interface UserUpdateOneReq {
  _id: string;
  userName: string;
  name: string;
  email: string;
  phoneNum: string;
  group: UserUpdateGroup;
  comments: string;
  enable: boolean;
  logo: string;
  date: string;
  auth: boolean;
  state: string;
  countryCode: string;
  targetEditor: string;
  __v: number;
}
export interface UserUpdateOneRes {}


// 添加单个用户
export interface UserAddOneReq {
  comments: string;
  confirmPassword: string;
  countryCode: string;
  email: string;
  enable: boolean;
  group: string; // Assuming the group is represented by its ID
  name: string;
  password: string;
  phoneNum: string;
  userName: string;
}
export interface UserAddOneRes {

}
