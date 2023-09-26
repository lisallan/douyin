<template>
  <div class="warpuser" v-for="(item, index) in list" :key="index">
    <div style="display: flex">
      <img
        :src="`http://43.138.15.137:3000${item.userAvatar}`"
        alt=""
        style="width: 50px; height: 50px; border-radius: 50%"
      />
      <div class="user">
        <div>{{item.userNickname}}</div>
        <div>{{item.userDesc}}</div>
      </div>
    </div>
    <div class="userinterest">关注</div>
  </div>
</template>
<script setup>
import { inject } from "vue";
const list = inject("UserList", "light");
</script>
<style lang="less" scoped>
.warpuser {
  display: flex;
  color: #e8e8e9;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 20px 20px;
  .user {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    margin-left: 10px;
  }
  .userinterest {
    width: 70px;
    height: 25px;
    background: #f8355f;
    text-align: center;
    line-height: 25px;
    margin-right: 20px;
  }
}
</style>
