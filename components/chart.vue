<template>
  <div>
    <h1>Chart</h1>
    <client-only>
      <div class="chart-div">
        <line-chart
          :data="chartData"
          :options="chartOptions"
          class="line-chart"
        />
      </div>
      <div>
        <button @click="test">click</button>
      </div>
    </client-only>
  </div>
</template>

<script>
// import LineChart from '@/components/LineChart'
export default {
  data() {
    return {
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
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
      },
    }
  },
  methods: {
    test(){
      let i = 0
      let c = 0
      while(i<10){
        this.chartData.labels[i]=c
        this.chartData.datasets[0].data[i]=c
        console.log(i)
        console.log(c)
        i++
        c++
      }
    }
  },
}
</script>

<style>
.line-chart {
  width: 60vw;
  height: 50vh;
}
</style>

// data(){ // return{ // chartData:{ // labels:["x1","x2","x3","x4"], //
datasets:[ // { // label: "Number", // borderColor:"#4bcc96", // borderWidth:4,
// fill:false, // data:[100,150,300,400] // } // ] // }, // chartOptions:{ //
maintainAspectRatio:false, // responsive:true, // } // } // },
