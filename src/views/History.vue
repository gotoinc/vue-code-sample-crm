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

      <section v-if="!loading" class="chart-section">
        <ChartPie :data="chartData" :options="chartOptions" />
      </section>
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
@import "../assets/main";

.history-wrapper {
  display: flex;
  align-items: stretch;

  .history-table {
    flex-grow: 1;
    margin-right: 24px;

    table {
      margin: 0 auto;
      @media (max-width: 900px) {
        height: max-content;
        display: block;
        overflow-x: auto;
        white-space: nowrap;
        padding: 0;
      }

      th {
        padding-left: 0;
        padding-right: 0;
      }

      td {
        @media (max-width: 900px) {
          padding-left: 5px;
          padding-right: 15px;
        }
      }
    }
  }
  .chart-section {
    display: flex;
    justify-content: center;
  }

  .history-table,
  .chart-section {
    border-radius: 30px;
    background-color: $white;
    -webkit-box-shadow: -6px 42px 100px -42px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: -6px 42px 100px -42px rgba(34, 60, 80, 0.2);
    box-shadow: -6px 42px 100px -42px rgba(34, 60, 80, 0.2);
    padding: 30px;

    @media (max-width: 1300px) {
      width: 100%;
    }

    @media (max-width: 900px) {
      padding: 0;
    }
  }

  @media (max-width: 1300px) {
    flex-direction: column-reverse;
  }
}

canvas#pie-chart {
  @media (max-width: $small-mobile) {
    max-width: 300px;
    max-height: 300px;
  }
}

</style>
