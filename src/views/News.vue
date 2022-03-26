<template>
  <Header content="News"/>
  <NavigationBar/>
  <SearchBar @search="searchNews"/>
  <News_Article :articles="articles" v-if=!isEmpty />
</template>

<script>
import Header from "@/components/Header.vue"
import NavigationBar from "@/components/NavigationBar.vue"
import SearchBar from "@/components/SearchBar.vue"
import News_Article from "@/components/News_Article.vue"
import axios from "axios";

export default {
  name: 'News',
  components:{
    Header,
    NavigationBar,
    SearchBar,
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
      console.log("User Query is: ", query);
      let maxHistory = new Date(Date.now() - (1000 * 3600 * 24 * 5));
      console.log("Date searched till: ", maxHistory);
      var url =
        "https://newsapi.org/v2/everything?q=" +
        query +
        "&from=" +
        maxHistory.getFullYear() + "-" + (maxHistory.getMonth() + 1) + "-" + maxHistory.getDate() +
        //"2022-03-10" +
        "&sortBy=relevancy" +
        "&pageSize=50" +
        "&apiKey=" +
        process.env.VUE_APP_NEWS_API_KEY;

      console.log(url);
      axios
        .get(url)
        .then((response) => {
          this.articles = response.data.articles;
          this.isEmpty = false;
          console.log("data: ", response.data.articles);
          console.log("Total results possible: ", response.data.totalResults);
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
