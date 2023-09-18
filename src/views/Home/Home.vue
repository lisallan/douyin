<template>
  <div class="container">
    <div class="container-search">
      <img src="@/assets/image/search.png" alt="">
    </div>
    <!--  主体内容  -->
    <div
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        class="middle-content"
        v-for="(item,index) in videoData[0]"
        :key="index">
      <div class="content-video">
        <!-- <img :src="'http://43.138.15.137:3000'+item.userAvatar" alt="">-->
        <video ref="video" autoplay muted>
          <source :src="item.videoPath" type="video/mp4">
        </video>
      </div>
    </div>
    <!--  底部  -->
    <footer>
      <TabBar/>
    </footer>
    <div>
      <!-- 弹出层 -->
      <div :class="['Popup',openBe?'openActive':'']">
        <!-- 内容 -->
        <div class="skuBody">
          <!--     登录页面     -->
          <div class="login" v-if="loginBody">
            <div class="login-header">
              <span @click="closeFun">X</span>
              <span @click="zhu">注册账号</span>
            </div>
            <div class="login-content">
              <div class="login-title">登录后即可展示自己</div>
              <input placeholder="输入邮箱" v-model="Myemail"/>
              <input placeholder="输入密码" v-model="password" @keyup.enter="login"/>
              <div class="findPassword">忘记了？找回密码</div>
            </div>
          </div>

          <!--  注册页面  -->
          <div class="loginFrom" v-if="zhuceBody">
            <div class="goBack" @click="backLogin"> 返回</div>
            <div class="formLogin-content">
              <div class="formLogin-content-title">注册</div>
              <input type="text" placeholder="输入邮箱" v-model="Myemail"/>
              <input type="text" placeholder="输入密码" v-model="password"/>
              <div class="yanzheng">
                <input type="text" placeholder="输入邮箱验证码" v-model="code"/>
                <div class="gityanzhengCode" @click="getCode">获取验证码</div>
              </div>
              <button class="zhuce" @click="register">注册</button>
            </div>
          </div>

        </div>
      </div>
      <!-- 遮罩层 -->
      <div v-show="MaskBe" class="MaskCss" @click="closeFun()"></div>
    </div>
  </div>
</template>

<script setup>
import TabBar from '@/component/comm/tabbar.vue'
// 导入接口
import {getHomeVideoListAPI} from '@/apis/home.js'
import {onMounted, ref} from "vue";
import {getEmailAPI, loginByPasswordAPI, registerAPI} from "@/apis/getEmail.js";

const videoData = ref([]);
const activeIndex = ref(0)

onMounted(() => {
  getUsersList()
  openFun()
})

async function getUsersList() {
  const {data: res} = await getHomeVideoListAPI()
  res.data.map((item) => {
    videoData.value.push(JSON.parse(item))
  })
  console.log(videoData.value)
}

//**************************滑动
let touchStartY = 0;
let touchEndY = 0;
const touchSensitivity = 50; // 触摸灵敏度，可以根据需要调整

function handleTouchStart(event) {
  touchStartY = event.touches.clientY;
}

function handleTouchMove(event) {
  touchEndY = event.touches.clientY;
}

function handleTouchEnd() {
  const deltaY = touchEndY - touchStartY;

  if (deltaY > touchSensitivity) {
    // 向下滑动，切换到上一个视频
    if (activeIndex.value > 0) {
      activeIndex.value--;
    }
  } else if (deltaY < -touchSensitivity) {
    // 向上滑动，切换到下一个视频
    if (activeIndex.value < videoData.length - 1) {
      activeIndex.value++;
    }
  }
}

//*************************SKU遮罩

let openBe = ref(false) // 是否打开弹出层
let MaskBe = ref(false)  // 是否开启遮罩层


// 打开弹出层
const openFun = () => {
  MaskBe.value = true
  openBe.value = true
}
// 点击遮罩则关闭弹层~
const closeFun = () => {
  MaskBe.value = false
  openBe.value = false
}

//*********************************

let loginBody = ref(true)
let zhuceBody = ref(false)
const zhu = () => {
  loginBody.value = false
  zhuceBody.value = true
}

const backLogin = () => {
  loginBody.value = true
  zhuceBody.value = false
}

// 获取验证码
let Myemail = ref('3306283189@qq.com')
let password = ref('li5619037')
let code = ref('')

