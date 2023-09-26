<template>
  <Login :isFullScreen="isFullScreen"></Login>

  <div class="workswarp">
    <div class="workslist">
      <div
        class="worksitem"
        v-for="(item, index) in videoList"
        :key="index"
        @click="jumpdetails(item)"
      >
        <img :src="item.Video.videoCover" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { Videos } from "../../apis/switch";
import { adminStore } from "../../store/admin";
const Login = defineAsyncComponent(() => import("../Login.vue")); // 动态/异步组件

const store = adminStore();
const videoList = ref();
const isFullScreen = ref(true);
const router = useRouter();
onMounted(async () => {
  await Videos("fe8cf1fb-ef90-41a6-87b0-a735b787a4c1").then((res) => {
    if (res.code == 200) {
      videoList.value = res.data;

      isFullScreen.value = false;
    }
  });
});

const jumpdetails = (item) => {
   const params = JSON.stringify(videoList.value)
  router.push({ name: "Detailspage", state: { params } });
};
</script>

<style lang="less" scoped>
.workswarp {
  width: 100%;
  height: 100%;
  padding-bottom: 50rem;

  .workslist {
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    flex-wrap: wrap;
  }
  .worksitem {
    width: 33%;
    height: 177px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
