<template>
  <div>
    <div class="page-title">
      <h3>{{ "Record_history" | localizeFilter }}</h3>
    </div>

    <div class="history-wrapper">
      <Loader v-if="loading" />

      <p v-else-if="!records.length" class="center">
        {{ "Message_no_records" | localizeFilter }}
        <router-link to="/record">
          {{ "Add_record_message" | localizeFilter }}
        </router-link>
      </p>

      <section v-else class="history-table">
        <h5 class="exchange-title">Exchange rates</h5>
        <HistoryTable :records="items" />

        <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandle"
          :prev-text="'Prev' | localizeFilter"
          :next-text="'Next' | localizeFilter"
          :container-class="'pagination center'"
          :page-class="'waves-effect'"
        />
      </section>

      <ChartPie v-if="!loading" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import ChartPie from "@/components/Charts/ChartPie";
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin";

import { mapActions } from "vuex";

export default {
  name: "History",
  components: {
    ChartPie,
    HistoryTable,
  },
  mixins: [paginationMixin],

  metaInfo() {
    return {
      title: this.$title("Record_history"),
    };
  },

  data: () => ({
    loading: true,
    categories: [],
    records: [],
    chartData: null,
    chartOptions: null,
  }),

  computed: {
    getColors() {
      return this.categories.map(() => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        while (color.length < 7) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      });
    },
  },

  methods: {
    ...mapActions("record", ["fetchRecords"]),
    ...mapActions("category", ["fetchCategories"]),

    setup(categories) {
      this.setupPagination(
        this.records.map(record => {
          return {
            ...record,
            categoryName: categories.find(c => c.id === record.categoryId)
              .title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ? "Income" : "Outcome",
          };
        })
      );

      this.chartData = {
        labels: this.categories.map(c => c.title),
        datasets: [
          {
            label: "Outcome by category",
            data: this.categories.map(c => {
              return this.records.reduce((acc, r) => {
                if (r.categoryId === c.id && r.type === "outcome") {
                  acc += +r.amount;
                }
                return acc;
              }, 0);
            }),
            backgroundColor: this.getColors,
            borderWidth: 1,
          },
        ],
      };
    },
  },

  async mounted() {
    this.records = await this.fetchRecords();
    this.categories = await this.fetchCategories();

    this.setup(this.categories);

    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.history-wrapper {
  display: flex;
  align-items: center;

  .history-table {
    flex-grow: 1;
  }
}
</style>
