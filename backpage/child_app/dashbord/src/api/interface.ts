export interface Result {
	code: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}
export interface DoLoginReq {
  userName: string
  password: string
  imageCode: string
}
export interface DoLoginRes {
  token: string
}

// getUserInfo 获取用户信息
export interface GetSitBasicInfoReq {}
interface RegUser {
  _id: string;
  enable: boolean;
  idType: string;
  comments: string;
  introduction: string;
  logo: string;
  group: string;
  birth: string;
  gender: string;
  despises: string[];
  despiseMessage: string[];
  favorites: string[];
  praiseContents: string[];
  praiseMessages: string[];
  state: string;
  followers: string[];
  watchers: string[];
  watchTags: string[];
  loginActive: boolean;
  userName: string;
  password: string;
  date: string;
  __v: number;
  id: string;
}

export interface GetSitBasicInfoRes {
  adminUserCount: number;
  regUserCount: number;
  contentCount: number
  messageCount: number
  regUsers: RegUser[];
  resources: any
  messages: any
}

// 获取用户信息
export interface GetClientNoticeReq {
  state?: boolean
}
interface PowerGroup {
  _id: string;
  name: string;
  power: string[];
  enable: boolean;
}

interface TargetEditor {
  _id: string;
  userName: string;
  id: string;
}

interface UserInfo {
  _id: string;
  userName: string;
  password: string;
  group: PowerGroup;
  email: string;
  logo: string;
  enable: boolean;
  targetEditor: TargetEditor;
}
interface DataItem {
  _id: string;
  version: string;
  source: string;
  mongoshell: string;
  filesInfo: string;
  description: string;
  createTime: string;
  __v: number;
  updateTime: string;
  id: string;
}
export type  GetClientNoticeRes = DataItem[]

export interface GetVersionMaintenanceInfoReq {
  isPaging?: number
}
export type GetVersionMaintenanceInfoRes = DataItem[]


interface Group {
  _id: string;
  name: string;
  power: string[];
  enable: boolean;
}

interface UserInfo {
  _id: string;
  userName: string;
  password: string;
  group: Group;
  email: string;
  logo: string;
  enable: boolean;
  targetEditor: TargetEditor;
}

export interface GetUserSessionRes {
  noticeCounts: number;
  loginState: boolean;
  userInfo: UserInfo;
}

export interface GetUserSessionReq {
  userInfo: any
  state: boolean
}

export interface GetListByPower {
  alwaysShow: boolean;
  path: string;
  hidden: boolean;
  icon: string;
  name: string;
  children?: GetListByPower[];
  api: string;
  redirect: string;
  meta: {
    title: string;
    icon: string;
  }
}



