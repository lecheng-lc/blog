import {
  getInfo
} from '@/api/adminUser'
import {
  getToken} from '@root/publicMethods/auth'
import { defineStore } from 'pinia';

const state = {
  token: getToken(),
  userInfo: ""
}

export const userStore = defineStore('user', {
  state:()=>(state),
  actions:{
    SET_ADMINUSERINFO(adminUserInfo: any) {
      this.userInfo = adminUserInfo
    },
    getUserInfo(categoryList: any) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          if (!response) {
            reject('Verification failed, please Login again.')
          }
          this.SET_ADMINUSERINFO(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
})