<template>
  <div class="main">
    <h2>Edit Details</h2>

    <div class="firebaseStuff">
      <div class="dispNameField">
        <label for="displayName"> New Display Name: </label>
        <input
          type="text"
          id="displayName"
          placeholder="Enter New Display Name"
        />
        <button id="savebutton" type="button" v-on:click="changeName()">
          Change Display Name
        </button>
      </div>
      <br />
      <div class="emailField">
        <label for="emailEntry"> New Email: </label>
        <input type="text" id="emailEntry" placeholder="Enter New Email" />
        <button id="savebutton" type="button" v-on:click="changeEmail()">
          Change Email
        </button>
      </div>
      <br />
      <div class="passwordField">
        <label for="password"> New Password: </label>
        <input type="text" id="password" placeholder="Enter New Password" />
        <button id="savebutton" type="button" v-on:click="changePassword()">
          Change Password
        </button>
        <br /><br />
      </div>
    </div>

    <div class="details">
      <label for="brokers"> Broker List: </label>
      <select id="brokers">
        <option hidden>Select Broker:</option>
        <!-- Brokers are dynamically added from Firebase -->
      </select>
      <button id="savebutton" type="button" v-on:click="removeBroker()">
        Remove Broker
      </button>
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
        getBrokers();
      } else {
        // No user is signed in.
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
    goToOverview() {
      this.$router.push("/accountOverview");
    },
    async removeBroker() {
      var select = document.getElementById("brokers");
      var selectedValue = select.value;
      console.log(selectedValue);
      let index = this.brokerList.indexOf(selectedValue);
      this.brokerList.splice(index, 1)
      alert("Deleting Broker");
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
    changeName() {
      var name = document.getElementById("displayName").value;
      //console.log(name);
      const auth = getAuth();
      updateProfile(auth.currentUser, { displayName: name })
        .then(() => {
          console.log("CHANGED DISPLAY NAME");
          alert("Display Name Updated!");
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

<style scoped></style>
