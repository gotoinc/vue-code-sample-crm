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
export default {
  name: "Sidebar",

  props: ["value"],

  data: function () {
    return {
      links: [
        {
          title: this.$t("menu.menuAccount"),
          url: "/",
          exact: true,
        },
        {
          title: this.$t("menu.menuHistory"),
          url: "/history",
        },
        {
          title: this.$t("menu.menuPlanning"),
          url: "/planning",
        },
        {
          title: this.$t("menu.menuNewRecord"),
          url: "/record",
        },
        {
          title: this.$t("menu.menuCategories"),
          url: "/categories",
        },
      ],
    };
  },
  methods: {
    handler: function (navigate, e) {
      navigate(e);
      this.$emit("click");
    },
  },
};
</script>