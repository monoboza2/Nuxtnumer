<template>
  <div id="app">
    <h1>Finds</h1>
    <div>
      <p>MatrixA</p>
      <input type="number" v-model.number="MatrixA.row" min="0" />
      <!-- <input type="number" v-model.number="MatrixA.column" min="0" /> -->
    </div>
    <div v-for="n in MatrixA.row" :key="n + 'a'" style="display: flex">
      <div v-for="i in MatrixA.row" :key="i + 'b'">
        <input type="number" v-model.number="getfoo(n - 1)[i - 1]" />
      </div>
      <!-- <input type="number" v-model.number="MatrixB.Input[n - 1][i - 1]" /> -->
    </div>
    <p>{{ MatrixA.Input }}</p>
    <button @click="set0_A">Set0</button>
    <div>
      <p>MatrixB</p>
      <!-- <input type="number" v-model.number="MatrixB.row" min="0" />
      <input type="number" v-model.number="MatrixB.column" min="0" /> -->
    </div>
    <div v-for="j in MatrixA.row" :key="j + 'c'" style="display: flex">
      <div v-for="k in 1" :key="k + 'd'">
        <input type="number" v-model.number="getfoo2(j - 1)[k - 1]" />
      </div>
    </div>
    <p>{{ MatrixB.Input }}</p>
    <button @click="set0_B">Set0</button>
    <div>
      <button @click="cal">Cal</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      MatrixA: {
        row: 0,
        column: 0,
        Input: [],
      },
      MatrixB: {
        row: 1,
        column: 0,
        Input: [],
      },
      item: []
    }
  },
  // async fetch() {
  //   this.item = await fetch('http://localhost:3001/members').then((res) =>
  //     res.json()
  //   )
  // },
  methods: {
    getfoo(n) {
      if (!this.MatrixA.Input[n]) {
        this.MatrixA.Input = []
        for (let i = 0; i < this.MatrixA.row; i++) {
          let row = []
          for (let j = 0; j < this.MatrixA.column; j++) {
            row.push(0)
          }
          this.MatrixA.Input.push(row)
        }
      }
      return this.MatrixA.Input[n]
    },
    getfoo2(n) {
      this.MatrixB.row = this.MatrixA.row
      if (!this.MatrixB.Input[n]) {
        this.MatrixB.Input = []
        for (let i = 0; i < this.MatrixB.row; i++) {
          let row = []
          for (let j = 0; j < this.MatrixB.column; j++) {
            row.push(0)
          }
          this.MatrixB.Input.push(row)
        }
      }
      return this.MatrixB.Input[n]
    },
    set0_A() {
      console.log(JSON.stringify(this.item))
      return (this.MatrixA.Input = [])
    },
    set0_B() {
      return (this.MatrixB.Input = [])
    },
    cal() {
      console.log(this.MatrixA.Input[0])
      var temp1 = [[]]
      var temp2 = [[]]
      temp1 = this.MatrixB.Input
      temp2 = this.MatrixA.Input

      console.log(JSON.stringify(this.MatrixA.Input))
    },
  },
  computed: {
    // check: function () {
    //   for (let i = 0; i < this.y; i++) {
    //     let row = []
    //     for (let j = 0; j < this.x; j++) {
    //       row.push(0)
    //     }
    //     this.array.push(row)
    //   }
    //   console.log(this.array[0][0])
    // },
  },

  // created: function () {
  //   for (let i = 0; i < this.y; i++) {
  //     let row = []
  //     for (let j = 0; j < this.x; j++) {
  //       row.push(0)
  //     }
  //     this.array.push(row)
  //   }
  //   console.log(this.array[0][0])
  // },
}
</script>

<style></style>
