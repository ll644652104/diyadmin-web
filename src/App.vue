<template>
  <div id="app" v-cloak>
    <router-view></router-view>
  </div>


</template>

<script>
  // import MainMenu from "components/content/mainMenu/MainMenu"

export default {
  name: 'App',
  components: {
    // MainMenu
  },
  data() {
    return{
      message: "闪烁问题"
    }
  }

}
</script>

<style>

  #app {
    height: 100%;
  }
  html,
  body {
    margin: 0;
    height: 100%;
  }

  [v-cloak] {
    display: none !important;
  }
</style>
