<template>
  <div class="main">
    <h2>Search Anything</h2>
    <form>
      <input
        type="text"
        class="textbox"
        id="searcher"
        placeholder="Search for news here..."
      /><br /><br />
      <button type="button" @click="clicked()">Search</button> <br /><br />
    </form>
  </div>
</template>

<script>
export default {
  methods: {
      clicked() {
          this.$emit("search", document.getElementById("searcher").value)
      }
  }
};
</script>

<style scoped>

</style>