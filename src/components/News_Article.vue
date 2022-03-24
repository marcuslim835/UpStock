<template>
  <div class="main" id="help">
    <CRow :xs="{ cols: 1, gutter: 4 }" :md="{ cols: 3}">
    <CCard class="card" style="width: 18rem" v-for="(item, index) in articles" :key="index" >
      <CCardImage orientation="top" v-bind:src="item.urlToImage" alt="News Article Image" />
      <CCardBody>
        <CCardTitle>{{ item.title }}</CCardTitle>
        <CCardSubtitle> 
          <span v-if="item.author"> By {{ item.author }} </span> 
          <span v-if="item.source.name"> From {{ item.source.name }} </span>
        </CCardSubtitle>
        <CCardText>
          <span v-html="item.description"></span>
        </CCardText>
        <CCardLink v-bind:href="item.url" target="_blank"> Read more here... </CCardLink>
      </CCardBody>
      <CCardFooter> {{ item.publishedAt }} </CCardFooter>
    </CCard>
    </CRow>
  </div>
</template>

<script>
import { CRow, CCard, CCardBody, CCardTitle, CCardText, CCardLink, CCardImage, CCardFooter, CCardSubtitle } from "@coreui/vue";

export default {
  components: {
    CRow,
    CCard,
    CCardBody,
    CCardTitle,
    CCardText,
    CCardLink,
    CCardImage,
    CCardFooter,
    CCardSubtitle
  },
  props: ["articles"],
  mounted() {
      console.log("MOUNTING in News_Article: ",this.articles);
  },
};
</script>
<style scoped>
div.card {
  background-color:rgba(255, 255, 255, 0.05);
  color:#868E96;
}
h5.card-title, p.card-text {
  color:#F8F9FA;
}
a.card-link {
  color: lightblue;
}
a.card-link:hover {
  background-color: #868E96;
  color: #F8F9FA;
}
</style>

<style scoped src='@coreui/coreui/dist/css/coreui.min.css'>
</style>