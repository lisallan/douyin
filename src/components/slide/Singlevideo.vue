<template>
  <div>
    <div class="warp" v-for="(item, index) in props.videoList" :key="index">
      <div class="warpheader">
        <img :src="`http://43.138.15.137:3000${item.Video.userAvatar}`" alt="" />
        <span>{{ item.Video.userNickname }}</span>
      </div>
      <div class="warpcontent">{{item.Video.videoDesc}}</div>
      <div class="warpvideo">
        <video
          class="video"
          :src="item.Video.videoPath"
          autoplay
        ></video>
        <!-- <img src="../../assets/img/icon/avatar/1.png" alt="" /> -->
      </div>
      <div class="warpicon">
        <div>
          <img src="/src/assets/img/icon/love.svg" alt="" />
          <span>1</span>
        </div>
        <div>
          <img src="/src/assets/img/icon/message.svg" alt="" />
          <span>2</span>
        </div>
        <div>
          <img src="/src/assets/img/icon/share-white-full.png" alt="" />
          <span>3</span>
        </div>
      </div>
      <div class="warptime">17分钟前</div>
    </div>
  </div>
</template>
<script setup>
// import { onMounted, reactive, ref } from "vue";
// import { Videos } from "../../apis/switch";
// import { adminStore } from "../../store/admin";
// const store = adminStore();
// const videoList = ref();

// onMounted(async () => {
//   await Videos("fe8cf1fb-ef90-41a6-87b0-a735b787a4c1").then((res) => {
//     videoList.value = res.data;
//   });
// });
const props = defineProps(['videoList'])

</script>
<style lang="less" scoped>
.warp {
  margin: 20px;
  padding-bottom: 80px;
  .warpheader {
    border-radius: 50%;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    span {
      color: #fff;
      margin-left: 5px;
      vertical-align: top;
      line-height: 32px;
      font-size: 14px;
    }
  }
  .warpcontent {
    font-size: 14px;
    margin: 10px 0;
    color: #e8e8e9;
  }
  .warpvideo {
    width: 70%;
    height: 400px;
    margin-bottom: 8px;

    .video {
      width: 100%;
      height: 100%;
      background: #000;
      border-radius: 5px;
    }
  }
  .warpicon {
    width: 50%;
    display: flex;
    justify-content: space-between;
    color: #e8e8e9;
    margin-bottom: 8px;

    img {
      width: 25px;
      height: 25px;
      vertical-align: middle;
      margin-right: 2px;
    }
  }
  .warptime {
    color: #8b8c96;
    font-size: 10px;
  }
}
</style>
