<template>
  <div>
    <Loader v-if="loading" />

    <div v-else class="app-main-layout">
      <Navbar
        :is-navbar-opened="isNavbarOpened"
        @click="isNavbarOpened = !isNavbarOpened"
      />

      <Sidebar :key="locale" v-model="isNavbarOpened" @click="closeSideBar" />

      <main class="app-content" :class="{ full: !isNavbarOpened }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          v-tooltip="'Create_new_record_tooltip'"
          class="btn-floating btn-large blue"
          to="/record"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Common/Navbar";
import Sidebar from "@/components/Common/Sidebar";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "MainLayout",

  components: {
    Navbar,
    Sidebar,
  },

  data: () => ({
    isNavbarOpened: false,
    loading: true,
    windowWidth: window.innerWidth,
  }),

  computed: {
    ...mapState("info", ["info"]),
    ...mapGetters("errors", ["GET_ERROR"]),

    locale() {
      return this.info.locale;
    },
  },

  methods: {
    ...mapActions("info", ["fetchInfo"]),

    closeSideBar() {
      if (this.windowWidth <= 800) this.isNavbarOpened = false;
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },

  watch: {
    GET_ERROR(fbErr) {
      this.$error(fbErr.message);
    },
  },

  async mounted() {
    if (Object.keys(this.info).length === 0) {
      await this.fetchInfo();
    }

    this.loading = false;

    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>