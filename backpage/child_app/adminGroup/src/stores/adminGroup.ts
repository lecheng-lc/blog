import _ from 'lodash'
import { defineStore } from 'pinia'
import { adminGroupList } from '../api/adminGroup';
const state = {
  formState: {
    show: false,
    edit: false,
    formData: {
      name: '',
      comments: '',
      enable: false,
      power: []
    }
  },
  roleFormState: {
    show: false,
    edit: true,
    formData: {
      name: '',
      comments: '',
      enable: false,
      power: []
    }
  },
  roleList: {
    pageInfo: {},
    docs: []
  },
}
export const groupStore = defineStore('group', {
  state: () => (state),
  actions: {
    ADMINGROUP_FORMSTATE(formState: any) {
      this.formState.show = formState.show;
      this.formState.edit = formState.edit;
      if (!_.isEmpty(formState.formData)) {
        this.formState.formData = formState.formData
      } else {
        this.formState.formData = {
          name: '',
          comments: '',
          enable: false,
          power: []
        }
      }

    },
    ADMINGROUP_ROLEFORMSTATE(formState: any) {
      console.log('2211')
      console.log(this)
      this.roleFormState.show = formState.show;
      this.roleFormState.edit = formState.edit;
      this.roleFormState.formData = Object.assign({
        name: '',
        comments: '',
        enable: false,
        power: []
      }, formState.formData);
    },
    ADMINGROUP_LIST(rolelist: any) {
      this.roleList = rolelist
    },
    showAdminGroupForm(params = {
      edit: false,
      formData: {}
    }) {
     
      this.ADMINGROUP_FORMSTATE({
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideAdminGroupForm() {
      this.ADMINGROUP_FORMSTATE({
        show: false
      })
    },
    showAdminGroupRoleForm(params = {
      edit: false,
      formData: {}
    }) {
      this.ADMINGROUP_ROLEFORMSTATE({
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideAdminGroupRoleForm() {
      this.ADMINGROUP_ROLEFORMSTATE({
        show: false
      })
    },
    getAdminGroupList(params = {}) {
      adminGroupList(params).then((result) => {
        this.ADMINGROUP_LIST(result.data)
      })
    }
  }
})