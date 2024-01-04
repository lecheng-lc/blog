import {
  adminResourceList,
} from '@/api/adminResource'
import _ from 'lodash'
import { defineStore } from 'pinia'
import * as Interface from '@/api/interface'

export function renderTreeData(result:Interface.ResourceGetListRes) {
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
  resourceList: <Interface.ResourceGetListRes><unknown>{
    pageInfo: {},
    docs: []
  },
}
export type  FormState = typeof state.formState
export const resourceStore = defineStore('resource', {
  state: ()=>(state),
  actions:{
    ADMINRESOURCE_LIST(resourceList: Interface.ResourceGetListRes) {
      this.resourceList = resourceList
    },
    ADMINRESOURCE_FORMSTATE(formState:FormState) {
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
    ADMINSELECTRESOURCE_FORMSTATE(formState:FormState) {
      this.selectFormState.show = formState.show;
      this.selectFormState.edit = formState.edit;
      this.selectFormState.type = formState.type;
      this.selectFormState.formData = Object.assign({
        parentId: ''
      }, formState.formData);
    },
    showAdminResourceForm(params: FormState = {
      type: 'root',
      edit: false,
      formData: {
        label: '',
        type: '',
        api: '',
        icon: '',
        routePath: '',
        componentPath: '',
        enable: false,
        parentId: '',
        sortId: 0,
        comments: '',
        parent: {
          id: '',
          label: ''
        }
      },
      show: false
    }) {
      this.ADMINRESOURCE_FORMSTATE({
        show: true,
        type: params.type,
        edit: params.edit,
        formData: params.formData
      } as FormState)
    },
    hideAdminResourceForm(){
      this.ADMINRESOURCE_FORMSTATE({
        show: false
      } as FormState)
    },
    async getAdminResourceList(params={}) {
      const [, res] = await adminResourceList(params)
      if(res) {
        let treeData = renderTreeData(res)
        if (!_.isEmpty(treeData)) {
          this.ADMINRESOURCE_LIST(treeData)
        }
      }
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
      } as FormState)
    },
    hideAdminSelectResourceForm() {
      this.ADMINSELECTRESOURCE_FORMSTATE({
       show: false
      } as FormState)
    }
  },
})