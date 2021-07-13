<template>
  <el-header style="text-align: right; font-size: 12px">
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span>{{username}}</span>
  </el-header>
</template>

<script>
  export default {
    name: "HeadBar",
    data(){
      return {
        username: this.$route.params.username
      }
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 60px !important;
    line-height: 60px;
    line-height: 60px;

  }
</style>