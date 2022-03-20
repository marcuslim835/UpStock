<template>
    <div class="navBar" v-if="user">
        <router-link to="/accountOverview">Account Overview</router-link> |
        <router-link to="/editDetails">Edit Details</router-link> |
        <router-link to="/privacySettings">Privacy Settings</router-link>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
    name: "NavBar",

    data(){
        return{
            user:false,
        }
    },

    mounted(){
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    }
}
</script>

<style scoped>

</style>