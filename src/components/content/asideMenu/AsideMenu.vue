<template>
  <el-aside class="aside-menu"  direction="vertical">

    <el-menu unique-opened router>
      <router-link v-for="(menu,index) in asideMenu" :key="index" :to="menu.link">
        <el-submenu  :index="index" :class="{ 'disable': menu.childMenu==null}">
          <template #title><i class="el-icon- iconfont " :class="menu.icon" ></i>{{menu.title}}</template>
          <el-menu-item-group>
            <el-menu-item :index="childMenuItem.link"
                          v-for="(childMenuItem,childIndex) in menu.childMenu"
                          :key="childIndex">
              <i class="el-icon- iconfont " :class="childMenuItem.icon"></i>
              {{childMenuItem.title}}
            </el-menu-item>
            <!--</router-link>-->

          </el-menu-item-group>
        </el-submenu>
      </router-link>

    </el-menu>
  </el-aside>
</template>

<script>
  import {postRequest} from "../../../config/api";

  export default {
    name: "AsideMenu",
    data() {
      return {
        asideMenu: []
      }
    },
    mounted(){
      this.getMenuDate();//在html加载完成后进行，相当于在页面上同步显示后端数据
    },
    methods: {
      getMenuDate(){
        postRequest('/api/get/all/menu').then(res => {
          console.log(res);
          this.asideMenu=res.data
        })
      }
    },
    computed:{

    },

  }
</script>

<style scoped>


  .el-aside {
    height: 100%;
    color: #333;
    width: 205px !important;
    background-color: #304156;
    /*position: fixed;*/
  }

  .el-menu {
    background-color: #304156;
    color: rgb(191, 203, 217);
    border: 0;
  }

  .el-menu-item {
    padding-left: 40px;
    color: rgb(191, 203, 217);
    background-color: #1f2d3d;
    line-height: 50px;
  }

  .el-menu-item:hover {
    background-color: #001528!important;
  }

  .el-menu-item:focus {
    color: rgb(64, 158, 255);
  }

  .router-link-active{
    text-decoration: none;
  }

  .router-link:active{
    text-decoration: none;
  }
</style>

<style>
  .el-submenu__title{
    color: rgb(191, 203, 217);
  }

  .el-submenu__title:hover {
    background-color: #263445!important;
  }
  .el-menu-item-group__title {
    padding: 0
  }
  /*菜单关闭*/
  .el-submenu>.el-submenu__title .el-submenu__icon-arrow{
    -webkit-transform: rotateZ(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotateZ(-90deg);
  }
  /*菜单展开*/
  .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {
    -webkit-transform: rotateZ(0deg);
    -ms-transform: rotate(0deg);
    transform: rotateZ(0deg);
  }

  /*菜单关闭*/
  .el-submenu.disable>.el-submenu__title .el-submenu__icon-arrow {
    color: #333;
  }
  /*菜单展开*/
  .el-submenu.is-opened.disable>.el-submenu__title .el-submenu__icon-arrow  {
    color: #333;
  }



</style>