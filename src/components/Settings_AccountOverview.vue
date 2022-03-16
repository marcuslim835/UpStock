<template>
    <div class="main">
        <h2> Account Overview </h2>
        <div v-if="user">
            <div>
                <p> Name: <strong>{{user.displayName}}</strong><br>
                    Email: <strong>{{user.email}}</strong><br>
                    Uid: <strong>{{user.uid}}</strong><br>
                    Provider: <strong>{{user.providerData[0].providerId}}</strong> </p>
            </div>
            Region: <div id = "region" v-if="user"> Region </div>
        </div>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from "../api/firebaseAccessor.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    name: 'Profile',

    data(){
        return {
            user:false,
        }
    },

    mounted() {
        async function display(){
            const auth = getAuth();
            const curr = auth.currentUser;
            let z = await getDocs(collection(db,curr.uid))
            z.forEach((docs) => {
                let data = docs.data()
                var region = data.Region
                document.getElementById("region").innerHTML = region
            })
        }
        display();
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