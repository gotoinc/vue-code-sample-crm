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
  methods: {
    handler: function (navigate, e) {
      navigate(e);
      this.$emit("click");
    },
  },
};
</script>


<style lang="scss" scoped>
  @import "../../assets/_vars.scss";

  .app-sidenav {
    box-shadow: 10px 20px 64px rgba(30, 70, 129, 0.1);
    padding-top: 28px;
    top: 64px;
    width: 250px;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
    bottom: 0 !important;
    height: auto !important;

    @media (max-width: $small-tablet) {
      width: 100%;
      text-align: center;
      height: 100vh;
    }
    
    &.open {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    
  li {
    cursor: pointer;

      @media (max-width: $small-tablet) {
        padding-bottom: 5px;
        padding-top: 5px;

      }
      a {
        font-size: 13px;
        color: $black;
        font-weight: 400;

        &:hover {
          @media (max-width: $small-tablet) {
            text-decoration: underline;
          }
        }

        @media (max-width: $small-tablet) {
          font-size: 46px;
          color: $black;
          font-weight: 700;
          margin-top: 20px;
          margin-bottom: 20px;
          padding: 0;
        
        }

        @media (max-width: $small-mobile) {
          font-size: 36px;
          color: $black;
          margin-bottom: 10px;
          margin-top: 10px;
        }
      }

    &.router-link-exact-active.active{
      a {
        font-weight: 700;
      }
    }
  }
  }

  .sidenav li > a:hover {
    @media (max-width: $small-tablet) {
      background-color: transparent;
    }
  }

</style>