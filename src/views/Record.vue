<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("views.new_record") }}</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      {{ $t("messages.message_no_categories") }}
      <router-link to="/">
        {{ $t("messages.add_record_message") }}
      </router-link>
    </p>

    <form v-else class="form" @submit.prevent="handleSubmit">
      <label>{{ $t("views.choose_category_label") }}</label>
      <div
        class="input-field"
        :class="isDropdownOpened ? 'arrow-up' : 'arrow-down'"
      >
        <select ref="select" v-model="category">
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
      </div>

      <div>
        <label class="income">
          <input
            v-model="type"
            class="with-gap income-outcome-radio"
            name="type"
            type="radio"
            value="income"
          />
          <span class="income-outcome-radio-label">{{
            $t("common.income")
          }}</span>
        </label>
      </div>

      <div>
        <label>
          <input
            v-model="type"
            class="with-gap income-outcome-radio"
            name="type"
            type="radio"
            value="outcome"
          />
          <span class="income-outcome-radio-label">{{
            $t("common.outcome")
          }}</span>
        </label>
      </div>

      <label for="amount">{{ $t("views.sum") }}</label>

      <div class="amount-inputs__wrapper">
        <div class="input-field">
          <input
            id="amount"
            v-model.number="amount"
            type="number"
            :class="{
              invalid:
                $v.amount.$dirty &&
                (!$v.amount.minValue || !$v.amount.required),
            }"
          />

          <span
            v-if="
              $v.amount.$dirty && (!$v.amount.minValue || !$v.amount.required)
            "
            class="helper-text invalid"
          >
            {{ $t("messages.min_value_message") }}
            {{ $v.amount.$params.minValue.min }}
          </span>
        </div>

        <div
          class="input-field"
          :class="isCurrencyDropdownOpened ? 'arrow-up' : 'arrow-down'"
        >
          <select ref="currencySelect" v-model="sumCurrency">
            <option
              v-for="(curr, idx) in getCurrencyRates"
              :key="idx"
              :value="curr.rate"
            >
              {{ curr.currency }}
            </option>
          </select>
        </div>
      </div>

      <label for="description">{{ $t("views.description") }}</label>

      <div class="input-field">
        <textarea
          id="description"
          v-model="description"
          rows="8"
          type="text"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required,
          }"
        />
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >
          {{ $t("messages.description_required_message") }}
        </span>
      </div>

      <button
        class="btn waves-effect waves-light btn-create btn-yellow"
        type="submit"
      >
        {{ $t("common.create") }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import { minValue, required } from "vuelidate/lib/validators";

import constants from "@/utils/constants";

export default {
  name: "Record",

  metaInfo() {
    return {
      title: this.$title("views.new_record"),
    };
  },

  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: "outcome",
    amount: 1,
    description: "",
    isDropdownOpened: false,
    constants: constants,
    sumCurrency: null,
    currencySelect: null,
    isCurrencyDropdownOpened: false,
  }),

  validations: {
    description: {
      required,
    },
    amount: {
      required,
      minValue: minValue(1),
    },
  },

  computed: {
    ...mapState("info", ["info", "currency"]),

    canCreateRecord() {
      if (this.type === this.constants.TYPE_INCOME) {
        return true;
      }
      return this.info.bill >= this.amountToEUR;
    },

    getCurrencyRates() {
      let currencyRates = [];
      const currencyObject = this.currency.rates;
      for (let p in currencyObject) {
        currencyRates.push({ currency: p, rate: currencyObject[p] });
      }
      return currencyRates;
    },
    amountToEUR() {
      return this.amount / this.sumCurrency;
    },
  },

  methods: {
    ...mapActions("category", ["fetchCategories"]),
    ...mapActions("info", ["updateInfo", "fetchCurrency"]),
    ...mapActions("record", ["createRecord"]),

    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.canCreateRecord) {
        try {
          await this.createRecord({
            categoryId: this.category,
            amount: this.amountToEUR,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          });

          const bill =
            this.type === this.constants.TYPE_INCOME
              ? this.info.bill + this.amountToEUR
              : this.info.bill - this.amountToEUR;

          await this.updateInfo({ bill });

          this.$message(this.$t("messages.record_created"));
          this.clear();
        } catch (e) {
          throw e;
        }
      } else {
        this.$message(
          `${this.$t("messages.no_money")} (${this.amount - this.info.bill})`
        );
      }
    },

    clear() {
      this.$v.$reset();
      this.description = "";
      this.amount = 1;
    },

    async setupRecordData() {
      await this.fetchCategories().then(categories => {
        this.categories = categories;
      });

      if (this.categories.length) {
        this.category = this.categories[0].id;
      }

      if (!this.currency) {
        await this.fetchCurrency();
      }
      this.sumCurrency = this.getCurrencyRates[0].rate;
      this.loading = false;
    },
  },

  watch: {
    select: {
      deep: true,
      handler: function (newValue) {
        if (newValue && newValue.dropdown) {
          this.isDropdownOpened = newValue.dropdown.isOpen;
        }
      },
    },
    category: function () {
      this.clear();
    },
    currencySelect: {
      deep: true,
      handler: function (newValue) {
        if (newValue && newValue.dropdown) {
          this.isCurrencyDropdownOpened = newValue.dropdown.isOpen;
        }
      },
    },
  },

  async mounted() {
    await this.setupRecordData();

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      this.currencySelect = M.FormSelect.init(this.$refs.currencySelect);
      M.updateTextFields();
    }, 0);
  },

  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
    if (this.currencySelect && this.currencySelect.destroy) {
      this.currencySelect.destroy();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

.arrow-down::v-deep {
  .select-wrapper:after {
    @include select-icon-arrow-reset;
    background-image: $arrow-down;
  }
}

.arrow-up::v-deep {
  .select-wrapper:after {
    @include select-icon-arrow-reset;
    background-image: $arrow-up;
  }
}
</style>
