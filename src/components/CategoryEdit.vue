<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select
              ref="select"
              v-model="current"
          >
            <option
                v-for="c in categories"
                :key="c.id"
                :value="c.id"
            >
              {{ c.title }}
            </option>
          </select>
          <label>Choose category</label>
        </div>

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
          Update
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { minValue, required } from "vuelidate/lib/validators";
import { mapActions } from 'vuex';

export default {
  name: "CategoryEdit",

  props: {
    categories: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null
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
    ...mapActions('category', ['updateCategory']),

    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const categoryData = {
        id: this.current,
        title: this.title,
        limit: this.limit
      }

      await this.updateCategory(categoryData).then(() => {
        this.$message('Category was successfully edited');
        this.$emit('updated', categoryData);
      });
    }
  },

  watch: {
    current: function(catId) {
      const { title, limit } = this.categories.find(c => c.id === catId);
      this.title = title;
      this.limit = limit;
    }
  },

  created() {
    const { title, limit, id } = this.categories[0];
    this.current = id;
    this.limit = limit;
    this.title = title;
  },

  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },

  destroyed() {
    if(this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
}
</script>

<style scoped>

</style>