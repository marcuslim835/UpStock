<template>
  <Header content="News"/>
  <NavigationBar/>
  <SearchBarAndResults @searchNews="searchNews"/>
  <News_Article :articles="articles" v-if=!isEmpty />
</template>

<script>
import Header from "@/components/Header.vue"
import NavigationBar from "@/components/NavigationBar.vue"
import SearchBarAndResults from "@/components/SearchBarAndResults.vue"
import News_Article from "@/components/News_Article.vue"
import axios from "axios";

export default {
  name: 'News',
  components:{
    Header,
    NavigationBar,
    SearchBarAndResults,
    News_Article
  },
  data() {
    return {
      articles: [],
      isEmpty: true
    };
  },
  methods: {
    async searchNews(query) {
      console.log(query);
      var url =
          "https://newsapi.org/v2/everything?q=tsla" +
          // query +
          "&from=" +
          "2022-03-14" +
          "&sortBy=popularity&" +
          "apiKey=" +
          process.env.VUE_APP_NEWS_API_KEY;

      console.log(url);
      axios
          .get(url)
          .then((response) => {
            //this.articles = response.data.articles
            this.articles = response.data.articles;
            this.isEmpty = false;
            console.log("data:");
            console.log(response.data.articles); // This will give you access to the full object
            console.log("PEPELAFF", this.articles[0].author);
          })
          .catch((e) => {
            console.log("Error in search: ", e);
            this.articles.push("No articles found!");
          });
    },
  },
}
</script>

<style scoped>

</style>
