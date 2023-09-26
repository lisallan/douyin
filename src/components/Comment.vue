<template>
  <div class="commentwrapper">
    <div class="comment">
      <div class="wrapper">
        <div @click="closeLeft" class="imgclose">
          <img src="../assets/img/icon/close.svg" alt="" />
        </div>
        <Login :isFullScreen="isFullScreen"></Login>
        <div class="items" v-if="isFullScreen == false">
          <div class="item" v-for="(item, index) in comments" :key="index">
            <div class="main">
              <div class="content">
                <img
                  src="../assets/img/icon/avatar/0.png"
                  alt=""
                  class="head-image"
                />
                <div class="comment-container">
                  <div class="name">{{ item.Comment.userNickname }}</div>
                  <div class="detail">
                    {{ item.Comment.commentContent }}
                  </div>
                  <div class="time-wrapper">
                    <div class="left">
                      <div class="time">
                        {{ toTime(item.Comment.createdAt) }}· 上海
                      </div>
                      <div class="reply-text">回复</div>
                    </div>
                    <div class="love" @click="cLove(item, index)">
                      <div style="color: red">
                        <img
                          v-if="!item.flag"
                          src="../assets/img/icon/components/like-gray-small.png"
                          alt=""
                          class="love-image"
                        />
                        <img
                          v-if="item.flag"
                          src="../assets/img/icon/components/like-red-small.png"
                          alt=""
                          class="love-image"
                        />
                      </div>
                      <div>{{ item.likeNum }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-toolbar">
        <div class="toolbar">
          <div class="input-wrapper">
            <AutoInput
              v-model="modelValue"
              @keyup.enter="pressEnter"
            ></AutoInput>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  ref,
  watch,
  defineEmits,
  onMounted,
  defineAsyncComponent,
  onBeforeUpdate,
} from "vue";
import AutoInput from "./AutoInput.vue";
import { commentVideo, triggerLikeComment } from "../apis/slide";
import { adminStore } from "../store/admin";

