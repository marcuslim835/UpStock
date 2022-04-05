<template>
  <Header :content='stockName + " Stock"'/>
  <NavigationBar/>
  <Stock_Graph v-if="stockTicker"  :ticker="stockTicker" />
  <Stock_KPI :price="price"/>
  <ForumPost/>
</template>

<script>
import Header from "@/components/Header.vue"
import NavigationBar from "@/components/NavigationBar.vue"
import Stock_Graph from "@/components/Stock_Graph.vue"
import Stock_KPI from "@/components/Stock_KPI.vue"
import ForumPost from "@/components/ForumPost.vue"
import * as API from '../api/finance.js';


export default {
  name: 'StockPage',
  props: ["stockTicker", "stockName"],
  components:{
    Header,
    NavigationBar,
    Stock_Graph,
    Stock_KPI,
    ForumPost
  },
  data: () => ({
    price: "",
  }),
  created() {
    const data = API.getStockPrice(this.stockTicker);
    data.then(x => this.price = Object.values(x[0])[0]);

    const test = API.getKeyStatistics(this.stockTicker);
    console.log(test);
  },
  mounted() {
    this.loaded = true;
    console.log("Date passed to StockPage: ", this.stockTicker, this.stockName);
  }
}
</script>

<style scoped>

</style>
