<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("views.categories") }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />

      <div v-else class="categories-row">
        <CategoryCreate class="categories-col" @created="addNewCategory" />

        <CategoryEdit
          v-if="categories.length"
          :key="categories.length + updateCount"
          :categories="categories"
          class="categories-col"
          @updated="updateCategory"
        />

        <p v-else class="center">
          {{ $t("messages.message_no_categories") }}
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
      title: this.$title("menu.menuCategories"),
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

  methods: {
    ...mapActions("category", ["fetchCategories"]),

    addNewCategory(category) {
      this.categories.push(category);
    },

    updateCategory(categoryData) {
      const idx = this.categories.findIndex(c => c.id === categoryData.id);
      this.categories[idx].title = categoryData.title;
      this.categories[idx].limit = categoryData.limit;
      this.updateCount++;
    },
  },

  async mounted() {
    await this.fetchCategories().then(categories => {
      this.categories = categories;
      this.loading = false;
    });
  },
};
</script>