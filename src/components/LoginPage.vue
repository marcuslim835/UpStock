<template>
<img src="../assets/logo.png" alt = "Cool logo!" width = "250" height = "250">
<h1> Sign in / Sign up</h1>
  <h2> Sign in or sign up and start managing your portfolio! </h2>
  <div id = "firebaseAuth"></div>
</template>

<script>
import firebase from '@/api/uifire.js'
import 'firebase/compat/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
    name:"Login",

    mounted() {
        var ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui){
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }

        var uiConfig = {
            signInSuccessUrl: '/home',
            signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
            ]
        };
        ui.start("#firebaseAuth", uiConfig)
    }
}
</script>

<style scoped>

</style>
