<template>
  <div class="register">
    <section class="form_container">
      <!--  标题部分 -->
      <div class="manage_tip">
        <span class="title">ACCOUNT-BOOKS管理系统</span>
      </div>

      <!-- 表单部分 -->
      <el-form
        :model="registerUser"
        status-icon
        :rules="rules"
        ref="registerUser"
        label-width="100px"
        class="registerForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerUser.checkPass" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="选择身份" prop="identity">
          <el-select v-model="registerUser.identity" placeholder="请选择身份">
            <el-option label="老板" value="manager"></el-option>
            <el-option label="老板娘" value="employee"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('registerUser')">注册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    const validateUsername = ( rule, value, callback ) => {
				  const uPattern = /[^a-zA-Z0-9_\u4e00-\u9fa5]/,
						uPattern2 = /[^0-9]/
					    
				  if( uPattern.test( value ) || !uPattern2.test( value ) ){
						callback( new Error( '用户名只能包含大小写字母, 数字和下划线,且不能是纯数字' ) );
				  }
				  callback();
			  };
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerUser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validatePsw = ( rule, value, callback ) => {
				  const uPattern = /[ \u4e00-\u9fa5]/;
				  
				  if( uPattern.test( value ) )
						callback( new Error( '密码中不能含有汉字和空格' ) );
				  callback();
			  };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        checkPass: "",
        identity: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            max: 30,
            message: "长度需要在2到16个字符之间",
            trigger: "blur"
          },
          {
            validator: validateUsername,
            trigger: 'blur'
          }
        ],
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
          {
            validator: validatePsw,
            trigger: 'change'
          }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "密码长度需要在6到30个字符之间",
            trigger: "blur"
          },{
            validator:validatePass2, trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName){
      this.$refs[formName].validate( valid =>{
        // console.log(valid);
        // *判断整个表单验证是否成功
        if(valid){
          // *发送post请求,并且携带数据,注意不要忘了携带数据
          this.$axios.post('/api/users/register',this.registerUser)
          .then(res=>{
            // *成功后返回的消息
            this.$message({
              message:"恭喜您注册成功,现在开始您就是我的主人了,小书将竭诚为您服务~",
              type:"success"
            })
            // *注意跳转 这里要写在then里面
            this.$router.push("/login")
          })
          .catch(err=>{
           console.log(err);
          })
         
        }else{ //* 失败则return false
          alert("请输入您的完整信息");
          return false
        }
        
      })
      
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
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 25%;
  left: 40%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: cyan;
}
.registerForm {
  margin-top: 20px;
  background: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d);
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
</style>