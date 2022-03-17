<template>
  <Header content="Stock Search"/>
  <NavigationBar/>
  <SearchBar/>
</template>

<script>
import Header from "@/components/Header.vue"
import NavigationBar from "@/components/NavigationBar.vue"
import SearchBar from "@/components/SearchBar.vue"

export default {
  name: 'StockSearch',
  components:{
    Header,
    NavigationBar,
    SearchBar
  }
}
</script>

<style scoped>

</style>
