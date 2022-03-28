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
export default {
    emits: ["deleteEntry", "cancel"],

    props: ["sellData"],

    components: {
        Button,
    },

    methods: {
        deleteEntry() {
            this.$emit("deleteEntry")
        },

        cancelDelete() {
            this.$emit("cancel")
        }
    }
}

</script>

<style scoped>

</style>