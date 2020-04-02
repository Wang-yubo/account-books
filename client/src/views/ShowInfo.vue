<template>
  <div class="showinfo">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <img :src="user.avatar" alt />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <i class="el-icon-user-solid"></i>
            <span>{{user.name}}</span>
          </div>
          <div class="user-item">
            <i class="el-icon-s-tools"></i>
            <span>{{user.identity=="manager"?"伟大的老板!":"亲爱的老板娘~"}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "showinfo",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>


<style scoped>
.showinfo {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* background-color: aqua; */
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
  padding-left: 200px;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
</style>