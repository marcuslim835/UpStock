<template>
  <div class="main">
    <table
        class="statisticsTable"
        v-if="loaded"
        :ticker="ticker"
        :stats="stats"
    >
      <tr>
        <th>Key Statistics</th>
        <th>Profitability</th>
      </tr>

      <tr>
        <td>Market Capitalisation: {{stats.keyStatistics.marketCap}}</td>
        <td>Profit Margin: {{stats.profitability.profitMargin}}</td>
      </tr>

      <tr>
        <td>Beta (5Y Monthly): {{stats.keyStatistics.beta}}</td>
        <td>Operating Margin: {{stats.profitability.operatingMargin}}</td>
      </tr>

      <tr>
        <td>PE Ratio (TTM): {{stats.keyStatistics.PE}}</td>
        <td>Return On Assets: {{stats.profitability.ROA}}</td>
      </tr>

      <tr>
        <td>EPS (TTM): {{stats.keyStatistics.EPS}}</td>
        <td>Return on Equity: {{stats.profitability.ROE}}</td>
      </tr>
    </table>

    <table
        class="statisticsTable"
        v-if="loaded"
        :ticker="ticker"
        :stats="stats"
    >
      <tr>
        <th>Share Statistics</th>
        <th>Price History</th>
      </tr>

      <tr>
        <td>Volume: {{stats.shareStatistics.volume}}</td>
        <td>52 Week High: {{stats.priceHistory.high}}</td>
      </tr>

      <tr>
        <td>Average Volume: {{stats.shareStatistics.avgVolume}}</td>
        <td>52 Week Low: {{stats.priceHistory.low}}</td>
      </tr>

      <tr>
        <td>Shares Outstanding: {{stats.shareStatistics.sharesOutstanding}}</td>
        <td>50 Day Moving Average: {{stats.priceHistory.movingAverage50}}</td>
      </tr>

      <tr>
        <td>Shares Short: {{stats.shareStatistics.sharesShort}}</td>
        <td>200 Day Moving Average: {{stats.priceHistory.movingAverage200}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import * as API from "@/api/finance";

export default {
  props: ['ticker'],
  data: () => ({
    loaded: false,
    stats: null
  }),
  async mounted() {
    this.loaded = false;
    try {
      console.log(this.ticker);
      this.stats = await API.getKeyStatistics(this.ticker);

      console.log(this.stats);
      this.loaded = true;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style scoped>
  .main {
    display: inline-flex;
    flex-direction: column;
  }

  .statisticsTable {
    padding: 60px
  }

  th {
    font-size: 24px;
    text-align: left;
    padding-right: 250px;
  }

  td {
    text-align: left;
    padding-top: 20px;
  }
</style>