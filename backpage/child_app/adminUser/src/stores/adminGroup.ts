import { adminGroupList } from "@/api/adminGroup"
import _ from 'lodash'
import { defineStore } from "pinia"
import * as Interface  from '@/api/interface'
const state = {
  roleList: <Interface.GroupGetListRes><unknown>{
    pageInfo: {},
    docs: []
  },
}
export const groupStore = defineStore('group',{
  state:()=>(state),
  actions: {
    ADMINGROUP_LIST(rolelist:Interface.GroupGetListRes) {
      this.roleList = rolelist
    },
    async getAdminGroupList(params={}) {
      const [, res] = await adminGroupList(params)
      if(res) {
        this.ADMINGROUP_LIST(res)
      } 
    }
  }
})