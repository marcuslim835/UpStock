<template>
  <Header content="Portfolio"/>
  <NavigationBar/>
  <Portfolio_Holdings/>
  <Header content="Dividends"/>
  <Portfolio_Dividends/>
</template>

<script>
import Header from "@/components/Header.vue"
import NavigationBar from "@/components/NavigationBar.vue"
import Portfolio_Holdings from "@/components/Portfolio_Holdings.vue"
import Portfolio_Dividends from "@/components/Portfolio_Dividends.vue"

export default {
  name: 'Portfolio',
  components:{
    Header,
    NavigationBar,
    Portfolio_Holdings,
    Portfolio_Dividends
  }
}
</script>

<style scoped>

</style>
