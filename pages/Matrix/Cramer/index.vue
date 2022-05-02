<template>
  <div id="app">
    <h1>Finds</h1>
    <div>
      <p>MatrixA</p>
      <input type="number" v-model.number="MatrixA.row" />
      <input type="number" v-model.number="MatrixA.column" />
    </div>
    <div v-for="n in MatrixA.row" :key="n + 'a'" style="display: flex">
      <div v-for="i in MatrixA.column" :key="i + 'b'">
        <input type="number" v-model.number="getfoo(n - 1)[i - 1]" />
      </div>
    </div>
    <p>{{ MatrixA.Input }}</p>
    <button @click="set0_A">Set0</button>
    <div>
      <p>MatrixB</p>
      <input type="number" v-model.number="MatrixB.row" />
      <input type="number" v-model.number="MatrixB.column" />
    </div>
    <div v-for="j in MatrixB.row" :key="j + 'c'" style="display: flex">
      <div v-for="k in MatrixB.column" :key="k + 'd'">
        <input type="number" v-model.number="getfoo2(j - 1)[k - 1]" />
      </div>
    </div>
    <p>{{ MatrixB.Input }}</p>
    <button @click="set0_B">Set0</button>
    <!-- <div>
      <input type="number" v-model.number="MatrixA.row" />
      <input type="number" v-model.number="MatrixA.column" />
    </div> -->
    <!-- <p>{{ array }}</p> -->
  </div>
  <!-- <p>{{ check() }}</p>
    <p>{{ MatrixA.row }}</p> -->
</template>

<script>
export default {
  layout: 'core3',
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
      x: 2,
      y: 2,
      array: [],
    }
  },
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
          console.log(this.MatrixA.Input)
        }
      }
      return this.MatrixA.Input[n]
    },
    getfoo2(n) {
      if (!this.MatrixB.Input[n]) {
        this.MatrixB.Input = []
        for (let i = 0; i < this.MatrixB.row; i++) {
          let row = []
          for (let j = 0; j < this.MatrixB.column; j++) {
            row.push(0)
          }
          this.MatrixB.Input.push(row)
          console.log(this.MatrixB.Input)
        }
      }
      return this.MatrixB.Input[n]
    },
    set0_A() {
      return (this.MatrixA.Input = [])
    },
    set0_B() {
      return (this.MatrixA.Input = [])
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
