<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main { /* leftmost component following navbar should be class main */
  margin-left: 200px; /* 200px for sidebar */
  padding: 0px 10px;
}
</style>
