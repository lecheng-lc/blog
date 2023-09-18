import {
  adminResourceList,
} from '@/api/adminResource'
import _ from 'lodash'
import { defineStore } from 'pinia';


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
  formState: {
    type: 'root',
    show: false,
    edit: false,
    formData: {
      label: '',
      type: '',
      api: '',
      icon: '',
      routePath: '',
      componentPath: '',
      enable: true,
      parentId: '',
      sortId: 0,
      comments: '',
      parent: {
        id: '',
        label: ''
      }
    }
  },
  selectFormState: {
    type: 'root',
    show: false,
    edit: false,
    formData: {
      parentId: ''
    }
  },
  resourceList: {
    pageInfo: {},
    docs: []
  },
}
export const resourceStore = defineStore('resource', {
  state: ()=>(state),
  actions:{
    ADMINRESOURCE_LIST(resourceList:any) {
      this.resourceList = resourceList
    },
    ADMINRESOURCE_FORMSTATE(formState:any) {
      this.formState.show = formState.show;
      this.formState.edit = formState.edit;
      this.formState.type = formState.type;
      this.formState.formData = Object.assign({
        label: '',
        type: '',
        api: '',
        icon: '',
        routePath: '',
        componentPath: '',
        enable: true,
        parentId: '',
        sortId: 0,
        comments: '',
        parent: {
          id: '',
          label: ''
        }
      }, formState.formData);
    },
    ADMINSELECTRESOURCE_FORMSTATE(formState:any) {
      this.selectFormState.show = formState.show;
      this.selectFormState.edit = formState.edit;
      this.selectFormState.type = formState.type;
      this.selectFormState.formData = Object.assign({
        parentId: ''
      }, formState.formData);
    },
    showAdminResourceForm(params:any = {
      type: 'root',
      edit: false,
      formData: {}
    }) {
      this.ADMINRESOURCE_FORMSTATE({
        show: true,
        type: params.type,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideAdminResourceForm(){
      this.ADMINRESOURCE_FORMSTATE({
        show: false
      })
    },
    getAdminResourceList(params={}) {
      adminResourceList(params).then((result) => {
        let treeData = renderTreeData(result.data);
        if (!_.isEmpty(treeData)) {
          this.ADMINRESOURCE_LIST(treeData)
        }
      })
    },
    showAdminSelectResourceForm( params = {
      type: 'root',
      edit: false,
      formData: {}
    }) {
      this.ADMINSELECTRESOURCE_FORMSTATE({
        show: true,
        type: params.type,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideAdminSelectResourceForm() {
      this.ADMINSELECTRESOURCE_FORMSTATE({
       show: false
      })
    }
  },
})