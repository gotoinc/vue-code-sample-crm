<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Home bookkeeping</span>
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
          Email should not be empty
        </small>

        <small
          v-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
        >
          Email should be valid
        </small>
      </div>
      <label class="edit-label" for="password">Password</label>
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
          Enter password
        </small>

        <small
          v-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
        >
          Password length should be minimum
          {{ $v.password.$params.minLength.min }} characters, you have only
          {{ password.length }}
        </small>
      </div>
      <label class="edit-label" for="name">Name</label>
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
          Name is required
        </small>
      </div>
      <div>
        <label>
          <input v-model="agree" type="checkbox" />
          <span>I agree to the terms</span>
        </label>
      </div>
    </div>

    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit create login-btn"
          type="submit"
        >
          Sign up
        </button>
      </div>

      <p class="center">
        Already have an account?
        <router-link to="/login">Login!</router-link>
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