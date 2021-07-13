<template>
  <div>
    <MainMenuItem class="main-menu-item" :key="1" :activeId="false">
      <template v-slot:left-icon><icon class="iconfont icon-xitongjiankong"></icon></template>
      <template v-slot:middle-name><span>系统管理</span></template>
      <template v-slot:right-up><icon class="iconfont icon-xiangshang right-icon"></icon></template>
      <template v-slot:right-down><icon class="iconfont icon-xiangxia right-icon"></icon></template>

      <template v-slot:mini-menu>
        <div>

          <router-link  to="/food" tag="div">
            <MiniMenu class="mini-menu-item" >
              <MiniMenuItem>
                <template v-slot:icon><icon class="iconfont icon-xiangxia"></icon></template>
                <template v-slot:name><span>中文中文</span></template>

              </MiniMenuItem>
            </MiniMenu>
          </router-link>
          
          <MiniMenu class="mini-menu-item" >
            <MiniMenuItem>
              <template v-slot:icon><icon class="iconfont icon-xiangxia"></icon></template>
              <template v-slot:name><span>中文中文</span></template>
            </MiniMenuItem>
          </MiniMenu>
          <MiniMenu class="mini-menu-item" >
            <MiniMenuItem>
              <template v-slot:icon><icon class="iconfont icon-xiangxia"></icon></template>
              <template v-slot:name><span>中文中文</span></template>
            </MiniMenuItem>
          </MiniMenu>
          <MiniMenu class="mini-menu-item" >
            <MiniMenuItem>
              <template v-slot:icon><icon class="iconfont icon-xiangxia"></icon></template>
              <template v-slot:name><span>中文中文</span></template>
            </MiniMenuItem>
          </MiniMenu>
          <MiniMenu class="mini-menu-item" >
            <MiniMenuItem>
              <template v-slot:icon><icon class="iconfont icon-xiangxia"></icon></template>
              <template v-slot:name><span>中文中文</span></template>
            </MiniMenuItem>
          </MiniMenu>
        </div>
      </template>
    </MainMenuItem>

    <MainMenuItem class="main-menu-item" :key="2" :activeId="true">
      <template v-slot:left-icon><icon class="iconfont icon-xitongjiankong"></icon></template>
      <template v-slot:middle-name><span>系统管理</span></template>
      <template v-slot:right-up><icon class="iconfont icon-xiangshang right-icon"></icon></template>
      <template v-slot:right-down><icon class="iconfont icon-xiangxia right-icon"></icon></template>

      <template v-slot:mini-menu>
        <MiniMenu>
          <MiniMenuItem class="mini-menu-item" >
            <template v-slot:icon><icon class="iconfont icon-xiangxia"></icon></template>
            <template v-slot:name><span>中文中文</span></template>
          </MiniMenuItem>
        </MiniMenu>
      </template>
    </MainMenuItem>
  </div>

  <router-view></router-view>



</template>

<script>
  import MainMenuItem from "../../common/mainMenu/MainMenuItem"
  import MiniMenu from "../miniMenu/MiniMenu";
  import MiniMenuItem from "../../common/miniMenu/MiniMenuItem"
  export default {
    name: "MainMenu",
    components: {
      MainMenuItem,
      MiniMenu,
      MiniMenuItem
    }
  }
</script>

<style scoped>
  @import "//at.alicdn.com/t/font_2670426_qu74jw2qcgk.css";
  #main-menu {
    -webkit-transition: width .28s;
    transition: width .28s;
    width: 205px!important;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }

  .main-menu-item {
    line-height: 56px;
    font-size: 14px;
    color: rgb(191, 203, 217);
    list-style: none;
    cursor: pointer;
    position: relative;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
  }
  .main-menu-item span {
    color: rgb(191, 203, 217);
    padding-left: 16px;
  }
  .right-icon {
    float:right;
  }
  .mini-menu-item {
    border: none;
    height: 100%;
    width: 100%!important;
    background-color: rgb(66, 38, 86);
    list-style: none;
    position: relative;
    margin: 0;
    padding: 0 20px;
  }
  .mini-menu-item:hover {
    background-color: #9a6e3a;
  }
  .hahaha {
    /*position: absolute;*/
    /*right: 320px;*/
    color: red;
  }
</style>