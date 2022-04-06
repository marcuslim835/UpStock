<template>
  <!-- overlay animate="zoom-in" :opened="opened" :visible="visible" @closed="opened = visible = false" -->
  <br />
  <h1>Add Stocks</h1>
  <p>Modify your stock holdings here!</p>
  <br />

  <div>
    <form id="userForm">
      <select id="brokers">
        <option disabled="disabled" selected="selected">Select Broker:</option>

        <!-- Brokers are dynamically added from Firebase --></select
      ><br /><br />

      <input
        type="text"
        class="textbox"
        id="stockname"
        placeholder="Stock Name"
        required
      /><br /><br />
      <input
        type="text"
        class="textbox"
        id="ticker"
        placeholder="Ticker (e.g GOOGL)"
        required
      /><br /><br />
      <input
        type="number"
        class="textbox"
        id="quantity"
        placeholder="Quantity"
        required
      /><br /><br />
      <input
        type="number"
        class="textbox"
        id="price"
        placeholder="Price"
        required
      /><br /><br />
      <input
        type="date"
        class="textbox"
        id="purchasedate"
        placeholder="Date of Purchase"
      /><br /><br />

      <select id="tags">
        <option value="Tech">Tech</option>
        <option value="REIT">REIT</option>
        <option value="Finance">Finance</option>
        <option value="Energy">Energy</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Industrials">Industrials</option>
        <option value="Others">OTHERS</option>
        <!-- Can add more tags here --></select
      ><br /><br />

      <Button
        :greenButtonTheme="true"
        buttonText="Confirm"
        @bc="saveToFirebase()"
      /><br /><br />
      <Button
        :greenButtonTheme="false"
        buttonText="Cancel"
        @bc="toggleModal()"
      /><br /><br />
    </form>
  </div>
  <!-- /overlay -->
</template>

<script>
import Button from "./Button.vue";
import firebaseApp from "../api/firebaseAccessor.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as ST from "../api/holdingsAccess.js";
const db = getFirestore(firebaseApp);

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

  emits: ["cancel", "done"],

  components: {
    Button,
  },

  data() {
    return {
      user: false,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        getBrokers();
      }
    });
    async function getBrokers() {
      const auth = getAuth();
      const curr = auth.currentUser;
      const userID = curr.uid;
      try {
        var docRef = doc(db, userID, "credentials"); //userID as placeholder for curr.uid
        const docSnap = await getDoc(docRef);
        //console.log(docSnap.data());
        var data = [
          "DBS Vickers",
          "Moo Moo",
          "Tiger Brokers",
          "UOB Kay Hian",
          "Others",
        ];
        if (docSnap.exists()) {
          data = docSnap.data().brokers;
          console.log("Brokers retrieved from Firebase: ", data);
        } else {
          try {
            await setDoc(doc(db, curr.uid, "credentials"), {
              brokers: data,
            });
            console.log("Default brokers set to Firebase");
          } catch (error) {
            console.error("Error updating details", error);
          }
        }
      } catch (error) {
        console.error(error);
      }
      self.brokerList = data;
      var select = document.getElementById("brokers");
      for (var i = 0; i < data.length; i++) {
        select.options[select.options.length] = new Option(data[i]);
      }
    }
  },

  methods: {
    toggleModal() {
      document.getElementById("userForm").reset();  
      this.$emit("cancel");
      console.log("Cancel button pressed")
    },
    async saveToFirebase() {
      console.log("Save to Firebase called")
      let stockName = document.getElementById("stockname").value;
      if (stockName == "") {
        alert("Please input a stock name! Your transaction has been cancelled!");
        this.toggleModal();
        return;
      }
      let ticker = document.getElementById("ticker").value;
      if (ticker == "") {
        alert("Please input a ticker! Your transaction has been cancelled!");
        this.toggleModal();
        return;
      }
      let qty = document.getElementById("quantity").value;
      if (qty == "") {
        alert("Please input the quantity! Your transaction has been cancelled!");
        this.toggleModal();
        return;
      }
      let price = document.getElementById("price").value;
      if (price == "") {
        alert("Please input a price! Your transaction has been cancelled!");
        this.toggleModal();
        return;
      }
      //let purchaseDate = document.getElementById("purchasedate").value;
      let brokerName = document.getElementById("brokers").value;
      if (brokerName == "Select Broker:") {
        alert("Please select a broker! Your transaction has been cancelled!");
        this.toggleModal();
        return;
      }
      let tag = document.getElementById("tags").value;
      console.log("DETAILS CAPTURED FROM FORM");

      try {
        const auth = getAuth();
        const currUser = auth.currentUser;

        console.log("Just before calling ST.addData()")
        
        await ST.addData(
          currUser.uid,
          ticker,
          stockName,
          brokerName,
          price,
          qty,
          tag
        );
        console.log("AFTER ADD DATA");
        document.getElementById("userForm").reset();
        this.$emit("done")

        /*
                let userPortfolio = doc(db, String(currUser.uid), "holdings")
                const docRef = await setDoc(userPortfolio, {[ticker]: {broker: {[brokerName]: {qty: qty, price: price}}, name: stockName, type: tag}})
                const docRef = await setDoc(doc(db, String(currUser.uid), "holdings"), {GOOGL: {broker: {UOBKayHian: {qty: 100, price: 90}}, name: "Google", type: "Tech"}})     // HARD CODE TEST
                console.log(docRef)
                document.getElementById("userForm").reset();
                this.$emit("added")
                ST.addData(currUser, stockName, brokerName, price, qty, purchaseDate, tag)
                */
      } catch (error) {
        console.error("Error adding document: ", error);
      }

    },
    
  },
  
  beforeUnmount() {
    function reinitTable() {
      console.log("Reinitialise Table");
      let selectBox = document.getElementById("brokers");
      while (selectBox.options.length > 1) {
        selectBox.remove(1);
      }
    }
    reinitTable();
  },
  
};
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
