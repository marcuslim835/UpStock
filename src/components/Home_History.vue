<template>
    <h1 v-if="user"> Transaction History </h1>
    <table id = 'table' class = "auto-index">
        <tr>
            <th> Transaction No. </th>
            <th> Date </th>
            <th> Price </th>
            <th> Quantity </th>
            <th> Ticker </th>
            <th> Broker </th>
        </tr>
    </table><br><br>
</template>

<script>
import firebaseApp from "../api/firebaseAccessor.js";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const db = getFirestore(firebaseApp);

export default {
    name: 'Profile',

    data(){
        return {
            user:false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
        
    },

    updated() {
        async function display(){
            const auth = getAuth();
            const curr = auth.currentUser;
            const docSnap = await getDocs(collection(db, curr.uid, "transactions", "history"));

            let ind = 1
            docSnap.forEach((docs) => {
                let a = docs.data()
                var table = document.getElementById("table")
                var row = table.insertRow(ind)

                var date = (a.Date)
                var dateobj = new Date(date * 1000)
                var readable = dateobj.toLocaleString()
                var price = (a.Price)
                var qty = (a.Qty)
                var ticker = (a.Ticker)
                var broker = (a.Broker)

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);

                cell1.innerHTML = ind;
                cell2.innerHTML = readable;
                cell3.innerHTML = price;
                cell4.innerHTML = qty;
                cell5.innerHTML = ticker;
                cell6.innerHTML = broker;

                ind += 1;
            }) 
        }
        display();
    }
}

</script>

<style scoped>
#table {
    padding-left: 300px;
}
</style>