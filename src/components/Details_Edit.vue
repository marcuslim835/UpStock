<template>
  <div class="main">
    <br>
    <div class="firebaseStuff">
      <div id = 'inputField' class="dispNameField">
        <label for="displayName"> New Display Name: </label>
        <input type="text" id="displayName" placeholder="Enter New Display Name" />
        <button id ='updateButton' type="button" v-on:click="changeName()"> 
          <b>Update </b></button>
      </div>
      <div id = 'inputField' class="emailField">
        <label for="emailEntry"> New Email: </label>
        <input type="text" id="emailEntry" placeholder="Enter New Email" />
        <button id ='updateButton' type="button" v-on:click="changeEmail()"> 
          <b>Update </b></button>
      </div>
      <div id = 'inputField' class="passwordField">
        <label for="password"> New Password: </label>
        <input type="text" id="password" placeholder="Enter New Password" />
        <button id ='updateButton' type="button" v-on:click="changePassword()"> 
          <b>Update </b></button>
      </div>
    </div>
    <div id = 'inputField' class="addBrokerField">
        <label for="addbroker"> Add Broker: </label>
        <input type="text" id="addbroker" placeholder="Enter Broker Name" />
        <button id ='updateButton' type="button" v-on:click="addBroker()">
           <b>Update </b></button>
    </div>
    <div id = 'selectField' class="details">
      <label for="brokers"> Remove Broker: </label>
      <select id="brokers">
        <option disabled="disabled" selected="selected">Select Broker:</option>
        <!-- Brokers are dynamically added from Firebase -->
      </select>
      <button id ='updateButton' type="button" v-on:click="removeBroker()">
         <b>Update </b></button>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../api/firebaseAccessor.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  getAuth,
  updateProfile,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      brokerList: [],
    }
  },
  mounted() {
    let self = this;
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        this.user = user;
        fillInput();
        getBrokers();
      } else {
        // No user is signed in.
      }
    });
    function fillInput() {
      const auth = getAuth();
      const curr = auth.currentUser;
      document.getElementById("displayName").value = curr.displayName
      document.getElementById("emailEntry").value = curr.email
    }

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
    goToOverview() {
      this.$router.push("/accountOverview");
    },
    async removeBroker() {
      var select = document.getElementById("brokers");
      var selectedValue = select.value;
      if (selectedValue == "Select Broker:") {
        alert("Please select a broker! Your transaction has been cancelled!");
        return;
      }
      console.log(selectedValue);
      let index = this.brokerList.indexOf(selectedValue);
      this.brokerList.splice(index, 1)
      alert("Deleting Broker: " + selectedValue);
      console.log(this.brokerList);
      try {
        const auth = getAuth();
        const curr = auth.currentUser;
        await setDoc(doc(db, curr.uid, "credentials"), {
              brokers: this.brokerList,
            });
        console.log("New brokers set to Firebase:", this.brokerList)
      } catch (error) {
        console.error("Error updating details", error);
      }
      this.$router.push("/accountOverview");
    },
    async addBroker() {
      var selectedValue = document.getElementById("addbroker").value;
      console.log(this.brokerList);
      if (selectedValue == "") {
        alert("Please input a broker! Your transaction has been cancelled!")
        return;
      } else {
        this.brokerList.push(selectedValue)
        alert("Adding New Broker: " + selectedValue);
        console.log(this.brokerList);
        try {
          const auth = getAuth();
          const curr = auth.currentUser;
          await setDoc(doc(db, curr.uid, "credentials"), {
                brokers: this.brokerList,
              });
          console.log("New brokers set to Firebase:", this.brokerList)
        } catch (error) {
          console.error("Error updating details", error);
        }
        setTimeout(this.goToOverview, 1000);
      }
    },
    changeName() {
      var name = document.getElementById("displayName").value;
      if (name == "") {
        alert("Please input a name! Your transaction has been cancelled!");
        return;
      }
      //console.log(name);
      const auth = getAuth();
      updateProfile(auth.currentUser, { displayName: name })
        .then(() => {
          console.log("CHANGED DISPLAY NAME");
          alert("Your Display Name has been updated to: " + name);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Invalid Display Name!");
        });
      setTimeout(this.goToOverview, 1000);
    },
    changeEmail() {
      var email = document.getElementById("emailEntry").value;
      //console.log(email);
      if (email == "") {
        alert("Please input an email! Your transaction has been cancelled!");
        return;
      }
      const auth = getAuth();
      updateEmail(auth.currentUser, email)
        .then(() => {
          console.log("CHANGED EMAIL");
          alert("Email Updated!");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Invalid Email!");
        });
      setTimeout(this.goToOverview, 1000);
    },
    changePassword() {
      var password = document.getElementById("password").value;
      if (password == "") {
        alert("Please input a password! Your transaction has been cancelled!");
        return;
      }
      //console.log(password);
      const auth = getAuth();
      updatePassword(auth.currentUser, password)
        .then(() => {
          console.log("CHANGED PASSWORD");
          alert("Password Updated!");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Invalid Password!");
        });
      setTimeout(this.goToOverview, 1000);
    },
  },
};
</script>

<style scoped>
label {
    padding-right:10px;
}

#inputField {
  display:flex;
  align-items: center;
  justify-content:right;
  width: 70%;
  margin-top: 32px;
}

#selectField {
  display:flex;
  align-items: center;
  justify-content:right;
  width: 70%;
  margin-top: 32px;
}


input, select{
  height: 32px;
  background: #f9f9f9;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  width: 280px;
  padding: 0 4px;
}

#updateButton{
  background: #7FC920;
  color: #fff;
  height: 32px;
  border: 1px solid #303751;
  border-radius: 8px;
  cursor: pointer;
  padding: 0 16px;
  margin-left: 10px;
}

</style>
