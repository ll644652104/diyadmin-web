<template>
  <div></div>
</template>

<script>
  import { onMounted, inject } from 'vue'
  export default {
    setup() {
      const message = inject('$axios')
      onMounted(() => {
        console.log(message);
      })
    }
  }
</script>

<style scoped>

</style>