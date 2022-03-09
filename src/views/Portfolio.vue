<template>
  <NavigationBar/>
  <Portfolio_Holdings/>
  <Portfolio_Dividends/>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"
import Portfolio_Holdings from "@/components/Portfolio_Holdings.vue"
import Portfolio_Dividends from "@/components/Portfolio_Dividends.vue"

export default {
  name: 'Portfolio',
  components:{
    NavigationBar,
    Portfolio_Holdings,
    Portfolio_Dividends
  }
}
</script>

<style scoped>

</style>
