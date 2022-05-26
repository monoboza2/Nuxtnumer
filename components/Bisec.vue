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
      <label for="f(x)">F(x):{{check}}</label>
    </div>
    <div v-else>
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
    <div><p>XL:{{ showXL }} XR:{{ showXR }} XM:{{ showXM }} ERROR:{{ showE }}</p></div>
    <div>
      <!-- <pre>$bp: {{$bp}}</pre> -->
      <!-- <button @click="Confirm">Confirm</button> -->
       <b-button variant="success" @click="Confirm">Confirm</b-button>
    </div>
    <div>
      <h1>Chart</h1>
      <div class="chart-div">
        <line-chart
          :data="chartData"
          :options="chartOptions"
          class="line-chart"
          ref="line"
          chart-id="lineChart"
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
      fomular: '',
      XR: '2.0',
      XL: '1.5',
      showXR: '',
      showXL: '',
      showXM: '',
      showE: '',
      count: '',
      Error: '0.000001',
      item: [],
      check: '',
      status: 'false',
      articles:[],
      token:'',
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
  //   mounted() {
  //   const aw ={ $bp: this.$bp }
  //   this.token=aw
  //   console.log(aw.$bp)
  // },
  async created(){
    try{
          const aw ={ $bp: this.$bp }
    this.token=aw.$bp
    const headers={ "Authorization": `Bearer ${this.token}`};
    const response=await fetch('http://localhost:3004/Bisection',{headers})
    const data= await response.json()
    this.check=data[0].eq
    console.log(data[0].eq)
    }catch(e){

    }
  },
  methods: {

    Confirm: function () {

      console.log(this.articles)
      try{
        if(this.status==="true"){
        this.fomular=this.check
      }
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
        console.log('XM:' + xm.toFixed(6))
        console.log('XR:' + xr.toFixed(6))
        console.log('XL:' + xl.toFixed(6))
      }
      // console.log('XL:' + xl.toFixed(6))
      // console.log('XR:' + xr.toFixed(6))
      // console.log('XM:' + xm.toFixed(6))
      this.showXL = xl.toFixed(6)
      this.showXR = xr.toFixed(6)
      this.showE = y.toFixed(6)
      this.showXM = xm.toFixed(6)
      return xm
      }
      catch (e) {
        return 0
      }

    },
  },
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
.chart-div {
  display: flex;
  justify-content: center;
}
</style>
<style scoped>
input{
  border: 2px solid black;
  border-radius: 4px;
}
</style>
