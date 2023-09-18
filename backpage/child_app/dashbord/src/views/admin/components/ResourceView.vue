<template>
  <div class="resource-details">
    <div v-if="props.resource && props.resource.docs.length > 0">
      <div v-for="cate in props.resource.docs" :key="cate._id">
        <!-- 主分类 -->
        <h3 class="cate-title">{{cate.comments}}</h3>
        <div v-for="(childCate,index) in cate.children" :key="'x_'+index">
          <!-- 子类 -->
          <a-row :gutter="10" style="margin:5px 0;">
            <a-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <h4 class="child-cate-title">{{childCate.comments}}</h4>
            </a-col>
            <a-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
              <ul class="resource-list">
                <li v-for="(resource,index) in childCate.children" :key="'r_'+index">
                  <SvgIcon
                    v-show="resource.hasPower"
                    :style="green"
                    icon-class="check-circle-fill"
                  />
                  <SvgIcon
                    v-show="!resource.hasPower"
                    :style="red"
                    icon-class="minus-circle-fill"
                  />
                  {{resource.comments}}
                </li>
              </ul>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <div v-else>{{$t('main.noMessages')}}</div>
  </div>
</template>
<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue';
import { ref} from 'vue'
const props = defineProps(['resource'])
const green = ref({color: '#13CE66'})
const red = ref({color: '#FF4949'})
</script>
<style lang="scss">
.resource-details {
  h3 {
    font-size: 14px;
    margin: 10px auto;
    border-bottom: 1px solid #edf2fc;
  }
  h4 {
    font-size: 12px;
    margin: 0;
    font-weight: 500;
  }
  .resource-list {
    margin: 0;
    padding: 0;
    li {
      display: inline-block;
      list-style-type: none;
      font-size: 12px;
      margin-right: 10px;
    }
  }
}
</style>


