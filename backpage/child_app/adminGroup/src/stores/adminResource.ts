import _ from 'lodash'
import { defineStore } from 'pinia';
import {
  adminResourceList,
} from '@/api/adminResource'

export function renderTreeData(result:any) {
  let newResult = result;
  let treeData = newResult.docs;
  let childArr = _.filter(treeData, (doc) => {
    return doc.parentId != '0'
  });

  for (let i = 0; i < childArr.length; i++) {
    let child = childArr[i];
    for (let j = 0; j < treeData.length; j++) {
      let treeItem = treeData[j];
      if (treeItem._id == child.parentId || treeItem.id == child.parentId) {
        if (!treeItem.children) treeItem.children = [];
        treeItem.children.push(child);
        break;
      }
    }
  }

  newResult.docs = _.filter(treeData, (doc) => {
    return doc.parentId == '0'
  });
  return newResult;
}
const state = {
  resourceList: {
    pageInfo: {},
    docs: []
  },
}

export const resourceStore = defineStore('resource', {
  state:()=>(state),
  actions:{
    ADMINRESOURCE_LIST(resourceList: any) {
      console.log(resourceList,'=222')
      this.resourceList = resourceList
    },
    getAdminResourceList(params?:any) {
      adminResourceList(params).then((result) => {
        console.error(888111)
        let treeData = renderTreeData(result.data);
        if (!_.isEmpty(treeData)) {
          this.ADMINRESOURCE_LIST(treeData)
        }
      })
    }
  }
})


