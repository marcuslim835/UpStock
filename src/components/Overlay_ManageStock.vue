<template>
    <br>
    <h1> Manage/Add Stonks </h1>
    <p> Modify your stock holdings here! </p>
    <br>
    
    <div>
        <form>
            <select id="brokers"> 
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
                <!-- Can add more tags here -->
            </select><br><br>

            <Button :greenButtonTheme="true" buttonText="Confirm" @bc="saveToFirebase()"/><br><br>
            <Button :greenButtonTheme="false" buttonText="Cancel" @bc="history.back()"/><br><br>
        </form>
    </div>
</template>

<script>
import Button from "./Button.vue" 
import firebaseApp from "../firebaseAccessor.js"; 
import {getFirestore } from "firebase/firestore";
import {doc, setDoc} from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
    
    components:{
        Button,
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
                const docRef = await setDoc(doc(db, /*user name */ "TestUser", stockName), {Stock : stockName, Broker : brokerName, Buy_Price : price, Quantity : qty, Purchase_Date : purchaseDate})
                console.log(docRef)
                document.getElementById("userForm").reset();
                this.$emit("added")
            } 
            catch(error) {
                console.error("Error adding document: ", error);
            }
        }
    }
}


</script>

<style scoped>
    
</style>