<template>
  <div>
    <div>
      <label for="f(x)">F(x):</label>
      <input v-model="fomular" id="f(x)" />
    </div>
    <div>
      <label for="X">X:</label>
      <input v-model="x" id="X" />
    </div>
    <div>XLAST:{{ showx }} ERROR:{{ showE }}</div>
    <div>
      <button @click="Confirm">Confirm</button>
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
      fomular: '(1-0.5*x)/1.5',
      x: '0',
      showE: '0',
      showx: '0',
      Error: '0.000001',
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
  methods: {
    Confirm() {
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
    },
  },
}
</script>

<style></style>
