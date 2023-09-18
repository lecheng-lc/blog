<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
const Route = useRoute()
console.log('Route', Route)
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
