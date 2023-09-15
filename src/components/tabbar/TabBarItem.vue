<template>
  <div class="tab-bar-item">
    <!-- 插槽会被直接替换，所有最好在插槽外面包装一个div -->
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>
</template>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* 去除图片自身带的空隙 */
  vertical-align: middle;
}
.active {
  color: rgb(255, 0, 149);
}
</style>
