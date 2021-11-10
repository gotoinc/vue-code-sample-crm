<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("Record_history") }}</h3>
    </div>

    <div class="history-wrapper">
      <Loader v-if="loading" />

      <p v-else-if="!records.length" class="center">
        {{ $t("Message_no_records") }}
        <router-link to="/record">
          {{ $t("Add_record_message") }}
        </router-link>
      </p>

      <section v-else class="history-table">
        <h5 class="exchange-title">{{ $t("Record_history") }}</h5>
        <HistoryTable :records="items" :passed-items="(page - 1) * pageSize" />

        <Paginate
          v-model="page"
          :page-count="pageCount"
          :page-range="isMobile ? 1 : 3"
          :click-handler="pageChangeHandle"
          :prev-text="isMobile ? $t('Prev_short') : $t('Prev')"
          :next-text="isMobile ? $t('Next_short') : $t('Next')"
          :container-class="'pagination center'"
          :page-class="'waves-effect'"
        />
      </section>

      <section
        v-if="!loading && categories.length && getCategoriesWithOutcomes.length"
        class="chart-section"
      >
        <div class="pie-wrapper">
          <h5 class="exchange-title">
            {{ $t("Chart_expenses_title") }}
          </h5>

          <ChartPie ref="chartPie" :data="chartData" @generated="setLegend" />
        </div>
        <div class="legend-con" v-html="message" />
      </section>
    </div>
  </div>
</template>

<script>
import ChartPie from "@/components/Charts/ChartPie";
import HistoryTable from "@/components/HistoryTable";

import paginationMixin from "@/mixins/pagination.mixin";

import constants from "@/utils/constants";

import { mapActions } from "vuex";

export default {
  name: "History",
  components: {
    ChartPie,
    HistoryTable,
  },

  mixins: [paginationMixin],
  props: {
    isMobile: {
      required: true,
      type: Boolean,
    },
  },

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
    message: "test",
    constants,
  }),

  computed: {
    getColors() {
      const initialColors = [
        "hsl(216, 100%, 63%)",
        "hsl(231, 100%, 84%)",
        "hsl(122, 50%, 75%)",
        "hsl(208, 21%, 76%)",
        "hsl(281, 100%, 86%)",
        "hsl(202, 100%, 89%)",
        "hsl(48, 100%, 78%)",
        "hsl(14, 100%, 77%)",
      ];
      return this.categories.map((c, idx) => {
        if (typeof initialColors[idx] === "undefined") {
          return this.generateRandomColor();
        }
        return initialColors[idx];
      });
    },
    getCategoriesWithOutcomes() {
      return this.categories.filter(c => {
        if (this.records.length) {
          const outcomesOfCategory = this.records.filter(
            r => r.categoryId === c.id && r.type === constants.TYPE_OUTCOME
          );
          if (outcomesOfCategory.length) return c;
        }
      });
    },
  },

  methods: {
    ...mapActions("record", ["fetchRecords"]),
    ...mapActions("category", ["fetchCategories"]),

    setLegend(html) {
      this.message = html;
    },

    updateDataset(el, idx) {
      this.$refs.chartPie.updateChartDataset(el, idx);
    },

    generateRandomColor() {
      const defaultHue = [216, 231, 122, 208, 281, 202, 48, 14];
      const hue = Math.floor(Math.random() * 360);
      const light = Math.floor(Math.random() * 20 + 70);
      const saturation = Math.floor(Math.random() * 60 + 40);

      const isHueUnique = defaultHue.every(h => {
        const isNotAlreadyUsed = hue !== h;
        const isNotCloseColor = !(hue < h + 3 && hue > h - 3);
        return isNotAlreadyUsed && isNotCloseColor;
      });

      if (isHueUnique || defaultHue.length >= 60) {
        defaultHue.push(hue);
        return `hsl(${hue}, ${saturation}%, ${light}%)`;
      }

      return this.generateRandomColor();
    },

    setupChartData() {
      this.chartData = {
        labels: this.getCategoriesWithOutcomes.map(c => c.title),

        datasets: [
          {
            label: "Outcome by category",
            data: this.getCategoriesWithOutcomes.map(c => {
              return this.records.reduce((acc, r) => {
                if (
                  r.categoryId === c.id &&
                  r.type === constants.TYPE_OUTCOME
                ) {
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

    paginationSetup(categories) {
      this.setupPagination(
        this.records.map(record => {
          return {
            ...record,
            categoryName: categories.find(c => c.id === record.categoryId)
              .title,
            typeClass:
              record.type === constants.TYPE_INCOME
                ? "income-green"
                : "outcome-red",
            typeText:
              record.type === constants.TYPE_INCOME ? "Income" : "Outcome",
          };
        })
      );
    },

    setupChatLabelsLogic() {
      this.$el.querySelectorAll(".custom-legend-item").forEach((item, i) => {
        item.addEventListener("click", () => {
          this.updateDataset(item, i);
        });
      });
    },

    async fetchHistoryData() {
      this.records = await this.fetchRecords();
      this.categories = await this.fetchCategories();
    },
  },

  async mounted() {
    await this.fetchHistoryData().then(() => {
      this.paginationSetup(this.categories);
      this.setupChartData();
      this.loading = false;
    });

    this.$nextTick(() => this.setupChatLabelsLogic());
  },
};
</script>
