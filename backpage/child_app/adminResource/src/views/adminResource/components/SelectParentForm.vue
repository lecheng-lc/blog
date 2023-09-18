<template>
  <div class="dr-adminResourceForm">
    <a-modal
      :xs="20"
      :sm="20"
      :md="6"
      :lg="6"
      :xl="6"
      :title="$t('adminResource.lb_parentType')"
      :visible.sync="selectDialogState.show"
      :close-on-click-modal="false"
    >
      <a-form
        :model="selectDialogState.formData"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        :label-position="device == 'mobile' ? 'top' : 'right'"
      >
        <a-form-item :label="$t('adminResource.lb_parentType')" prop="parentId">
          <a-select
            size="small"
            v-model="selectDialogState.formData.parentId"
            :placeholder="$t('main.ask_select_label')"
          >
            <a-option
              v-for="item in parentResource"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></a-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <el-button
            size="medium"
            type="primary"
            @click="submitForm('ruleForm')"
          >{{$t('main.form_btnText_update')}}</el-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { updateResourceParentId } from "@/api/adminResource"
import _ from "lodash"
import {ref} from 'vue'
import { resourceStore } from "@/stores/adminResource"
const resourceStoreIns = resourceStore()
const rules = ref({})
const props = defineProps<{
  parentResource: any,
  selectDialogState: any,
  groups:any,
  device:string
}>()
const confirm = ()=>{
  resourceStoreIns.hideAdminSelectResourceForm()
}
const submitForm = (params: any) =>{
  // this.$refs[formName].validate(valid => {
  //       if (valid) {
  //         let params = this.selectDialogState.formData;
  //         updateResourceParentId(params).then(result => {
  //           if (result.status === 200) {
  //             this.$store.dispatch("adminResource/hideAdminSelectResourceForm");
  //             this.$store.dispatch("adminResource/getAdminResourceList");
  //             this.$message({
  //               message: this.$t("main.updateSuccess"),
  //               type: "success"
  //             });
  //           } else {
  //             this.$message.error(result.message);
  //           }
  //         });
  //       } else {
  //         console.log("error submit!!");
  //         return false;
  //       }
  //     });
}
</script>