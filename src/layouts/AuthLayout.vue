<template>
   <div class="grey darken-1 empty-layout">
      <router-view/>
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AuthLayout',

  computed: {
    ...mapGetters('errors', ['GET_ERROR']),
  },

  watch: {
    GET_ERROR(fbErr){
      this.$error(fbErr.message);
    }
  }
}
</script>