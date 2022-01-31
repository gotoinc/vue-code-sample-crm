<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("profile.profileTitle") }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <label class="edit-label" for="description">
        {{ $t("common.name") }}
      </label>
      <div class="input-field create-title">
        <input
          id="name-inp"
          v-model="name"
          type="text"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />

        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >
          {{ $t("common.message_Enter_Name") }}
        </small>
      </div>

      <div class="switch">
        <label class="edit-label">
          {{ $t("profile.eng") }}
          <input v-model="isRuLocale" type="checkbox" />
          <span class="lever"></span>
          {{ $t("profile.rus") }}
        </label>
      </div>

      <button
        class="btn waves-effect waves-light btn-create btn-yellow"
        type="submit"
      >
        {{ $t("common.update") }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import { required } from "vuelidate/lib/validators";

import constants from "@/utils/constants";

export default {
  name: "Profile",

  metaInfo() {
    return {
      title: this.$title("profile.profileTitle"),
    };
  },

  data: () => ({
    name: "",
    isRuLocale: true,
  }),

  computed: {
    ...mapState("info", ["info"]),
  },

  validations: {
    name: {
      required,
    },
  },

  methods: {
    ...mapActions("info", ["updateInfo"]),

    setupProfileData() {
      if (this.info) {
        this.name = this.info.name;
        this.isRuLocale = this.info.locale === constants.LOCALE_RU;
      }
    },

    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? constants.LOCALE_RU : constants.LOCALE_EN,
        });
      } catch (e) {
        throw e;
      }
    },
  },

  mounted() {
    this.setupProfileData();

    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
};
</script>

<style lang="scss">
.switch {
  margin-bottom: 2rem;
}
</style>