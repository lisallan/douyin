<template>
  <div class="toolbar">
    <div class="avatar-ctn">
      <img class="avatar" src="../../assets/img/icon/head-image.jpeg" alt="" />
      <transition name="fade">
        <div class="options" ref="attention-option">
          <img class="no" src="../../assets/img/icon/add-light.png" alt="" />
          <img class="yes" src="../../assets/img/icon/ok-red.png" alt="" />
        </div>
      </transition>
    </div>
    <div class="love" @click.stop="ClickLove($event)">
      <div>
        <img
          src="../../assets/img/icon/love.svg"
          class="love-image"
          v-if="flag == false"
        />
        <img
          src="../../assets/img/icon/loved.svg"
          class="love-image"
          v-if="flag === true"
        />
      </div>
      <span>{{ props.item.WSLCNum.likeNum }}</span>
    </div>
    <div class="message" @click.stop="ClickMessg($event)">
      <img
        src="../../assets/img/icon/message.svg"
        alt=""
        class="message-image"
      />
      <span>{{ props.item.WSLCNum.commentNum }}</span>
    </div>
    <!-- <div class="star">
      <img
        src="../../assets/img/icon/star-full.png"
        alt=""
        class="star-image"
      />
      <span>333</span>
    </div> -->
    <div class="share">
      <img
        src="../../assets/img/icon/share-white-full.png"
        alt=""
        class="share-image"
      />
      <span>{{ props.item.WSLCNum.shareNum }}</span>
    </div>
    <teleport to="body">
      <Transition
        :name="show == true ? 'fade' : 'out'"
        appear
      >
        <component
          :is="Comment"
          v-if="show"
          :data="data"
          :videoId="videoId"
          @closeChange="ClickMessg"
        ></component>
      </Transition>
    </teleport>
  </div>
</template>
<script setup>
import { onBeforeMount, onMounted, ref, watchEffect } from "vue";
import { triggerLike, getVideoComment } from "../../apis/slide";
import { adminStore } from "../../store/admin";
import Comment from "../Comment.vue";

const props = defineProps(["item"]);
const store = adminStore();
const flag = ref(false);
const show = ref(false);
const data = ref();
const videoId = ref();

// setTimeout(() => {
//   watchEffect(() => {
//     if (store.flag == true) {
//       flag.value = true;
//     }
//   });
// }, 100);

const ClickLove = async () => {
  const userID = JSON.parse(localStorage.getItem("admin")).userId;
  //   store.adminMessg.userId
  const params = {
    userId: userID,
    videoId: props.item.Video.videoId,
  };
  await triggerLike(params).then((res) => {
    if (flag.value == true) {
      flag.value = false;
    } else {
      flag.value = true;

      if (res.code === 200) {
        
      }
    }
  });
};
const ClickMessg = async (e) => {
  if (e === false) {
    show.value = false;
    document.documentElement.querySelector('body').style.cssText=''

  } else {
    document.documentElement.querySelector('body').style.cssText='position:fixed;overflow:hidden'
    show.value = true;
    await getVideoComment(props.item.Video.videoId).then((res) => {
      if (res.code === 200) {

        data.value = res.data;
        videoId.value = props.item.Video.videoId;


      }
    });
  }
};
</script>
<style lang="less" scoped>
.toolbar {
  position: absolute;
  bottom: 100px;
  right: 5px;
  color: #fff;
  z-index: 1;
  .avatar-ctn {
    position: relative;
    // margin-bottom: 15px;

    .avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }

    .options {
      position: absolute;
      border-radius: 50%;
      margin: auto;
      left: 0;
      right: 0;
      bottom: -5px;
      background: red;
      //background: black;
      width: 18px;
      height: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 1s;

      img {
        position: absolute;
        width: 12px;
        height: 12px;
        transition: all 1s;
      }

      .yes {
        opacity: 0;
        transform: rotate(-180deg);
      }
    }
  }

  .love,
  .message,
  .star,
  .share {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    @width: 32px;
    img {
      width: @width;
      height: @width;
    }
    span {
      font-size: 12rem;
    }
  }

  .loved {
    background: red;
  }
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
