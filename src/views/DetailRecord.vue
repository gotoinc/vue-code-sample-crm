<template>
  <div>
    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">
          {{ "History" | localizeFilter }}
        </router-link>
        <a class="breadcrumb" @click.prevent>
          {{ getRecordType | localizeFilter }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income',
            }"
            class="card card-outcome"
          >
            <div class="card-content">
              <div class="outcome-row">
                <p class="name"> {{ "Description" | localizeFilter }} </p>
                <p class="outcome-value"> {{ record.description }} </p>
              </div>

              <div class="outcome-row">
                <p class="name"> {{ "Sum" | localizeFilter }} </p>
                <p class="outcome-value"> {{ record.amount | currencyFilter }} </p>
              </div>

              <div class="outcome-row">
                <p class="name"> {{ "Category" | localizeFilter }} </p>
                <p class="outcome-value"> {{ record.categoryName }} </p>
              </div>

              <small class="data-outcome">{{ record.date | dateFilter("datetime") }}</small>
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
      return this.record.type === "income" ? "Income" : "Outcome";
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



<style lang="scss" scoped>
  @import "../assets/_vars.scss";
  @import "../assets/main.scss";


.breadcrumb-wrap a, .breadcrumb-wrap a:before {
  font-weight: 500;
  font-size: 30px;
  color: $black !important;

  @media (max-width: $small-tablet) {
    font-size: 20px;
  }
}

.breadcrumb-wrap {
  padding-bottom: 16px;
  border-bottom: 1px solid $light-gray;
}


.breadcrumb-wrap,
.breadcrumb-wrap a,
.breadcrumb-wrap a:before {
  @include align-center-flex-elements;
}

.breadcrumb-wrap {
  position: relative;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.breadcrumb-wrap a,
.breadcrumb-wrap a:before {
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  color: $black !important;
}

</style>