<template>
  <div class="Gauss">
    <Gauss_Eliminate></Gauss_Eliminate>
  </div>
</template>

<script>
import Gauss_Eliminate from '~/components/Gauss_Eliminate.vue'
export default {
  layout: 'core3',
  components: { Gauss_Eliminate },
}
</script>

<style>
.Gauss {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
