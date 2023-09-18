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
export interface GetUserInfoReq {}
export interface GetUserInfoRes {
  userName?: string
  token?: string
  logo?: string
}

// 退出登录
export interface LogoutReq {}
export interface LogoutRes {}

// 注册
export interface  GetUserSessionReq {
  state: boolean
}

interface TargetEditor {
  _id: string;
  userName: string;
  id: string;
}

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



