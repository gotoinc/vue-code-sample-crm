<template>
   <div>
      <div class="page-title">
         <h3>{{ "Record_history" | localizeFilter }}</h3>
      </div>

      <div class="history-chart">
         <canvas ref="canvas" />
      </div>

     <Loader v-if="loading"/>

     <p
         v-else-if="!records.length"
         class="center"
     >
       {{ "Message_no_records" | localizeFilter }}
       <router-link to="/record">
         {{ "Add_record_message" | localizeFilter }}
       </router-link>
     </p>

      <section v-else>
        <HistoryTable :records="items" />

        <Paginate
            v-model="page"
            :pageCount="pageCount"
            :clickHandler="pageChangeHandle"
            :prevText="'Prev' | localizeFilter"
            :nextText="'Next' | localizeFilter"
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
    HistoryTable,
  },

  metaInfo(){
    return {
      title: this.$title("Record_history")
    }
  },

  data: () => ({
    loading: true,
    records: [],
  }),

  methods: {
    ...mapActions('record', ['fetchRecords']),
    ...mapActions('category', ['fetchCategories']),

    setup(categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Income' : 'Outcome'
        }
      }));
    },
  },

  async mounted(){
    this.records = await this.fetchRecords();

    const categories = await this.fetchCategories();
    this.setup(categories);

    this.loading = false;
  },

}
</script>