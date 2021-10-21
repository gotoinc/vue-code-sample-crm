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
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit create login-btn" type="submit">
          Login
          
        </button>
      </div>

      <p class="center">
        Don't have an account?
        <router-link class="sign-up-link" to="/signup">Sign up</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import messages from "@/utils/messages";
import { mapActions } from "vuex";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "Login",

  metaInfo() {
    return {
      title: this.$title("Login"),
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
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
  },

  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(localizeFilter(messages[this.$route.query.message]));
    }
  },
};
</script>


<style lang="scss" scoped>
  @import "../assets/_vars.scss";
  @import "../assets/main.scss";





</style>