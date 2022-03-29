<template>
  <Header content="Home"/>
  <NavigationBar/>
  <Home_History/>
  <Home_OverallGraph/>
  <Home_PortfolioHoldings/>
  <News_Article/>
</template>

<script>
import Header from "@/components/Header.vue"
import NavigationBar from "@/components/NavigationBar.vue"
import Home_History from "@/components/Home_History.vue"
import Home_OverallGraph from "@/components/Home_OverallGraph.vue"
import Home_PortfolioHoldings from "@/components/Home_PortfolioHoldings.vue"
import News_Article from "@/components/News_Article.vue"

export default {
  name: 'Home',
  components:{
    Header,
    NavigationBar,
    Home_History,
    Home_OverallGraph,
    Home_PortfolioHoldings,
    News_Article
  },
}
</script>

<style scoped>

</style>
