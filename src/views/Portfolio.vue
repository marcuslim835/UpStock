<template>
  <Header content="Portfolio"/>
  <NavigationBar/>
  <Portfolio_Holdings/>
  <Header content="Dividends"/>
  <Portfolio_Dividends/>
  <Header content="Portfolio Value" />
  <Charts />
</template>

<script>
import Header from "@/components/Header.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import Portfolio_Holdings from "@/components/Portfolio_Holdings.vue";
import Portfolio_Dividends from "@/components/Portfolio_Dividends.vue";
import Charts from "@/components/PLChart.vue";

export default {
  name: 'Portfolio',
  components:{
    Header,
    NavigationBar,
    Portfolio_Holdings,
    Portfolio_Dividends,
    Charts
  }
}
</script>

<style scoped>

</style>
