<template>
  <div id="graph">
    <line-chart
        v-if="loaded"
        width="80%"
        prefix="$"
        :data="chartdata"
    />
  </div>
</template>

<script>
import * as API from '../api/finance.js';

export default {
  name:'Charts',
  data: () => ({
    loaded: false,
    chartdata: null
  }),
  async mounted() {
    this.loaded = false;
    try {
      const prices = await API.getHistoricalPL(["AAPL", "AMD"], "1y");
      console.log(prices);
      this.chartdata = prices
      this.loaded = true;
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style>
  #graph {
    margin-left: 320px;
    margin-top : 40px;
  }
</style>