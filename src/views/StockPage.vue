<template>
  <Header content="Apple Stocks"/>
  <NavigationBar/>
  <Stock_Graph/>
  <Stock_KPI/>
  <ForumPost/>
</template>

<script>
import Header from "@/components/Header.vue"
import NavigationBar from "@/components/NavigationBar.vue"
import Stock_Graph from "@/components/Stock_Graph.vue"
import Stock_KPI from "@/components/Stock_KPI.vue"
import ForumPost from "@/components/ForumPost.vue"

export default {
  name: 'StockPage',
  components:{
    Header,
    NavigationBar,
    Stock_Graph,
    Stock_KPI,
    ForumPost
  }
}
</script>

<style scoped>

</style>
