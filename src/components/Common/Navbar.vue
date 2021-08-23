<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | dateFilter('datetime') }}</span>
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
                <i class="material-icons">account_circle</i>{{ "ProfileTitle" | localizeFilter }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logoutUser">
                <i class="material-icons">assignment_return</i>{{ "LogoutTitle" | localizeFilter }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "Navbar",

  data: () =>({
    date: new Date(),
    interval: null,
    dropdown: null
  }),

  methods:{
    ...mapActions('auth', ['logout']),

    async logoutUser() {
      await this.logout();
      this.$router.push('/login?message=logout')
    }
  },

  computed: {
    ...mapState('info', ['info'])
  },

  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true
    })
  },

  beforeDestroy() {
    clearInterval(this.interval);
    if(this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
    this.date = null;

  }
}
</script>

<style scoped>
.dropdown-content {
  min-width: 160px;
}

</style>