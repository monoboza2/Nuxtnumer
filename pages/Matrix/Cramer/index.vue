<template>
  <div id="app">
    <h1>Finds</h1>
    <div v-for="(find, index) in finds" :key="index">
      <input v-model="find.value" :key="index" />
    </div>
    <button @click="addFind">New Find</button>
    <button @click="print">Console</button>
    <div>
      {{ finds }}
    </div>
  </div>
</template>

<script>
export default {
  layout: 'core3',
  data() {
    return {
      finds: [],
    }
  },
  methods: {
    addFind: function () {
      this.finds.push({ value: '' })
    },
    print: function () {
      let x = this.finds.length
      for (let i = 0; i < x; i++) {
        console.log(i + 1 + ':' + this.finds[i].value)
      }
    },
  },
}
</script>

<style></style>
