<template>
<img src="../assets/logo.png" alt = "Cool logo!" width = "160" height = "160">
<h1> Sign in </h1>
  <h2> Sign in and start managing your portfolio! </h2>
  <div class = "form">
    <input type = "text" id = "email" placeholder = "email"> <br><br>
    <input type = "text" id = "password" placeholder = "password"> <br><br>
    <div class = "loggingIn">
        <button id = "loginButton" type="button" v-on:click="checkfs()"> Login </button> <br><br>
        <h3> Don't have an account yet?</h3>
        <router-link to="/register">Create account</router-link>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebaseAccessor.js";
import { getFirestore } from "firebase/firestore";
import {collection, getDocs} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    methods: {
        async checkfs(){
            var a = document.getElementById("email").value
            var b = document.getElementById("password").value
            let z = await getDocs(collection(db,"credentials"))
            z.forEach((docs) => {
                let cred = docs.data()
                var email = (cred.email)
                var password = (cred.password)
                if (a == email && b == password) 
                this.$router.push("/home")
            })
            this.$router.push("/home")
            // If password and credentials really do not match
            // return false;
        }
    }

}
</script>

<style scoped>

</style>
