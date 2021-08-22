<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Create</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Title</label>
          <span
              v-if="$v.title.$dirty && !$v.title.required"
              class="helper-text invalid"
          >
            Enter title
          </span>

        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">Limit</label>
          <span
              v-if="$v.limit.$dirty && !$v.limit.minValue"
              class="helper-text invalid"
          >
            Minimum value is {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Create
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue }  from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  name: "CategoryCreate",

  data: () => ({
    title: '',
    limit: 100
  }),

  validations: {
    title: {
      required
    },
    limit: {
      minValue: minValue(100)
    }
  },

  methods: {
    ...mapActions('category', ['createCategory']),

    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      await this.createCategory({
        title: this.title,
        limit: this.limit
      }).then((res) => {
        this.clear();
        this.$emit('created', res);
      })

    },

    clear() {
      this.title = '';
      this.limit = 100;
      this.$v.$reset();
      this.$message('Category is created')
    }
  },

  mounted() {
    M.updateTextFields();
  }
}
</script>

<style scoped>

</style>