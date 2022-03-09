<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
body {
  background-color: #212529;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #F8F9FA;
  background-color: #212529;
}
.main { /* leftmost component following navbar should be class main */
  margin-left: 300px; /* 300px for sidebar */
  padding: 0px 10px;
}
</style>
