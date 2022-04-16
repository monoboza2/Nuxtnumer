<template>
  <div class="app">
    <Onepoint></Onepoint>
  </div>
</template>

<script>
import Onepoint from '@/components/Onepoint'

export default {
  components: {
    Onepoint
  },
  layout:'core2',
}
</script>

<style>
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
