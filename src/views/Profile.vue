<template>
   <div>
      <div class="page-title">
         <h3>{{ 'ProfileTitle' | localizeFilter }}</h3>
      </div>

      <form class="form" @submit.prevent="submitHandler">
         <div class="input-field">
            <input
               id="description"
               type="text"
               v-model="name"
               :class="{invalid: $v.name.$dirty && !$v.name.required}"
            >
            <label for="description">{{ 'Name' | localizeFilter }}</label>
           <small
               v-if="($v.name.$dirty && !$v.name.required)"
               class="helper-text invalid"
           >
             {{ 'Message_Enter_Name' | localizeFilter }}
           </small>
         </div>

        <div class="switch">
          <label>
            Russian
            <input type="checkbox" v-model="isEnLocale">
            <span class="lever"></span>
            English
          </label>
        </div>

         <button class="btn waves-effect waves-light" type="submit">
           {{ "Update" | localizeFilter }}
            <i class="material-icons right">send</i>
         </button>
      </form>
   </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required } from "vuelidate/lib/validators";
export default {
  name: 'Profile',

  data: () => ({
    name: '',
    isEnLocale: true
  }),

  computed: {
    ...mapState('info', ['info'])
  },

  validations: {
    name: {
      required
    },
  },

  methods: {
    ...mapActions('info', ['updateInfo']),

    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return;
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isEnLocale ? 'en-EN' : 'ru-RU'
        })
      } catch(e) {
        console.log(e);
      }
    }
  },

  mounted() {
    this.name = this.info.name;
    this.isEnLocale = this.info.locale === 'en-EN'

    setTimeout(() => {
      M.updateTextFields();
    }, 0)
  }

}
</script>

<style lang="scss">
.switch {
  margin-bottom: 2rem;
}
</style>