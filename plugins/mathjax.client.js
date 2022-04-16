import Vue from 'vue'
import MathJax, { initMathJax, renderByMathjax } from "mathjax";
Vue.config.productionTip = false;

// function onMathJaxReady() {
//   const el = document.getElementById("hello");
//   renderByMathjax(el);
// }

// initMathJax({}, onMathJaxReady);

Vue.use(MathJax,initMathJax, renderByMathjax);