const Login = defineAsyncComponent(() => import("../components/Login.vue")); // 动态/异步组件
const isFullScreen = ref(true);
const props = defineProps(["data", "videoId"]);
const comments = ref();
const modelValue = ref();
const userID = JSON.parse(localStorage.getItem("admin")).userId;
onBeforeUpdate(() => {
  comments.value = props.data;
  //   .map((n) => {
  //     return {
  //       Comment: n.Comment,
  //       likeNum: n.likeNum,
  //     };
  //   });
  if (comments.value.length > 1) {
    isFullScreen.value = false;
  }
});
const store = adminStore();
const cLove = async (item, index) => {
  let params = {
    videoId: item.Comment.videoId,
    userId: item.Comment.userId,
    commentId: item.Comment.commentId,
  };

  await triggerLikeComment(params).then((res) => {
    if (res.data == "喜欢评论成功") {
      item.flag = true;
      item.likeNum++;
    } else {
      item.likeNum--;
      item.flag = false;
    }
  });
};
const pressEnter = async (val) => {
  // store.adminMessg.userId
  const data = {
    fromUserId: userID,
    content: modelValue.value,
    toVideoId: props.videoId,
    replyId: "",
  };
  await commentVideo(data).then((res) => {
    modelValue.value = "";
    if (res.code == 200) {
      console.log("回复成功");
    } else {
      console.log("回复失败");
    }
  });
};
const emit = defineEmits(["closeChange"]);
const closeLeft = () => {
  emit("closeChange", false);
};
let toTime = (timestamp) => {
  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var date = new Date(timestamp);
  var Y = (date.getFullYear() + "").padStart(2, 0) + "-";
  var M = Number((date.getMonth() + "").padStart(2, 0)) + 1 + "-";
  var D = (date.getDate() + "").padStart(2, 0) + " ";
  return Y + M + D;
};
</script>
<style lang="less" scoped>
.commentwrapper {
  height: 70vh;
  border-radius: 5rem 5rem 0 0;
  position: fixed;
  width: 100%;
  padding-top: 24rem;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 2;
}
.comment {
  background: #fff;
  z-index: 5;
  border-radius: 10rem 10rem 0 0;
  height: 100%;

  .wrapper {
    width: 100%;
    height: 100%;
    .imgclose {
      width: 10px;
      height: 10px;
      padding: 10px 0 30px 15rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .items {
    width: 100%;
    padding-bottom: 40px;
    height: 100%;
    overflow: auto;

    .item {
      width: 100%;

      .main {
        width: 100%;
        padding: 5rem 0;
        display: flex;
        min-height: 78px;

        &:active {
          background: #53535321;
        }

        .head-image {
          margin-left: 15rem;
          margin-right: 10rem;
          width: 35rem;
          height: 35rem;
          border-radius: 50%;
        }
      }

      .replies {
        padding-left: 55rem;

        .reply {
          padding: 5rem 0 5rem 5rem;
          display: flex;

          &:active {
            background: #53535321;
          }

          .head-image {
            margin-right: 10rem;
            width: 20rem;
            height: 20rem;
            border-radius: 50%;
          }
        }

        .more {
          font-size: 12rem;
          margin: 5rem;
          display: flex;
          align-items: center;

          .gang {
            background: #d5d5d5;
            width: 20rem;
            margin-right: 10rem;
            height: 1px;
          }
          span {
            color: #8f8f9e;
          }

          .arrow {
            margin-left: 5rem;
            margin-top: 8rem;
            width: 0;
            height: 0;
            border: 5rem solid transparent;
          }
        }
      }

      .content {
        width: 100%;
        display: flex;
        font-size: 14rem;

        .comment-container {
          flex: 1;
          margin-right: 20rem;

          .name {
            margin-bottom: 5rem;
            display: flex;
            align-items: center;
            color: rgb(143, 143, 158);

            .reply-user {
              margin-left: 5rem;
              width: 0;
              height: 0;
              border: 5rem solid transparent;
              border-left: 6rem solid gray;
            }
          }

          .detail {
            margin-bottom: 5rem;
            color: #000;
            overflow-wrap: anywhere;
          }

          .time-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12rem;

            .left {
              display: flex;

              .time {
                color: #c4c3c3;
                margin-right: 10rem;
              }
            }

            .love {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              justify-content: center;
              flex-direction: column;

              .love-image {
                width: 18rem;
                border-radius: 50%;
              }

              span {
                font-size: 10rem;
                word-break: keep-all;
                color: #8f8f9e;
              }
            }
          }
        }
      }
    }
  }

  @normal-bg-color: rgb(35, 38, 47);
  @chat-bg-color: rgb(105, 143, 244);

  .input-toolbar {
    border-radius: 10rem 10rem 0 0;
    background: white;
    position: fixed;
    width: 100vw;
    bottom: 0;
    z-index: 3;

    @space-width: 18rem;
    @icon-width: 48rem;

    .call-friend {
      padding-top: 30rem;
      overflow-x: scroll;
      display: flex;

      .friend {
        position: relative;
        font-size: 10rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        .avatar {
          border-radius: 50%;
        }

        span {
          margin-top: 5rem;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .checked {
          position: absolute;
          right: -2px;
          width: 20rem;
          height: 20rem;
          border-radius: 50%;
        }
      }
    }

    .toolbar {
      @icon-width: 25rem;
      display: flex;
      align-items: center;
      padding: 10rem 15rem;
      border-top: 1px solid #e2e1e1;

      .input-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 5rem 10rem;
        background: #eee;
        border-radius: 20rem;

        .right {
          display: flex;
          align-items: center;
        }

        .auto-input {
          width: calc(100vw - 180rem);
        }
      }

      img {
        border-radius: 50%;
        margin-left: 15rem;
      }
    }
  }
}

.comment-enter-active,
.comment-leave-active {
  transition: all 0.15s ease;
}

.comment-enter-from,
.comment-leave-to {
  transform: translateY(60vh);
}
</style>
