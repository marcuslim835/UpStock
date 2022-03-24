<template>
  <div class="main">
    <form>
      <input
        type="text"
        class="textbox"
        id="searcher"
        placeholder="Search here..."
      />
      <button class="searchBtn" type="button" @click="clicked()">Search</button> <br /><br />
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    clicked() {
      this.$emit("search", document.getElementById("searcher").value);
    },
  },
};
</script>

<style scoped>
.textbox {
  font-size: 18px;
  width: 500px;
  height: 30px;
  background-color: rgb(52, 58, 64);
  color: white;
  border-radius: 5px;
  border: none;
  margin-right: 10px;
}
.searchBtn {
  padding: 6.5px 75px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>
