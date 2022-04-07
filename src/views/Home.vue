<template>
  <Header content="Home"/>
  <PLChart/>
  <Home_History/>
  <NavigationBar/>
  <Home_PortfolioHoldings/>
</template>

<script>
import Header from "@/components/Header.vue"
import NavigationBar from "@/components/NavigationBar.vue"
import Home_History from "@/components/Home_History.vue"
import PLChart from "@/components/PLChart.vue"
import Home_PortfolioHoldings from "@/components/Home_PortfolioHoldings.vue"

export default {
  name: 'Home',
  components:{
    Header,
    NavigationBar,
    Home_History,
    PLChart,
    Home_PortfolioHoldings
  },
}
</script>

<style scoped>
.miniHeader {
    font-family: monospace;
    font-size: 18px;
    color: aliceblue;
}
</style>
