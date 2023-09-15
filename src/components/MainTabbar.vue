<template>
    <tab-bar>
       <tab-bar-item  >
         <!-- <img slot="item-icon" src="@/assets/img/tabbar/shouye.png" alt=""> -->
         <div >首页</div>
       </tab-bar-item>
       <tab-bar-item >
         <!-- <img slot="item-icon" src="@/assets/img/tabbar/icon_category.png" alt=""> -->
         <div >分类</div>
       </tab-bar-item>
       <tab-bar-item>
         <!-- <img slot="item-icon" src="@/assets/img/tabbar/gouwuche.png" alt=""> -->
         <div >购物车</div>
       </tab-bar-item>
       <tab-bar-item >
         <!-- <img slot="item-icon" src="@/assets/img/tabbar/wode.png" alt=""> -->
         <div >我的</div>
       </tab-bar-item>
     </tab-bar>
 </template>
 
 <script setup>
 import TabBar from './tabbar/Tabbar.vue';
 import TabBarItem from './tabbar/TabbarItem.vue';

 </script>
 
 <style>
 
 </style>
 
