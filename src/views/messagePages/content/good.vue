<template>
  <div>
    <header>
      <div class="leftArrow" @click="router.go(-1)">
        <img src="../../../assets/img/icon/components/light-back.png" alt="" />
      </div>
      <div style="position: relative">赞</div>
    </header>
    <div class="mcontent" v-for="(item, index) in list" :key="index">
      <div class="text">
        <div class="timg">
          <img :src="`http://43.138.15.137:3000${item.userAvatar}`" alt="" />
        </div>
        <div class="textc">
          <div>{{ item.userNickname }}</div>
          <div>赞了你的作品</div>
          <div style="font-size: 12px; color: #8b8c96">
            {{ item.createdAt }}
          </div>
        </div>
      </div>
      <div class="rimg">
        <img :src="`${item.videoCover}`" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { byLike } from "../../../apis/message";
import { adminStore } from "../../../store/admin";
import { useRouter } from "vue-router";
const list = ref();
const router = useRouter();
const store = adminStore();

onMounted(async () => {
  await getList();
});
const getList = () => {
    const userID =JSON.parse(localStorage.getItem("admin")).userId
//   store.adminMessg.userId
  byLike(userID).then((res) => {
    if (res.code === 200) {
      list.value = res.data;
    }
  });
};
</script>
<style scoped lang="less">
header {
  color: #e8e8e9;
  font-size: 16px;
  height: 44px;
  line-height: 44px;
  padding: 0 10px;
  text-align: center;
  .leftArrow {
    position: absolute;
    width: 25px;
    height: 25px;
    top: 7px;
    left: 10px;
    z-index: 1;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
.mcontent {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  color: #e8e8e9;
  background: #1c1f2a;
  align-items: center;

  .text {
    font-size: 14px;
    display: flex;
    align-items: center;
    .timg {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    .textc {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 10px;
    }
  }
  .guanz {
    width: 70px;
    height: 25px;
    background: #f8355f;
    text-align: center;
    line-height: 25px;
  }
  .guanzs {
    width: 70px;
    height: 25px;
    background: #383b44;
    text-align: center;
    line-height: 25px;
  }
  .rimg {
    width: 60px;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
}
</style>
