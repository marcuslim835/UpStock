<template>
  <Header content="Stock Search" />
  <NavigationBar />
  <SearchBar @search="searchStocks" />
  <SearchResults :results="results" v-if="!isEmpty" />
</template>

<script>
import Header from "@/components/Header.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import SearchResults from "@/components/SearchResults.vue";
import axios from "axios";

export default {
  name: "StockSearch",
  components: {
    Header,
    NavigationBar,
    SearchBar,
    SearchResults,
  },
  data() {
    return {
      results: [],
      isEmpty: true,
    };
  },
  methods: {
    async searchStocks(query) {
      var options = {
        method: "GET",
        url: "https://yh-finance.p.rapidapi.com/auto-complete",
        params: { q: query },
        headers: {
          "x-rapidapi-host": "yh-finance.p.rapidapi.com",
          "x-rapidapi-key":
            process.env.VUE_APP_RAPID_STOCK_API_KEY,
        },
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data.quotes);
          this.results = response.data.quotes;
          this.isEmpty = false;
          console.log(response.data);
        })
        .catch((e) => {
          console.log("Error in search: ", e);
          this.results.push("No results found!");
        });
      /* var url =
        "https://finnhub.io/api/v1/search?q=" +
        query +
        "&token=" +
        process.env.VUE_APP_STOCK_API_KEY;

      console.log(url);

      axios
        .get(url)
        .then((response) => {
          this.results = response.data.result;
          this.isEmpty = false;
          console.log("Num entries: ", response.data.count);
          console.log("data: ", response.data.result);
        })
        .catch((e) => {
          console.log("Error in search: ", e);
          this.results.push("No results found!");
        }); */
    },
  },
};
</script>

<style scoped></style>
