<template>
  <!-- <Login :isFullScreen="isFullScreen"></Login> -->

  <div class="likewarp">
    <div class="likeslist">
      <div
        :class="props.flag ? 'serchitem' : 'likeitem'"
        v-for="(item, index) in props.flag? list : videoList"
        :key="index"
      >
        <img :src="item.Video.videoCover" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, inject, defineAsyncComponent } from "vue";
import { triggerLike } from "../../apis/switch";
import { adminStore } from "../../store/admin";
const props = defineProps(["flag"]);
const Login = defineAsyncComponent(() => import("../Login.vue")); // 动态/异步组件
const isFullScreen = ref(true);
const store = adminStore();

const list = inject("VideoList", "light");
const videoList = ref();
onMounted(async () => {
    console.log(props.flag)
  if (props.flag) {
    return false;
  } else {
    await triggerLike("fe8cf1fb-ef90-41a6-87b0-a735b787a4c1").then((res) => {
      if (res.code == 200) {
        videoList.value = res.data;

        isFullScreen.value = false;
      }
    });
  }
});
</script>
<style lang="less" scoped>
.likewarp {
  width: 100%;
  height: 100%;
  padding-bottom: 50rem;

  .likeslist {
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    border: 0.5px solid #000;
    flex-wrap: wrap;
  }
  .likeitem {
    width: 33%;
    height: 177px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .serchitem {
    width: 50%;
    height: 269.1px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
