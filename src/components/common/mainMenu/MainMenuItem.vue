<template>
  <div>
    <div @click="clickBtn" class="test">
      <slot name="left-icon"></slot>
      <slot name="middle-name"></slot>
      <slot name="right-up" v-if="activeIdd"></slot>
      <slot name="right-down" v-else></slot>
    </div>

    <div :style="activeMenu" ><slot name="mini-menu"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "MainMenuItem",
    props: {
      activeId:{
        type: Boolean,
        required: true
      }
    },
    data(){
      return {
        activeIdd: this.activeId
      }
    },
    computed: {
      activeMenu() {
        return !this.activeIdd ? "display: none":"";
      },

    },
    methods: {
      clickBtn(){
        console.log("点击鼠标");
        this.activeIdd = !this.activeIdd
      }
    },
  }
</script>

<style scoped>
  .test {
    padding: 0 20px;

  }
</style>