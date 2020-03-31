<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode"
export default {
  name: "app",
  created() {
    //* 判断是否登录
    if (localStorage.eleToken) {
      const decode = jwt_decode(localStorage.eleToken); //* 解码
      this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decode));
      this.$store.dispatch("setUser", decode);
    }
  },
  methods: {
    isEmpty(value) {
      //* 判断传入的值是否为空
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style>
#app {
  background-color: beige;
}
</style>
