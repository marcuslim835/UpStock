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
            Date of Birth: <div id = "dob" v-if="user"> Dob </div>
        </div>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from "../api/firebaseAccessor.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
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
            const docRef = doc(db, curr.uid, "credentials");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()){
                document.getElementById("region").innerHTML = docSnap.data()["Region"]
                document.getElementById("dob").innerHTML = docSnap.data()["Dob"]
            }
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