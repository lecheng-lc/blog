import { defineStore } from 'pinia'
import { getBakDataList } from '@/api/backup'
import * as Interface from '@/api/interface'
const state = {
  bakDataList: <Interface.GetBakListRes><unknown>{
    pageInfo: {
      searchkey: '',
      state: '',
      user: ''
    },
    docs: []
  }
}

export const backupStore = defineStore('backup', {
  state:()=>(state),
  actions: {
    BAKUPDATA_LIST(list:Interface.GetBakListRes) {
      this.bakDataList = list
    },
    async getBakDateList(params = {}) {
      const [, res] = await  getBakDataList(params)
      if(res) {
        this.BAKUPDATA_LIST(res) 
      }
    }
  }
})
