import _ from 'lodash'
import { logOut, getUserInfo } from '@/api/singleUser'
import { getToken, setToken, removeToken } from '@root/publicMethods/auth'
import { defineStore } from 'pinia'
import { type GetUserInfoRes } from '@/api/interface'
interface FormState {
  messageInfo: any
  show: boolean,
  edit: boolean,
  formData: {},
  regFormData: any
}

interface StateObj {
  token: string | undefined
  userInfo: GetUserInfoRes
  name: string
  avatar: string
  formState: FormState
}
const state:StateObj = {
  token: getToken('1'),
  userInfo: <GetUserInfoRes>{},
  name: '',
  avatar: '',
  formState: {
    show: false,
    edit: false,
    formData: {
      messageInfo: {}
    },
    regFormData: {},
    messageInfo: undefined
  }
}
export const singleUserStore = defineStore('singleUser', {
  state: () => (state),
  actions: {
    SINGLEUSER_INFO(userInfo: GetUserInfoRes) {
      this.userInfo = userInfo
    },
    SINGLEUSER_SET_TOKEN(token: string) {
      this.token = token
    },
    SINGLEUSER_SET_NAME(name: string = '') {
      this.name = name
    },
    SINGLEUSER_SET_AVATAR(avatar: string) {
      this.avatar = avatar
    },
    SINGLEUSER_FORMSTATE(params: Partial<FormState> = {
      edit: false,
      messageInfo: {},
      formData: {},
      regFormData: {},
      show: false
    }) {
      if(state.formState) {
        this.formState.show = params.show!
        this.formState.edit = params.edit!
      }
      
      this.formState.messageInfo = params.messageInfo
      state.formState.formData = Object.assign({
      },params.formData)
      state.formState.regFormData = Object.assign({
      }, params.regFormData)
    },
    showSingleUserForm(params = {
      show: true,
      edit: false,
      messageInfo: {},
      formData: {},
      regFormData: {}
    }) {
      this.SINGLEUSER_FORMSTATE(params)
    },
    hideSingleUserForm() {
      this.SINGLEUSER_FORMSTATE({ show: false })
    },
    setUserInfo(params: { userInfo:  GetUserInfoRes}) {
      if (!_.isEmpty(params.userInfo)) {
        this.SINGLEUSER_SET_NAME(params.userInfo.userName!)
        this.SINGLEUSER_SET_AVATAR(params.userInfo.userName!)
        this.SINGLEUSER_SET_TOKEN(params.userInfo.token!)
        setToken(params.userInfo.token, '1')
        console.log('咋说', params)
        this.SINGLEUSER_INFO(params.userInfo)
      }
    },
    async getUserInfo() {
      try {
        const [, res] = await getUserInfo({ singleUserToken: state.token })
        if (!_.isEmpty(res)) {
          const { userName, logo } = res
          this.SINGLEUSER_INFO(res)
          this.SINGLEUSER_SET_NAME(userName)
          this.SINGLEUSER_SET_AVATAR(logo!)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async logOut() {
      try {
        await logOut({ singleUserToken: state.token })
        this.SINGLEUSER_SET_TOKEN('')
        this.SINGLEUSER_INFO({})
        removeToken('1')
      } catch (error) {
        console.log(error)
      }
    }
  }
})
