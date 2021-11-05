<template>
  <div class="col s12 m12 l4">
    <div class="card white bill-card">
      <div class="card-content ">
        <span class="card-title">
          {{ $t("Currency_account") }}
        </span>

        <p
          v-for="(curr, i) in Object.keys(rates)"
          :key="i"
          class="currency-line"
        >
          <span> {{ getCurrency(curr) | currencyFilter(curr) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HomeBillVue",

  props: {
    rates: {
      required: true,
      type: Object,
    },
  },

  computed: {
    ...mapState("info", ["info"]),

    base() {
      return this.info.bill / this.rates["EUR"];
    },
  },

  methods: {
    getCurrency(curr) {
      return Math.floor(this.base * this.rates[curr]);
    },
  },
};
</script>