<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <div class="sidebar-btn" :class="{ active: isNavbarOpened }">
            <span class="top"></span>
            <span class="mid"></span>
            <span class="bottom"></span>
          </div>
        </a>
        <span class="black-text">{{ date | dateFilter("datetime") }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ info.name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i
                >{{ "ProfileTitle" | localizeFilter }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logoutUser">
                <i class="material-icons">assignment_return</i
                >{{ "LogoutTitle" | localizeFilter }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
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

<style lang="scss" scoped>
.dropdown-content {
  min-width: 160px;
}

.sidebar-btn {
  width: 25px;
  height: 25px;
  position: relative;
  z-index: 100;
  cursor: pointer;

  span {
    display: block;
    width: 20px;
    height: 2px;
    margin: auto;
    background: black;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all 0.4s ease;

    &.top {
      transform: translateY(-8px);
    }

    &.bottom {
      transform: translateY(8px);
    }
  }

  &.active {
    .top {
      transform: rotate(-45deg);
    }
    .mid {
      opacity: 0;
    }
    .bottom {
      transform: rotate(45deg);
    }
  }
}
</style>
