<template>
  <div class="loginwarp">
    <div class="header">
      <img src="../../assets/img/icon/close.svg" alt=""  @click="close"/>
      <div>注册账号</div>
    </div>
    <div class="inputwarp">
      <h1>登陆即可展示自己</h1>
      <input placeholder="请输入邮箱" autocomplete="off" type="email" />
      <input placeholder="请输入密码" autocomplete="off" type="password" />
      <div class="password">忘记了，找回密码</div>
    <button @click="Login" class="button">登陆</button>

    </div>
  </div>
</template>
<script setup>
import {loginByPassword} from '../../apis/home'
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {adminStore} from '../../store/admin'
const emit = defineEmits(['close'])
const close =(()=>{
    emit('close', false,false)
})
const store = adminStore()
const Login = (async ()=>{
await loginByPassword({
    email: "jog888@yeah.net",
    password: "123123"
}).then(res=>{
    if(res.code === 200){
        store.adminMessg = res.data
        localStorage.setItem('admin',JSON.stringify(res.data) )
        emit('close', false,111)
    }

})
})
</script>
<style scoped lang="less">
.loginwarp {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: 99;
}
.inputwarp {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  width: 80%;
  h1 {
    font-size: 22px;
    font-weight: 400;
  }
  input {
    height: 44px;
    width: 100%;
    background: rgba(238, 238, 238, 0.36);
    margin-bottom: 10px;
    padding-left: 10px;
    border: 0;
  }
}
.password {
  font-size: 12px;
  color: #7e8c8d;
}
.header {
  display: flex;
  justify-content: space-between;
  margin: 10px;

  :nth-child(1) {
    width: 12px;
    height: 12px;
  }
  :nth-child(2) {
    color: #e8e8e9;
    font-size: 16px;
  }
}
.button{
    display: inline-block;
    width: 80%;
    height: 46px;
    background: #fc3058;
    border: 0;
    margin: 40px  auto;
    color: white;
}
</style>
