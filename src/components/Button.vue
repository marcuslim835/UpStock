<template>
    <button :class="[greenButtonTheme ? 'greenbg' : 'whitebg', 'baseButton']" @click="buttonClicked"> {{ buttonText }} </button>
</template>
 
<script>
export default {
    props: {
        buttonText : String,
        greenButtonTheme: Boolean,
    },

    methods: {
        buttonClicked() {
            this.$emit("bc");
        }
    }
}
</script>

<style scoped>
    .baseButton {
        padding: 20px 120px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .whitebg {
        background-color: white;
        color: green;
    }

    .greenbg {
        background-color: green;
        color: white;
    }

</style>