<template>
  <a-layout-header>
    <div className="header-lf">
      <CollapseIcon />
      <BreadcrumbNav />
    </div>
    <div class="header-rf">
      <AssemblySize />
      <Theme />
      <Language />
      <FullScreen />
      <AvatarIcon />
    </div>
  </a-layout-header>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import CollapseIcon from './components/CollapseIcon.vue'
import BreadcrumbNav from './components/BreadcrumbNav.vue'
import FullScreen from './components/FullScreen.vue'
import AvatarIcon from './components/AvatarIcon.vue'
import Language from './components/Language.vue'
import AssemblySize from './components/AssemblySize.vue'
import Theme from './components/Theme.vue'


onMounted(() => {
  //   this.$store.dispatch("user/showSideBar");
  // if (this.$root && this.$root.eventBus) {
  //   this.$root.eventBus.$on("showSideBar", (message) => {
  //     this.$store.dispatch("user/showSideBar");
  //   });
  // }
})
</script>


<style>
.ant-layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f6f6f6;
  background-color: #fff;
  height: 55px !important;
  padding: 0 40px 0 20px !important;

  .header-lf {
    display: flex;
    align-items: center;

    .collapsed {
      margin-right: 20px;
      font-size: 18px;
      cursor: pointer;
      transition: color 0.3s;
    }
  }

  .header-rf {
    display: flex;
    align-items: center;

    &>div {
      margin-right: 22px;

      &:last-child {
        margin-right: 0;
      }
    }

    .icon-style {
      margin-right: 22px;
      font-size: 19px;
      line-height: 19px;
      cursor: pointer;
    }

    .username {
      margin: 0 20px 0 0;
      font-size: 15px;
    }

    .ant-avatar {
      cursor: pointer;
    }
  }
}

.theme-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 25px 0;

  span {
    font-size: 14px;
  }

  .ant-switch {
    width: 46px;
  }
}

.divider {
  margin: 0 0 22px !important;
  font-size: 15px !important;

  .anticon {
    margin-right: 10px;
  }
}

.ant-divider-with-text::before,
.ant-divider-with-text::after {
  border-top: 1px solid #dcdfe6 !important;
}
</style>
