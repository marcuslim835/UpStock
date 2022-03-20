<template v-for="item in articles" :key="item.author" >
  <div class="main">
    <h2 v-for="a in stuff" :key="a"> {{a}}Fake News Article</h2>
    <h3>{{ item }}</h3>
    <CCard style="width: 18rem">
      <CCardImage orientation="top" src="../assets/logo.png" alt="logo" />
      <CCardBody>
        <CCardTitle>Card title</CCardTitle>
        <CCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </CCardText>
        <CCardLink href="#">Go to website</CCardLink >
      </CCardBody>
      <CCardFooter> Date </CCardFooter>
    </CCard>
  </div>
</template>

<script>
import { CCard, CCardBody, CCardTitle, CCardText, CCardLink, CCardImage, CCardFooter } from "@coreui/vue";

export default {
  components: {
    CCard,
    CCardBody,
    CCardTitle,
    CCardText,
    CCardLink,
    CCardImage,
    CCardFooter
  },
  props: ["articles"],
  data() {
    return {
      stuff: [1,2,3]
    };
  },
  mounted() {

    console.log("MOUNTING", this.articles);
  },
};
</script>

<style scoped>

</style>