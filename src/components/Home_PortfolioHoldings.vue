<template>
    <div class="main">
        <div class = 'sect'>
            <div>
                <div class = 'top'>     
                    <h2 id = 'tableHeader' align="left">Portfolio</h2>
                </div>
                <div class = 'top'>     
                    <h2 id = 'countHeader' align="left">Number of Holdings: {{holdingsCount}}</h2>
                </div>
                <div class = 'top'>     
                    <button id ='addInvestButton' type="button" @click="() => toggleModal()">
                        <b>+ Add investment</b></button>
                </div>
            </div>
            <table id = 'homeHoldingTable'> 
            <tr>
                <th>Name|Ticker</th>
                <th>Type</th>
                <th>Current</th>
                <th>Quantity</th>
                <th>Total Worth</th>
                <th>% Change</th>
                <th></th>
            </tr>
        </table>
        <Modal :modalActive="modalActive">
            <OMS @cancel="() => toggleModal()"/>
        </Modal>
        </div>
        <div class = 'sect' id = 'pie'>
        <h2 id = 'pieHeader'> Portfolio Diversity</h2>
        <CChart v-if='hasData' id = 'pieChart' type="doughnut" style="width: 280px"
        :data="{
            labels: labelData,
            datasets: [{
                backgroundColor: backgroundColor,
                data: chartData
            },],
        }"/>
        <h3 id ='alternateHeader' v-if="hasData == false"> No data to display!</h3>
        </div>
    </div>
</template>

<script>


import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as ST from '../api/holdingsAccess.js';
import * as API from '../api/finance.js';
import {CChart} from '@coreui/vue-chartjs'
import Modal from './Modal.vue'; 
import OMS from './Overlay_ManageStock.vue'


export default {
    components: {
        OMS,
        Modal,
        CChart
    },

    data() {
        return {
            chartData : [0,0,0,0,0,0,0],
            labelData : ST.LABEL_TYPES,
            backgroundColor: ['#F4F00F','#7FC920','#22B8CF','#8390F1','#845EF7','#EE83F1','#F5446C'],
            dataWatcher: [],
            hasData: false,
            holdingsCount : 0,
            modalActive : false,
        }
    },

    watch: {
        dataWatcher(data) {
            console.log('Updating portfolio pie chart')
            this.hasData = true
            this.holdingsCount += 1
            this.chartData[ST.TYPE_MAP[data[0]]] += parseInt(data[1])
        }
    },

    mounted() {
        console.log('mounted portfolio holdings on Home Page');
        const vm = this
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
        async function displayTable() {
            const auth = getAuth();
            const curr = auth.currentUser;
            console.log('Current user id: ' + curr.uid) //user id
            var ind = 1 //row index
            const table = document.getElementById('homeHoldingTable')
            const getMap = ST.getAllHoldings(curr.uid) 
            getMap.then(x => {
                if (x == null) {
                    console.log('Firebase is empty')
                } else {
                    for (const key of x.keys()) { 
                        let ticker = key
                        let stockName = x.get(ticker)[ST.NAME_POS] //stockName
                        let typeHolding = x.get(ticker)[ST.TYPE_POS] //holding type
                        let mapBroker = x.get(ticker)[ST.BROKERS_POS] //broker map
                        let data = API.getStockPrice(ticker); //returns a promise
                        data.then(y => {
                            console.log('Accessing price of ' + ticker)
                            const row = table.insertRow(ind) 
                            var nameTickerCell = row.insertCell(0); var typeCell = row.insertCell(1);
                            var currentCell = row.insertCell(2); var quantityCell = row.insertCell(3); 
                            var totalCell = row.insertCell(4); var pcCell = row.insertCell(5); 
                            var buttonCell = row.insertCell(6);

                            let mktPrice = Object.values(y[0])[0];
                            let tickerQty = 0 //total qty of this holding
                            let sum = 0 //for aggregating the price
                            for (const map of Object.values(mapBroker)) {
                                let qty = (map[ST.STOCK_QTY])
                                tickerQty += parseInt(qty)
                                sum += (map[ST.STOCK_PRICE]) * qty
                            }
                            let totalWorth = (tickerQty * mktPrice).toFixed(2) 

                            
                            nameTickerCell.innerHTML = stockName + '|' + ticker + '<br><br> '
                            typeCell.innerHTML = typeHolding + '<br><br> '
                            typeCell.style.color = vm.backgroundColor[ST.TYPE_MAP[typeHolding]]
                            currentCell.innerHTML = '$' + mktPrice + '<br><br>'
                            quantityCell.innerHTML = tickerQty + '<br><br>'
                            totalCell.innerHTML = '$' + totalWorth + '<br><br>'

                            //creating arrow button
                            buttonCell.innerHTML =  '>> <br><br>'
                            buttonCell.style.color = 'white'
                            buttonCell.style.font = '20px'
                            buttonCell.onclick = function() {
                                goToHolding(ticker)
                            }
                            //Profit/Loss calculation
                            let aggPrice = (sum/tickerQty).toFixed(2) //total sum bought/total qty of ticker
                            let currentPL = (-parseFloat(aggPrice) + parseFloat(mktPrice))
                            console.log(currentPL + ' ' + ticker)
                            let percentC = (parseFloat(Math.abs(currentPL)/aggPrice) * 100).toFixed(2)
                            if (currentPL < 0) {
                                pcCell.innerHTML = '- ' + percentC + ' % <br><br>' 
                                pcCell.style.color = 'red'
                            } else {
                                pcCell.innerHTML = '+ ' + percentC + ' % <br><br>' 
                                pcCell.style.color = 'green'
                            }
                            ind += 1  
                            return [typeHolding,totalWorth]
                        }).then(arr => {
                            vm.dataWatcher = arr //trigger watcher
                        })
                    }
                }
            })
        }

        function goToHolding(ticker) {
            //TODO: go to stock page
            alert('go to ' + ticker + ' page')
        }
    },

    beforeUnmount() {
        function reinitTable() {
            console.log('Reinitialise Table')
            let tb = document.getElementById('homeHoldingTable')
            while (tb.rows.length > 1) {
                tb.deleteRow(1)
            }
        }
        reinitTable()
    },

    methods : {

        toggleModal() {
            this.modalActive = !this.modalActive;
        },

    },
       
}   


</script>

<style scoped>
.sect {
    float: left
}

.top {
    float: left;
    width: 240px;
}

#pie {
    text-align: center;
    margin-left: 80px;
}

#pieHeader, #tableHeader, #countHeader {
    font-family: monospace;
    font-size: 18px;
    color: aliceblue;
}

#alternateHeader {
    font-size:13px;
    color: #C4C9D5
}

#addInvestButton {
    width: 120px;
    height: 30px;
    margin-top: 5%;
    font-size: 12px;
    background: #F8F9FA;
    border: 1px solid rgba(134, 142, 150, 0.3);
    border-radius: 4px;
    cursor: pointer;
}

#homeHoldingTable {
    border-collapse: collapse;
    font-size: 16px;
    font-family: Cambria;

}
#homeHoldingTable th {
    background-color: #212529;
    padding: 25px;
}






</style>