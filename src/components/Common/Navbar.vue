<template>
  <div class="navbar-fixed">
    <nav class="navbar">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('click')">
            <div class="sidebar-btn" :class="{ active: isNavbarOpened }">
              <span class="top"></span>
              <span class="mid"></span>
              <span class="bottom"></span>
            </div>
          </a>
          <span class="nav-date">{{ date | dateFilter("datetime") }}</span>
        </div>

        <ul class="right">
          <li>
            <a
              ref="dropdown"
              class="dropdown-trigger white-text"
              href="#"
              data-target="dropdown"
            >
              {{ info.name }}

              <i v-if="isDropdownOpened" class="material-icons right">
                expand_less
              </i>
              <i v-else class="material-icons right">expand_more</i>
            </a>

            <ul
              id="dropdown"
              class="dropdown-content"
              @click="$emit('choseFromMenu')"
            >
              <li>
                <router-link to="/profile" class="black-text">
                  {{ "ProfileTitle" | localizeFilter }}
                </router-link>
              </li>

              <li>
                <a href="#" class="black-text" @click.prevent="logoutUser">
                  {{ "LogoutTitle" | localizeFilter }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Navbar",

  props: {
    isNavbarOpened: {
      required: true,
      type: Boolean,
    },
  },

  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
    isDropdownOpened: false,
  }),

  methods: {
    ...mapActions("auth", ["logout"]),

    async logoutUser() {
      await this.logout();
      this.$router.push("/login?message=logout");
    },
  },

  computed: {
    ...mapState("info", ["info"]),
  },
  watch: {
    dropdown: {
      deep: true,
      handler: function (newValue) {
        if (newValue) {
          this.isDropdownOpened = newValue.isOpen;
        }
      },
    },
  },

  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
    });
  },

  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
    this.date = null;
  },
};
</script>