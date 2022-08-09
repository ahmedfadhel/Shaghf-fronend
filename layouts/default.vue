<template>
  <v-app>
    <!-- Notifcation start -->
    <Notifications />

    <!-- Notifcation end -->
    <!-- <TopHeader /> -->
    <!-- <v-divider></v-divider> -->
    <NavBar class="mb-2" />
    <v-main>
      <nuxt />
    </v-main>

    <v-footer :fixed="fixed" app class="mt-5">
      <v-layout grow justify-center>
        <span class="text-h6">
          جميع الحقوق محفوظة لصفحة &copy;
          <span class="black--text">شغف ايبوكسي</span>
          {{ new Date().getFullYear() }}
        </span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
// import TopHeader from "~/components/main/TopHeader";
import NavBar from "~/components/main/NavBar";
import Notifications from "~/components/generals/Notifications.vue";

import { mapActions } from "vuex";

export default {
  components: {
    NavBar,
    // TopHeader,
    Notifications,
  },
  mounted() {
    this.getCartFromStorage();
  },
  data() {
    return {
      fixed: false,
    };
  },
  methods: {
    ...mapActions(["getCartFromStorage"]),
  },
};
</script>
