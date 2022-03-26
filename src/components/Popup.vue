<template>
    <div class="popup">
        <div class="popup-inner">
            <slot/>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;

        background-color: rgba(0, 0, 0, 0.25);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .popup-inner {
        background-color: #212529;
        padding: 50px;
        border-radius: 10px;
    }

</style>