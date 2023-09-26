<template>
  <div class="warpSvideo">
    <SearchLike :flag="flag"></SearchLike>
  </div>
</template>
<script setup>
import { defineAsyncComponent, onMounted, ref } from "vue";
const flag = ref(true);
const SearchLike = defineAsyncComponent(() =>
  import("../slide/Switchlike.vue")
);
</script>
<style scoped lang="less">
.warpSvideo {
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  transition-duration: 0ms;
  transform: translate(0px, 0px) scale(1) translateZ(0px);
  overflow: hidden;
}
</style>
