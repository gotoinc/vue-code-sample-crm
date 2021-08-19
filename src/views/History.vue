<template>
   <div>
      <div class="page-title">
         <h3>Record history</h3>
      </div>

      <div class="history-chart">
         <canvas></canvas>
      </div>

     <Loader v-if="loading"/>

     <p class="center" v-else-if="!records.length">
       No records yet.
       <router-link to="/records">
         Add new record.
       </router-link>
     </p>

      <section v-else>
        <HistoryTable
            :records="records"
        />
      </section>
   </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import { mapActions } from 'vuex';

export default {
  name: 'History',
  components: {
    HistoryTable
  },

  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),

  methods: {
    ...mapActions('record', ['fetchRecords']),
    ...mapActions('category', ['fetchCategories'])
  },

  async mounted(){
    // this.records = await this.fetchRecords();
    const records = await this.fetchRecords();
    this.categories = await this.fetchCategories();
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Income' : 'Outcome'
      }
    })

    this.loading = false;
  }


}
</script>