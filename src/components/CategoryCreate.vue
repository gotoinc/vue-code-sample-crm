<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ "Create" | localizeFilter }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            v-model="title"
            type="text"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">{{ "Category_title" | localizeFilter }}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            {{ "Enter_title_message" | localizeFilter }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            v-model.number="limit"
            type="number"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">{{ "Limit" | localizeFilter }}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >
            {{ "Min_value_message" | localizeFilter }}
            {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ "Create" | localizeFilter }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "CategoryCreate",

  data: () => ({
    title: "",
    limit: 100,
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
    ...mapActions("category", ["createCategory"]),

    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      await this.createCategory({
        title: this.title,
        limit: this.limit,
      }).then(res => {
        this.clear();
        this.$emit("created", res);
      });
    },

    clear() {
      this.title = "";
      this.limit = 100;
      this.$v.$reset();
      this.$message(localizeFilter("Created_category"));
    },
  },

  mounted() {
    // M.updateTextFields();
  },
};
</script>
