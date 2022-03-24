<template>
  <div class="main" id="help">
    <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3 }">
      <CCard
        class="card"
        style="width: 18rem"
        v-for="(item, index) in results"
        :key="index"
      >
        <CCardBody>
          <CCardTitle>{{ item.longname || item.shortname }}</CCardTitle>
          <CCardSubtitle> Ticker: {{ item.symbol }} </CCardSubtitle>
          <CCardText> {{ item.exchDisp }}, {{ item.exchange }} </CCardText>
          <button
            class="stockBtn"
            type="button"
            @click="goToStock(item.symbol, item.longname || item.shortname)"
          >
            Go to Stock
          </button>
        </CCardBody>
        <CCardFooter> Stock Type: {{ item.quoteType }} </CCardFooter>
      </CCard>
    </CRow>
  </div>
</template>

<script>
import {
  CRow,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardFooter,
  CCardSubtitle,
} from "@coreui/vue";

export default {
  components: {
    CRow,
    CCard,
    CCardBody,
    CCardTitle,
    CCardText,
    CCardFooter,
    CCardSubtitle,
  },
  props: ["results"],
  mounted() {
    console.log("MOUNTING in SearchResults: ", this.results);
  },
  methods: {
    goToStock(ticker, name) {
      console.log("SearchResults now going to the stock: ", ticker);
      this.$router.push({
        name: "StockPage",
        params: { 
          stockTicker: ticker,
          stockName: name
        },
      });
    },
  },
};
</script>

<style scoped>
div.card {
  background-color: rgba(255, 255, 255, 0.05);
  color: #868e96;
}
h5.card-title {
  color: #f8f9fa;
}
a.btn {
  background-color: #f8f9fa;
  color: #868e96;
}
a.btn:hover {
  background-color: #f8f9fa;
  color: green;
}
.stockBtn {
  padding: 6.5px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>

<style scoped src="@coreui/coreui/dist/css/coreui.min.css"></style>
