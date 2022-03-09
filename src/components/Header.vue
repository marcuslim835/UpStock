<template>
    <h1 id="title" class="main"> {{ content }} </h1>
</template>

<script>
    export default {
        name: 'Header',
        props: {
            content: String
        }
    }
</script>


<style scoped>
    #title {
    text-align: left;
    padding-bottom: 29px;
    border-bottom: 1px solid white;
}
</style>