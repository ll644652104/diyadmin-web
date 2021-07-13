<template>

    <el-container class="container-menu">
      <!--侧边栏菜单-->
      <AsideMenu></AsideMenu>

      <!--头部导航栏-->
      <el-container direction="vertical">
        <HeadBar></HeadBar>

        <!--主体内容-->
        <Main><router-view></router-view></Main>
      </el-container>
    </el-container>

</template>

<script>
   import AsideMenu from "components/content/asideMenu/AsideMenu";
   import HeadBar from "components/content/headbar/HeadBar";
   import Main from "views/main/Main";
  export default {
    name: "Home",
    components: {
      // MainMenu
      AsideMenu,
      HeadBar,
      Main
    },

  }
</script>

<style scoped>


  .el-container {
    height: 100%;
    /*border: 1px solid #eee;*/
    background-color: #304156;
    padding: 0;
  }

  .el-main {
    /*overflow: hidden;*/
  }


</style>