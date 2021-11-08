<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("ProfileTitle") }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <label class="edit-label" for="description">{{ $t("Name") }}</label>
      <div class="input-field create-title profile-user">
        <input class="profile-user"          
          v-model="name"
          type="text"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >
          {{ $t("Message_Enter_Name") }}
        </small>
      </div>

      <div class="switch">
        <label class="edit-label">
          English
          <input v-model="isRuLocale" type="checkbox" />
          <span class="lever"></span>
          Russian
        </label>
      </div>

      <button class="btn waves-effect waves-light create" type="submit">
        {{ $t("Update") }}
      
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Profile",

  metaInfo() {
    return {
      title: this.$title("ProfileTitle"),
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

    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? "ru-RU" : "en-EN",
        });
      } catch (e) {
        console.log(e);
      }
    },
  },

  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === "ru-RU";

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