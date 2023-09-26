<template>
  <div class="video-wrapper">
    
    <div
      v-for="(item, index) in flag ? videoList : JSON.parse(props.list)"
      :key="index"
      class="video-wrapper"
    >
      <Sidebar :item="flag ? JSON.parse(item) : item"></Sidebar>
      <video
        @click="clickVideo(index)"
        :src="flag ? JSON.parse(item).Video.videoPath : item.Video.videoPath"
        :poster="
          flag ? JSON.parse(item).Video.videoCover : item.Video.videoCover
        "
        ref="video"
        preload
        loop
        autoplay
        muted
      ></video>
      <div class="videoDesc">
        <div>北京市</div>
        
        <div>{{ flag ? JSON.parse(item).Video.userNickname : item.Video.userNickname}}</div>
        <div>{{flag ? JSON.parse(item).Video.videoDesc : item.Video.videoDesc  }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  onMounted,
  ref,
  nextTick,
  onBeforeMount,
  inject,
  defineProps,
} from "vue";
import Sidebar from "./slide/Sidebar.vue";
const videoList = inject("HvideoList", "light");
const video = ref();
const flag = ref(true);
const props = defineProps(["list"]);
onBeforeMount(() => {
  if (props.list) {
    flag.value = false;
  } else {
    flag.value = true;
  }
});

const clickVideo = (index) => {
  nextTick(() => {
    if (video.value[index].paused) {
      video.value[index].play();
    } else {
      video.value[index].pause();
    }
  });
};
</script>
<style scoped lang="less">
@import "../assets/less/color.less";

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s linear;
}

.fade-enter-from,
.fade-leave-to {
  transform: scale(0);
}

.video-wrapper {
  position: relative;
  background: black;
  font-size: 14rem;
  width: 100%;
  height: 100%;

  video {
    width: 100%;
    height: 100%;
    /*position: absolute;*/
  }

  .pause {
    width: 100rem;
    height: 100rem;
    opacity: 0.5;
    position: absolute;
    margin: auto;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    animation: pause-animation 1.1s linear;

    @scale: scale(1.2);

    @keyframes pause-animation {
      0% {
        opacity: 0;
        transform: scale(2);
      }
      10% {
        opacity: 0.5;
        transform: @scale;
      }
      100% {
        transform: @scale;
        opacity: 0.5;
      }
    }
  }

  .float {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;

    .normal {
      position: absolute;
      bottom: 0;
      width: 100%;
      transition: all 0.3s;

      .toolbar {
        //width: 40px;
        position: absolute;
        bottom: 0;
        right: 5px;
        color: #fff;

        .avatar-ctn {
          position: relative;

          .avatar {
            width: 55px;
            height: 55px;
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

            &.attention {
              background: white;

              .no {
                opacity: 0;
                transform: rotate(180deg);
              }

              .yes {
                opacity: 1;
                transform: rotate(0deg);
              }
            }
          }
        }

        .love,
        .message,
        .share {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          @width: 35rem;

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

      .content {
        color: #fff;
        position: absolute;
        bottom: 0;
        width: 75%;
        //display: flex;
        //flex-direction: column;

        .location-wrapper {
          display: flex;

          .location {
            margin-bottom: 10rem;

            display: flex;
            align-items: center;
            font-size: 12rem;
            padding: 4rem;
            border-radius: 3rem;
            background: @second-btn-color-tran;

            .gang {
              height: 8rem;
              width: 1.5px;
              margin: 0 5rem;
              background: gray;
            }

            img {
              margin-right: 7rem;
              width: 18rem;
            }
          }
        }

        .music {
          position: relative;
          width: 60%;
          display: flex;
          align-items: center;

          .music-image {
            width: 20px;
            height: 20px;
            margin-top: 3px;
          }
        }
      }

      .comment-status {
        display: flex;
        align-items: center;

        .comment {
          .type-comment {
            display: flex;
            background: rgb(130, 21, 44);
            border-radius: 50px;
            padding: 3px;
            margin-bottom: 20px;

            .avatar {
              width: 36px;
              height: 36px;
              border-radius: 50%;
            }

            .right {
              margin: 0 10px;
              color: @second-text-color;

              .name {
                margin-right: 10px;
              }

              .text {
                color: white;
              }
            }
          }

          .loveds {
          }

          .type-loved {
            width: 40px;
            height: 40px;
            position: relative;
            margin-bottom: 20px;
            animation: test 1s;
            animation-delay: 0.5s;

            .avatar {
              width: 36px;
              height: 36px;
              border-radius: 50%;
            }

            .loved {
              position: absolute;
              bottom: 0;
              left: 20px;
              width: 10px;
              height: 10px;
              background: red;
              padding: 3px;
              border-radius: 50%;
              border: 2px solid white;
            }
          }

          @keyframes test {
            from {
              display: block;
              transform: translate3d(0, 0, 0);
            }
            to {
              display: none;
              transform: translate3d(0, -60px, 0);
            }
          }
        }
      }
    }

    .progress {
      bottom: -1px;
      position: absolute;
      height: 7px;
      width: 100vw;
      background: black;

      .time {
        position: absolute;
        z-index: 9;
        font-size: 24px;
        bottom: 50px;
        left: 0;
        right: 0;
        color: white;
        text-align: center;

        .duration {
          color: darkgray;
        }
      }

      &:before {
        z-index: 9;
        content: " ";
        height: 1.5px;
        width: 100vw;
        background: gray;
        position: absolute;
        top: 0;
      }

      .line {
        z-index: 99;
        content: "";
        position: absolute;
        top: 0;
        height: 1px;
        width: 200vw;
        transform: translate3d(-200vw, 0, 0);
        background: gray;
      }

      .point {
        z-index: 10;
        position: absolute;
        left: 10vw;
        top: -1px;
        height: 4px;
        width: 4px;
        border-radius: 50%;
        background: gray;
      }
    }

    & .stop {
      &:before {
        height: 3.5px;
      }

      .line {
        height: 3px;
        background: white;
      }

      .point {
        top: -2px;
        height: 8px;
        width: 8px;
        background: white;
      }
    }
  }
}
.videoDesc {
  position: absolute;
  left: 10px;
  bottom: 54px;
  width: 70%;
  color: #e8e8e9;
  line-height: 22px;

  :nth-child(1) {
  }
  :nth-child(2) {
  }
  :nth-child(3) {
    font-size: 14px;
  }
}
</style>
