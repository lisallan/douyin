<template>
  <div class="trendswarp">
  <Login :isFullScreen="isFullScreen"></Login>
    
    <Singlevideo :videoList = videoList></Singlevideo>
  </div>
</template>

<script setup>
import {defineAsyncComponent, ref,onMounted} from 'vue'
const Login = defineAsyncComponent(() => import("../Login.vue")); // 动态/异步组件

const Singlevideo = defineAsyncComponent(() => import("./Singlevideo.vue")); // 动态/异步组件
import { Videos } from "../../apis/switch";
import { adminStore } from "../../store/admin";
const store = adminStore();
const videoList = ref();
const isFullScreen = ref(true);

onMounted(async () => {
  await Videos("fe8cf1fb-ef90-41a6-87b0-a735b787a4c1").then((res) => {
    if(res.code == 200){
        isFullScreen.value = false
    videoList.value = res.data;

    }
  });
});
</script>
<style lang="less" scoped>
.trendswarp {
  width: 100%;
  height: 100%;
}
</style>
