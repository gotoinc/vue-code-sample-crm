<template>
  <div>
    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">
          {{ $t("History") }}
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
                <p class="name">{{ $t("Description") }}</p>
                <p class="outcome-value">{{ record.description }}</p>
              </div>

              <div class="outcome-row">
                <p class="name">{{ $t("Sum") }}</p>
                <p class="outcome-value">
                  {{ record.amount | currencyFilter }}
                </p>
              </div>

              <div class="outcome-row">
                <p class="name">{{ $t("Category") }}</p>
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
import { mapActions } from "vuex";

import constants from "@/utils/constants";

export default {
  name: "DetailRecord",

  metaInfo() {
    return {
      title: this.$title("Details"),
    };
  },

  data: () => ({
    record: null,
    loading: true,
  }),

  methods: {
    ...mapActions("record", ["fetchRecord"]),
    ...mapActions("category", ["fetchCategory"]),
  },

  computed: {
    getRecordType() {
      return this.record.type === constants.TYPE_INCOME ? "Income" : "Outcome";
    },
  },

  async mounted() {
    const id = this.$route.params.id;
    const record = await this.fetchRecord(id);
    const category = await this.fetchCategory(record.categoryId);

    this.record = {
      ...record,
      categoryName: category.title,
    };
    this.loading = false;
  },
};
</script>