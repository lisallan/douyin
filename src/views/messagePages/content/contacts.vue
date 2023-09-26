<template>
  <header>
    <div class="leftArrow" @click="router.go(-1)">
      <img src="../../../assets/img/icon/components/light-back.png" alt="" />
    </div>
    <div style="position: relative">选择联系人</div>
  </header>
  <div class="search">
    <div class="searchwarp">
      <input
        type="text"
        placeholder="请搜索用户名称"
        @keydown.enter="kinput"
        v-model="text"
      />
    </div>
  </div>
  <div class="uwarp" v-for="(item, index) in list" :key="index">
    <h3>{{ item.letter }}</h3>
    <div class="liwarp" v-for="(n, index) in item.list" :key="index">
      <div class="imgwarp">
        <div class="limg">
          <img :src="`http://43.138.15.137:3000${n.userAvatar}`" alt="" />
        </div>
        <div class="ltext">
          <div>{{ n.userNickname }}</div>
          <div>{{ n.userDesc }}</div>
        </div>
      </div>

      <div class="rimg">
        <img src="../../../assets/img/pl.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getContact } from "../../../apis/message";
import { adminStore } from "../../../store/admin";
import { pinyin } from "pinyin-pro";
const store = adminStore();
const router = useRouter();
const text = ref();
const list = ref([]);
const copyList = ref();
const newList = ref([])
const kinput = () => {
  if (text.value == "") {
    list.value = copyList.value;
  } else {
    newList.value = []
    list.value.forEach((n) => {
      if (typeof n.list === "undefined") {
        console.log(11);
      } else {
        n.list.forEach((i) => {
          console.log(pinyin(i.userNickname));
          if (pinyin(i.userNickname).indexOf(text.value) !== -1) {
            console.log([n]);
            newList.value.push(n) 

          }
        });
      }
    });
    list.value = newList.value
  }
};

onMounted(async () => {
  await getList();
});
const getList = () => {
  const userID =JSON.parse(localStorage.getItem("admin")).userId
//   store.adminMessg.userId
  getContact(userID).then((res) => {
    if (res.code === 200) {
      list.value = data_letter_sort(res.data);
      copyList.value = JSON.parse(JSON.stringify(list.value));
    }
  });
};

function data_letter_sort(data) {
  let letter = "";
  var letter_reg = /^[A-Z]$/;
  var list = new Array();
  for (var i = 0; i < data.length; i++) {
    // 添加 # 分组，用来 存放 首字母不能 转为 大写英文的 数据
    list["#"] = new Array();
    // 首字母 转 大写英文
    letter = pinyin(data[i].userNickname).substr(0, 1).toUpperCase();
    // 是否 大写 英文 字母
    if (!letter_reg.test(letter)) {
      letter = "#";
    }
    // 创建 字母 分组
    if (!(letter in list)) {
      list[letter] = new Array();
    }
    // 字母 分组 添加 数据
    list[letter].push(data[i]);
  }
  // 转换 格式 进行 排序；
  var resault = new Array();
  for (var key in list) {
    resault.push({
      letter: key,
      list: list[key],
    });
  }
  resault.sort(function (x, y) {
    return x.letter.charCodeAt(0) - y.letter.charCodeAt(0);
  });
  // # 号分组 放最后
  var last_arr = resault[0];

  resault.splice(0, 1);
  resault.push(last_arr);
  console.log(resault);
  //   console.log(resault)
  // 转换 数据 格式
  //   var json_sort = {};
  //   for (var i = 0; i < resault.length; i++) {
  // json_sort[resault[i].letter] = resault[i].list;

  // console.log(json_sort[resault[i].letter],resault[i].list);
  //   }
  return resault;
}
</script>
<style lang="less" scoped>
header {
  color: #e8e8e9;
  font-size: 16px;
  height: 44px;
  line-height: 44px;
  padding: 0 10px;
  text-align: center;
  .leftArrow {
    position: absolute;
    width: 25px;
    height: 25px;
    top: 7px;
    left: 10px;
    z-index: 1;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
.search {
  padding: 10px 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .searchwarp {
    width: 100%;
    height: 44px;
    background: #242630;
    input {
      width: 100%;
      height: 44px;
      border: 0;
      background: #242630;
      padding: 0;
      margin: 0;
      color: #e8e8e9;
      outline: none;
    }
  }
}
.uwarp {
  padding: 0 20px;
  margin-bottom: 5px;
  color: #e8e8e9;
  h3 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
  }
}
.liwarp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  .imgwarp {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .limg {
    width: 50px;
    height: 50px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .rimg {
    width: 18px;
    height: 18px;
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
  .ltext {
    margin-left: 10px;
  }
}
</style>
