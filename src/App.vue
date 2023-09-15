<template>
  <router-view/>
</template>
<script setup>
// 导入接口
import {getHomeVideoListAPI} from './apis/home.js'

async function getUsersList() {
  // 用户列表接口调用
  let res = await getHomeVideoListAPI()
  console.log(res)
}
</script>

<style>

</style>
