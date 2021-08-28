<template>
  <div>
    <div class="page-title">
      <h3>{{ "Account" | localizeFilter }}</h3>

      <button
          @click="refresh"
          class="btn waves-effect waves-light btn-small"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>

    <div
        v-else
        class="row"
    >

      <HomeBill :rates="currency.rates"/>

      <HomeCurrency
          :rates="currency.rates"
          :date="currency.date"
      />

    </div>
  </div>
</template>

<script>

import HomeBill from '@/components/HomeBill';
import HomeCurrency from "@/components/HomeCurrency";

import { mapActions, mapState } from 'vuex';

export default {
  name: 'Home',

  metaInfo(){
    return {
      title: this.$title("Account")
    }
  },

  data: () => ({
    loading: true,
  }),

  components: {
    HomeBill,
    HomeCurrency
  },

  computed: {
    ...mapState('info', ['currency'])
  },

  methods: {
    ...mapActions('info', ['fetchCurrency']),
    async refresh() {
      this.loading = true;
      await this.fetchCurrency();
      this.loading = false;
    }
  },

  async mounted() {
    await this.fetchCurrency();
    this.loading = false;
  }
}
</script>
