import { defineStore } from 'pinia'
import {
  contentTagList,
} from '@/api/contentTag';
import * as Interface from '@/api/interface'
const state = {
  formState: {
    show: false,
    edit: false,
    type: '',
    formData: {
      name: '',
      alias: '',
      comments: '',
    }
  },
  tagList: {
    pageInfo: {
      searchkey:''
    },
    docs: []
  },
}

export const contentTagStore = defineStore('contenttag', {
  state:()=>(state),
  actions: {
    CONTENTTAG_FORMSTATE(formState:any) {
      this.formState.show = formState.show;
      this.formState.edit = formState.edit;
      this.formState.type = formState.type;
      this.formState.formData = Object.assign({
        name: '',
        alias: '',
        comments: ''
      }, formState.formData);
    },
    CONTENTTAG_LIST(tagList: any) {
      this.tagList = tagList
    },
    async showContentTagForm(params = {
      edit: false,
      formData: {}
    }) {
      this.CONTENTTAG_FORMSTATE({
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideContentTagForm() {
      this.CONTENTTAG_FORMSTATE({
        show:false
      })
    },
    getContentTagList(params:{}) {
      contentTagList(params).then((result) => {
        this.CONTENTTAG_LIST(result)
      })
    } 
  }
})
