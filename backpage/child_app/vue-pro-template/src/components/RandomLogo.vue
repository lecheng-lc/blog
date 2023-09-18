<template>
  <div class="random-logo">
    <div v-if="(props.user.logo).indexOf('defaultlogo.png')>0">
      <span
        class="randomLogo"
        :style="{backgroundColor:renderLogo()}"
      >{{(props.user.userName).substring(0,1).toLocaleUpperCase()}}</span>
    </div>
    <div v-else>
      <img :src="props.user.logo" :alt="props.user.userName" :title="props.user.userName" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps} from 'vue'
const colorList = ref([
        "#409EFF",
        "#67C23A",
        "#E6A23C",
        "#F56C6C",
        "#909399",
        "#409EFF",
        "#67C23A",
        "#E6A23C",
        "#F56C6C",
        "#909399"
      ])
const props = defineProps(['user'])
const renderLogo = () =>{
  let count = Math.round(Math.random() * 6 + 1);
    return colorList.value[count]
}
</script>

<style lang="scss">
.random-logo {
  .randomLogo {
    color: #ffffff;
    border-radius: 50%;
    max-width: 75%;
    height: 40px;
    width: 40px;
    display: block;
    position: absolute;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    box-shadow: 0px 1px 1px #aaa;
  }
  img {
    border-radius: 50%;
    max-width: 75%;
    height: 40px;
    width: 40px;
    position: absolute;
    box-shadow: 0px 1px 1px #aaa;
  }
}
</style>
