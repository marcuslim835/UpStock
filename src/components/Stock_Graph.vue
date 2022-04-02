<template>
    <div class="main">
        <VueTradingView :options="{
          symbol: ticker,
          theme: 'dark',
        }" />
    </div>
</template>

<script>
import VueTradingView from 'vue-trading-view/src/vue-trading-view';

export default {
  props: ['ticker'],
  components: {
    VueTradingView
  }
}
</script>

<style scoped>

</style>