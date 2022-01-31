<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ $t("auth.App_name") }}</span>
      <label class="edit-label" for="email">Email</label>
      <div class="input-field">
        <input
          id="auth-input"
          v-model.trim="email"
          type="text"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email),
          }"
        />

        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
        >
          {{ $t("auth.Email_required_message") }}
        </small>

        <small
          v-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
        >
          {{ $t("auth.Email_valid_message") }}
        </small>
      </div>
      <label class="edit-label" for="password">{{ $t("auth.Password") }}</label>
      <div class="input-field">
        <input
          id="auth-input"
          v-model="password"
          type="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
        />

        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
        >
          {{ $t("auth.Password_required_message") }}
        </small>

        <small
          v-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
        >
          {{
            $t("auth.Password_length_message", {
              minLength: $v.password.$params.minLength.min,
              currLength: password.length,
            })
          }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="
            btn
            waves-effect waves-light
            auth-submit
            btn-yellow btn-create btn-login
          "
          type="submit"
        >
          {{ $t("common.login") }}
        </button>
      </div>

      <p class="center">
        {{ $t("auth.No_account") }}?
        <router-link id="sign-up-link" to="/signup">
          {{ $t("auth.Sign_up") }}
        </router-link>
      </p>

      <p class="center flag-wrapper">
        <a @click="setLocale('en')">
          <flag iso="us" />
        </a>
        <a @click="setLocale('ru')">
          <flag iso="ru" />
        </a>
      </p>
    </div>
  </form>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

import messages from "@/utils/messages";

import { mapActions } from "vuex";

export default {
  name: "Login",

  metaInfo() {
    return {
      title: this.$title("common.login"),
    };
  },

  data: () => ({
    email: "",
    password: "",
  }),

  validations: {
    email: {
      email,
      required,
    },

    password: {
      required,
      minLength: minLength(6),
    },
  },

  methods: {
    ...mapActions("auth", ["login"]),

    setLocale(locale) {
      this.$i18n.locale = locale;
    },

    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.login(formData);
        this.$router.push("/history");
      } catch (e) {
        throw e;
      }
    },
  },

  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(this.$t(messages[this.$route.query.message]));
    }
  },
};
</script>