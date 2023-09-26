<template>
  <div class="searchwarp">
    <div class="back" @click="router.go(-1)">
      <img src="../assets/img/icon/components/light-back.png" alt="" />
    </div>
    <div class="search-ctn dark">
      <div class="search">
        <img
          class="search-icon"
          src="../assets/img/icon/search-gray.png"
          alt=""
        />
        <input
          type="text"
          placeholder="输入"
          v-model="text"
          @keydown.enter="enter"
        />
        <div class="suffix">
          <img src="../assets/img/icon/components/gray-close-full3.png" />
        </div>
      </div>
    </div>
  </div>
  <Switchbar :listTable="listTable" @Iindex="getIndex"></Switchbar>
</template>
<script setup>
import { defineAsyncComponent, ref, onMounted, provide } from "vue";
const Switchbar = defineAsyncComponent(() =>
  import("../components/slide/Switchbar.vue")

); // 动态/异步组件
import { useRouter } from "vue-router";
import { searchVideo, searchUser } from "../apis/search";
const router = useRouter();

const listTable = ["视频", "用户"];
const text = ref();
const VideoList = ref([]);
const UserList = ref([]);
const switchIndex = ref(0);
provide("VideoList", VideoList);
provide("UserList", UserList);
const getIndex = (Iindex) => {
  switchIndex.value = Iindex.value;
};
const enter = async () => {
  let data = {
    key: text.value,
  };

  if (switchIndex.value) {
    await searchUser(data).then((res) => {
      UserList.value = res.data;
    });
  } else {
    await searchVideo(data).then((res) => {
      VideoList.value = res.data;
    });
  }
};
</script>
<style scoped lang="less">
@import "../assets/less/color";
.searchwarp {
  display: flex;
  align-items: center;
  margin: 0 15px;
  overflow: hidden;
}
.back {
  height: 22rem;
  width: 22rem;
  margin-right: 10px;
  img {
    height: 22rem;
    width: 22rem;
  }
}
.search-ctn {
  display: flex;
  align-items: center;
  width: 100%;

  &.dark {
    .search {
      background: @second-btn-color-tran;
    }
  }

  &.light {
    .search {
      background: whitesmoke;

      input {
        color: black;
      }
    }
  }

  .rightTextColor {
    margin-left: 15rem;
    font-size: 14rem;
  }

  .search {
    font-size: 14rem;
    padding: 0;
    flex: 1;
    position: relative;
    height: 36rem;
    border-radius: 2px;
    display: flex;
    align-items: center;

    .search-icon {
      height: 22rem;
      width: 22rem;
      margin-left: 7rem;
    }

    input {
      //margin-top: .4rem;
      color: white;
      height: 50%;
      width: 100%;
      outline: none;
      border: none;
      padding: 0 0 0 7rem;
      background: transparent;

      &::-webkit-input-placeholder {
        color: @second-text-color;
      }
    }

    .suffix {
      display: flex;
      align-items: center;
      position: absolute;
      right: 15rem;

      img {
        width: 15rem;
      }
    }
  }
}
</style>
