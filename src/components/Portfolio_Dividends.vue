<template>
    <div class="main">
        
        <table id = 'dividendTable'>
            <tr>
                <th>Name</th>
                <th>Date Paid</th>
                <th>Payment Type</th>
                <th>Payment Rate</th>
                <th>Registered Holdings</th>
                <th>Book Closure</th>
                <th>Amount Paid</th>
            </tr>
        </table><br><br>
    </div>
</template>

<script>

</script>

<style scoped>
table {
    width: 100%;
    height: 5px;    
}

th,td {
    text-align: center;
    font-size: 20px;
    padding: 10px;
}

th {
    background-color: gray;
}

table,th,td {
    border: 1px solid white;
    border-collapse: collapse;
}



</style>