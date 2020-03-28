<template>
   <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">登录ACCOUNT-BOOKS</span>
            </div>
            <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm" label-width="60px">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="submitForm('loginForm')" class="submit_btn">登  录</el-button>
                </el-form-item>
                <div class="tiparea">
                    <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                </div>
            </el-form>
        </section>
    </div>
</template>
<script>
//* 引入jw-decode解析token值
import jwt_decode from "jwt-decode"
export default {
  name: "register",
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      rules: {
       
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "密码长度需要在6到30个字符之间",
            trigger: "blur"
          },
        
        ],
        
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // console.log(valid);
        // *判断整个表单验证是否成功
        if (valid) {
          // *发送post请求,并且携带数据,注意不要忘了携带数据
          this.$axios
            .post("/api/users/login", this.loginUser)
            .then(res => {
              // *后端验证成功后返回的消息
              this.$message({
                message:
                  "恭喜您登录成功,小书将竭诚为您服务~",
                type: "success"
              });
                //* 后端验证成功后会给我们一个token授权码,
                //* 现在就需要用这个授权码设置登录的有效期
            const {token} =res.data; //* 拿到授权码
            const decode = jwt_decode(token);//* 解码 
            //* 设置本地缓存
            localStorage.setItem("eleToken",token)
            
              // *注意跳转 这里要写在then里面
              this.$router.push("/index");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          //* 失败则return false
          alert("请输入您的完整信息");
          return false;
        }
      });
    }
  },
  component: {}
};
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg_05.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 34%;
  left: 40%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background: linear-gradient(to right, #e6dada, #274046);
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
  opacity: 0.7;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>