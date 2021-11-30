<template>
  <div>
    <div class="page-title">
      <h3>{{ $t("views.categories") }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />

      <div v-else class="categories-row">
        <CategoryCreate class="categories-col" />

        <CategoryEdit
          v-if="categories.length"
          :key="categories.length + updateCount"
          class="categories-col"
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

import { mapState, mapActions } from "vuex";

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
    loading: true,
  }),

  computed: {
    ...mapState("category", ["categories", "updateCount"]),
  },

  methods: {
    ...mapActions("category", ["fetchCategories"]),
  },

  async mounted() {
    await this.fetchCategories().then(() => (this.loading = false));
  },
};
</script>