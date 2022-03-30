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
                <button id ='addInvestButton' type="button" @click="toggleModal()">+ Add investment</button>
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
        <Modal :modalActive="modalActive">
            <OMS @cancel="() => toggleModal()"/>
        </Modal>

        <Modal :modalActive="delModalActive">
            <ODE :sellData="sellData" @cancel="() => closeDelModal()"/>
        </Modal>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged} from "firebase/auth";
import * as API from '../api/finance.js';
import * as ST from '../api/holdingsAccess.js';
import Modal from './Modal.vue'; 
//import { ref } from 'vue'
import OMS from './Overlay_ManageStock.vue'
import ODE from './Overlay_DeleteEntry.vue'

export default {
    data() {
        return {
            user : false,
            totalValue: 0,
            totalPL: 0,

            modalActive: false,
            delModalActive: false,
            sellData: "",

        }
    },

    components: {
        OMS,
        Modal,
        ODE,
    },

    /*
    setup() {
        const modalActive = ref(false);  // For Adding Investment
        const delModalActive = ref(false); // For Deleting Investment
        console.log("SETUPPP")


        const toggleModal = () => {
            modalActive.value = !modalActive.value;
            //console.log("BUTTON TRIGGERED: ", modalActive.value)
        }; 
        const toggleDelModal = () => {
            delModalActive.value = !delModalActive.value;
        };

        return {
            modalActive,
            toggleModal,
            delModalActive,
            toggleDelModal
        };
    },
    */

    mounted() {
        console.log('mounted on Portfolio page');
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
        const toggleDel = (stockName, ticker, broker, quantity, price, mktPrice, profit) => this.toggleDelModal(stockName, ticker, broker, quantity, price, mktPrice, profit)
        var vm = this
        async function displayTable() {
            const auth = getAuth();
            const curr = auth.currentUser;
            console.log('Current user id: ' + curr.uid) //user id
            var ind = 1
            const table = document.getElementById('holdingTable')
            const getMap = ST.getAllHoldings(curr.uid) 
            getMap.then(x => {
                if (x == null) {
                    console.log('Firebase is empty')
                    alert('Nothing to load')
                } else {
                    for (const key of x.keys()) {
                    let ticker = key;
                    let stockName = x.get(ticker)[ST.NAME_POS] //stockName
                    let myMap = x.get(ticker)[ST.BROKERS_POS] //broker map
                    let data = API.getStockPrice(ticker); //returns a promise
                    data.then(y => {
                        let mktPrice = Object.values(y[0])[0];
                        console.log('price for '+ ticker + ' is ' + mktPrice)
                        for (const [brokerName, map] of Object.entries(myMap)) {
                            var row = table.insertRow(ind)
                            row.style.border = 'red'
                            ind += 1
                            let broker = brokerName
                            let quantity = (map[ST.STOCK_QTY])
                            let price = (map[ST.STOCK_PRICE])

                            var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); 
                            var cell3 = row.insertCell(2); var cell4 = row.insertCell(3); 
                            var cell5 = row.insertCell(4); var cell6 = row.insertCell(5);
                            var cell7 = row.insertCell(6); var cell8 = row.insertCell(7);
                            cell1.innerHTML = stockName, cell2.innerHTML = ticker, cell3.innerHTML = broker; 
                            cell4.innerHTML = quantity; cell5.innerHTML = price + ' USD';
                            cell6.innerHTML = mktPrice + ' USD'

                            //creating sell button
                            var bu = document.createElement('button')
                            bu.className = 'bwt'
                            bu.id  = String(stockName)
                            bu.innerHTML = 'Sell'
                            bu.style.background = 'red'
                            bu.style.color = 'white'
                            
                        
                            //Profit/Loss calculation
                            let mktTotal = quantity * mktPrice
                            let currentPL = quantity * (-parseFloat(price) + parseFloat(mktPrice))
                            currentPL = currentPL.toFixed(2)
                            if (currentPL < 0) {
                                cell7.innerHTML = currentPL + ' USD'
                                cell7.style.color = 'red'
                            } else {
                                cell7.innerHTML = '+ ' + currentPL + ' USD'
                                cell7.style.color = 'green'
                            }

                            vm.totalValue += parseFloat(mktTotal)
                            vm.totalPL += parseFloat(currentPL)            

                            bu.onclick = () => toggleDel(stockName, ticker, broker, quantity, price, mktPrice,  currentPL)
                            cell8.appendChild(bu) //insert delete button 
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

    
    methods : {
        /*
        addInvestment() {
            this.$router.push({name:'AddStock'}) //TODO

        }
        */

        toggleModal() {
            this.modalActive = !this.modalActive;
        },
        
        toggleDelModal() {
            this.delModalActive = !this.delModalActive;
            this.sellData = {stockName:arguments[0], ticker:arguments[1], broker:arguments[2], quantity:arguments[3], price:arguments[4], mktPrice:arguments[5], profit:arguments[6]}
            console.log(arguments)
        },

        closeDelModal() {
            this.delModalActive = !this.delModalActive;
        }

    },
    

}

</script>

<style>
#holdingTable {
    width: 100%;  
    height:10px;
    border: 1px solid white; 
    border-collapse: collapse;
    font-size: 20px;
}

#holdingTable th {
    background-color: gray;
    border: 1px solid white;
    text-align: center;
    padding: 10px;
}

#holdingTable tr td {
    border: 1px solid white;
    padding: 10px;
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