<template>
    <div class="main">
        <table id = 'homeHoldingTable'>
            <tr>
                <th>Name|Ticker</th>
                <th>Current</th>
                <th>Quantity</th>
                <th>Total Worth</th>
                <th>Percent Change</th>
                <th></th>
            </tr>
        </table><br><br>
    </div>
</template>

<script>
import firebaseApp from '../firebaseAccessor.js'
import {getFirestore} from 'firebase/firestore'
import {collection, getDocs, doc} from 'firebase/firestore';
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
            
            z.forEach((docs) => {
                var table = document.getElementById('homeHoldingTable')
                let yy = docs.data() //access firebase document
                var row = table.insertRow(ind)

                //access data stored in firebase
                var stockName = (yy.stockName)
                var ticker = (yy.ticker)
                var quantity = (yy.quantity)
                var unitCost = (yy.unitCost)
                
                var nameCell = row.insertCell(0); var currentCell = row.insertCell(1); var quantityCell = row.insertCell(2);
                var worthCell = row.insertCell(3); var percentCell = row.insertCell(4); var buttonCell = row.insertCell(5)
            
                nameCell.innerHTML = stockName + " | " + ticker, quantityCell.innerHTML = quantity; 
                
            
                //creating arrow button
                var bu = document.createElement('button')
                bu.className = 'butArrow'
                bu.id  = String(stockName)
                bu.innerHTML = '>'
                bu.onclick = function() {
                    gotoStock()
                }
                buttonCell.appendChild(bu) //insert arrow button 
                accessAPI(); //access API (TODO)

                async function accessAPI() {
                    //fetch current market price from API (TODO)
                    console.log('Fetch current market price for ' + stockName) 
                    let mktPrice = 100; //TEMP PLACEHOLDER
                    let currentWorth = 0
                    let currentPc = 0
                    currentCell.innerHTML = mktPrice
                    currentWorth = quantity * parseFloat(currentCell.innerHTML)
                    worthCell.innerHTML = "$" + currentWorth
                    currentPc =  parseFloat(currentCell.innerHTML) - parseFloat(unitCost)
                    let percentC = parseFloat(Math.abs(currentPc)/unitCost) * 100
                    currentCell.innerHTML = '$' + mktPrice
                    if (currentPc < 0)  {
                        percentCell.innerHTML = '- ' + percentC.toFixed(1) + "%"
                        percentCell.style.backgroundColor = 'red'
                    } else {
                        percentCell.innerHTML = '+ ' + percentC.toFixed(1) + "%"
                        percentCell.style.backgroundColor = 'green'
                    }
                }
                console.log(ind)
                ind += 1
            })
        }
        display();
        async function gotoStock() { //TODO
            }
        }
}

</script>

<style scoped>
table {
    border-collapse: collapse;
}
th {
    background-color: #212529;
}



</style>