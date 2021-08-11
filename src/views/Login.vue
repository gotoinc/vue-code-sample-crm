<template>
   <form class="card auth-card" @submit.prevent="submitHandler">
      <div class="card-content">
         <span class="card-title">Домашняя бухгалтерия</span>
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
            <label for="password">Пароль</label>
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
      </div>
      <div class="card-action">
         <div>
            <button
               class="btn waves-effect waves-light auth-submit"
               type="submit"
            >
            Войти
            <i class="material-icons right">send</i>
            </button>
         </div>

         <p class="center">
            Нет аккаунта?
            <router-link to="/signup">Зарегистрироваться</router-link>
         </p>
      </div>
</form>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
import messages from '@/utils/messages';
import { mapActions } from 'vuex';

export default {
  name: 'Login',

  data: () => ({
    email: '',
    password: ''
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



  },

  methods: {
    ...mapActions('auth', ['login']),

    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return;
      }

      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.login(formData);
        this.$router.push('/');
      } catch(e) {
        this.$error(e.message);
      }
    }
  },

  mounted() {
    if(messages[this.$route.query.message]){
      this.$message(messages[this.$route.query.message]);
    }
  }
}
</script>