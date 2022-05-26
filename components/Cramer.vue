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
    <!-- <button @click="set0_A">Set0</button> -->
    <b-button variant="success" @click="set0_A">set0_A</b-button>
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
    <!-- <button @click="set0_B">Set0</button> -->
    <b-button variant="success" @click="set0_B">set0_B</b-button>
    <br />
    <br />
    <br />
    <div>
      <b-button variant="success" @click="cal">Confirm</b-button>
    </div>
    <!-- <vue-mathjax :formula="formula"></vue-mathjax> -->
    <!-- <div class="katex" v-katex:display="`\\begin{bmatrix}
    1 & 2 \\\\ 3 & 4
    \\end{bmatrix}`"></div> -->
    <div class="katex" v-katex:display="formula"></div>
    <!-- <div>
      <tr v-for="n in MatrixA.row" :key="n + 'a'" style="display: flex">
      </tr>
      <tr v-for="i in MatrixA.row" :key="i + 'b'">
      </tr>
    </div> -->
  </div>
</template>

<script>
import * as math from 'mathjs'
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
      item: [],
      formula: '',
    }
  },
  // async asyncData ({ $content }) {
  //   const document = await $content('document').fetch()
  //   return {
  //     document
  //   }
  // },
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
      var temp1 = [[]]
      var temp2 = [[]]
      var temp = []
      let beforelatex1 = JSON.stringify(this.MatrixA.Input)
      temp1 = [].concat(...this.MatrixB.Input)
      temp2 = this.MatrixA.Input
      let check = math
        .parse(beforelatex1)
        .toTex({ parenthesis: 'keep', implicit: 'show' })
      console.log(check.replace(/\\/g, '\\\\'))

      var result = cramersRule(this.MatrixA.Input, temp1)
      console.log(result)
      let beforelatex2 = JSON.stringify(result)
      let check2 = math
        .parse(beforelatex2)
        .toTex({ parenthesis: 'keep', implicit: 'show' })
      check2.replace(/\\/g, '\\\\')
      let form = check + '=' + check2
      // console.log(form)

      this.formula = form
      function cramersRule(matrix, freeTerms) {
        var det = detr(matrix)
        var returnArray = []
        var tmpMatrix

        for (let i = 0; i < matrix[0].length; i++) {
          var tmpMatrix = insertInTerms(matrix, freeTerms, i)
          returnArray.push(detr(tmpMatrix) / det)
        }
        return returnArray
      }

      function insertInTerms(matrix, ins, at) {
        var tmpMatrix = clone(matrix)
        for (let i = 0; i < matrix.length; i++) {
          tmpMatrix[i][at] = ins[i]
        }
        return tmpMatrix
      }
      function detr(m) {
        var ret = 1
        var k
        var A = clone(m)
        var n = m[0].length
        var alpha

        for (var j = 0; j < n - 1; j++) {
          k = j
          for (let i = j + 1; i < n; i++) {
            if (Math.abs(A[i][j]) > Math.abs(A[k][j])) {
              k = i
            }
          }
          if (k !== j) {
            temp = A[k]
            A[k] = A[j]
            A[j] = temp
            ret *= -1
          }
          var Aj = A[j]
          for (let i = j + 1; i < n; i++) {
            var Ai = A[i]
            var alpha = Ai[j] / Aj[j]
            for (k = j + 1; k < n - 1; k += 2) {
              var k1 = k + 1
              Ai[k] -= Aj[k] * alpha
              Ai[k1] -= Aj[k1] * alpha
            }
            if (k !== n) {
              Ai[k] -= Aj[k] * alpha
            }
          }
          if (Aj[j] === 0) {
            return 0
          }
          ret *= Aj[j]
        }
        return Math.round(ret * A[j][j] * 100) / 100
      }
      function clone(m) {
        return m.map(function (a) {
          return a.slice()
        })
      }
    },
  },
}

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
</script>

<style scoped>
.katex {
  font-size: 30px;
}
input {
  border: 2px solid black;
  border-radius: 4px;
}
</style>
