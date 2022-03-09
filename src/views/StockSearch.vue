<template>
  <NavigationBar/>
  <SearchBarAndResults/>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"
import SearchBarAndResults from "@/components/SearchBarAndResults.vue"

export default {
  name: 'Home',
  components:{
    NavigationBar,
    SearchBarAndResults
  }
}
</script>

<style scoped>

</style>
