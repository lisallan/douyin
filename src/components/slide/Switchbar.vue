<template>
  <div>
    <div class="indicator-ctn">
      <div class="tabs" ref="tabs">
        <div
          v-for="(item, index) in tableIndex"
          :key="index"
          :class="Iindex == index ? 'active' : 'tabsitem'"
          class="tabsitem"
        >
          <span @click="switchTable(item, index)">{{ item }}</span>
        </div>
      </div>
    </div>
    <component v-if="props.listTable"  :is="Iindex === 0 ? Video : User"> </component>
    <component
      v-else
      :is="
        Iindex === 0 ? Switchworks : Iindex === 1 ? Switchtrends : Switchlike
      "
      :flag="flag"
    >
    </component>
  </div>
</template>
<script setup>
import { defineAsyncComponent, ref } from "vue";
const Switchworks = defineAsyncComponent(() => import("./Switchworks.vue")); // 动态/异步组件
const Switchlike = defineAsyncComponent(() => import("./Switchlike.vue")); // 动态/异步组件
const Switchtrends = defineAsyncComponent(() => import("./Switchtrends.vue")); // 动态/异步组件
const User = defineAsyncComponent(() => import("../search/user.vue")); // 动态/异步组件
const Video = defineAsyncComponent(() => import("../search/video.vue")); // 动态/异步组件
const props = defineProps(["listTable"]);
const emits = defineEmits(["Iindex"])
const tableIndex = ref(["作品", "动态", "喜欢"]);
if (props.listTable) {
  tableIndex.value = props.listTable;
} else {
  tableIndex.value = ["作品", "动态", "喜欢"];
}
const flag=ref(false) 
const Iindex = ref(0);
const switchTable = (item, index) => {
   
  Iindex.value = index;
  emits("Iindex", Iindex)
};
</script>
<style scoped lang="less">
@import "../../assets/less/index";

.indicator-ctn {
  font-size: 14rem;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  .tabs {
    display: flex;
    justify-content: space-around;
    font-weight: 400;
    color: white;
    font-size: 16px;
    text-align: center;
  }
  .tabsitem {
    width: 100%;
    padding: 12px;
  }
  .active {
    border-bottom: 2px solid #face15;
  }
}
</style>
