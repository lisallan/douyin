<template>
    <div>
        <router-view />
        <h1>Hello Vue!</h1>
        <button @click="getUsersList">获取用户列表get</button>
    </div>
</template>
<script setup>
// 导入接口
import { getHomeVideoListAPI } from './apis/home.js'
getUsersList()
async function getUsersList() {
    // 用户列表接口调用
    let res = await getHomeVideoListAPI()
    console.log(res)
}
</script>