// 获取验证码
async function getCode() {
  const {data: res} = await getEmailAPI(Myemail.value)
  console.log(res)
}

// 点击注册
async function register() {
  const {data: res} = await registerAPI({
    email: Myemail.value,
    password: password.value,
    code: code.value
  })
  console.log(res)
}

// 回车登录
async function login() {
  const {data: res} = await loginByPasswordAPI({
    email: Myemail.value,
    password: password.value
  })
  console.log(res)
  closeFun()
}

</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container-search {
  position: absolute;
  right: 0;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;


  img {
    display: block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background-color: white;

  }
}

.middle-content {
  font-size: 20px;
  flex: 1;
  display: flex;
  align-items: center;
  background: black;
  height: 667px;
}

.content-video {
  width: 100%;
  height: 667px;

  video {
    width: 100%;
    height: 100%;

    source {
      width: 100%;
      height: 100%;
    }
  }
}

//****************************SKU
//****************SKU
/* 弹出层默认样式 */
.Popup {
  width: 100%;
  height: 700px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: white;
  position: fixed;
  bottom: -700px;
  z-index: 11000;
  transition: all 0.25s linear;

  .skuBody {
    width: 100%;
    min-height: 700px;
    background-color: yellowgreen;
  }
}

/* 点击按钮是将盒子 bottom 值归零即可实现弹出效果,
同理，如需更改弹出方向只需将bottom改成top、left、right即可
(默认样式的方向也需一起更改哦) */
.openActive {
  bottom: 0 !important;
}

/* 遮罩层样式 */
.MaskCss {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10000;
}

//****************************
.login {
  width: 375px;
  min-height: 1000px;
  //background: pink;
  overflow: hidden;
}

.login-header {
  width: 375px;
  height: 30px;
  //background: red;
  font-size: 12px;
  color: grey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  float: left;
}

.login-header > span:nth-child(1) {
  margin-left: 20px;
}

.login-header > span:nth-child(2) {
  margin-right: 20px;
  font-size: 15px;
}

.login-content {
  width: 300px;
  height: 150px;
  //background: red;
  margin: auto;
  margin-top: 150px;
}

.login-title {
  font-size: 19px;
  font-weight: bolder;
  margin-bottom: 10px;
}

.login-content > input {
  width: 280px;
  height: 35px;
  font-size: 14px;
  border: none;
  outline: none;
  margin-bottom: 10px;
  background: #F9F9F9;
}

.findPassword {
  font-size: 12px;
  color: #849192;
}

.login {
  width: 375px;
  min-height: 1000px;
  //background: pink;
  overflow: hidden;
}

.login-header {
  width: 375px;
  height: 30px;
  //background: red;
  font-size: 12px;
  color: grey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  float: left;
}


.loginFrom {
  width: 375px;
  min-height: 1000px;
  //background: pink;
  overflow: hidden;
}

.goBack {
  width: 375px;
  height: 30px;
  margin-top: 20px;
  font-size: 14px;
  line-height: 30px;
  text-indent: 20px;
  float: left;
  color: grey;
  //background: red;
}

.formLogin-content {
  width: 300px;
  height: 200px;
  //background: red;
  margin: auto;
  margin-top: 150px;
}

.formLogin-content-title {
  font-size: 16px;
  font-weight: bolder;
  margin-bottom: 20px;
}

.formLogin-content > input {
  width: 280px;
  height: 35px;
  font-size: 14px;
  border: none;
  outline: none;
  margin-bottom: 10px;
  background: #F9F9F9;
  text-indent: 10px;
}

.yanzheng {
  width: 300px;
  //background: palegoldenrod;
  height: 35px;
  display: flex;
}

.yanzheng > input {
  width: 200px;
  //height: 35px;
  border: none;
  outline: none;
  background: #F9F9F9;
  font-size: 14px;
  text-indent: 10px;
}

.gityanzhengCode {
  font-size: 13px;
  text-align: center;
  line-height: 35px;
  background: #F9F9F9;
  padding-left: 8px;
  padding-right: 8px;
  font-weight: bolder;
}

.zhuce {
  width: 285px;
  height: 40px;
  border: none;
  outline: none;
  margin-top: 30px;
  background: #FC3058;
  font-size: 14px;
  color: white;
}
</style>
