import { contentCategoryList } from '@/api/contentCategory';
import _ from 'lodash'
import { renderTreeData } from '@/utils'
import { defineStore } from 'pinia';

const state = {
  formState: {
    type: 'root',
    show: false,
    edit: false,
    formData: {
      label: '',
      enable: false,
      defaultUrl: '',
      parentId: '',
      contentTemp: '',
      parentObj: '',
      sortId: 0,
      comments: '',
      type: '1',
      sImg: '',
    }
  },
  categoryList: {
    pageInfo: {},
    docs: []
  },
}

export const categoryStore = defineStore('categoryStore', {
  state:()=>(state),
  actions:{
    CONTENTCATEGORYS_FORMSTATE(formState: any) {
      this.formState.show = formState.show;
      this.formState.edit = formState.edit;
      this.formState.type = formState.type;
      this.formState.formData = Object.assign({
        name: '',
        enable: false,
        defaultUrl: '',
        parentId: '',
        parentObj: {},
        contentTemp: '',
        sortId: 0,
        comments: '',
        type: '1',
        sImg: ''
      }, formState.formData);
    },
    CONTENTCATEGORYS_LIST(categoryList: any) {
      this.categoryList = categoryList
    },
    showContentCategoryForm(params:any = {
      type: 'root',
      edit: false,
      formData: {}
    }) {
      this.CONTENTCATEGORYS_FORMSTATE({
        show: true,
        type: params.type,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideContentCategoryForm() {
      this.CONTENTCATEGORYS_FORMSTATE({
        show: false
      })
    },
    getContentCategoryList( params = {}) {
      contentCategoryList(params).then((result) => {
        let treeData = renderTreeData({
          docs: result
        })
        console.log(treeData,'----')
        this.CONTENTCATEGORYS_LIST(treeData)
      })
    }
  }
})