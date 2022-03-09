<template>
  <NavigationBar/>
  <SearchBarAndResults/>
  <News_Article/>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"
import SearchBarAndResults from "@/components/SearchBarAndResults.vue"
import News_Article from "@/components/News_Article.vue"

export default {
  name: 'Home',
  components:{
    NavigationBar,
    SearchBarAndResults,
    News_Article
  }
}
</script>

<style scoped>

</style>
