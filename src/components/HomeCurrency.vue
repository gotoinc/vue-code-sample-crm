<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">
            {{ "Exchange_rates" | localizeFilter }}
          </span>
        </div>
        <table>
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