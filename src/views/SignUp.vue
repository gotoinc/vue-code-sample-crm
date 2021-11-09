<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ $t("App_name") }}</span>
      <label class="edit-label" for="email">Email</label>
      <div class="input-field">
        <input
          id="email"
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
          {{ $t("Email_required_message") }}
        </small>

        <small
          v-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
        >
          {{ $t("Email_valid_message") }}
        </small>
      </div>
      <label class="edit-label" for="password">{{ $t("Password") }}</label>
      <div class="input-field">
        <input
          id="password"
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
          {{ $t("Password_required_message") }}
        </small>

        <small
          v-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
        >
          {{
            $t("Password_length_message", {
              minLength: $v.password.$params.minLength.min,
              currLength: password.length,
            })
          }}
        </small>
      </div>
      <label class="edit-label" for="name">{{ $t("Name") }}</label>
      <div class="input-field">
        <input
          id="name"
          v-model.trim="name"
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
      <div>
        <label>
          <input v-model="agree" type="checkbox" />
          <span>{{ $t("Agree_terms") }}</span>
        </label>
      </div>
    </div>

    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit create login-btn"
          type="submit"
        >
          {{ $t("Sign_up") }}
        </button>
      </div>

      <p class="center">
        {{ $t("Have_account") }}?
        <router-link to="/login">{{ $t("Login") }}!</router-link>
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
import { email, minLength, required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  name: "SignUp",

  metaInfo() {
    return {
      title: this.$title("SignupTitle"),
    };
  },

  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false,
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

    name: {
      required,
    },

    agree: {
      checked: v => v,
    },
  },

  methods: {
    ...mapActions("auth", ["signUp"]),

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
        name: this.name,
      };

      try {
        await this.signUp(formData);
        this.$router.push("/");
      } catch (e) {
        throw e;
      }
    },
  },
};
</script>