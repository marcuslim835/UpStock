<template>
    <div class="main">
        <div class='sub' v-if="user">
            <table id='accountTable' align='center'>
                <tr>
                    <td id = 'left'>Name:</td>
                    <td id = 'right'><strong>{{user.displayName}}</strong><br></td>
                </tr>
                <tr>
                    <td id = 'left'>Email:</td>
                    <td id = 'right'><strong>{{user.email}}</strong><br></td>
                </tr>
                <tr>
                    <td id = 'left'>User ID:</td>
                    <td id = 'right'><strong>{{user.uid}}</strong><br></td>
                </tr>
                <tr>
                    <td id = 'left'>Sign-in Provider:</td>
                    <td id = 'right'><strong>{{user.providerId}}</strong><br></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
//import firebaseApp from "../api/firebaseAccessor.js";
//import { getFirestore } from "firebase/firestore";
//import { doc, getDoc } from "firebase/firestore";
//const db = getFirestore(firebaseApp);

export default {
    name: 'Profile',

    data(){
        return {
            user:false,
        }
    },

    mounted() {
        /*async function display(){
            const auth = getAuth();
            const curr = auth.currentUser;
            const docRef = doc(db, curr.uid, "credentials");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()){
                document.getElementById("region").innerHTML = docSnap.data()["Region"]
                document.getElementById("dob").innerHTML = docSnap.data()["Dob"]
            }
        }
        display();*/
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
.sub {
    text-align: center;
}

#accountTable {
    width: 70%;
    margin-top: 20px;
    font-size: 18px;
}

td {
    border-bottom: 1px solid rgba(255,255,255, 0.5);
    padding: 15px;
}



#left {
    color: rgba(255,255,255, 0.5);
    text-align:left
}

#right {
    text-align: right;
    font-family: 'Trebuchet MS';
}



</style>