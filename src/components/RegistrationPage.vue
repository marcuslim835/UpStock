<template>
<img src="../assets/logo.png" alt = "Cool logo!" width = "160" height = "160">
<h1> Sign up </h1>
  <h2> Sign up and start managing your portfolio! </h2>
  <div id = "form">
    <input type = "text" id = "name" placeholder = "name"> <br><br>
    <input type = "text" id = "email" placeholder = "email"> <br><br>
    <input type = "text" id = "password" placeholder = "password"> <br><br>
    <input type = "checkbox" id = "agree1">
        <label for = "agree1"> I have read and accepted the Terms and Conditions </label> <br><br>
    <input type = "checkbox" id = "agree2">
        <label for = "agree2"> I have read and accepted the Privacy Policy</label> <br><br>
    <div class = "signingUp">
        <button id = "createButton" type="button" v-on:click="addtofs()"> Create Account </button> <br><br>
        <button id = "cancelButton" type="button" v-on:click="goback()"> Cancel </button>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebaseAccessor.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default{
    methods: {
        async addtofs(){
            var name = document.getElementById("name").value
            var a = document.getElementById("email").value
            var b = document.getElementById("password").value
            var c = document.getElementById("agree1").checked
            var d = document.getElementById("agree2").checked

            if (c == true && d == true && a != "" && b != "" && name != "") {

            alert("Registering User " + name)

            try{
                const docRef = await setDoc(doc(db, "credentials", name), {
                    email: a, password: b
                })
                console.log(docRef)
                document.getElementById("name").value = ""
                document.getElementById("email").value = ""
                document.getElementById("password").value = ""
                document.getElementById("agree1").checked = false
                document.getElementById("agree2").checked = false
                this.$router.push("/")
            }
            catch(error){
                console.error("Error registering User: ", error);
            }

            alert("Registered!")
            } else {
                alert("Unable to Register")
            }
        },

        goback(){
            this.$router.push("/")
        }
    }
}
</script>