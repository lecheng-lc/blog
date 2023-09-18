<template>
  <div class="right-menu">
    <a-dropdown class="avatar-container" placement="bottom" arrow :trigger="['click']">
      <a class="avatar-wrapper ant-dropdown-link" @click.prevent>
        <img :src="avatar" class="user-avatar" />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a target="_blank" href="https://github.com/lecheng-lc/blog">
              Github
            </a>
          </a-menu-item>
          <a-menu-item>
            <span @click="goHomePage">控制台</span>
          </a-menu-item>
          <a-menu-item>
            <span style="display: block" @click="open = true">{{ $t('navbar.logOut') }}</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <a-modal v-model:open="open" :title="$t('main.scr_modal_title')" @ok="handleOk">
      <h3>{{ $t("main.confirm_logout") }}</h3>
      <p></p>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { userStore } from '@/stores/user'
import { useRouter } from 'vue-router';
const Router = useRouter()
const userStoreIns = userStore()
const avatar = computed(() => {
  return userStoreIns.avatar
})
const open = ref(false)
const handleOk = async () => {
  await userStoreIns.logout()
  setTimeout(() => {
    window.location.href = 'http://127.0.0.1:8090/admin/login'
  }, 1000)
}
const goHomePage = () => {
  Router.push('/admin/dashbord')
}
</script>
<style lang="scss">
.right-menu {
  float: right;
  height: 100%;
  line-height: 50px;

  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {

    .avatar-wrapper {
      margin-top: 5px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}

.user-avatar {
  height: 40px;
  width: 40px;
}
</style>
