<template>
  <div>
    <scatter
      :data="chartData2"
      :options="chartOptions"
      class="scatter"
      ref="scatter"
    >
    </scatter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData2: {
        datasets: [
          {
            label: 'Scatter Dataset 1',
            fill: false,
            borderColor: '#f87979',
            backgroundColor: '#f87979',
            data: [
              { x: -10, y: 0 },
              {
                x: 1.5,
                y: 1,
              },
              {
                x: 1.5,
                y: 2,
              },
              {
                x: 1.5,
                y: 3,
              },
              {
                x: 1.5,
                y: 4,
              },
              {
                x: 1.5,
                y: 5,
              },
            ],
          },
          {
            label: 'Scatter Dataset 2',
            fill: false,
            borderColor: '#7acbf9',
            backgroundColor: '#7acbf9',
            data: [
              {
                x: 10,
                y: 0,
              },
              {
                x: 2,
                y: 1,
              },
              {
                x: 1.75,
                y: 2,
              },
              {
                x: 1.625,
                y: 3,
              },
              {
                x: 1.53125,
                y: 4,
              },
              {
                x: 1.515625,
                y: 5,
              },
            ],
          },
          {
            label: 'Scatter Dataset 3',
            fill: false,
            borderColor: '#4bcc96',
            backgroundColor: '#4bcc96',
            data: [
              {
                x: 0,
                y: 0,
              },
              {
                x: 1.625,
                y: 1,
              },
              {
                x: 1.5625,
                y: 2,
              },
              {
                x: 1.515625,
                y: 3,
              },
              {
                x: 1.507813,
                y: 4,
              },
            ],
          },
        ],
        chartOptions: {
          maintainAspectRatio: false,
          responsive: true,
        },
      },
    }
  },
}
</script>

<style></style>
<!-- datasets: [
          {
            label: 'Scatter Dataset 1',
            fill: false,
            borderColor: '#f87979',
            backgroundColor: '#f87979',
            data: [
              {
                x: 1.5,
                y: 0,
              },
              {
                x: 1.5,
                y: 0,
              },
              {
                x: 1.5,
                y: 0,
              },
              {
                x: 1.5,
                y: 0,
              },
              {
                x: 1.5,
                y: 0,
              },
            ],
          },
          {
            label: 'Scatter Dataset 2',
            fill: false,
            borderColor: '#7acbf9',
            backgroundColor: '#7acbf9',
            data: [
              {
                x: 2,
                y: 0,
              },
              {
                x: 1.75,
                y: 0,
              },
              {
                x: 1.625,
                y: 0,
              },
              {
                x: 1.53125,
                y: 0,
              },
              {
                x: 1.515625,
                y: 0,
              },
            ],
          },
          {
            label: 'Scatter Dataset 3',
            fill: false,
            borderColor: '#4bcc96',
            backgroundColor: '#4bcc96',
            data: [
              {
                x: 0,
                y: 0,
              },
              {
                x: 1.625,
                y: 0,
              },
              {
                x: 1.5625,
                y: 0,
              },
              {
                x: 1.515625,
                y: 0,
              },
              {
                x: 1.507813,
                y: 0,
              },
            ],
          },
        ], -->
