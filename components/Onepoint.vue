<template>
  <div>
    <div>
      <b-form-checkbox
        id="checkbox-1"
        v-model="status"
        name="checkbox-1"
        value="true"
        unchecked-value="false"
      >
        API
      </b-form-checkbox>
    </div>
    <div v-if="status == 'true'">
      <label for="f(x)">F(x):{{ check }}</label>
    </div>
    <div v-else>
      <label for="f(x)">F(x):</label>
      <input v-model="fomular" id="f(x)" />
    </div>
    <div>
      <label for="X">X:</label>
      <input v-model="x" id="X" />
    </div>
    <div>XLAST:{{ showx }} ERROR:{{ showE }}</div>
    <div>
      <b-button variant="success" @click="Confirm">Confirm</b-button>
    </div>
    <div>
      <h1>Chart</h1>
      <div class="chart-div">
        <line-chart
          :data="chartData"
          :options="chartOptions"
          class="line-chart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as math from 'mathjs'

export default {
  data() {
    return {
      fomular: '',
      x: '0',
      showE: '0',
      showx: '0',
      Error: '0.000001',
      item: '',
      status: 'false',
      check: '',
      chartData: {
        labels: [0],
        datasets: [
          {
            label: 'x:',
            borderColor: '#4bcc96',
            borderWidth: 4,
            fill: false,
            data: [0],
          },
          {
            label: 'Error:',
            borderColor: '#4bcc96',
            borderWidth: 4,
            fill: false,
            data: [0],
          },
        ],
        chartOptions: {
          maintainAspectRatio: false,
          responsive: true,
        },
      },
    }
  },
  async created() {
    // const aw = { $bp: this.$bp }
    // this.token = aw.$bp
          const user = await this.$http.$post('http://localhost:3004/login', {
        email: 's6204062616057@email.kmutnb.ac.th',
        password: '123456789',
      })
      // console.log(user.accessToken)
      this.token = user.accessToken
    const headers = { Authorization: `Bearer ${this.token}` }
    const response = await fetch('http://localhost:3004/Onepoint', { headers })
    const data = await response.json()
    this.check = data[0].eq
    console.log(data[0].eq)
  },
  methods: {
    Confirm() {
      try {
        if (this.status === 'true') {
          this.fomular = this.check
        }
        const Parser = require('expr-eval').Parser
        const parser = new Parser()
        let expr = parser.parse(this.fomular)
        console.log(expr)
        let y = 100
        let x = parseFloat(this.x)
        let e = parseFloat(this.Error)
        let temp = 0
        console.log(x)

        function cal(a) {
          return expr.evaluate({ x: a })
        }
        let i = 0
        while (y > e) {
          temp = cal(x)
          y = Math.abs((temp - x) / temp)
          x = temp
          console.log(x.toFixed(6))
          console.log(y.toFixed(6))

          this.chartData.labels[i] = i
          this.chartData.datasets[0].data[i] = x.toFixed(6)
          this.chartData.datasets[1].data[i] = y.toFixed(6)
          i++
        }
      } catch (e) {}
    },
  },
}
</script>

<style scoped>
input {
  border: 2px solid black;
  border-radius: 4px;
}
.line-chart {
  width: 60vw;
  height: 50vh;
}
.chart-div {
  display: flex;
  justify-content: center;
}
</style>
