<template>
  <div class="col s12 m12 l8">
    <div class="card white bill-card">
      <div class="card-content">
        <div class="card-header">
          <span class="card-title">
            {{ $t("views.exchange_rates") }}
          </span>
        </div>
        <table class="exchange-table">
          <thead>
            <tr>
              <th>{{ $t("views.currency") }}</th>
              <th>{{ $t("views.rate") }}</th>
              <th>{{ $t("views.date") }}</th>
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
