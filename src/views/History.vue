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
        <HistoryTable :records="items" />

        <Paginate
            v-model="page"
            :pageCount="pageCount"
            :clickHandler="pageChangeHandle"
            :prevText="'Prev'"
            :nextText="'Next'"
            :containerClass="'pagination center'"
            :page-class="'waves-effect'"
        />
      </section>
   </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from '@/mixins/pagination.mixin';
import { mapActions } from 'vuex';

export default {
  name: 'History',
  mixins: [paginationMixin],
  components: {
    HistoryTable
  },

  data: () => ({
    loading: true,
    records: [],
  }),

  methods: {
    ...mapActions('record', ['fetchRecords']),
    ...mapActions('category', ['fetchCategories']),
  },

  async mounted(){
    this.records = await this.fetchRecords();
    const categories = await this.fetchCategories();


    this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Income' : 'Outcome'
      }
    }))

    this.loading = false;
  }


}
</script>