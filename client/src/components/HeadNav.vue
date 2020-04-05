<template>
  <div class="head-nav">
    <el-row>
      <!-- 头部左侧 -->
      <el-col :span="6" class="logo-container">
        <img src="../assets/logo.png" alt class="logo" />
        <span class="title">account-books</span>
      </el-col>
      <!-- 头部右侧 -->
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar" />
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <div class="username">
            <el-dropdown size="medium" trigger="click" @command="dropdowninfo">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="showinfo">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出账号</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "head-nav",
  components: {},
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  // created() {
  //     console.log(this.$store.getters.user);
  // },
  methods: {
    dropdowninfo(item) {
      if (!item) {
        this.$message("菜单栏中没有command属性!!");
        return;
      }
      switch (item) {
        case "showinfo":
          this.showinfo();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showinfo() {
      //todo 跳转到用户信息组件
      //* 这里一定要加上catch。具体原因看http://www.wyb.plus/index.php/archives/1336/
      this.$router.push("/showinfo").catch(err=>{err})
    },
    logout() {
      //todo 登出,清空token缓存,清空认证状态,跳转到login页
      localStorage.removeItem("eleToken");
      this.$store.dispatch("clearCurrentState");
      this.$router.push("/login");
    }
  }
};
</script>
<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
  cursor: pointer;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
  display: inline;
}
.el-dropdown {
  color: #fff;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>