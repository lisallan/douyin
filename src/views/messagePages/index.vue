<template>

  <div>
    <header>
        <div style="text-align: center;position: relative;">消息</div>
        <span class="spanMessg" @click="contacts">联系人</span>
    </header>
    <div class="warpmessg">
      <div class="messgfs" @click="goPage(1)">
        <div class="imgs">
          <img src="../../assets/img/fs.png" alt="" />
        </div>
        <span>粉丝</span>
      </div>

      <div class="messgz" @click="goPage(2)">
        <div class="imgs">
          <img src="../../assets/img/aixin.png" alt="" />
        </div>

        <span>赞</span>
      </div>
      <div class="messgat" @click="goPage(3)">
        <div class="imgs">
          <img src="../../assets/img/@.png" alt="" />
        </div>

        <span>@我的</span>
      </div>
      <div class="messgpl" @click="goPage(4)">
        <div class="imgs">
          <img src="../../assets/img/pl.png" alt="" />
        </div>

        <span>评论</span>
      </div>
    </div>
    <Footer :active="4" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Footer from "../../components/Footer.vue";
const router = useRouter();
const path = ref();
const goPage = (index) => {
  console.log(index);
  if (index === 1) {
    path.value = "/message/fans";
  } else if (index === 2) {
    path.value = "/message/good";
  } else if (index === 3) {
    path.value = "/message/min";
  } else {
    path.value = "/message/comment";
  }
  router.push({ path: path.value });
};
const contacts =()=>{
    router.push({ path: '/message/contacts' });
}
</script>
<style scoped lang="less">
header{
    // display: flex;
    color: #e8e8e9;
    font-size: 16px;
    // justify-content: space-between;
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    
    .spanMessg{
        position: absolute;
        right: 10px;
        top: 0;
    }
}
.warpmessg {
  color: #e8e8e9;
  display: flex;
  justify-content: space-around;
  margin: 10px;
  div {
    text-align: center;
    width: 40px;
    height: 40px;
    margin: auto;

    img {
      width: 22px;
      height: 22px;
    }
  }
  .imgs {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .messgfs {
    background: #4f88fb;
  }
  .messgz {
    background: #f8355f;
  }
  .messgat {
    background: #1cc262;
  }
  .messgpl {
    background: #a753ec;
  }
}
</style>
