<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("New_record") }}</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      {{ $t("Message_no_categories") }}
      <router-link to="/">
        {{ $t("Add_record_message") }}
      </router-link>
    </p>

    <form v-else class="form" @submit.prevent="handleSubmit">
      <label>{{ $t("Choose_category_label") }}</label>
      <div
        class="input-field"
        :class="isDroprownOpened ? 'arrow-up' : 'arrow-down'"
      >
        <select ref="select" v-model="category">
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
      </div>

      <p>
        <label class="income">
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="income"
          />
          <span class="income-outcome">{{ $t("Income") }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
          />
          <span class="income-outcome">{{ $t("Outcome") }}</span>
        </label>
      </p>
      <label for="amount">{{ $t("Sum") }}</label>
      <div class="input-field">
        <input
          id="amount"
          v-model.number="amount"
          type="number"
          :class="{
            invalid:
              $v.amount.$dirty && (!$v.amount.minValue || !$v.amount.required),
          }"
        />

        <span
          v-if="
            $v.amount.$dirty && (!$v.amount.minValue || !$v.amount.required)
          "
          class="helper-text invalid"
        >
          {{ $t("Min_value_message") }}
          {{ $v.amount.$params.minValue.min }}
        </span>
      </div>

      <label for="description">{{ $t("Description") }}</label>

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
          {{ $t("Description_required_message") }}
        </span>
      </div>

      <button class="btn waves-effect waves-light create" type="submit">
        {{ $t("Create") }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { minValue, required } from "vuelidate/lib/validators";

export default {
  name: "Record",

  metaInfo() {
    return {
      title: this.$title("New_record"),
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
    isDroprownOpened: false,
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
    ...mapState("info", ["info"]),

    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      return this.info.bill >= this.amount;
    },
  },

  methods: {
    ...mapActions("category", ["fetchCategories"]),
    ...mapActions("info", ["updateInfo"]),
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
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          });

          const bill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;

          await this.updateInfo({ bill });

          this.$message(this.$t("Record_created"));
          this.clear();
        } catch (e) {
          console.log(e);
          throw e;
        }
      } else {
        this.$message(
          `${this.$t("No_money")} (${this.amount - this.info.bill})`
        );
      }
    },

    clear() {
      this.$v.$reset();
      this.description = "";
      this.amount = 1;
    },
  },

  watch: {
    select: {
      deep: true,
      handler: function (newValue) {
        if (newValue && newValue.dropdown) {
          this.isDroprownOpened = newValue.dropdown.isOpen;
        }
      },
    },
    category: function () {
      this.clear();
    },
  },

  async mounted() {
    this.categories = await this.fetchCategories();
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },

  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
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