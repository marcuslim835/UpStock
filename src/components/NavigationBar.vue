<template>
  <div class="navBar" v-if="user">
    <h2 id="username">{{ user.displayName }}</h2>
    <h3 id="email">{{ user.email }}</h3>
    <hr />
    <h3 id="email">NET WORTH <span id="username"> $420,000 </span></h3>
    <hr />
    <router-link to="/home">Home</router-link>
    <router-link to="/news">News</router-link>
    <router-link to="/portfolio">Portfolio</router-link>
    <router-link to="/accountOverview">Settings</router-link>
    <router-link to="/stockSearch">Stock Search</router-link>
    <hr />
    <button id="btn" @click="signOut()" v-if="user">Log Out</button>
    <hr />
    <img src="../assets/logo.png" alt="Cool logo!" width="300" height="300" />
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "NavBar",

  data() {
    return {
      user: false,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },

  methods: {
    signOut() {
      const auth = getAuth();
      const user = auth.currentUser;
      signOut(auth, user);
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
.navBar {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 300px; /* Set the width of the sidebar */
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #212529;
  overflow-x: hidden;
  border-right: 1px solid white;
}

.navBar::-webkit-scrollbar {
  width: 10px;               /* width of the entire scrollbar */
}
.navBar::-webkit-scrollbar-track {
  background: gray;        /* color of the tracking area */
}
.navBar::-webkit-scrollbar-thumb {
  background-color: lightgray;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid lightgray;  /* creates padding around scroll thumb */
}
.navBar::-webkit-scrollbar-thumb:hover {
  background-color: aliceblue;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid aliceblue;  /* creates padding around scroll thumb */
}
.navBar::-webkit-scrollbar-thumb:active {
  background-color: lightgray;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid aliceblue;  /* creates padding around scroll thumb */
}

.navBar a,
button {
  padding: 20px 20px 20px 20px;
  text-decoration: none;
  font-size: 20px;
  color: #f8f9fa;
  display: block;
  text-align: left;
}
.navBar a:hover {
  background-color: #343a40;
}
#btn {
  background-color: #212529;
  width: 300px;
  border-style: none;
}
#btn:hover {
  background-color: #343a40;
}
#username {
  padding: 0px 20px 0px 20px;
  color: #f8f9fa;
  text-align: left;
  font-size: 20px;
}
#email {
  padding: 0px 20px 0px 20px;
  color: #868e96;
  text-align: left;
  font-size: 14px;
  word-wrap: break-word;
}
</style>
