<template>
    <div class="main">
        <h1> Delete Entry </h1>
        <p> Are you sure you want to delete the following entry? </p>

        <div id="table">
            <table id = 'holdingTable'>
                <tr>
                    <th>Name</th>
                    <th>Ticker</th>
                    <th>Broker</th>
                    <th>Quantity</th>
                    <th>Unit Cost</th>
                    <th>Market Price</th> 
                    <th>Profit/Loss</th>
                </tr>
                <tr>
                    <td>{{sellData.stockName}}</td>
                    <td>{{sellData.ticker}}</td>
                    <td>{{sellData.broker}}</td>
                    <td>{{sellData.quantity}}</td>
                    <td>{{sellData.price}}</td>
                    <td>{{sellData.mktPrice}}</td>
                    <td>{{sellData.profit}}</td>
                </tr>
            </table>
        </div>
        <br><br>

        <Button :greenButtonTheme="true" buttonText="Confirm" @bc="deleteEntry()"/><br><br>
        <Button :greenButtonTheme="false" buttonText="Cancel" @bc="cancelDelete()"/><br><br>

    </div>
</template>

<script>
import Button from "./Button.vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import * as ST from '../api/holdingsAccess.js';

export default {
    emits: ["cancel", "deleted"],

    props: ["sellData"],

    components: {
        Button,
    },

    data() {
        return {
            user : false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        });
    },

    methods: {
        async deleteEntry() {
            try {
                const auth = getAuth();
                const currUser = auth.currentUser;
                console.log(typeof currUser.uid)
                await ST.delData(currUser.uid, this.sellData.ticker, this.sellData.broker);
                console.log("DELETE ENTRY AFTER AWAIT")
                this.$emit("deleted")
            }
            catch (error) {
                console.error(error);
            }
        },

        cancelDelete() {
            this.$emit("cancel")
        }
    }
}

</script>

<style scoped>

</style>