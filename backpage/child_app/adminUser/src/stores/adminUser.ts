import _ from 'lodash'
import { defineStore } from 'pinia';
import {
  adminUserList,
} from '@/api/adminUser'

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
    }
  },
  userList: {
    pageInfo: {},
    docs: []
  },
}

export const userStore = defineStore('user', {
  state:()=>(state),
  actions:{
    ADMINUSERFORMSTATE(formState:any) {
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
        }
      }
    },
    ADMINUSERLIST(userlist:any) {
      this.userList = userlist
    },
    showAdminUserForm(params = {
      edit: false,
      formData: {}
    }){
      console.error(12345678)
      this.ADMINUSERFORMSTATE({
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideAdminUserForm() {
      this.ADMINUSERFORMSTATE({
        show: false
      })
    },
    getAdminUserList(params = {}) {
      adminUserList(params).then(result=>{
        this.ADMINUSERLIST(result.data)
      })
    }
  }
})


