<template>
    <div class="main">
        <div class = 'pie-wrapper'>
        <h2> Portfolio diversity ring </h2>
        </div>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged} from "firebase/auth";


export default {
    mounted() {
        console.log('mounted');
        const auth = getAuth()
        onAuthStateChanged(auth, (user)  =>{
            if (user) {
                // User is signed in.
                this.user = user
                console.log('load data ' + this.chartData)
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
            console.log('Current user id: ' + curr.uid) //user id
        }
    },
    data() {
        return {
            user : false,
            chartData : [20,30,40,50,60,10],
            labelData : ['Tech','Finance','Real Estate','Energy','Materials','Healthcare']
        }
    }
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