<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      v-for="(link, i) in links"
      :key="i"
      v-slot="{ href, navigate, isExactActive }"
      custom
      :to="link.url"
    >
      <li :class="[isExactActive && 'router-link-exact-active active']">
        <a
          :href="href"
          @click="handler(navigate, $event)"
          @keypress.enter="navigate"
        >
          {{ link.title }}
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "Sidebar",

  props: ["value"],

  data: () => ({
    links: [
      {
        title: localizeFilter("Menu_Account"),
        url: "/",
        exact: true,
      },
      {
        title: localizeFilter("Menu_History"),
        url: "/history",
      },
      {
        title: localizeFilter("Menu_Planning"),
        url: "/planning",
      },
      {
        title: localizeFilter("Menu_New_Record"),
        url: "/record",
      },
      {
        title: localizeFilter("Menu_Categories"),
        url: "/categories",
      },
    ],
  }),
  watch: {
    $route: {
      handler: function (newVal) {
        const isLinkFromList = this.links.some(l => l.url === newVal.path);
        if (!isLinkFromList) this.$emit("click");
      },
    },
  },
  methods: {
    handler: function (navigate, e) {
      navigate(e);
      this.$emit("click");
    },
  },
};
</script>