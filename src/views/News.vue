<template>
  <Header content="News"/>
  <NavigationBar/>
  <SearchBarAndResults/>
  <News_Article/>
</template>

<script>
import Header from "@/components/Header.vue"
import NavigationBar from "@/components/NavigationBar.vue"
import SearchBarAndResults from "@/components/SearchBarAndResults.vue"
import News_Article from "@/components/News_Article.vue"

export default {
  name: 'News',
  components:{
    Header,
    NavigationBar,
    SearchBarAndResults,
    News_Article
  }
}
</script>

<style scoped>

</style>
