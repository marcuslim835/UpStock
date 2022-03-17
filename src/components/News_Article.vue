<template>

  <div class="main">
    <CCard style="width: 18rem" v-for="(item, index) in articles" :key="index">
      <CCardImage orientation="top" v-bind:src="item.urlToImage" alt="logo" />
      <CCardBody>
        <CCardTitle>{{ item.title }}</CCardTitle>
        <CCardSubtitle> By {{ item.author }} at {{ item.source.name }}</CCardSubtitle>
        <CCardText>
            {{ item.description }}
        </CCardText>
        <CCardLink v-bind:href="item.url"> Read more here </CCardLink >
      </CCardBody>
      <CCardFooter> {{ item.publishedAt }} </CCardFooter>
    </CCard>
  </div>
</template>

<script>
import { CCard, CCardBody, CCardTitle, CCardText, CCardLink, CCardImage, CCardFooter, CCardSubtitle } from "@coreui/vue";

export default {
  components: {
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
      
      console.log("MOUNTING",this.articles);
  },
};
</script>

<style scoped>
CCardImage {

}
</style>