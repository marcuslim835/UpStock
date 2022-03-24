import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueChartKick from 'vue-chartkick';
import 'chartkick/chart.js';

createApp(App).use(router).use(VueChartKick).mount('#app')
