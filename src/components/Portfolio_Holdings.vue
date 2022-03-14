<template>
    <div class="main">
        <div>
            <div class="inline-div">
                <h2 align="left">Total Market Value</h2>
                <h3 id = 'totalValue' align="left">Value</h3>
            </div>
            <div class="inline-div">
                <h2 align="left">Total Profit/Loss</h2>
                <h3 id = 'totalPL' align="left">Value</h3>
            </div>
            <div class="inline-div2">
                <button id ='addInvestButton' type="button"  >+ Add investment</button>
            </div>
        </div>
        <div class = 'tableDiv'>
        <table id = 'holdingTable'>
            <tr>
                <th>Name</th>
                <th>Ticker</th>
                <th>Broker</th>
                <th>Quantity</th>
                <th>Unit Cost</th>
                <th>Market Price</th>
                <th>Profit/Loss</th>
                <th>Delete</th>
            </tr>
        </table>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../firebaseAccessor.js'
import {getFirestore} from 'firebase/firestore'
import {collection, getDocs, doc, deleteDoc} from 'firebase/firestore';
const db = getFirestore(firebaseApp);

//authentication to obtain uniqueID (TODO)
//import { getAuth } from "firebase/auth";
//const auth = getAuth();
//const user = auth.currentUser;
//const uid = user.uid;

//firebase - holdings collection -> uniqueid doc > stocks subcollection > stockname Doc
const docRef = doc(db, "holdings", 'uniqueid');
export default {
    mounted() {
        console.log('mounted');
        async function display() {
            let z = await getDocs(collection(docRef, "stocks"));
            let ind = 1;
            var totalValue = 0;
            var tp = 0;
            
            
            z.forEach((docs) => {
                var table = document.getElementById('holdingTable')
                let yy = docs.data() //access firebase document
                var row = table.insertRow(ind)

                //access data stored in firebase
                var stockName = (yy.stockName)
                var ticker = (yy.ticker)
                var broker = (yy.broker)
                var quantity = (yy.quantity)
                var unitCost = (yy.unitCost)
                
                var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3); var cell5 = row.insertCell(4); var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6); var cell8 = row.insertCell(7);
            
                cell1.innerHTML = stockName, cell2.innerHTML = ticker, cell3.innerHTML = broker; cell4.innerHTML = quantity;
                cell5.innerHTML =unitCost + ' USD';
            
                //creating delete button
                var bu = document.createElement('button')
                bu.className = 'bwt'
                bu.id  = String(stockName)
                bu.innerHTML = 'Delete'
                bu.onclick = function() {
                    deleteinstrument2(stockName)
                }
                cell8.appendChild(bu) //insert delete button 
                accessAPI(); //access API (TODO)


                async function accessAPI() {
                    //fetch current market price from API (TODO)
                    console.log('Fetch current market price for ' + stockName) 
                    let mktPrice = 100; //TEMP PLACEHOLDER
                    let currentPL = 0;
                    cell6.innerHTML = mktPrice + ' USD'
                    currentPL = quantity * (-parseFloat(unitCost) + parseFloat(mktPrice))
                    currentPL = currentPL.toFixed(1)
                    if (currentPL < 0) {
                        cell7.innerHTML = currentPL + ' USD'
                        cell7.style.color = 'red'
                    } else {
                        cell7.innerHTML = '+ ' + currentPL + ' USD'
                        cell7.style.color = 'green'
                    }
                    tp = tp + parseFloat(currentPL)
                    totalValue += Math.round(quantity * parseFloat(unitCost));     
                }
                console.log(ind)
                ind += 1
            })
            document.getElementById('totalValue').innerHTML = totalValue + ' USD';
            document.getElementById('totalPL').innerHTML = tp + ' USD';
        }
        display();
        async function deleteinstrument2(stockName) {
            var x = stockName
            alert('You are going to delete ' + x);
            await deleteDoc(doc(docRef,'stocks',x))
            console.log('Document successfully deleted!', x);
            let tb = document.getElementById('holdingTable')
            while (tb.rows.length > 1) {
                tb.deleteRow(1)
            }
            document.getElementById('totalValue').innerHTML = ""
            document.getElementById('totalPL').innerHTML = ""
            display()
        }
    },
    beforeUnmount() {
        function reinitTable() {
            console.log('Reinitialise Table')
            let tb = document.getElementById('holdingTable')
            while (tb.rows.length > 1) {
                tb.deleteRow(1)
            }

        }
        reinitTable()
    },

    methods : {
        addInvestment() {
            console.log('redirect to add Investments overlay') //TODO
        }
    }
}

</script>

<style>
#holdingTable {
    width: 100%;
    height: 5px;  
    border: 1px solid white; 
    border-collapse: collapse;
}

th,td {
    text-align: center;
    font-size: 20px;
    padding: 10px;
}

th {
    background-color: gray;
}

th,td {
    border: 1px solid white;
    border-collapse: collapse;
}


.inline-div {
    width: 300px;
    float: left;
}

.inline-div2 {
    float: right;
}

h2 {
    color: rgba(255,255,255, 0.5);
}

#addInvestButton {
    margin-left:5%;
    margin-top: 30%;
    width: 120px;
    height: 50px;
    background: #F8F9FA;
    border: 1px solid rgba(134, 142, 150, 0.3);
    border-radius: 4px;
}

.bwt {
    background:rgb(228, 58, 58);
}

</style>