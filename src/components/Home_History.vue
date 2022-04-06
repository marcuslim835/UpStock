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
            sortTable();
        }
        function sortTable(){
            var table, rows, switching, i, x, y, shouldSwitch;
            table = document.getElementById("table");
            switching = true;
            console.log(table.rows.length)
            /* Make a loop that will continue until
            no switching has been done: */
            while (switching) {
                // Start by saying: no switching is done:
                switching = false;
                rows = table.rows;
                console.log(rows.length)
                /* Loop through all table rows (except the
                first, which contains table headers): */
                for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                    shouldSwitch = false;
                    /* Get the two elements you want to compare,
                    one from current row and one from the next: */
                    x = rows[i].cells[1];
                    y = rows[i + 1].cells[1];
                    console.log(x)
                    console.log(y)
                    // Check if the two rows should switch place:
                    if (x.innerHTML > y.innerHTML) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        var temp = rows[i + 1].cells[0].innerHTML;
                        rows[i + 1].cells[0].innerHTML = rows[i].cells[0].innerHTML;
                        rows[i].cells[0].innerHTML = temp;
                        break;
                    }
                }
                if (shouldSwitch) {
                    /* If a switch has been marked, make the switch
                    and mark that a switch has been done: */
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
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