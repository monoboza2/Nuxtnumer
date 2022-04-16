<template>
  <div>
    <div>
      <label for="f(x)">F(x):</label>
      <input v-model="fomular" id="f(x)" />
    </div>
    <div>
      <label for="XL">XL:</label>
      <input value="XL" type="number" v-model="XL" id="XL" />
      <label for="XR">XR:</label>
      <input value="XR" type="number" v-model="XR" id="XR" />
    </div>
    <div>
      <label for="Error">ERROR:</label>
      <input value="Error" type="number" v-model="Error" id="Error" />
    </div>
    <div>XL:{{ showXL }} XR:{{ showXR }} XM:{{ showXM }} ERROR:{{ showE }}</div>
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
      fomular: 'x^4-13',
      XR: '2.0',
      XL: '1.5',
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
            label: 'XM:',
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
  mounted () {
      this.Confirm()
    },
  methods: {
    Confirm: function () {

      const Parser = require('expr-eval').Parser
      const parser = new Parser()
      let expr = parser.parse(this.fomular)

      function cal(a) {
        return expr.evaluate({ x: a })
      }
      let xl = parseFloat(this.XL)
      let xr = parseFloat(this.XR)
      let xm = (xl + xr) / 2
      let y = 1
      let temp = 0
      let e = parseFloat(this.Error)
      let c = 0
      while (y >= e) {
        if (cal(xm) * cal(xr) > 0) {
          temp = xr
          xr = xm
        } else {
          temp = xl
          xl = xm
        }
        y = Math.abs((xm - temp) / xm)
        console.log(c + ':' + y.toFixed(6))
        xm = (xl + xr) / 2
        this.chartData.labels[c] = c
        this.chartData.datasets[0].data[c] = y.toFixed(6)
        this.chartData.datasets[1].data[c] = xm.toFixed(6)
        this.chartData.datasets[2].data[c] = xr.toFixed(6)
        this.chartData.datasets[3].data[c] = xl.toFixed(6)
        c++
      }
      console.log('XL:' + xl.toFixed(6))
      console.log('XR:' + xr.toFixed(6))
      console.log('XM:' + xm.toFixed(6))
      this.showXL = xl.toFixed(6)
      this.showXR = xr.toFixed(6)
      this.showE = y.toFixed(6)
      this.showXM = xm.toFixed(6)
      return xm
    },
  },
  // computed: {

  // }
  components: {
    chart,
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
