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
                <button id ='addInvestButton' type="button" @click="() => toggleModal()">+ Add investment</button>
            </div>
        </div>
        <div class = 'tableDiv'>
        <table id = 'holdingTable'>
            <tr>
                <th>Name</th>
                <th>Ticker</th>
                <th>Broker</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Unit Cost</th>
                <th>Market Price</th> 
                <th>Profit/Loss</th>
                <th>Sell</th>
            </tr>
        </table>
        </div>
        <Modal :modalActive="modalActive">
            <OMS @cancel="() => toggleModal()" @done="() => toggleAndRefresh()"/>
        </Modal>

        <Modal :modalActive="delModalActive">
            <ODE :sellData="sellData" @cancel="() => closeDelModal()" @deleted="() => closeDelModalAndRefresh()"/>
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
        onAuthStateChanged(auth, (user)  => {
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
                            let quantity = parseInt(map[ST.STOCK_QTY])
                            let price = parseInt(map[ST.STOCK_PRICE])
                            let date = parseInt(map[ST.STOCK_DATE])
                            var nameCell = row.insertCell(0); var tickerCell = row.insertCell(1); 
                            var brokerCell = row.insertCell(2); var dateCell = row.insertCell(3);
                            var qtyCell = row.insertCell(4); var priceCell = row.insertCell(5); 
                            var currentCell = row.insertCell(6); var plCell = row.insertCell(7); 
                            var buttonCell = row.insertCell(8);
                            nameCell.innerHTML = stockName, tickerCell.innerHTML = ticker, brokerCell.innerHTML = broker; 
                            qtyCell.innerHTML = quantity; priceCell.innerHTML = price + ' USD';
                            currentCell.innerHTML = mktPrice + ' USD'
                            dateCell.innerHTML = new Date(date).toDateString().slice(4,)
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
                                plCell.innerHTML = currentPL + ' USD'
                                plCell.style.color = 'red'
                            } else {
                                plCell.innerHTML = '+ ' + currentPL + ' USD'
                                plCell.style.color = '#7FC920'
                            }
                            vm.totalValue = (parseFloat(vm.totalValue) + parseFloat(mktTotal)).toFixed(2)
                            vm.totalPL = (parseFloat(vm.totalPL) + parseFloat(currentPL)).toFixed(2)

                            bu.onclick = () => toggleDel(stockName, ticker, broker, quantity, price, mktPrice,  currentPL)
                            buttonCell.appendChild(bu) //insert delete button 
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

        toggleAndRefresh() {
            console.log("toggleAndRefreshed")
            this.modalActive = !this.modalActive;
            this.$router.go();
        },
        
        toggleDelModal() {
            this.delModalActive = !this.delModalActive;
            this.sellData = {stockName:arguments[0], ticker:arguments[1], broker:arguments[2], quantity:arguments[3], price:arguments[4], mktPrice:arguments[5], profit:arguments[6]}
            console.log(arguments)
        },

        closeDelModal() {
            this.delModalActive = !this.delModalActive;
        },

        closeDelModalAndRefresh() {
            this.delModalActive = !this.delModalActive;
            this.$router.go();
        }

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
#holdingTable {
    width: 100%;  
    border: 1px solid white; 
    border-collapse: collapse;
    font-size: 20px;
    overflow-y:scroll
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
    font-size: 1rem;
    font-weight: 500;
    border-radius: 5px;
    border: none;
    padding: .425rem 3rem;
    box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
    cursor: pointer;
    display: inline-block;
    transition: all .22s;
    margin-left:5%;
    margin-top: 20%;
    background-color: #747ff9;
    
}

.bwt {
    background:rgb(5, 226, 247);
    border-radius: 6px;
    border: none;
}

</style>