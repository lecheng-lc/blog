import _ from 'lodash'
import { defineStore } from 'pinia'
import { adminGroupList } from '../api/adminGroup'
import * as Interface from '@/api/interface'
const state = {
  formState: {
    show: false,
    edit: false,
    formData: {
      name: '',
      comments: '',
      enable: false,
      power: <string[]>[]
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
    pageInfo:<Interface.PageInfo>{},
    docs: <Interface.PowerGroup[]>[]
  },
}
type  FormState = typeof state.formState
export const groupStore = defineStore('group', {
  state: () => (state),
  actions: {
    ADMINGROUP_FORMSTATE(formState: FormState) {
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
    ADMINGROUP_ROLEFORMSTATE(formState: typeof state.formState) {
      this.roleFormState.show = formState.show;
      this.roleFormState.edit = formState.edit;
      this.roleFormState.formData = Object.assign({
        name: '',
        comments: '',
        enable: false,
        power: []
      }, formState.formData);
    },
    ADMINGROUP_LIST(rolelist: Interface.GroupGetListRes) {
      this.roleList = rolelist
    },
    showAdminGroupForm(params = {
      edit: false,
      formData: {}
    }) {
     
      this.ADMINGROUP_FORMSTATE(<FormState>{
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideAdminGroupForm() {
      this.ADMINGROUP_FORMSTATE(<FormState>{
        show: false
      })
    },
    showAdminGroupRoleForm(params = {
      edit: false,
      formData: {}
    }) {
      this.ADMINGROUP_ROLEFORMSTATE(<FormState>{
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideAdminGroupRoleForm() {
      this.ADMINGROUP_ROLEFORMSTATE(<FormState>{
        show: false
      })
    },
    async getAdminGroupList(params = {}) {
      const [, res] = await adminGroupList(params)
      if(res) {
        this.ADMINGROUP_LIST(res)
      }
    }
  }
})