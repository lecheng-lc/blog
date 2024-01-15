import { getMyTemplateList } from '@/api/contentTemplate';
import _ from 'lodash'
import { defineStore } from 'pinia';

const state = {
  formState: {
    show: false,
    edit: false,
    formData: {

    }
  },
  templateList: {
    pageInfo: {},
    docs: []
  },
  templateItemForderList: {}
}

export const templateStore = defineStore('templateStore', {
  state:()=>(state),
  actions:{
    MYTEMPLATE_LIST(templateList: any) {
      this.templateList = templateList
    },
    getMyTemplateList(params = {}) {
      getMyTemplateList(params).then((result) => {
       this.MYTEMPLATE_LIST(result)
      })
    }
  }
})