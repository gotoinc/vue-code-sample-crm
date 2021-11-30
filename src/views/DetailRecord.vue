<template>
  <div>
    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">
          {{ $t("views.history") }}
        </router-link>
        <a class="breadcrumb" @click.prevent>
          {{ $t(getRecordType) }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card card-outcome">
            <div class="card-content">
              <div class="outcome-row">
                <p class="name">{{ $t("views.description") }}</p>
                <p class="outcome-value">{{ record.description }}</p>
              </div>

              <div class="outcome-row">
                <p class="name">{{ $t("views.sum") }}</p>
                <p class="outcome-value">
                  {{ record.amount | currencyFilter }}
                </p>
              </div>

              <div class="outcome-row">
                <p class="name">{{ $t("views.category") }}</p>
                <p class="outcome-value">{{ record.categoryName }}</p>
              </div>

              <small class="data-outcome">
                {{ record.date | dateFilter("datetime") }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="center">
      Record with id {{ $route.params.id }} is not found.
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import constants from "@/utils/constants";

export default {
  name: "DetailRecord",

  metaInfo() {
    return {
      title: this.$title("views.details"),
    };
  },

  data: () => ({
    record: null,
    loading: true,
  }),

  methods: {
    ...mapActions("record", ["fetchRecord"]),
    ...mapActions("category", ["fetchCategory"]),

    async getRecordData() {
      const id = this.$route.params.id;
      await this.fetchRecord(id);
      await this.fetchCategory(this.currentRecord.categoryId);

      this.record = {
        ...this.currentRecord,
        categoryName: this.currentCategory.title,
      };
      this.loading = false;
    },
  },

  computed: {
    ...mapState("record", ["currentRecord"]),
    ...mapState("category", ["currentCategory"]),

    getRecordType() {
      return this.record.type === constants.TYPE_INCOME
        ? "common.income"
        : "common.outcome";
    },
  },

  async mounted() {
    await this.getRecordData();
  },
};
</script>