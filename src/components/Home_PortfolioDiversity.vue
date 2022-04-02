<template>
    <div class="main">
        <div class = 'pie-wrapper'>
        <h2> Portfolio diversity ring </h2>
        </div>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged} from "firebase/auth";
import * as ST from '../api/holdingsAccess.js';
//import * as API from '../api/finance.js';

export default {

    

    mounted() {
        const auth = getAuth()
        
        onAuthStateChanged(auth, (user)  =>{
            if (user) {
                // User is signed in.
                this.user = user
                fillChart()
            } else {
                // No user is signed in.
            }
        });
        //var vm = this
        async function fillChart() {
            console.log('loading Pie Chart data')
            const auth = getAuth();
            const curr = auth.currentUser;
            let pArr = []
            console.log(curr.uid)
            let typeMap = ST.getDiversity('userID')
            console.log('loading Pie Chart data')
            typeMap.then(x => {
                for (const key of x.keys()) { //each type
                    pArr.push(key)
                    console.log(key)
                    /*
                    for (const t of newMap.keys()) { //each ticker
                        let ticker = t
                        let qty = newMap.get(t)
                        let data = API.getStockPrice(ticker); //returns a promise
                        data.then(y => {
                            let mktPrice = y
                            totalValue += qty * mktPrice
                        })
                    }
                    */
                }
            })
            console.log(pArr)
        }
    },
    data() {
        return {
            user : false,
        }
    },

}
</script>


<style scoped>
    #pieChart {
        height: 150px;
        width: 200px;
    }

    h2 {
        width: 200px;
    }
</style>