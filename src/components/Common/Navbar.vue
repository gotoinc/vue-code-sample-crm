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

            <ul id="dropdown" class="dropdown-content">
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

<style lang="scss" scoped>

.dropdown-content {
  top: -50px;
  min-width: 179px;
}

.sidebar-btn {
  width: 25px;
  height: 25px;
  position: relative;
  z-index: 100;
  cursor: pointer;

  span {
    display: block;
    width: 18px;
    height: 2px;
    border-radius: 30px;
    margin: auto;
    background: white;
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
