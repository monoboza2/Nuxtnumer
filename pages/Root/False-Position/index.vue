<template>
  <div class="false">
    <False />
  </div>
</template>

<script>
import False from '~/components/False.vue'
export default {
  components: {
    False,
  },
  layout:'core2',
}
</script>

<style>
.false {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
