<template>
    <div class="main" id = "settingNavBar" v-if="user">
        <router-link to="/accountOverview">Account Overview</router-link> |
        <router-link to="/editDetails">Edit Settings</router-link>
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
#settingNavBar {
  display: flex;
  border: 1px solid #c3c3c3;
  background-color: #212529;
  overflow-x: hidden;
  border-right: 1px solid white;
  text-align: center;
  align-items: center;
  justify-content: center;
}
#settingNavBar a {
  padding: 20px 20px 20px 20px;
  text-decoration: none;
  font-size: 20px;
  color: #F8F9FA;
  
  
}
#settingNavBar a:hover {
  background-color: #343A40;
}
</style>