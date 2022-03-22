<template>
    <!-- overlay animate="zoom-in" :opened="opened" :visible="visible" @closed="opened = visible = false" -->
    <br>
    <h1> Add Stocks </h1>
    <p> Modify your stock holdings here! </p>
    <br>
    
    <div>
        <form>
            <select id="brokers"> 
                <option hidden> Select Broker: </option>
                <option value="DBS Vickers"> DBS Vickers </option>
                <option value="MooMoo"> MooMoo </option>
                <option value="Tiger Brokers"> Tiger Brokers </option>
                <option value="UOB Kay Hian"> UOB Kay Hian </option>
                <!-- Add brokers we have here -->
            </select><br><br>

            <input type="text" class="textbox" id="stockname" placeholder="Stock Name"><br><br>
            <input type="text" class="textbox" id="quantity" placeholder="Quantity"><br><br>
            <input type="text" class="textbox" id="price" placeholder="Price"><br><br>
            <input type="text" class="textbox" id="purchasedate" placeholder="Date of Purchase"><br><br> 
            
            <select id="tags"> 
                <option value="finance"> Finance </option>
                <option value="reit"> REIT </option>
                <option value="tech"> Tech </option>

                <!-- Can add more tags here -->
            </select><br><br>

            <Button :greenButtonTheme="true" buttonText="Confirm" @bc="saveToFirebase()"/><br><br>
            <Button :greenButtonTheme="false" buttonText="Cancel" @bc="history.back()"/><br><br>
        </form>
    </div>
    <!-- /overlay -->
</template>

<script>
import Button from "./Button.vue" 
import firebaseApp from "../api/firebaseAccessor.js"; 
import {getFirestore } from "firebase/firestore";
import {doc, setDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"
const db = getFirestore(firebaseApp);

export default {
    components:{
        Button,
    },

    data() {
        return {
            user : false,
        }
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
        async saveToFirebase() {
            let stockName = document.getElementById("stockname").value;
            let qty = document.getElementById("quantity").value;
            let price = document.getElementById("price").value;
            let purchaseDate = document.getElementById("purchasedate").value;
            let brokerName = document.getElementById("broker").value;

            alert("Saving ...")

            // NEED FIREBASE FIRESTORE INFORMATION...

            try {
                const auth = getAuth();
                const currUser = auth.currentUser;
                let userPortfolio = doc(db, currUser.uid, "Portfolio", stockName)
                const docRef = await setDoc(userPortfolio, {Stock : stockName, Broker : brokerName, Buy_Price : price, Quantity : qty, Purchase_Date : purchaseDate})
                console.log(docRef)
                document.getElementById("userForm").reset();
                this.$emit("added")
            } 
            catch(error) {
                console.error("Error adding document: ", error);
            }

            this.$router.push({name : 'Home'});
        }
    }
}


</script>

<style scoped>
    .textbox {
        font-size: 18px;
        width: 300px;
        height: 30px;
        background-color: rgb(52, 58, 64);
        color: white;
        border-radius: 5px;
        border: none;
    }

    select {
        font-size: 18px;
        width: 300px;
        height: 30px;
        background-color: rgb(52, 58, 64);
        color: white;
        border-radius: 5px;
        border: none;
    }

    
</style>