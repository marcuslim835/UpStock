<template>
    <div class="main">
        <div class = 'tableDiv'>
            <table id = 'dividendTable'>
                <tr>
                    <th>Name</th>
                    <th>Payment Date</th>
                    <th>Dividend Rate (%)</th>
                    <th>Dividend Yield</th>
                    <th>Registered Holdings</th>
                    <th>Book Closure</th>
                    <th>Expected Payment</th>
                </tr>
            </table><br><br>
        </div>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged} from "firebase/auth";
import * as API from '../api/finance.js';
import * as ST from '../api/holdingsAccess.js';
export default {
     mounted() {
        console.log('mounted on Portfolio page');
        const auth = getAuth()
        onAuthStateChanged(auth, (user)  =>{
            if (user) {
                // User is signed in.
                this.user = user
                setTimeout(displayTable, 1500)
            } else {
                // No user is signed in.
            }
        });
        //var vm = this
        async function displayTable() {
            const auth = getAuth();
            const curr = auth.currentUser;
            console.log('Current user id: ' + curr.uid) //user id
            var ind = 1
            const table = document.getElementById('dividendTable')
            const getMap = ST.getHoldingsQty(curr.uid) 
            getMap.then(x => {
                if (x == null) {
                    console.log('Firebase is empty')
                } else {
                    for (const key of x.keys()) {
                        let ticker = key;
                        let totalQty = x.get(key)
                        let data = API.getDividendInformation(ticker); //returns a promise
                        data.then(y => {
                            console.log(y)
                            var row = table.insertRow(ind)
                            var nameCell = row.insertCell(0); var paymentCell = row.insertCell(1); 
                            var rateCell = row.insertCell(2); var yieldCell = row.insertCell(3); 
                            var qtyCell = row.insertCell(4); var exDivCell = row.insertCell(5);
                            var paidCell = row.insertCell(6);
                            nameCell.innerHTML = ticker;   
                            qtyCell.innerHTML = parseInt(totalQty);
                            if (y['dividendRate'] == null) {
                                rateCell.innerHTML = 'No dividends';
                                paymentCell.innerHTML = 'No dividends';
                                yieldCell.innerHTML = 'No dividends';
                                exDivCell.innerHTML = 'No dividends';
                                paidCell.innerHTML = 0 + ' USD';
                            } else {
                                rateCell.innerHTML = y['dividendRate'];
                                paymentCell.innerHTML = y['dividendDate'];
                                yieldCell.innerHTML = y['dividendYield'] + ' USD';
                                exDivCell.innerHTML = y['exDividendDate'];
                                paidCell.innerHTML = (y['dividendYield'] * totalQty).toFixed(4) + ' USD';
                            }
                    })
                }
                }
            })
        }
    },

    beforeUnmount() {
        function reinitTable() {
            console.log('Reinitialise Table')
            let tb = document.getElementById('holdingTable')
            while (tb.rows.length > 1) {
                tb.deleteRow(1)
            }
            document.getElementById('totalValue').innerHTML = 0
            document.getElementById('totalPL').innerHTML = 0
        }
        reinitTable()
    },
}
</script>

<style>
.tableDiv {
    width:100%;
    overflow-y:scroll;
    height:250px
}
.tableDiv::-webkit-scrollbar {
  display: none;
}

#dividendTable {
    width: 100%;  
    height:10px;
    border: 1px solid white; 
    border-collapse: collapse;
    font-size: 20px;
}

#dividendTable th {
    background-color: gray;
    border: 1px solid white;
    text-align: center;
    padding: 10px;
}

#dividendTable tr td {
    border: 1px solid white;
    padding: 10px;
}



</style>