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
          <i class="material-icons">{{ link.icon }}</i>
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
          title: this.$t("menu.menuHistory"),
          url: "/",
          icon: "restore",
        },
        {
          title: this.$t("menu.menuAccount"),
          url: "/account",
          exact: true,
          icon: "perm_identity",
        },
        {
          title: this.$t("menu.menuPlanning"),
          url: "/planning",
          icon: "event",
        },
        {
          title: this.$t("menu.menuNewRecord"),
          url: "/record",
          icon: "add_circle_outline",
        },
        {
          title: this.$t("menu.menuCategories"),
          url: "/categories",
          icon: "apps",
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