<template>
  <a-card class="box-card-component">
    <div slot="header" class="box-card-header">
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" />
    </div>
    <div style="position:relative;">
      <PanThumb :image="loginState?.userInfo?.logo" class="panThumb" />
      <Mallki class-name="mallki-text" :text="loginState?.userInfo?.userName" />
      <div class="info-pannel">
        <ul>
          <li>
            <label>{{ $t('main.lastLoginTime') }}：</label>
            {{ renderLogs.date }}
          </li>
          <li>
            <label>{{ $t('main.lastLoginIp') }}：</label>
            {{ renderLogs.ip }}
          </li>
          <li>
            <label>{{ $t('main.myPower') }}：</label>
            <a-button size="mini" type="text" @click="showMyResourceBox">{{ $t('main.seeDetails') }}</a-button>
          </li>
        </ul>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import PanThumb from '@/components/PanThumb.vue'
import Mallki from '@/components/MallKi.vue'
import { dashbordStore } from "@/stores/dashbord"
const dashbordStoreIns = dashbordStore()
const props = defineProps(['basicInfo'])
const emit = defineEmits(['showMyResourceBox'])
const showMyResourceBox = () => {
  emit('showMyResourceBox')
}
onMounted(() => {
  dashbordStoreIns.getLoginState({state: true})
})
const renderLogs = computed(() => {
  let logs = {
    ip: "127.0.0.1",
    date: "1970-01-01 00:00:00"
  }
  console.log(props.basicInfo)
  console.log('2222')
  if (props.basicInfo.loginLogs && props.basicInfo.loginLogs[0]) {
    logs = {
      date: props.basicInfo.loginLogs[0].date,
      ip: props.basicInfo.loginLogs[0].logs.split(":")[1]
    }
  }
  return logs
})
const loginState = computed(() => {
  return dashbordStoreIns.loginState
})
</script>

<style rel="stylesheet/scss" lang="scss" >
.box-card-component {
  .el-card__header {
    padding: 0px;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  margin-left:8px;
  .box-card-header {
    position: relative;
    height: 220px;

    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;

      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }

  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }

  .panThumb {
    z-index: 100;
    height: 70px;
    width: 70px;
    position: absolute;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow:none;
  }

  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }

  .logo-pannel {
    border-bottom: 1px solid #edf2fc;
    padding-bottom: 12px;

    .logo {
      float: left;
      width: 100%;

      img {
        width: 50%;
        max-width: 60px;
        height: auto;
        border-radius: 50%;
      }
    }

    .name {
      float: right;
      width: 100%;

      h3 {
        font-size: 1.6em;
        color: #409eff;
        margin-top: 0.4rem;
        margin-bottom: 0.2rem;
      }

      span {
        color: #878d99;
        font-size: 13px;
      }
    }
  }

  .info-pannel {
    padding-top: 30px;

    ul {
      margin: 0;
      padding: 0;

      li {
        list-style-type: none;
        line-height: 30px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 13px;

        label {
          display: inline-block;
          width: 100px;
          margin-right: 10px;
        }

        .el-button--text {
          padding: 0;
        }
      }
    }
  }

  @media only screen and (max-width: 1510px) {
    .mallki-text {
      display: none;
    }
  }
}</style>
