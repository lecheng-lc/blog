<template>
  <div class="dr-toolbar">
    <el-col :xs="14" :md="6" class="option-button">
      <a-button size="small" type="primary" plain @click="addContent" round>
        <svg-icon icon-class="icon_add" />
      </a-button>
      <a-tooltip class="item" effect="dark" content="绑定编辑" placement="top">
        <a-button size="small" type="warning" plain @click="directUser" round>
          <svg-icon icon-class="direct_user" />
        </a-button>
      </a-tooltip>
      <a-tooltip class="item" effect="dark" content="批量移动" placement="top">
        <a-button size="small" type="success" plain round @click="moveCate">
          <svg-icon icon-class="icon_move" />
        </a-button>
      </a-tooltip>
      <a-tooltip class="item" effect="dark" content="回收站" placement="top">
        <a-button size="small" type="info" plain round @click="showDraft">
          <svg-icon icon-class="icon_collect" />
        </a-button>
      </a-tooltip>
      <a-button size="small" type="danger" plain round @click="branchDelete">
        <svg-icon icon-class="icon_delete" />
      </a-button>
      <!-- TOPBARLEFT -->
    </el-col>
    <el-col :xs="10" :md="18">
      <div class="dr-toolbar-right">
        <div v-if="device != 'mobile'" style="display:inline-block">
          <a-cascader placeholder="请选择类别" class="cateSelect" size="small" expandTrigger="hover"
            :options="contentCategoryList.docs" v-model="pageInfo.categories" @change="handleChangeCategory"
            :props="categoryProps" clearable change-on-select></a-cascader>
          <a-select class="dr-searchInput" v-model="pageInfo.uAuthor" size="small" clearable filterable remote
            reserve-keyword placeholder="请输入用户名" @change="changeUserOptions" :remote-method="remoteMethod"
            :loading="loading">
            <a-select-option v-for="item in selectUserList" :key="item.value" :label="item.label"
              :value="item.value"></a-select-option>
          </a-select>
          <a-input class="dr-searchInput" style="width:180px" size="small" :placeholder="$t('topBar.keywords')"
            v-model="pageInfo.searchkey" suffix-icon="el-icon-search" @keyup.enter.native="searchResult"></a-input>
        </div>

        <div class="dr-select-box">
          <a-select size="small" @change="changePostOptions" v-model="authPost" placeholder="请选择">
            <a-select-option v-for="item in authPostOptions" :key="item.value" :label="item.label"
              :value="item.value"></a-select-option>
          </a-select>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script lang="ts" setup>
import _ from 'lodash'
import { deleteContentApi, regUserList } from '@/api/content'
import { ref, computed, onMounted } from 'vue'
import { contentStore } from '@/stores/content'
import { categoryStore } from '@/stores/contentCategory'
import { useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const RouterIns = useRouter()
const [messageApi] = message.useMessage()

const props = defineProps<{
  device: String
  pageInfo: any
  type: string
  ids: any
}>()
const contentStoreIns = contentStore()
const categoryStoreIns = categoryStore()


const loading = ref<boolean>(false)
const selectUserList = ref<any>([])
const searchkey = ref('')
const authPost = ref('0')
const categories = ref('0')
const authPostOptions = ref([
  {
    value: "0",
    label: "全部"
  },
  {
    value: "1",
    label: "待审核"
  }
])
const categoryProps = ref({
  value: "_id",
  label: "name",
  children: "children"
})
const contentCategoryList = computed(() => {
  return categoryStoreIns.categoryList
})
const handleChangeCategory = (value: any) => {
  if (value && value.length > 0) {
    contentStoreIns.getContentList(Object.assign({}, props.pageInfo, {
      categories: value[value.length - 1]
    }))
  } else {
    contentStoreIns.getContentList(props.pageInfo)
  }
}
const addContent = () => {
  contentStoreIns.showContentForm()
  RouterIns.push('/content/addContent')
  // this.$router.push(this.$root.adminBasePath + "/content/addContent");
}
const directUser = () => {
  contentStoreIns.showDirectUserForm()
}
const moveCate = () => {
  contentStoreIns.showMoveCateForm()
}
const showDraft = () => {
  contentStoreIns.getDraftContentList()
  contentStoreIns.showDraftListDialog()
}
const branchDelete = () => {
  if (_.isEmpty(props.ids)) {
    messageApi.info(t("validate.selectNull"))
    return false;
  }
  Modal.confirm({
    title: t("main.scr_modal_title"),
    content: t("main.del_notice"),
    cancelText: t("main.cancelBtnText"),
    okText: t("main.confirmBtnText"),
    async onOk() {
      let ids = props.ids.join()
      deleteContentApi({
        ids,
        draft: "1"
      }).then((result: any) => {
        if (result) {
          contentStoreIns.getContentList()
          messageApi.success(t("main.scr_modal_del_succes_info"))
        } else {
          messageApi.error((result as any).message)
        }
      }).catch((err: any) => {
        messageApi.info(t("main.scr_modal_del_error_info"))
      })
    }
  })
}
const searchResult = () => {
  let searchkey = props.pageInfo ? props.pageInfo.searchkey : ''
  contentStoreIns.getContentList({
    searchkey
  })
}
const queryUserListByParams = (params = {}) => {
  regUserList(params)
    .then(result => {
      let specialList = result.data.docs;
      if (specialList) {
        selectUserList.value = specialList.map((item: any) => {
          return {
            value: item._id,
            label: item.userName
          };
        });
        loading.value = false;
      } else {
        selectUserList.value = [];
      }
    })
    .catch(err => {
      selectUserList.value = [];
    })
}
const remoteMethod = (query: any) => {
  if (query !== "") {
    loading.value = true;
    let _this = this;
    queryUserListByParams({ searchkey: query, group: "1" });
  } else {
    selectUserList.value = [];
  }
}
const changeUserOptions = (value: string) => {
  contentStoreIns.getContentList({
    uAuthor: value
  })
}
const changePostOptions = (value: string) => {
  if (value == "0") {
    contentStoreIns.getContentList()
  } else if (value == "1") {
    contentStoreIns.getContentList({ state: "1" })
  }
}
onMounted(() => {
  categoryStoreIns.getContentCategoryList()
})
</script>
<style lang="scss">
.cateSelect {
  margin-right: 10px;
}
</style>
