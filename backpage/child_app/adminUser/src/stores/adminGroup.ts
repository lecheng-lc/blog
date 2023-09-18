import { adminGroupList } from "@/api/adminGroup"
import _ from 'lodash'
import { defineStore } from "pinia"
const state = {
  roleList: {
    pageInfo: {},
    docs: []
  },
}
export const groupStore = defineStore('group',{
  state:()=>(state),
  actions: {
    ADMINGROUP_LIST(rolelist:any) {
      this.roleList = rolelist
    },
    getAdminGroupList(params={}) {
      adminGroupList(params).then((result) => {
        this.ADMINGROUP_LIST(result.data)
    })
    }
  }
})