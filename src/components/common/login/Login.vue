<template>
  <div id="login-main">
    <div id="login-menu">
      <h2 id="login-title">后台登录</h2>

      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="登录用户" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="imageCode" id="imageCode">
          <el-input v-model="ruleForm.imageCode"></el-input><img :src="codeImage" alt="" @click="submitImageCode">
        </el-form-item>
        <el-form-item>
          <el-button type="submit" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>


</template>

<script>
  import {postRequestFromDataWithFun} from "../../../config/api";
  import {ElMessage} from "element-plus";
  export default {
    name: "Login",
    data() {
      return {
        codeImage: "/api/code/image?"+new Date(),
        ruleForm: {
          username: '',
          password: '',
          imageCode: ''
        },
        message: null,
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
          ],
          imageCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            // { min: 4, max: 4, message: '长度4个字符', trigger: 'blur' }
          ]
        }
      };
    },

    methods: {
      // 获取验证码
      submitImageCode() {
        console.log("点击submitImageCode");
        this.codeImage = "/api/code/image?"+new Date();
      },

      // 登录判断
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            postRequestFromDataWithFun('/api/login',{
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              imageCode: this.ruleForm.imageCode
            },success=>{
              console.log(success);
              if(success.result == "SUCCESS"){
                this.$router.replace({
                  path: 'home',
                  params: {
                    username: success.data.user.username
                  }
                });
              }
              if(success.result == "FAILED"){
                console.log(1);
                ElMessage.error({
                  message:'验证码错误，请重新输入！'
                })
                this.submitImageCode();
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
    }
}
</script>

<style scoped>
  #login-main {
    width: 100%;
    height: 100%;
    background-image: url("../../../assets/img/bc.jpg");
    background-size: cover;
  }
  #login-menu {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    background-color: white;
  }
  #login-title {
    text-align: center;
  }
  .el-form {
    padding-right: 60px;
  }
  .el-button {
    margin-left: 100px;
  }

  /* 验证码相关样式 */
  #imageCode img {
    height: 40px;
    right: 65px;
    position: fixed;
  }
</style>

<style>
  /* 验证码相关样式 */
  #imageCode .el-input__inner {
    width: 200px;
  }

</style>

