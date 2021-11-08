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

  data: function(){
    return({
      links: [
        {
          title: this.$t("Menu_Account"),
          url: "/",
          exact: true,
        },
        {
          title: this.$t("Menu_History"),
          url: "/history",
        },
        {
          title: this.$t("Menu_Planning"),
          url: "/planning",
        },
        {
          title: this.$t("Menu_New_Record"),
          url: "/record",
        },
        {
          title: this.$t("Menu_Categories"),
          url: "/categories",
        },
      ],
    });
  },
  methods: {
    handler: function (navigate, e) {
      navigate(e);
      this.$emit("click");
    },
  },
};
</script>