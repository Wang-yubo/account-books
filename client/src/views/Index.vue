<template>
    <div class="index">
        <!-- 这是初始化内容 -->
        <HeadNav></HeadNav>
        <LeftMenu></LeftMenu>
        <div class="rightContainer">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
//* 引入HeadNav组件
import HeadNav from "../components/HeadNav.vue"
//* 引入
import LeftMenu from "../components/LeftMenu.vue"

export default {
    name:"index",
    components:{
        HeadNav,
        LeftMenu
    }
}
</script>
<style  scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  /* width: 100%; */
  height: calc(100% - 71px);
  overflow: auto;
}
</style> 