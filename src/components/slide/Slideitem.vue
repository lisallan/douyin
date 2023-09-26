<template>
  <div class="slideitemwarp" ref="warper" id="box" v-redHeart="'box'" >
    <div
      class="slideitem"
      @touchstart="touchStart($event)"
      @touchmove="touchMove($event)"
      @touchend="touchEnd($event)"
      ref="slideitem"
    >
      <Playvido />
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, nextTick, computed,provide } from "vue";
import Playvido from "../Video.vue";

const slideitem = ref(null);
const props = defineProps(["list"]);
const warper = ref()
let videoIndex = ref(0)
// 滑动
let fullpage = reactive({
    current: 1,         // 当前的页面编号
    isScrolling: false, // 是否在滚动,是为了防止滚动多页，需要通过一个变量来控制是否滚动
    deltaY: 0           // 返回鼠标滚轮的垂直滚动量，保存的鼠标滚动事件的deleteY,用来判断是往下还是往上滚
})
const state = reactive({
  start: {
    x: "",
    y: "",
    time: "",
  }
});
const touchStart = (e) => {
  state.start.x = e.touches[0].pageX;
  state.start.y = e.touches[0].pageY;
  state.start.time = Date.now();
};
const touchMove = (e) => {
    e.preventDefault()
};
const touchEnd = (e) => {
    const endTime = Date.now()
    const endX = e.changedTouches[0].clientX
    const endY = e.changedTouches[0].clientY
    //判断按下的时长
    if (endTime - state.start.time > 2000) {
        return
    }
    //滑动的方向
    let direction = "";
    //先判断用户滑动的距离，是否合法，合法:判断滑动的方向 注意 距离要加上绝对值
    if (Math.abs(endY - state.start.y) > 10) {
        //滑动方向
        direction = endY - state.start.y > 0 ? "down" : "up"
    } else {
        return
    }
    //用户做了合法的滑动操作
    // console.log('方向'+direction)
    if (direction === 'up') {
        next();
    }
    if (direction === 'down') {
        pre();
    }

};
const directToMove = (index) => {
    let height = warper.value.clientHeight; //获取屏幕的宽度
    // console.log(height);
    let scrollPage = slideitem.value // 获取执行tarnsform的元素
    let scrollHeight; // 计算滚动的告诉，是往上滚还往下滚
    scrollHeight = -(index - 1) * height + "px";
    scrollPage.style.transform = `translateY(${scrollHeight})`;//偏移的量
    fullpage.current = index;
};
const move = (index)=>{
    videoIndex.value = index - 1
    fullpage.isScrolling = true; // 为了防止滚动多页，需要通过一个变量来控制是否滚动
    directToMove(index); //执行滚动
    setTimeout(() => {  //这里的动画是1s执行完，使用setTimeout延迟1s后解锁
        fullpage.isScrolling = false;
    }, 1010);
}
const next = () => {
  let length = props.list.length
    if (fullpage.current + 1 <= length) { // 如果当前页面编号+1 小于总个数，则可以执行向下滑动
        fullpage.current += 1; // 页面+1
        move(fullpage.current); // 执行切换
    }
}
// 往上切换
const pre = () => {
    if (fullpage.current - 1 > 0) { // 如果当前页面编号-1 大于0，则可以执行向下滑动
        fullpage.current -= 1;// 页面+1
        move(fullpage.current);// 执行切换
    }

    
}

</script>
<style scoped>
.slideitemwarp {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.slideitem {
  height: 100vh;
  width: 100%;
  transition: all linear 0.5s;
}
</style>
