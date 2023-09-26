<template>
  <div>
    <Singlevideo :videoList = videoList></Singlevideo>
    <Footer :active="2" />
  </div>
</template>
<script setup>
import { defineAsyncComponent, ref,onMounted } from "vue";
import Footer from "../../components/Footer.vue";
import { FollowerVideo } from "../../apis/switch";
import { adminStore } from "../../store/admin";
const store = adminStore();
const videoList = ref();
const Singlevideo = defineAsyncComponent(() => import("../../components/slide/Singlevideo.vue")); // 动态/异步组件
onMounted(async () => {
  await FollowerVideo("fe8cf1fb-ef90-41a6-87b0-a735b787a4c1").then((res) => {
    videoList.value = res.data;
  });
});
</script>


