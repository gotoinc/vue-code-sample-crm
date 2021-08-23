<template>
  <div>
    <Loader v-if="loading"/>

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{ "History" | localizeFilter }}</router-link>
        <a @click.prevent class="breadcrumb"> {{ (record.type === 'income' ? "Income" : "Outcome") | localizeFilter }} </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
              :class="{
                'red': record.type === 'outcome',
                'green': record.type === 'income'
               }"
              class="card"
          >
            <div class="card-content white-text">
              <p>{{ "Description" | localizeFilter }}: {{ record.description }}</p>
              <p>{{ "Sum" | localizeFilter }}: {{ record.amount | currencyFilter }}</p>
              <p>{{ "Category" | localizeFilter }}: {{ record.categoryName }}</p>

              <small>{{ record.date | dateFilter('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-else
       class="center"
    >
      Record with id {{ $route.params.id }} is not found.
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'DetailRecord',
  
  data: () => ({
    record: null,
    loading: true
  }),

  methods: {
    ...mapActions('record', ['fetchRecord']),
    ...mapActions('category', ['fetchCategory']),

  },

  async mounted(){
    const id = this.$route.params.id;
    const record = await this.fetchRecord(id);
    const category = await this.fetchCategory(record.categoryId);

    this.record = {
      ...record,
      categoryName: category.title
    }
    this.loading = false;


  }
}
</script>