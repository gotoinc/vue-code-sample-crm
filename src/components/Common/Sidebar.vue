<template>
  <ul
      class="sidenav app-sidenav"
      :class="{ 'open': value }"
  >

    <router-link
        v-for="(link, i) in links"
        :key="i"
        tag="li"
        active-class="active"
        :to="link.url"
        :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>

  </ul>
</template>

<script>
export default {
  name: "Sidebar",

  props: ['value'],

  data: () => ({
    links: [
      {
        title: 'Account',
        url: '/',
        exact: true
      },
      {
        title: 'Record history',
        url: '/history'
      },
      {
        title: 'Planning',
        url: '/planning'
      },
      {
        title: 'New record',
        url: '/record'
      },
      {
        title: 'Categories',
        url: '/categories'
      }
    ]
  })

}
</script>

<style scoped>

</style>