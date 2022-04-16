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
    <!-- <div>
      <h1>Chart</h1>
      <div class="chart-div">
        <line-chart
          :data="chartData"
          :options="chartOptions"
          class="line-chart"
        />
      </div>
    </div> -->
  </div>
</template>
<script>
import * as math from 'mathjs'
export default {
  data() {
    return {
      fomular: '7-x^2',
      x: '2',
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
    Confirm(){
      const f = math.parse(this.fomular)
      const x = math.parse('x')
      let x_old=parseFloat(this.x)
      let result =-(f.evaluate({x:2})/math.derivative(f, x).evaluate({x:2}))
      let xnew=x_old+result
      let e=Math.abs((xnew-x_old)/xnew).toFixed(6)
      console.log(e)
    }
  }
}
</script>
