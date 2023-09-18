<template>
  <div class="dr-toolbar">
    <div class="option-button el-col-6">
      <a-button size="small" type="primary" shape="round" @click="bakUpData">
       <SvgIcon iconClass="piliangbeifen"/>
      </a-button>
    </div>
    <div class="el-col-18">&nbsp;</div>
  </div>
</template>
<script lang="ts" setup>
import { bakUpCMSData } from '@/api/backup'
import { Modal ,message} from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { backupStore } from '@/stores/backup'
const  { t } = useI18n()
import SvgIcon from './SvgIcon.vue';
const [messageApi]  = message.useMessage()
const backupStoreIns = backupStore()

const bakUpData = ()=>{
  Modal.confirm({
    title: t('main.scr_modal_title'),
    content: t('backUpData.askBak'),
    okText: t('main.confirmBtnText'),
    cancelText: t('main.cancelBtnText'),
    onOk(){
       bakUpCMSData().then((result:any)=>{
        if (result.status === 200) {
          backupStoreIns.getBakDateList()
          messageApi.success(t("backUpData.bakSuccess"))
          } else {
            messageApi.error(result.message)
          }
       }).catch(err=>{
        messageApi.info(`${t("backUpData.bakEr")}${err}`)
       })
    }
  })
}
</script>