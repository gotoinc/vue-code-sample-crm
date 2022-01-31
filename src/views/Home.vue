<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("views.account") }}</h3>

      <button
        class="btn waves-effect waves-light btn-small btn-reload btn-yellow"
        @click="refresh"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill :rates="currency.rates" />

      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";

import { mapActions, mapState } from "vuex";

export default {
  name: "Home",

  metaInfo() {
    return {
      title: this.$title("views.account"),
    };
  },

  components: {
    HomeBill,
    HomeCurrency,
  },

  data: () => ({
    loading: true,
  }),

  computed: {
    ...mapState("info", ["currency"]),
  },

  methods: {
    ...mapActions("info", ["fetchCurrency", "fetchInfo"]),

    async refresh() {
      this.loading = true;
      await this.fetchCurrency();
      await this.fetchInfo();
      this.loading = false;
    },
  },

  async mounted() {
    await this.fetchCurrency();
    this.loading = false;
  },
};
</script>
