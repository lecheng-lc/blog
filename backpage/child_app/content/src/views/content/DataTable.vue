<template>
  <div>
    <a-table align="center" :columns="tableColumns" ref="multipleTable" :data-source="dataList" style="width: 100%"
      @selection-change="handleContentSelectionChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'isTop'">
          <div v-if="record.isTop === 1">推荐</div>
          <div v-if="record.isTop !== 1">不推荐</div>
        </template>
        <template v-if="column.dataIndex === 'roofPlacement'">
          <div v-if="record.isTop === 1 && record.roofPlacement == 1">置顶</div>
          <div v-if="record.isTop !== 1 && record.roofPlacement == 1">不置顶</div>
        </template>
        <template v-if="column.dataIndex === 'title'">
          <div v-if="record.state == '2'">
            <a :href="'/details/' + record._id + '.html'" target="_blank">{{ record.title }}</a>
          </div>
          <div v-else>{{ record.title }}</div>
        </template>
        <template v-if="column.dataIndex === 'author'">
          <div>{{ record.uAuthor ? record.uAuthor.userName : record.author ? record.author.userName : '' }}</div>
        </template>
        <template v-if="column.dataIndex === 'updateDate'">
          <div>
            {{ record.updateDate }}
          </div>
        </template>
        <template v-if="column.dataIndex === 'categories'">
          <div>
            {{ (record.categories && record.categories[record.categories.length - 1]) ?
              record.categories[record.categories.length - 1].name : '' }}
          </div>
        </template>
        <template v-if="column.dataIndex === 'tags'">
          <span v-for="tag in record.tags" :key="tag._id">{{ tag.name + ',' }}</span>
        </template>
        <template v-if="column.dataIndex === 'enable'">
          <div v-show="record.state == '2'" :style="green" icon-class="check-circle-fill">
            绿色
          </div>
          <div v-show="record.state != '2'" :style="red" icon-class="minus-circle-fill">
            红色
          </div>
        </template>
        <template v-if="column.dataIndex === 'operate'">
          <a-button @click="editContentInfo(record)">编辑</a-button>
          <a-button @click="deleteContent(record)">删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { deleteContentApi, roofContentApi, updateContentToTop } from "@/api/content";
import _ from "lodash"
import { ref } from 'vue'
import { useRouter } from "vue-router"
import { contentStore } from "@/stores/content"
import { message, Modal } from 'ant-design-vue'
import { useI18n } from "vue-i18n"
const { t } = useI18n()
const [messageApi] = message.useMessage()
const contentStoreIns = contentStore()
const RouterIns = useRouter()
const emits = defineEmits(['changeContentSelectList'])
const props = defineProps<{
  dataList: any
  pageInfo: any
}>()
const loading = ref(false)
const multipleSelection = ref([])
const tableColumns = [{
  title: '推荐',
  dataIndex: 'isTop',
  key: 'isTop',
},
{
  title: '置顶',
  dataIndex: 'roofPlacement',
  key: 'roofPlacement',
},
{
  title: '标题',
  dataIndex: 'title',
  key: 'title',
},
{
  title: '作者',
  dataIndex: 'author',
  key: 'author',
},
{
  title: '更新时间',
  dataIndex: 'updateDate',
  key: 'updateDate',
},
{
  title: '类别',
  dataIndex: 'categories',
  key: 'categories',
},
{
  title: '标签',
  dataIndex: 'tags',
  key: 'tags',
},
{
  title: '点击',
  dataIndex: 'clickNum',
  key: 'clickNum',
},
{
  title: '评论数',
  dataIndex: 'commentNum',
  key: 'commentNum',
},
{
  title: '状态',
  dataIndex: 'state',
  key: 'state',
},
{
  title: '操作',
  dataIndex: 'operate',
  key: 'operate',
},

]
const yellow = ref({
  color: "#F7BA2A"
})
const gray = ref({
  color: "#CCC"
})
const green = ref({
  color: "#13CE66"
})
const red = ref({
  color: "#FF4949"
})
const handleContentSelectionChange = (val: any) => {
  if (val && val.length > 0) {
    let ids = val.map((item: any) => {
      return item._id;
    });
    multipleSelection.value = ids
    emits('changeContentSelectList', ids)
  } else {
    multipleSelection.value = []
    emits('changeContentSelectList', '')
  }
}
const editContentInfo = (record: any) => {
  RouterIns.push("/content/editContent/" + record._id)
}
const topContent = (record: any) => {
  let contentData = record
  let targetParams = {
    _id: contentData._id,
    isTop: contentData.isTop == 1 ? 0 : 1
  };
  updateContentToTop(targetParams).then(result => {
    if (result) {
      contentStoreIns.getContentList(props.pageInfo)
    } else {
      messageApi.error((result as any).message)
    }
  })
}
const roofContent = (record: any) => {
  let contentData = record
  // 推荐的才允许置顶
  if (contentData.isTop != 1) {
    return false;
  }
  let targetParams = {
    _id: contentData._id,
    roofPlacement: contentData.roofPlacement == "1" ? "0" : "1"
  };
  roofContentApi(targetParams).then(result => {
    if (result.status === 200) {
      contentStoreIns.getContentList(props.pageInfo)
    } else {
      messageApi.error((result as any).message)
    }
  })
}
const deleteContent = (record: any) => {
  Modal.confirm({
    title: t("main.scr_modal_title"),
    content: t("main.del_notice"),
    cancelText: t("main.cancelBtnText"),
    okText: t("main.confirmBtnText"),
    onOk() {
      deleteContentApi({
        ids: record._id,
        draft: "1"
      }).then(res => {
        if (res) {
          Object.assign(props.pageInfo)
          contentStoreIns.getContentList(props.pageInfo)
          messageApi.success(t("main.scr_modal_del_succes_info"))
        }
      }).catch(err => {
        messageApi.info(t("main.scr_modal_del_error_info"))
      })
    }
  })
}
</script>
<style lang="scss">
.fa-star,
.fa-thumbs-up {
  cursor: pointer;
}

.fa-star-o,
.fa-thumbs-o-up {
  cursor: pointer;
}
</style>
