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
import * as DB from '../api/holdingsAccess.js';
import { getAuth, onAuthStateChanged} from "firebase/auth";

export default {
  name:'Charts',
  data: () => ({
    loaded: false,
    chartdata: null
  }),
  async mounted() {
    this.loaded = false;
    try {
      onAuthStateChanged(getAuth(), async (user)  =>{
        if (user) {
          // User is signed in.
          const stocks = await DB.getHoldingsQty(user.uid);
          const prices = await API.getHistoricalValue(stocks, "1y");
          this.chartdata = prices
          this.loaded = true;
        }
      });
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