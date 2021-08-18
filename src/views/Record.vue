<template>
  <div>
     <div class="page-title">
       <h3>New record</h3>
     </div>

    <Loader v-if="loading"/>

    <p
        v-else-if="!categories.length"
        class="center"
    >
      You don't have any categories yet.
      <router-link to="/">
        Add new category
      </router-link>
    </p>

    <form
      v-else
      class="form"
      @submit.prevent="handleSubmit"
    >
       <div class="input-field" >
          <select
              ref="select"
              v-model="category"
          >
          <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
          >
            {{ c.title }}
          </option>
          </select>
          <label>Choose a category</label>
       </div>

       <p>
          <label>
          <input
                class="with-gap"
                name="type"
                type="radio"
                value="income"
                v-model="type"
          />
          <span>Income</span>
          </label>
       </p>

       <p>
          <label>
          <input
                class="with-gap"
                name="type"
                type="radio"
                value="outcome"
                v-model="type"
          />
          <span>Outcome</span>
          </label>
       </p>

       <div class="input-field">
          <input
             id="amount"
             v-model.number="amount"
             type="number"
             :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
          >
          <label for="amount">Sum</label>
          <span
              v-if="$v.amount.$dirty && !$v.amount.minValue"
              class="helper-text invalid"
          >
            Minimum value is {{$v.amount.$params.minValue.min}}
          </span>
       </div>

       <div class="input-field">
          <input
             id="description"
             type="text"
             v-model="description"
             :class="{invalid: $v.description.$dirty && !$v.description.required}"

          >
          <label for="description">Description</label>
          <span
              v-if="$v.description.$dirty && !$v.description.required"
              class="helper-text invalid"
          >
            Description is required
          </span>
       </div>

       <button class="btn waves-effect waves-light" type="submit">
          Create
          <i class="material-icons right">send</i>
       </button>
      </form>
   </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { minValue, required } from "vuelidate/lib/validators";

export default {
  name: 'Record',

  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),

  validations: {
    description: {
      required
    },
    amount: {
      minValue: minValue(1)
    }
  },

  computed: {
    ...mapState('info', ['info']),

    canCreateRecord() {
      if(this.type === 'income') {
        return true;
      }
      return (this.info.bill >= this.amount);
    }
  },

  methods: {
    ...mapActions('category', ['fetchCategories']),
    ...mapActions('info', ['updateInfo']),
    ...mapActions('record', ['createRecord']),

    async handleSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if(this.canCreateRecord) {
        try{
          await this.createRecord({
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });


          const bill = this.type === 'income'
            ? this.info.bill + this.amount
              :  this.info.bill - this.amount;


          await this.updateInfo({bill});

          this.$message('New record is created successfully');
          this.clear();
        } catch (e) {
          console.log(e)
          throw e;
        }

      } else {
        this.$message(`Not enough money in the account (${this.amount - this.info.bill})`);
      }
    },

    clear() {
      this.$v.$reset();
      this.description = '';
      this.amount = 1;
    }
  },

  async mounted() {
     this.categories = await this.fetchCategories();
     this.loading = false;

     if(this.categories.length) {
       this.category = this.categories[0].id;
     }

     setTimeout(() => {
       // eslint-disable-next-line no-undef
       this.select = M.FormSelect.init(this.$refs.select);
       // eslint-disable-next-line no-undef
       M.updateTextFields();
     }, 0)
  },

  destroyed() {
    if(this.select && this.select.destroy) {
      this.select.destroy();
    }
  }

}
</script>