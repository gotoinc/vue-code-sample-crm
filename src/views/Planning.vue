<template>
  <div>
    <div class="page-title">
      <h3 class="planning">{{ "Planning" | localizeFilter }}</h3>
      <h4 class="planning-sum">{{ info.bill | currencyFilter("EUR") }}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      You don't have any categories yet.
      <router-link to="/"> Add new category </router-link>
    </p>

    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <div class="categories-name">
          <p>
            <strong>{{ cat.title }}</strong>
          </p>
          <p>
            {{ cat.spend | currencyFilter }} {{ "Out_of" | localizeFilter }}
            {{ cat.limit | currencyFilter }}
          </p>
        </div>
        <div v-tooltip.noloc="cat.tooltip" class="progress">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "Planning",

  metaInfo() {
    return {
      title: this.$title("Planning"),
    };
  },

  data: () => ({
    loading: true,
    categories: [],
  }),

  methods: {
    ...mapActions("record", ["fetchRecords"]),
    ...mapActions("category", ["fetchCategories"]),
  },

  computed: {
    ...mapState("info", ["info"]),
  },

  async mounted() {
    const records = await this.fetchRecords();
    const categories = await this.fetchCategories();

    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === "outcome")
        .reduce((acc, r) => {
          return (acc += +r.amount);
        }, 0);

      const persent = (100 * spend) / cat.limit;
      const progressPercent = persent > 100 ? 100 : persent;
      let progressColor = "progress";
      progressColor +=
        persent < 60 ? "-green" : persent <= 100 ? "-yellow" : "-red";

      const toolTipValue = cat.limit - spend;
      const tooltip = `${
        toolTipValue < 0
          ? localizeFilter("MoreThan")
          : localizeFilter("Balance")
      } ${currencyFilter(Math.abs(toolTipValue))}`;

      return {
        ...cat,
        progressColor,
        progressPercent,
        spend,
        tooltip,
      };
    });

    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.progress {
  &-green {
    background: #9fdfa2;
  }
  &-yellow {
    background: #ffe788;
  }
  &-red {
    background: #ff847b;
  }
}
</style>
