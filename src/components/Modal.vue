<template>
    <transition name="modal-animation">
        <div v-show="modalActive" class="modal">
            <transition name="modal-animation-inner">
                <div v-show="modalActive" class="modal-inner">
                    <!-- content of popup/modal -->
                    <slot />
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    props: ["modalActive"],
}
</script>

<style scoped>
    .modal {
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

    .modal-inner {
        background-color: #212529;
        padding: 50px;
        border-radius: 10px;
    }

    .modal-animation-enter-active, 
    .modal-animation-leave-active {
        transition: opacity .3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
    }

    .modal-animation-enter-from,
    .modal-animation-leave-to {
        opacity: 0;
    }

    .modal-animation-inner-enter-active {
        transition: all .3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
    }

    .modal-animation-inner-leave-active {
        transition: all .3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
    }

    .modal-animation-inner-enter-from {
        opacity: 0;
        transform: scale(0.8);
     }

    .modal-animation-inner-leave-to {
        opacity: 0;
        transform: scale(0.8);
     }

</style>