import {
  contentTagList,
} from '@/api/contentTag';
import _ from 'lodash'
import { defineStore } from 'pinia'


const state = {

  tagList: {
    pageInfo: {},
    docs: []
  },

}

export const tagStore = defineStore('tag', {
  state:()=>(state),
  actions:{
    CONTENTTAG_LIST(tagList: any) {
      this.tagList = tagList
    },
    getContentTagList(params: any) {
      contentTagList(params).then((result) => {
        this.CONTENTTAG_LIST(result)
      })
    },
  }
})