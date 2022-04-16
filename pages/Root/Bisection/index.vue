<template>
  <div class="bisec">
    <Bisec />
  </div>
</template>

<script>
import Bisec from '~/components/Bisec.vue'
export default {
  components: {
    Bisec,
  },
  layout:'core2',
}
</script>

<style>
.bisec {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
