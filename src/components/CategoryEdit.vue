<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $t("common.edit") }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <label class="edit-label">
          {{ $t("views.choose_category_label") }}
        </label>
        <div
          class="input-field"
          :class="isDropdownOpened ? 'arrow-up' : 'arrow-down'"
        >
          <select ref="select" v-model="current">
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>
        </div>
        <label class="edit-label" for="name">
          {{ $t("views.category_title") }}
        </label>
        <div class="input-field create-title">
          <input
            id="name-inp"
            v-model="title"
            type="text"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />

          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            {{ $t("messages.enter_title_message") }}
          </span>
        </div>
        <label class="edit-label" for="limit">
          {{ $t("views.limit") }}
        </label>
        <div class="input-field create-title">
          <input
            id="limit"
            v-model.number="limit"
            type="number"
            :class="{
              invalid:
                $v.limit.$dirty && (!$v.limit.minValue || !$v.limit.required),
            }"
          />

          <span
            v-if="$v.limit.$dirty && (!$v.limit.minValue || !$v.limit.required)"
            class="helper-text invalid"
          >
            {{ $t("messages.min_value_message") }}
            {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button
          class="btn waves-effect waves-light btn-create btn-yellow"
          type="submit"
        >
          {{ $t("common.update") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { minValue, required } from "vuelidate/lib/validators";

import { mapActions } from "vuex";

export default {
  name: "CategoryEdit",

  props: {
    categories: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    select: null,
    title: "",
    limit: 100,
    current: null,
    isDropdownOpened: false,
  }),

  validations: {
    title: {
      required,
    },
    limit: {
      minValue: minValue(100),
      required,
    },
  },

  computed: {
    message() {
      return this.$t("messages.category_updated");
    },
  },

  methods: {
    ...mapActions("category", ["updateCategory"]),

    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const categoryData = {
        id: this.current,
        title: this.title,
        limit: this.limit,
      };

      await this.updateCategory(categoryData).then(() => {
        if (this.message) {
          this.$message(this.message);
        }
        this.$emit("updated", categoryData);
      });
    },

    setInitCategoryData() {
      const { title, limit, id } = this.categories[0];
      this.current = id;
      this.limit = limit;
      this.title = title;
    },
  },

  watch: {
    current: function (catId) {
      const { title, limit } = this.categories.find(c => c.id === catId);
      this.title = title;
      this.limit = limit;
    },
    select: {
      deep: true,
      handler: function (newVal) {
        if (newVal && newVal.dropdown) {
          this.isDropdownOpened = newVal.dropdown.isOpen;
        }
      },
    },
  },

  created() {
    this.setInitCategoryData();
  },

  mounted() {
    this.$nextTick(function () {
      if (this.select) {
        this.select = M.FormSelect.init(this.$refs.select);
      }
    });
    M.updateTextFields();
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