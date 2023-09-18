<template>
  <div class="message">
    <i>消息</i>
    <!--  底部  -->
    <footer>
      <TabBar/>
    </footer>
  </div>
</template>

<script setup>

import TabBar from "@/component/comm/tabbar.vue";
</script>

<style scoped lang="scss">
.message {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #161622;
}
</style>
