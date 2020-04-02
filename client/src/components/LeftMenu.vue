<template>
  <div class="menu_page">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#324057"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <router-link to="/home">
            <el-menu-item index="1">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
          </router-link>
          <template v-for="item in items">
            <!-- {{item}} -->
            <el-submenu 
            v-if="item.children" 
            :key="item.path" 
            :index="item.path"
            >
            <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
            </template>
            <router-link v-for="(citem,cindex) in item.children" 
            :key="cindex"
            :to="citem.path"
            >
            <el-menu-item :index="citem.path">
              <span slot="title">{{citem.name}}</span>
            </el-menu-item>

            </router-link>

            </el-submenu>
          </template>

          <!-- <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>

          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>-->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "leftmenu",
  data() {
    return {
      items: [
        {
          icon: "el-icon-money",
          name: "资金管理",
          path: "fund",
          children: [
            {
              path: "foundlist",
              name: "资金流水"
            }
          ]
        },
        {
          icon: "el-icon-info",
          name: "信息管理",
          path: "info",
          children: [
            {
              path: "showinfo",
              name: "个人信息"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>