import Vue from 'vue'
import { Line , mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

Vue.component('line-chart', {
	extends: Line,
  mixins: [mixins.reactiveProp],
	props: {
    data: {
      type: Object,
      default: null,
      required: false
    },
    options: {
      type: Object,
      default: null,
      required: false
    }
  },
	mounted () {
		this.renderChart(this.data, this.options)
	},
  computed: {
    chartData: function() {
      return this.data;
    }
  },
  watch: {
    data: function() {
      this._chart.destroy();
      //this.renderChart(this.data, this.options);
      this.renderChart();
    }
  }
})
