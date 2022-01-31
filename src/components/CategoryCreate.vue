<template>
  <div>
    <div class="page-subtitle">
      <h4>{{ $t("common.create") }}</h4>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <label class="create-label" for="name">
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
      <label class="edit-label" for="limit">{{ $t("views.limit") }}</label>
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
        {{ $t("common.create") }}
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";

import { mapActions } from "vuex";

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
      required,
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
      this.$message(this.$t("messages.created_category"));
    },
  },

  mounted() {
    M.updateTextFields();
  },
};
</script>
