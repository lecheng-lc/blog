import { defineStore } from 'pinia'
import { getBakDataList } from '@/api/backup'
const state = {
  bakDataList: {
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
    BAKUPDATA_LIST(list:any) {
      this.bakDataList = list || []
    },
    getBakDateList(params = {}) {
      getBakDataList(params).then((result) => {
        this.BAKUPDATA_LIST(result.data) 
      })
    }
  }
})
