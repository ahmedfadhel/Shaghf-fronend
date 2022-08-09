<template>
  <v-app light>
    <!-- Notifcation start -->
    <Notifications />

    <!-- Notifcation end -->

    <!-- start NavBar component section -->
    <NavBar />

    <!-- end NavBar component section -->
    <v-main class="blue-grey lighten-5">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :fixed="fixed" app>
      <div class="mx-auto">&copy; test - {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import Notifications from "~/components/generals/Notifications.vue";
import NavBar from "~/components/dashboard/index/NavBar.vue";
export default {
  components: {
    Notifications,
    NavBar,
  },
  data() {
    return {
      fixed: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.theme--light.v-list-item:hover::before {
  // opacity: 0.04s;
  background: red;
  // opacity: 0.2;
}
.log-out:hover {
  background: rgba(240, 128, 128, 0.411);

  color: black;
}
</style>
