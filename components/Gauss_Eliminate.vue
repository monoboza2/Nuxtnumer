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
    </div>
    <p>{{ MatrixA.Input }}</p>
    <b-button variant="success" @click="set0_A">Set0_A</b-button>
    <div v-for="j in MatrixA.row" :key="j + 'c'" style="display: flex">
      <div v-for="k in 1" :key="k + 'd'">
        <input type="number" v-model.number="getfoo2(j - 1)[k - 1]" />
      </div>
    </div>
    <p>{{ MatrixB.Input }}</p>
    <b-button variant="success" @click="set0_B">Set0_B</b-button>
    <br>
    <br>
    <br>
    <div>
      <b-button variant="success" @click="cal">Confirm</b-button>
    </div>
    <div class="katex" v-katex:display="formula"></div>
  </div>
</template>

<script>
import * as math from 'mathjs'
export default {
  data() {
    return {
      MatrixA: {
        row: 3,
        column: 3,
        Input: [
          [-2, 3, 1],
          [3, 4, -5],
          [1, -2, 3],
        ],
      },
      MatrixB: {
        row: 3,
        column: 0,
        Input: [[9], [0], [4]],
      },
      item: [],
      formula: '',
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
        }
      }
      return this.MatrixA.Input[n]
    },
    set0_A() {
      // console.log(JSON.stringify(this.item))
      return (this.MatrixA.Input = [])
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
    set0_B() {
      return (this.MatrixB.Input = [])
    },
    cal() {
      // Lower Upper Decomposition
      var a=lusolve(this.MatrixA.Input, this.MatrixB.Input)
      let beforelatex1 = JSON.stringify(this.MatrixA.Input)
      let beforelatex2 = JSON.stringify(a)
      let check = math
        .parse(beforelatex1)
        .toTex({ parenthesis: 'keep', implicit: 'show' })
     console.log(check.replace(/\\/g,"\\\\"))
      let check2 = math
        .parse(beforelatex2)
        .toTex({ parenthesis: 'keep', implicit: 'show' })
      check2.replace(/\\/g,"\\\\")
      let form=check+"="+check2
      this.formula = form
      function lusolve(A, b, update) {
        var lu = ludcmp(A, update)
        if (lu === undefined) return // Singular Matrix!
        return lubksb(lu, b, update)
      }
      function ludcmp(A, update) {
        // A is a matrix that we want to decompose into Lower and Upper matrices.
        var d = true
        var n = A.length
        var idx = new Array(n) // Output vector with row permutations from partial pivoting
        var vv = new Array(n) // Scaling information

        for (var i = 0; i < n; i++) {
          var max = 0
          for (var j = 0; j < n; j++) {
            var temp = Math.abs(A[i][j])
            if (temp > max) max = temp
          }
          if (max == 0) return // Singular Matrix!
          vv[i] = 1 / max // Scaling
        }

        if (!update) {
          // make a copy of A
          var Acpy = new Array(n)
          for (var i = 0; i < n; i++) {
            var Ai = A[i]
            var Acpyi = new Array(Ai.length)
            for (j = 0; j < Ai.length; j += 1) Acpyi[j] = Ai[j]
            Acpy[i] = Acpyi
          }
          A = Acpy
        }

        var tiny = 1e-20 // in case pivot element is zero
        for (var i = 0; ; i++) {
          for (var j = 0; j < i; j++) {
            var sum = A[j][i]
            for (var k = 0; k < j; k++) sum -= A[j][k] * A[k][i]
            A[j][i] = sum
          }
          var jmax = 0
          var max = 0
          for (var j = i; j < n; j++) {
            var sum = A[j][i]
            for (var k = 0; k < i; k++) sum -= A[j][k] * A[k][i]
            A[j][i] = sum
            var temp = vv[j] * Math.abs(sum)
            if (temp >= max) {
              max = temp
              jmax = j
            }
          }
          if (i <= jmax) {
            for (var j = 0; j < n; j++) {
              var temp = A[jmax][j]
              A[jmax][j] = A[i][j]
              A[i][j] = temp
            }
            d = !d
            vv[jmax] = vv[i]
          }
          idx[i] = jmax
          if (i == n - 1) break
          var temp = A[i][i]
          if (temp == 0) A[i][i] = temp = tiny
          temp = 1 / temp
          for (var j = i + 1; j < n; j++) A[j][i] *= temp
        }
        return { A: A, idx: idx, d: d }
      }

      // Lower Upper Back Substitution
      function lubksb(lu, b, update) {
        // solves the set of n linear equations A*x = b.
        // lu is the object containing A, idx and d as determined by the routine ludcmp.
        var A = lu.A
        var idx = lu.idx
        var n = idx.length

        if (!update) {
          // make a copy of b
          var bcpy = new Array(n)
          for (var i = 0; i < b.length; i += 1) bcpy[i] = b[i]
          b = bcpy
        }

        for (var ii = -1, i = 0; i < n; i++) {
          var ix = idx[i]
          var sum = b[ix]
          b[ix] = b[i]
          if (ii > -1) for (var j = ii; j < i; j++) sum -= A[i][j] * b[j]
          else if (sum) ii = i
          b[i] = sum
        }
        for (var i = n - 1; i >= 0; i--) {
          var sum = b[i]
          for (var j = i + 1; j < n; j++) sum -= A[i][j] * b[j]
          b[i] = sum / A[i][i]
        }
        return b // solution vector x
      }
      console.log(a)
    },
  },
}
</script>

<style scoped>
.katex {
  font-size: 30px;
}
input{
  border: 2px solid black;
  border-radius: 4px;
}
</style>
