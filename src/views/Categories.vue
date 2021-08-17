<template>
   <div>
      <div class="page-title">
         <h3>Categories</h3>
      </div>
      <section>
        <Loader v-if="loading"/>

         <div
             class="row"
             v-else
         >

            <CategoryCreate @created="addNewCategory"/>

            <CategoryEdit
                v-if="categories.length"
                :categories="categories"
                :key="categories.length + updateCount"
                @updated="updateCategory"
            />

           <p
               v-else
               class="center"
           >
             You don't have any category yet
           </p>

         </div>
      </section>
   </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";

import { mapActions } from 'vuex';

export default {
  name: 'Categories',

  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),

  components: {
    CategoryCreate,
    CategoryEdit
  },

  methods: {
    ...mapActions('category', ['fetchCategories']),

    addNewCategory(category) {
      this.categories.push(category);
      console.log(this.categories)
    },

    updateCategory(categoryData) {
      const idx = this.categories.findIndex(c => c.id === categoryData.id);
      this.categories[idx].title = categoryData.title;
      this.categories[idx].limit = categoryData.limit;
      this.updateCount++;
    }
  },

  async mounted() {
    this.categories = await this.fetchCategories();
    this.loading = false;
  }

}
</script>