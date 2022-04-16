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
      const e =parseFloat(this.Error)
      let x_old=parseFloat(this.x)
      let x_new=0
      let y=100
      let c=0
      // function cal(x_old){
      //   return f.evaluate({x:x_old})
      // }
      function delta(x_old){
        return -(f.evaluate({x:x_old})/math.derivative(f, x).evaluate({x:x_old}))
      }
      function cal(x_new,x_old){
        return Math.abs((x_new-x_old)/x_new)
      }
      while(y>e){
        if(y===0.000000){
          break;
        }
        x_new=delta(x_old)+x_old
        y=cal(x_new,x_old)
        x_old=x_new
        console.log("x:"+x_new.toFixed(6))
        console.log("e:"+y.toFixed(7))
        this.chartData.labels[c] = c
        this.chartData.datasets[0].data[c] = x_new.toFixed(6)
        this.chartData.datasets[1].data[c] = y.toFixed(6)
        c++
      }
      this.showx= x_new.toFixed(6)
      this.showE=y.toFixed(6)
    }
  }
}
</script>
<style scoped>
.line-chart {
  width: 60vw;
  height: 50vh;
}
.chart-div{
  display:flex;
  justify-content: center;
}
</style>
