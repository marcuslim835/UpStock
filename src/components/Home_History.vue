<template>
    <div class = 'main'>
        <div class = 'wrapper'>
            <h2 class = 'miniHeader' v-if="user"> History</h2>
            <div class = 'tableDiv'>
                <table id = 'table' class = "auto-index"> 
                    <tr>
                        <th> index </th>
                        <th> Date </th>
                        <th> Transaction </th>
                    </tr>
                </table><br><br>
            </div>
        </div>
    </div>
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
                console.log(dateobj)
                var readable = dateobj.toLocaleString()
                var price = (a.Price)
                var qty = (a.Qty)
                var ticker = (a.Ticker)
                var broker = (a.Broker)

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2)
                cell1.innerHTML = ind;
                cell2.innerHTML = readable;

                var xx = ' shares of '
                if (qty == 1) {
                    xx = ' share of '
                }
                if (price == 'sold') {
                    var str = 'Removed ' + qty + xx + ticker + ' from ' + broker + '!'
                } else {
                    str = 'Added ' + qty + xx + ticker + ' at USD ' + price + ' from ' + broker + '!'
                }
                cell3.innerHTML = str;
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
                    let x1 = new Date(x.innerHTML).getTime()
                    let y1 = new Date(y.innerHTML).getTime()
                    // Check if the two rows should switch place:
                    if (y1 > x1) {
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
.wrapper {
    float: left;
    width: 35%;
    margin-top: 40px;
}

#table {
    font-size: 14px;
}

.tableDiv {
    width:100%;
    overflow-y:scroll;
    height:250px
}
.tableDiv::-webkit-scrollbar {
  display: none;
}

.miniHeader {
    font-family: monospace;
    font-size: 24px;
    color: aliceblue;
}



</style>