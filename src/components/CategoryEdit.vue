<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <label class="edit-label">
          {{ "Choose_category_label" | localizeFilter }}
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
          {{ "Category_title" | localizeFilter }}
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
            {{ "Enter_title_message" | localizeFilter }}
          </span>
        </div>
        <label class="edit-label" for="limit">{{
          "Limit" | localizeFilter
        }}</label>
        <div class="input-field create-title">
          <input
            id="limit"
            v-model.number="limit"
            type="number"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />

          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >
            {{ "Min_value_message" | localizeFilter }}
            {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light create" type="submit">
          {{ "Update" | localizeFilter }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { minValue, required } from "vuelidate/lib/validators";
import localizeFilter from "@/filters/localize.filter";
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
        this.$message(localizeFilter("Category_updated"));
        this.$emit("updated", categoryData);
      });
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
    const { title, limit, id } = this.categories[0];
    this.current = id;
    this.limit = limit;
    this.title = title;
  },

  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
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
@import "../assets/main";
</style>