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
      x: '2',
      showE: '0',
      showx: '0',
      Error: '0.000001',
      item: '',
      check: '',
      status: 'false',
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
    const aw = { $bp: this.$bp }
    this.token = aw.$bp
    const headers = { Authorization: `Bearer ${this.token}` }
    const response = await fetch('http://localhost:3004/Newton', { headers })
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
        const f = math.parse(this.fomular)
        const x = math.parse('x')
        const e = parseFloat(this.Error)
        let x_old = parseFloat(this.x)
        let x_new = 0
        let y = 100
        let c = 0
        // function cal(x_old){
        //   return f.evaluate({x:x_old})
        // }
        function delta(x_old) {
          return -(
            f.evaluate({ x: x_old }) /
            math.derivative(f, x).evaluate({ x: x_old })
          )
        }
        function cal(x_new, x_old) {
          return Math.abs((x_new - x_old) / x_new)
        }
        while (y > e) {
          if (y === 0.0) {
            break
          }
          x_new = delta(x_old) + x_old
          y = cal(x_new, x_old)
          x_old = x_new
          console.log('x:' + x_new.toFixed(6))
          console.log('e:' + y.toFixed(7))
          this.chartData.labels[c] = c
          this.chartData.datasets[0].data[c] = x_new.toFixed(6)
          this.chartData.datasets[1].data[c] = y.toFixed(6)
          c++
        }
        this.showx = x_new.toFixed(6)
        this.showE = y.toFixed(6)
      } catch (e) {}
    },
  },
}
</script>
<style scoped>
.line-chart {
  width: 60vw;
  height: 50vh;
}
.chart-div {
  display: flex;
  justify-content: center;
}
input {
  border: 2px solid black;
  border-radius: 4px;
}
</style>
