import {
  contentCategoryList
} from '@/api/contentCategory'
import _ from 'lodash'
import { defineStore } from 'pinia'
import {
  renderTreeData
} from '@/utils';


const state = {
  categoryList: {
    pageInfo: {},
    docs: []
  },
}

export const categoryStore = defineStore('category', {
  state:()=>(state),
  actions:{
    CONTENTCATEGORYS_LIST(categoryList: any) {
      this.categoryList = categoryList
    },
    getContentCategoryList(params?: any) {
      contentCategoryList(params).then((result) => {
        let treeData = renderTreeData({
          docs: result
        });
        this.CONTENTCATEGORYS_LIST(treeData)
      })
    },
  }
})