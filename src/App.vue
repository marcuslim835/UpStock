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
::-webkit-scrollbar {
  width: 10px;               /* width of the entire scrollbar */
}
::-webkit-scrollbar-track {
  background: gray;        /* color of the tracking area */
}
::-webkit-scrollbar-thumb {
  background-color: lightgray;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid lightgray;  /* creates padding around scroll thumb */
}
::-webkit-scrollbar-thumb:hover {
  background-color: aliceblue;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid aliceblue;  /* creates padding around scroll thumb */
}
::-webkit-scrollbar-thumb:active {
  background-color: lightgray;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid aliceblue;  /* creates padding around scroll thumb */
}
</style>
