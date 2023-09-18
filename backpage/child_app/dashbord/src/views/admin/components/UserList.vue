<template>
  <div class="dash-box">
    <h2 class="dash-title">{{$t('main.nearNewUsers')}}</h2>
     <div class="user-list">
       <ul>
         <li v-for="user in props.regUsers" :key="user._id">
           <RandomLogo :user="user"/>
           <label for="">{{user.userName}}</label>
         </li>
       </ul>
     </div>
  </div>
</template>

<script lang="ts" setup>
import RandomLogo from "@/components/RandomLogo.vue";
const props = defineProps(['regUsers'])
</script>
<style lang="scss">
.dash-box {
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  padding: 20px 20px 0 20px;
}
.user-list {
  ul {
    padding: 0;
    margin: 0;
    li {
      display: block;
      position: relative;
      width: 100%;
      padding: 15px;
      &:after{
        content: '';
        position: absolute;
        bottom: 0;
        height: 1px;
        transform: scaleY(0.5);
        left:0;
        background-color: #eee;
        width: 100%;
      }
      &:last-child {
        &:after{
          content: '';
          height:0;
        }
      }
      label {
        height: 40px;
        line-height: 40px;
        margin-left: 50px;
      }
    }
  }
}
</style>
