<template>
  <div class="tabbar">
    <ul>
      <router-link to="/home">
        主页
      </router-link>
      <router-link to="/followed">
        关注
      </router-link>
      <router-link to="/uploadVideo">
        <span>+</span>
      </router-link>
      <router-link to="/message">
        消息
      </router-link>
      <router-link to="/me">
        我
      </router-link>
    </ul>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.tabbar {
  width: 390px;
  height: 44px;
  position: fixed;
  left: 0;
  bottom: 0;
  font-size: 14px;
  background: rgba(26, 27, 32, 0);
  color: #8b8c96;


  ul {
    width: 390px;
    height: 44px;
    display: flex;
    padding: 0;
    margin: 0;
    border-top: 1px solid rgba(41, 40, 37, 0.8);
    background: rgba(26, 27, 32, 0);

    a {
      text-decoration: none;
      color: #8b8c96;
      width: 78px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:nth-child(3) {

        span {
          width: 78px;
          height: 44px;
          font-weight: 600;
          font-size: 20px;
          color: #000;
          border-radius: 5px;
          background: #FFF;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    a.router-link-active {
      color: white;
    }
  }
}
</style>
