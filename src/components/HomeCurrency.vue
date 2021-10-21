<template>
  <div class="col s12 m12 l8">
    <div class="card white bill-card">
      <div class="card-content">
        <div class="card-header">
          <span class="card-title">
            {{ "Exchange_rates" | localizeFilter }}
          </span>
        </div>
        <table class="exchange-table">
          <thead>
            <tr>
              <th>{{ "Currency" | localizeFilter }}</th>
              <th>{{ "Rate" | localizeFilter }}</th>
              <th>{{ "Date" | localizeFilter }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(curr, i) in Object.keys(rates)" :key="i">
              <td>{{ curr }}</td>
              <td>{{ rates[curr].toFixed(5) }}</td>
              <td>{{ date | dateFilter("date") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCurrency",

  props: {
    rates: {
      required: true,
      type: Object,
    },

    date: {
      required: true,
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/main";
@import "../assets/_vars";

.exchange-table {
  th {
    padding-left: 4px;
    padding-right: 4px;
  }

  td {
    @media (max-width: $small-mobile) {
      padding-left: 4px;
      padding-right: 4px;
    }
  }
}
</style>