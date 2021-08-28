<template>
   <div>
      <div class="page-title">
         <h3>{{ "Record_history" | localizeFilter }}</h3>
      </div>

      <div class="history-chart">
        <ChartPie
            v-if="!loading"
            :data="chartData"
            :options="chartOptions"
        />
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
import ChartPie from '@/components/Charts/ChartPie';
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from '@/mixins/pagination.mixin';

import { mapActions } from 'vuex';

export default {
  name: 'History',
  mixins: [paginationMixin],
  components: {
    ChartPie,
    HistoryTable,
  },

  metaInfo(){
    return {
      title: this.$title("Record_history")
    }
  },

  data: () => ({
    loading: true,
    categories: [],
    records: [],
    chartData: null,
    chartOptions: null,
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

      this.chartData = {
        labels: this.categories.map(c => c.title),
        datasets: [{
          label: 'Outcome by category',
          data: this.categories.map(c => {
            return this.records.reduce((acc, r) => {
              if(r.categoryId === c.id && r.type === 'outcome') {
                acc += +r.amount
              }
              return acc;
            },0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(152, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(152, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1
        }]
      };
    },
  },

  async mounted(){
    this.records = await this.fetchRecords();
    this.categories = await this.fetchCategories();

    this.setup(this.categories);

    this.loading = false;
  },

}
</script>