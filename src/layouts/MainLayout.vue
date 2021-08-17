<template>
  <div>
    <Loader v-if="loading"/>
    <div
        v-else
        class="app-main-layout"
    >

      <Navbar @click="isNavbarOpened = !isNavbarOpened"/>

      <Sidebar v-model="isNavbarOpened"/>

      <main
          class="app-content"
          :class="{'full': !isNavbarOpened}"
      >
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Common/Navbar";
import Sidebar from "@/components/Common/Sidebar";

import { mapState, mapActions } from 'vuex';

export default {
  name: 'MainLayout',

  data: () => ({
    isNavbarOpened: true,
    loading: true
  }),

  components: {
    Navbar,
    Sidebar
  },

  computed: {
    ...mapState('info', ['info']),
  },

  methods: {
    ...mapActions('info', ['fetchInfo'])
  },

  async mounted() {
    if(Object.keys(this.info).length === 0) {
      await this.fetchInfo()
    }

    this.loading = false;
  }
}
</script>