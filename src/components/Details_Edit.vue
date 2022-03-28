<template>
    <div class="main">
        <h2> Edit Details </h2>

        <div class = "details">
            <label for="region"> Region: </label>
            <input type = "text" id = "region" placeholder="Enter Region"> <br><br>
            <label for="dob"> Date of Birth: </label>
            <input type = "text" id = "dob" placeholder="DD/MM/YYYY"> <br><br>
            <div class = "save">
                    <button id = "savebutton" type="button" v-on:click="savetofs()"> Save </button>
                </div>
        </div>
    </div>
</template>

<script>
import firebaseApp from "../api/firebaseAccessor.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
const db = getFirestore(firebaseApp);

export default {
    methods: {
        async savetofs(){
            var region = document.getElementById("region").value
            var dob = document.getElementById("dob").value
            alert("Saving Details")
            try{
                const auth = getAuth();
                const curr = auth.currentUser;
                const docRef = await setDoc(doc(db, curr.uid, "credentials"), {
                    Region: region,
                    Dob: dob
                })
                console.log(docRef)
            }
            catch(error){
                console.error("Error updating details", error);
            }
        }
    

    }
}

</script>



<style scoped>

</style>