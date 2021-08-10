<template>
  <div class="app-main-layout">

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
</template>

<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default {
  name: 'MainLayout',

  data: () => ({
    isNavbarOpened: true
  }),

  components: {
    Navbar,
    Sidebar
  }
}
</script>