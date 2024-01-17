<template>
  <div :class="'dr-contentCoverForm ' + device">
    <a-dialog :xs="20" :sm="20" :md="4" :lg="4" :xl="4" class="cover-dialog" title="选择封面" width="60%"
      :visible.sync="dialogState.show" :close-on-click-modal="false">
      <a-tabs v-model="currentType" style="height: 400px;" tab-position="top" @tab-click="handleTypeClick">
        <a-tab-pane v-for="item in coverTypeList" :name="item._id" :key="item._id" :label="item.name">
          <a-row :gutter="20" class="dialog-covers-list" style="padding-left:10px;">
            <a-col :xs="8" :md="3" v-for="item in contentCoverList.docs" :key="item._id">
              <div class="grid-img" :style="item.backgroundDefaultCss ? JSON.parse(item.backgroundDefaultCss) : ''"
                @click="selectThisCover(item)">
                <img :src="item.cover" />
                <div class="cover" :style="formState.formData.cover == item._id ? coverActiveStyle : {}">
                  <span>
                    <svg-icon icon-class="icon_check_right" />已选择
                  </span>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-dialog>
  </div>
</template>
<script lang="ts" setup>
import _ from "lodash"
import { ref, computed } from 'vue'
import { contentStore } from "@/stores/content"
const contentStoreIns = contentStore()
const props = defineProps<{
  dialogState: any
  targetCover: any
  coverTypeList: any
  device: string
}>()
const emits = defineEmits(['updateTargetCover'])
const targetCoverList = ref([])
const formState = computed(() => {
  return contentStoreIns.formState
})
const contentCoverList = computed(() => {
  return contentStoreIns.contentCoverList
})
const coverActiveStyle = computed(() => {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.4)",
    display: "block"
  }
})
const currentType = computed(() => {
  if (
    !_.isEmpty(contentCoverList.value) &&
    !_.isEmpty(contentCoverList.value.docs)
  ) {
    return (contentCoverList.value.docs[0] as any).type._id;
  } else {
    return ""
  }
})
const handleTypeClick = (tab: any) => {
  let targetCoverType = props.coverTypeList.value[tab.index]
  contentStoreIns.getContentCoverList({
    type: targetCoverType._id,
    pageSize: 30
  })
}
const selectThisCover = (item: any) => {
  if (!_.isEmpty(item)) {
    emits('updateTargetCover', item)
    contentStoreIns.showContentForm({
      edit: formState.value.edit,
      formData: Object.assign({}, formState.value.formData, {
        cover: item._id
      })
    })
    contentStoreIns.hideCoverListDialog()
  }
}
</script>
<style lang="scss" >
.cover-dialog {
  .a-dialog__body {
    padding-top: 0 !important;
  }
}

.dialog-covers-list {
  height: 300px;
  overflow: hidden;

  .a-col {
    height: 60px;
    margin-bottom: 15px;

    .grid-img {
      background: #000;
      border-radius: 4px;
      overflow: hidden;
      height: 100%;
      cursor: pointer;
      position: relative;

      .cover {
        display: none;

        span {
          position: absolute;
          top: 50%;
          left: 50%;
          display: inline-block;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: 12px;
          width: 60px;

          svg {
            margin-right: 4px;
          }
        }
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .preview {
    width: 400px;
    height: 269px;
    position: relative;
    padding-left: 0 !important;
    padding-right: 0 !important;

    .grid-img {
      overflow: hidden;
      height: 100%;

      .cover-title {
        overflow: hidden;
        word-break: break-word;
        font-family: fzlthjt;
      }
    }
  }
}
</style>
