<template>
  <div class="content">
    <div class="mask" @click="mask" v-if="fullScreen"></div>
    <span class="iconearch" @click="goSearch"></span>
    <Login :isFullScreen="isFullScreen" style="position: absolute;top: 50%;"></Login>

    <Slideitem v-if="flag&&isFullScreen==false" :list="HvideoList"> </Slideitem>
    <Footer :active="1" />
  </div>
  <transition
    :name="isLogin == true ? 'fade' : 'out'"
    appear
  >
    <component @close="close" v-if="isLogin" :is="Land"></component>
  </transition>
</template>
<script setup>
import Slideitem from "../components/slide/Slideitem.vue";
import Footer from "../components/Footer.vue";
import Land from "./loginPages/Land.vue";
import Login from "../components/Login.vue";

import { reactive, ref, onMounted, watchEffect, provide } from "vue";
import { getHomeVideoListAPI } from "../apis/home";

import { useRouter } from "vue-router";

let isLogin = ref(false);
let flag = ref(false);
let fullScreen = ref(true);
const router = useRouter();
const HvideoList = ref();
const isFullScreen = ref(true)
onMounted(() => {
let admin = localStorage.getItem("admin");

  if (admin == null) {
  } else {
    if (JSON.parse(admin).userStatus == "在线") {
    fullScreen.value = false;
  }
  }
 
  getList();
});
function close(params, params1) {
  if (params == params1) {
    isLogin.value = false;
  } else {
    isLogin.value = false;
    fullScreen.value = false;
  }
}
const getList = async () => {
  await getHomeVideoListAPI().then((res) => {
    HvideoList.value = res.data;
  });
  flag.value = true;
  isFullScreen.value = false
};
provide("HvideoList", HvideoList);

const mask = () => {
    isLogin.value = true;
};
const goSearch = () => {
  router.push({ path: "Search" });
};
</script>

<style scoped lang="less">
@import "@/assets/less/index";
.content {
  height: 100vh;
  position: relative;
  
}
.iconearch {
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 10px;
  z-index: 222;
  width: 21px;
  height: 21px;
  content: url(/src/assets/img/icon/search-light.png);
}
.test-slide-wrapper {
  font-size: 14rem;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .slide-content {
    width: 100%;
    height: 100%;
  }
}

.first-horizontal-item {
  //width: 90vw;
  //height: 80vh;
  width: 100vw;
  height: calc(100vh - @footer-height) !important;
  overflow: hidden;
}
.mask {
  width: 100vw;
  height: 100vh;
  opacity: 0.6;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 99;
}
.fade-enter-active {
  transition: all 1s ease-out;
}
.fade-leave-active {
  transition: all 1s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  transform: translate(0, 100%);

  transition: transform 0.3s;

  opacity: 0;
}
.out-enter-active {
  transition: all 1s ease-out;
}
.out-leave-active {
  transition: all 1s ease-out;
}
.out-enter-from,
.out-leave-to {
  transform: translateY(100%);
}
</style>
