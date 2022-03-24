<template>
    <div class="main">
        <div>
            <div class="inline-div">
                <h2 align="left">Total Market Value</h2>
                <h3 id = 'totalValue' align="left">{{totalValue}} USD</h3>
            </div>
            <div class="inline-div">
                <h2 align="left">Total Profit/Loss</h2>
                <h3 id = 'totalPL' align="left">{{totalPL}} USD</h3>
            </div>
            <div class="inline-div2">
                <button id ='addInvestButton' type="button" @click="() => TogglePopup('buttonTrigger')">+ Add investment</button>
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
                <th>Sell</th>
            </tr>
        </table>
        </div>
        <Popup v-if="popupTriggers.buttonTrigger">
            <OMS :TogglePopup = "() => TogglePopup('buttonTrigger')"/>
        </Popup>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged} from "firebase/auth";
import * as API from '../api/finance.js';
import * as ST from '../api/holdingsAccess.js';
import Popup from './Popup.vue'; 
import { ref } from 'vue'
import OMS from './Overlay_ManageStock.vue'


export default {
    data() {
        return {
            user : false,
            totalValue: 0,
            totalPL: 0
        }
    },
    mounted() {
        console.log('mounted');
        const auth = getAuth()
        onAuthStateChanged(auth, (user)  =>{
            if (user) {
                // User is signed in.
                this.user = user
                displayTable()
            } else {
                // No user is signed in.
            }
        });
        var vm = this
        async function displayTable() {
            const auth = getAuth();
            const curr = auth.currentUser;
            console.log('Current user id: ' + curr.uid) //user id
            var ind = 1
            var table = document.getElementById('holdingTable')
            var getMap = ST.getAllHoldings('userID') 
            getMap.then(x => {
                for (const key of x.keys()) {
                    var ticker = key;
                    var stockName = x.get(ticker)[ST.NAME_POS] //stockName
                    var myMap = x.get(ticker)[ST.BROKERS_POS] //broker map
                    let data = API.getStockPrice(ticker); //returns a promise
                    data.then(x => {
                        let mktPrice = Object.values(x[0])[0];
                        for (const [brokerName, map] of Object.entries(myMap)) {
                            var row = table.insertRow(ind) 
                            ind += 1
                            var broker = brokerName
                            var quantity = (map[ST.STOCK_QTY])
                            var price = (map[ST.STOCK_PRICE])

                            var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); 
                            var cell3 = row.insertCell(2); var cell4 = row.insertCell(3); 
                            var cell5 = row.insertCell(4); var cell6 = row.insertCell(5);
                            var cell7 = row.insertCell(6); var cell8 = row.insertCell(7);
                            cell1.innerHTML = stockName, cell2.innerHTML = ticker, cell3.innerHTML = broker; 
                            cell4.innerHTML = quantity; cell5.innerHTML = price + ' USD';
                            cell6.innerHTML = mktPrice + ' USD'

                            //creating delete button
                            var bu = document.createElement('button')
                            bu.className = 'bwt'
                            bu.id  = String(stockName)
                            bu.innerHTML = 'Sell'
                            bu.onclick = function() {
                                deleteinstrument2(ticker)
                            }
                            cell8.appendChild(bu) //insert delete button 
                        
                            //Profit/Loss calculation
                            let mktTotal = quantity * mktPrice
                            let currentPL = quantity * (-parseFloat(price) + parseFloat(mktPrice))
                            currentPL = currentPL.toFixed(1)
                            if (currentPL < 0) {
                                cell7.innerHTML = currentPL + ' USD'
                                cell7.style.color = 'red'
                            } else {
                                cell7.innerHTML = '+ ' + currentPL + ' USD'
                                cell7.style.color = 'green'
                            }
                            vm.totalValue += parseInt(mktTotal) 
                            vm.totalPL += parseInt(currentPL)              
                        }  
                    })
                }
            })
            document.getElementById('totalValue').innerHTML = vm.totalValue
            document.getElementById('totalPL').innerHTML = vm.totalPL
            async function deleteinstrument2(x) {
                alert('delete button pressed for ' + x)
            }
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

    /*
    methods : {
        addInvestment() {
            this.$router.push({name:'AddStock'}) //TODO

        }
    },
    */

    setup() {
        const popupTriggers = ref({
            buttonTrigger : false 
        });

        const TogglePopup = (trigger) => {
            popupTriggers.value[trigger] = !popupTriggers.value[trigger]
        }; 

        return {
            Popup,
            popupTriggers,
            TogglePopup
        }
    },

    components: {
        OMS,
        Popup
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
    cursor: pointer;
}

.bwt {
    background:rgb(228, 58, 58);
}


</style>