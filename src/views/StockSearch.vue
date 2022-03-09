<template>
  <Header content="Stock Search"/>
  <NavigationBar/>
  <SearchBarAndResults/>
</template>

<script>
import Header from "@/components/Header.vue"
import NavigationBar from "@/components/NavigationBar.vue"
import SearchBarAndResults from "@/components/SearchBarAndResults.vue"

export default {
  name: 'StockSearch',
  components:{
    Header,
    NavigationBar,
    SearchBarAndResults
  }
}
</script>

<style scoped>

</style>
