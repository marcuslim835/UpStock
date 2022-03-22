<template>
  <div class="main" id="help">
    <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3}">
    <CCard class="card" style="width: 18rem" v-for="(item, index) in results" :key="index" >
      <CCardBody>
        <CCardTitle>{{ item.longname || item.shortname }}</CCardTitle>
        <CCardSubtitle> Ticker: {{ item.symbol }} </CCardSubtitle>
        <CCardText>
            {{ item.exchDisp }}, {{ item.exchange }}
        </CCardText>
        <CButton component="a" v-bind:href="item.symbol" variant="outline"> Link to Stock Page </CButton> 
      </CCardBody>
      <CCardFooter> Stock Type: {{ item.quoteType }} </CCardFooter>
    </CCard>
    </CRow>
  </div>
</template>

<script>
import { CRow, CCard, CCardBody, CCardTitle, CCardText, CButton, CCardFooter, CCardSubtitle } from "@coreui/vue";

export default {
  components: {
    CRow,
    CCard,
    CCardBody,
    CCardTitle,
    CCardText,
    CButton,
    CCardFooter,
    CCardSubtitle
  },
  props: ["results"],
  mounted() {
      console.log("MOUNTING in SearchResults: ",this.results);
  },
};
</script>

<style scoped>
div.card {
  background-color:rgba(255, 255, 255, 0.05);
  color:#868E96;
}
h5.card-title {
  color:#F8F9FA;
}
a.btn {
  background-color: #F8F9FA;
  color: #868E96;
}
a.btn:hover {
  background-color: #F8F9FA;
  color: green;
}
</style>

<style scoped src='@coreui/coreui/dist/css/coreui.min.css'>
</style>