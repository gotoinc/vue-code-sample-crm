<template>
   <form class="card auth-card" @submit.prevent="submitHandler">
      <div class="card-content">
         <span class="card-title">Home bookkeeping</span>
          <div class="input-field">
            <input
                id="email"
                type="text"
                v-model.trim="email"
                :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
            >
            <label for="email">Email</label>
            <small
                v-if="($v.email.$dirty && !$v.email.required)"
                class="helper-text invalid"
            >
              Email should not be empty
            </small>
            <small
                v-if="($v.email.$dirty && !$v.email.email)"
                class="helper-text invalid"
            >
              Email should be valid
            </small>
          </div>
        <div class="input-field">
          <input
              id="password"
              type="password"
              v-model="password"
              :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"

          >
          <label for="password">Password</label>
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
            Password length should be minimum {{$v.password.$params.minLength.min}} characters, you have only {{ password.length }}
          </small>
        </div>
         <div class="input-field">
            <input
               id="name"
               type="text"
               v-model.trim="name"
               :class="{invalid: ($v.name.$dirty && !$v.name.required)}"

            >
            <label for="name">Name</label>
            <small
                v-if="$v.name.$dirty && !$v.name.required"
                class="helper-text invalid"
            >
              Name is required
            </small>
         </div>
         <p>
            <label>
            <input
                v-model="agree"
                type="checkbox"
            />
            <span>I agree to the terms</span>
            </label>
         </p>
      </div>
      <div class="card-action">
         <div>
            <button
               class="btn waves-effect waves-light auth-submit"
               type="submit"
            >
            Sign up
            <i class="material-icons right">send</i>
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
import {email, minLength, required} from "vuelidate/lib/validators";
import { mapActions } from 'vuex';

export default {
   name: 'SignUp',

  metaInfo(){
    return {
      title: this.$title('SignupTitle')
    }
  },

  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),

  validations: {

    email: {
      email,
      required
    },

    password: {
      required,
      minLength: minLength(6)
    },

    name: {
      required
    },

    agree: {
      checked: v => v
    }

  },

  methods: {
     ...mapActions('auth', ['signUp']),

    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      };

      try {
        await this.signUp(formData);
        this.$router.push('/');
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>