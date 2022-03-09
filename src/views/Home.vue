<template>
  <NavigationBar/>
  <Home_History/>
  <Home_OverallGraph/>
  <Home_PortfolioDiversity/>
  <Portfolio_Holdings/>
  <News_Article/>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"
import Home_History from "@/components/Home_History.vue"
import Home_OverallGraph from "@/components/Home_OverallGraph.vue"
import Home_PortfolioDiversity from "@/components/Home_PortfolioDiversity.vue"
import Portfolio_Holdings from "@/components/Portfolio_Holdings.vue"
import News_Article from "@/components/News_Article.vue"

export default {
  name: 'Home',
  components:{
    NavigationBar,
    Home_History,
    Home_OverallGraph,
    Home_PortfolioDiversity,
    Portfolio_Holdings,
    News_Article
  }
}
</script>

<style scoped>

</style>
