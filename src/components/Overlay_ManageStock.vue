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
                <option value="Moo Moo"> MooMoo </option>
                <option value="Tiger Brokers"> Tiger Brokers </option>
                <option value="UOB Kay Hian"> UOB Kay Hian </option>
                <option value="UOB Kay Hian"> Others </option>
                <!-- Add brokers we have here -->
            </select><br><br>

            <input type="text" class="textbox" id="stockname" placeholder="Stock Name"><br><br>
            <input type="text" class="textbox" id="ticker" placeholder="Ticker (e.g GOOGL)"><br><br>
            <input type="text" class="textbox" id="quantity" placeholder="Quantity"><br><br>
            <input type="text" class="textbox" id="price" placeholder="Price"><br><br>
            <input type="date" class="textbox" id="purchasedate" placeholder="Date of Purchase"><br><br> 
            
            <select id="tags"> 
                <option value="Tech"> Tech </option>
                <option value="Reit"> REIT </option>
                <option value="Finance"> Finance </option>
                <option value="Energy"> Energy </option>
                <option value="Industrials"> Industrials </option>
                <option value="Others"> OTHERS </option>
                <!-- Can add more tags here -->
            </select><br><br>

            <Button :greenButtonTheme="true" buttonText="Confirm" @bc="saveToFirebase()"/><br><br>
            <Button :greenButtonTheme="false" buttonText="Cancel" @bc="toggleModal()"/><br><br>
        </form>
    </div>
    <!-- /overlay -->
</template>

<script>
import Button from "./Button.vue" 
//import firebaseApp from "../api/firebaseAccessor.js"; 
//import {getFirestore } from "firebase/firestore";
//import {doc, setDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import * as ST from '../api/holdingsAccess.js';
//const db = getFirestore(firebaseApp);

export default {
    //props: ["toggleModal"],
    
    /*
    setup(props, {emit}) {
        const cancel = () => {
            emit("cancel");
        }
        return {cancel};
    },
    */

    emits: ["cancel"],

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
            let ticker = document.getElementById("ticker").value;
            let qty = document.getElementById("quantity").value;
            let price = document.getElementById("price").value;
            //let purchaseDate = document.getElementById("purchasedate").value;
            let brokerName = document.getElementById("brokers").value;
            let tag = document.getElementById("tags").value;
            console.log(tag)

            try {
                
                const auth = getAuth();
                const currUser = auth.currentUser;
                
                await ST.addData(currUser.uid, ticker, stockName, brokerName, price, qty, tag)
                console.log("AFTER ADD DATA")

                /*
                let userPortfolio = doc(db, String(currUser.uid), "holdings")
                const docRef = await setDoc(userPortfolio, {[ticker]: {broker: {[brokerName]: {qty: qty, price: price}}, name: stockName, type: tag}})
                const docRef = await setDoc(doc(db, String(currUser.uid), "holdings"), {GOOGL: {broker: {UOBKayHian: {qty: 100, price: 90}}, name: "Google", type: "Tech"}})     // HARD CODE TEST
                console.log(docRef)
                document.getElementById("userForm").reset();
                this.$emit("added")
                ST.addData(currUser, stockName, brokerName, price, qty, purchaseDate, tag)
                */
            } 
            catch(error) {
                console.error("Error adding document: ", error);
            }

            //this.$router.push({name : 'Portfolio'});
        },

        toggleModal() {
            this.$emit("cancel")
        },
    },

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