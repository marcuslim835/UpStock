<template>
    <button :class="[greenButtonTheme ? 'greenbg' : 'whitebg', 'baseButton']" @click="buttonClicked"> {{ buttonText }} </button>
</template>
 
<script>
export default {
    emits: ["bc"],

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
        padding: 17px 120px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 18px;
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