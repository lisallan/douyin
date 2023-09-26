<template>
  <div class="warp">
    <Video :list="historyParam" />
  </div>
</template>
<script setup>
import Video from "../components/Video.vue";

// 获取history中我们上个页面保存的数据
const historyParam = history.state.params;
</script>
<style lang="less" scoped>
.warp {
  width: 100%;
  height: 100%;
  background: red;
}
</style>
