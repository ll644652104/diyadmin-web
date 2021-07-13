<template>
  <el-dialog
      :title="title"
      v-model="dialog"
      width="450px">

    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="IP地址" prop="ipaddr">
        <el-input v-model="ruleForm.ipaddr" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input v-model="ruleForm.port" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input type="remarks" v-model="ruleForm.remarks" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="testServer">测 试</el-button>
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary"  @click="addServer" v-if="updateRow==null">确 定</el-button>
        <el-button type="primary"  @click="updateServer" v-else>修 改</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
  import {postRequestFromData, postRequestFromDataWithFun, putRequest} from "../../../config/api";
  import {ElMessage} from "element-plus";

  export default {
    name: "DialogMenu",
    props: {
      dialogVisible: Boolean,
      updateRow: Object,
      current: Number
    },
    data() {
      return {
        dialog: this.dialogVisible,
        ruleForm: {
          ipaddr: '',
          username: '',
          port: '',
          password: '',
          remarks: ''
        },
        title: '',
      }
    },
    methods: {
      updateServer(){
        putRequest("/api/diyadmin/server",{
          id: this.updateRow.id,
          ipaddr: this.ruleForm.ipaddr,
          port: this.ruleForm.port,
          password: this.ruleForm.password,
          remarks: this.ruleForm.remarks,
          username: this.ruleForm.username
        }).then(()=>{
          this.dialog = false;
          this.$parent.getTableData(this.current);
        });
      },

      addServer(){// eslint-disable-line no-unused-vars
        postRequestFromData("/api/add/server",{
          ipaddr: this.ruleForm.ipaddr,
          port: this.ruleForm.port,
          password: this.ruleForm.password,
          remarks: this.ruleForm.remarks,
          username: this.ruleForm.username
        }).then(()=>{
          this.dialog = false;
          this.$parent.getTableData(this.current);
        });
      },
      testServer(){
        postRequestFromDataWithFun("/api/test/server",{
          ipaddr: this.ruleForm.ipaddr,
          port: this.ruleForm.port,
          password: this.ruleForm.password,
          remarks: this.ruleForm.remarks,
          username: this.ruleForm.username
        },success=>{
          if(success.data === false){
            ElMessage.error({
              message: "测试无法连接！"
            })
          }else{
            ElMessage.success({
              message: "测试可以连接！"
            })
          }
        },err=>{
          console.log(err);
        });
      },
    },
    watch:{
      dialogVisible:{
        handler(n){
          this.dialog = n //赋值给data
          if(this.dialog==true&&this.updateRow != null){
            this.ruleForm = this.updateRow;
            this.title="修改服务器"
          }else{
            this.title="新增服务器"
          }
        },
        deep:true// 深度监听父组件传过来对象变化
      },
      dialog:{
        handler(n){
          this.$emit('func',n) //赋值给data
        },
        deep:true// 深度监听父组件传过来对象变化
      }
    },
  }
</script>

<style scoped>
  /* 修改输入框的样式 */
  .el-input {
    width: 250px;
    /*line-height: 30px;*/
  }
</style>