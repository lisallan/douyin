<template>
  <div>
    <div>
      <header
        :style="{
          backgroundImage: `url(http://douyin.usian.net/assets/img/281578538336_.pic_hd.e816ad71.jpg)`,
        }"
      >
      <div class="dotbtn">
        ...
      </div>
    </header>
      <div class="detail">
        <div class="detail-wrapper">
          <div class="head">
            <img
              class="head-image"
              src="../../assets/img/icon/msg-icon5.webp"
            />
            <div class="heat">
              <div class="text">
                <span>获赞</span>
                <span class="num">{{ state.like }}</span>
              </div>
              <div class="text">
                <span>关注</span>
                <span class="num">{{ state.follow }}</span>
              </div>
              <div class="text">
                <span>粉丝</span>
                <span class="num">{{ state.fans }}</span>
              </div>
            </div>
          </div>
          <div class="description">
            <p class="name f22 mt1r mb1r">
              {{ state.adminMessg.userNickname }}
            </p>
            <div class="number">
              <span>抖音号：{{ state.adminMessg.userId }}</span>
              <img src="../../assets/img/icon/me/copy.png" alt="" />
            </div>
            <div class="signature f12">
              <div class="text"></div>
            </div>
            <div class="more">
              <div class="age item">
                <img
                  src="../../assets/img/icon/me/man.png"
                  v-if="state.adminMessg.userGender == '男'"
                  alt=""
                />

                <img v-else src="../../assets/img/icon/me/woman.png" alt="" />
                <span>{{ state.adminMessg.userAge }}岁</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Switchbar />

    <Footer :active="5" />
  </div>
</template>
<script setup>
import Footer from "../../components/Footer.vue";
import Switchbar from "../../components/slide/Switchbar.vue";
import {
  getUserInfo,
  byLikesNum,
  FollowersNum,
  FansNum,
} from "../../apis/home";
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { adminStore } from "../../store/admin";

const store = adminStore();
const state = reactive({
  adminMessg: [],
  fans: "",
  like: "",
  follow: "",
});
const getAdmin = async () => {
  const userID =JSON.parse(localStorage.getItem("admin")).userId
   

  await getUserInfo(userID).then((res) => {
    state.adminMessg = res.data;
  });
  await byLikesNum(userID).then((res) => {
    state.like = res.data;
  });
  await FollowersNum(userID).then((res) => {
    state.follow = res.data;
  });
  await FansNum(userID).then((res) => {
    state.fans = res.data;
  });
};
getAdmin();
</script>
<style lang="less" scoped>
header {
  transition: all 0.3s ease 0s;
  height: 150px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;

  .dotbtn{
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(22,24,35,0.6);
    text-align: center;
    margin: 5px 5px 0 0;
    line-height: 21px;
  }
}
.detail {
  transform: translateY(-10rem);
  background: rgb(21, 23, 36);
  border-radius: 10rem 10rem 0 0;

  .detail-wrapper {
    padding: 0 20px 15px 20px;
    .head {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      transform: translateY(-20rem);

      .head-image {
        background: black;
        padding: 2px;
        border-radius: 50%;
        width: 80rem;
        height: 80rem;
      }

      .heat {
        margin-top: 10rem;
        width: calc(100% - 120rem);
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: rgb(143, 143, 158);

        .num {
          margin-top: 5rem;
          color: white;
          font-size: 16rem;
          font-weight: bold;
          margin-right: 3px;
        }

        .text {
          font-size: 12rem;
          margin-right: 10px;
          display: flex;
          align-items: center;
          flex-direction: column;
        }
      }
    }
    .description {
      font-size: 12rem;
      color: white;
      transform: translateY(-20rem);

      .number,
      .certification {
        margin-bottom: 10rem;
        padding-bottom: 10rem;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;

        img {
          width: 14rem;
          margin-left: 5rem;
        }
      }

      .number {
        color: rgb(143, 143, 158);

        img {
          margin-left: 5rem;
        }
      }

      .certification {
        img {
          width: 14rem;
          margin-right: 5rem;
        }
      }
      .more {
        display: flex;

        .item {
          padding: 2rem 5rem;
          border-radius: 2rem;
          font-size: 10rem;
          display: flex;
          align-items: center;
          margin-right: 5rem;
          background: rgba(58, 58, 70, 0.4);

          img {
            height: 10rem;
            margin-right: 2rem;
          }
        }
      }
    }
  }
}
#box {
  width: 600px;
  height: 600px;
  background: red;
}
</style>
