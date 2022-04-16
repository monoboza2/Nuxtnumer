<template>
  <div>
    <div>
      <label for="f(x)">F(x):</label>
      <input v-model="fomular" id="f(x)" />
    </div>
    <div>
      <label for="XL">XL:</label>
      <input value="XL" v-model="XL" id="XL" />
      <label for="XR">XR:</label>
      <input value="XR" v-model="XR" id="XR" />
    </div>
    <div>
      <label for="Error">ERROR:</label>
      <input value="Error" v-model="Error" id="Error" />
    </div>
    <div>XL:{{ showXL }} XR:{{ showXR }} XLAST:{{ showXM }} ERROR:{{ showE }}</div>
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
import chart from './chart'
export default {
  data() {
    return {
      fomular: '43*x-1',
      XR: '0.03',
      XL: '0.02',
      showXR: '',
      showXL: '',
      showXM: '',
      showE: '',
      count: '',
      Error: '0.000001',

      chartData: {
        labels: [0],
        datasets: [
          {
            label: 'Error:',
            borderColor: '#4bcc96',
            borderWidth: 4,
            fill: false,
            data: [0],
          },
          {
            label: 'XLAST:',
            borderColor: '#4bcc96',
            borderWidth: 4,
            fill: false,
            data: [0],
          },
          {
            label: 'XR:',
            borderColor: '#4bcc96',
            borderWidth: 4,
            fill: false,
            data: [0],
          },
          {
            label: 'XL:',
            borderColor: '#4bcc96',
            borderWidth: 4,
            fill: false,
            data: [0],
          },
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
      },
    }
  },
  methods: {
    Confirm: function () {
      const Parser = require('expr-eval').Parser
      const parser = new Parser()
      let expr = parser.parse(this.fomular)

      function cal(a) {
        return expr.evaluate({ x: a })
      }
      function cal2(xn, xo) {
        return Math.abs((xn - xo) / xn)
      }
      let xl = parseFloat(this.XL)
      let xr = parseFloat(this.XR)
      let y = 1
      let x1 = 0
      let e = parseFloat(this.Error)
      let c = 0

      while (y > e) {
        x1 = (xl * cal(xr) - xr * cal(xl)) / (cal(xr) - cal(xl))
        if (cal(x1) * cal(xr) > 0) {
          y = cal2(x1, xr)
          xr = x1
        } else {
          y = cal2(x1, xl)
          xl = x1
        }
        console.log('xl:' + xl.toFixed(6))
        console.log('xr:' + xr.toFixed(6))
        console.log('e:' + y.toFixed(6))
        console.log('x1:' + x1.toFixed(6))

        this.chartData.labels[c] = c
        this.chartData.datasets[0].data[c] = y.toFixed(6)
        this.chartData.datasets[1].data[c] = x1.toFixed(6)
        this.chartData.datasets[2].data[c] = xr.toFixed(6)
        this.chartData.datasets[3].data[c] = xl.toFixed(6)
        c++
        this.showXL = xl.toFixed(6)
        this.showXR = xr.toFixed(6)
        this.showE = y.toFixed(6)
        this.showXM = x1.toFixed(6)
      }
    },
  },
}
</script>

<style>
.line-chart {
  width: 60vw;
  height: 50vh;
}
.chart-div{
  display:flex;
  justify-content: center;
}
</style>
