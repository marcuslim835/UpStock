<template>
    <div class="navBar">
        <hr>
        <h2 id="username"> UserName </h2>
        <h3 id="email"> mrUserLongEmail@getAllAces.com </h3> <hr>
        <h3 id="email"> NET WORTH <span id="username"> $420,000 </span> </h3> <hr>
        <router-link to="/home">Home</router-link>
        <router-link to="/news">News</router-link>
        <router-link to="/portfolio">Portfolio</router-link>
        <router-link to="/settings">Settings</router-link>
        <router-link to="/stockPage">Stock Page (For Testing)</router-link>
        <router-link to="/stockSearch">Stock Search</router-link>
        <router-link to="/">Log Out</router-link> <hr>
        <h3 style=color:violet> Placeholder for future function </h3>
        <hr>
        <img src="../assets/logo.png" alt = "Cool logo!" width = "160" height = "160">
    </div>
</template>

<script>

</script>

<style scoped>
.navBar {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 200px; /* Set the width of the sidebar */
  position: fixed;
  z-index: 1; 
  top: 0;
  left: 0;
  background-color: #212529;
  overflow-x: hidden;
  padding-top: 20px;
}
.navBar a {
  padding: 20px 20px 20px 20px;
  text-decoration: none;
  font-size: 20px;
  color: #F8F9FA;
  display: block;
  text-align: left;
}
.navBar a:hover {
  background-color: #343A40;
}
#username {
    padding: 0px 20px 0px 20px;
    color: #F8F9FA;
    text-align: left;
    font-size: 20px;
}
#email {
    padding: 0px 20px 0px 20px;
    color:#868E96;
    text-align: left;
    font-size: 14px;
    word-wrap:break-word;
}
</style>