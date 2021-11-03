<template>
  <div>
    <div class="page-title">
      <h3>{{ "Categories" | localizeFilter }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />

      <div v-else class="row categories-row">
        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit
          v-if="categoriesList.length"
          :key="categoriesList.length + updateCount"
          :categories="categoriesList"
          @updated="updateCategory"
        />

        <p v-else class="center">
          {{ "Message_no_categories" | localizeFilter }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";

import { mapActions } from "vuex";

export default {
  name: "Categories",

  metaInfo() {
    return {
      title: this.$title("Menu_Categories"),
    };
  },

  components: {
    CategoryCreate,
    CategoryEdit,
  },

  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  computed: {
    categoriesList() {
      return this.categories ? this.categories : [];
    },
  },
  methods: {
    ...mapActions("category", ["fetchCategories"]),

    addNewCategory(category) {
      this.categories.push(category);
      console.log(this.categories);
    },

    updateCategory(categoryData) {
      const idx = this.categories.findIndex(c => c.id === categoryData.id);
      this.categories[idx].title = categoryData.title;
      this.categories[idx].limit = categoryData.limit;
      this.updateCount++;
    },
  },

  async mounted() {
    this.categories = await this.fetchCategories();
    this.loading = false;
  },
};
</script>