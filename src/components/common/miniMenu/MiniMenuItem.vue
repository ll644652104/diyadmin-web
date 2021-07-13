<template>
  <div class="mini-menu">
    <slot name="icon"></slot>
    <slot name="name"></slot>
  </div>
</template>

<script>
  export default {
    name: "MiniMenuItem",

  }
</script>

<style scoped>
  .mini-menu {
    color: rgb(191, 203, 217);
  }
</style>