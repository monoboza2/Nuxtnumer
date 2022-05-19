<template>
  <div class="cramer">
    <Cramer></Cramer>
  </div>
</template>

<script>
  import Cramer from '~/components/Cramer.vue'
export default {
  layout: 'core3',
    components: { Cramer },
}
</script>

<style>
.cramer {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
