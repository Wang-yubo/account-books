<template>
    <div class="index">
        <!-- 这是初始化内容 -->
        <HeadNav></HeadNav>
        <div class="rightContainer">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import HeadNav from "../components/HeadNav.vue"
export default {
    name:"index",
    components:{
        HeadNav
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
  background-color:burlywood;
}
</style> 