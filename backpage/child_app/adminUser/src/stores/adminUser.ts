import _ from 'lodash'
import { defineStore } from 'pinia'
import {
  adminUserList,
} from '@/api/adminUser'
import * as Interface from '@/api/interface'
export type  FormState = typeof state.formState
const state = {
  formState: {
    show: false,
    edit: false,
    formData: {
      name: '',
      userName: '',
      password: '',
      confirmPassword: '',
      group: '',
      email: '',
      comments: '',
      phoneNum: '',
      countryCode: '',
      enable: false,
      logo: ''
    }
  },
  userList: <Interface.UserGetListRes><unknown>{
    pageInfo: {},
    docs: []
  },
}

export const userStore = defineStore('user', {
  state:()=>(state),
  actions:{
    ADMINUSERFORMSTATE(formState: FormState) {
      this.formState.show = formState.show;
      this.formState.edit = formState.edit;
      if (!_.isEmpty(formState.formData)) {
        console.error(formState.formData)
        this.formState.formData = formState.formData
      } else {
        this.formState.formData = {
          name: '',
          userName: '',
          password: '',
          confirmPassword: '',
          group: '',
          email: '',
          comments: '',
          phoneNum: '',
          countryCode: '',
          enable: false,
          logo: ''
        }
      }
    },
    ADMINUSERLIST(userlist:Interface.UserGetListRes) {
      this.userList = userlist
    },
    showAdminUserForm(params = {
      edit: false,
      formData: {}
    }){
      this.ADMINUSERFORMSTATE(<FormState>{
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideAdminUserForm() {
      this.ADMINUSERFORMSTATE(<FormState>{
        show: false
      })
    },
    async getAdminUserList(params = {}) {
      const  [, res] = await adminUserList(params)
      if(res) {
        this.ADMINUSERLIST(res)
      }
    }
  }
})


