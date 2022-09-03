<template>
  <v-container>
    <v-row class="py-7">
      <v-col
        cols="6"
        md="4"
        lg="3"
        class="justify-end d-flex"
        order="3"
        order-md="3"
      >
        <v-responsive max-width="260" class="d-flex align-self-end">
          <v-form @submit.prevent="submitSearch">
            <v-text-field
              v-model="search"
              dense
              flat
              hide-details
              rounded
              solo-inverted
              placeholder="بحث"
            ></v-text-field>
          </v-form>
        </v-responsive>
      </v-col>
      <v-col cols="12" md="4" lg="6" align="center" order="1" order-md="2"
        >logo</v-col
      >
      <v-col
        cols="6"
        md="4"
        lg="3"
        order="2"
        order-md="1"
        class="justify-start d-flex"
      >
        <v-btn plain v-if="$vuetify.breakpoint.smAndDown" @click="showSideBar">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-btn plain color="blue-grey darken-2" nuxt to="/cart">
          <v-badge
            color="primary "
            left
            offset-x="5"
            offset-y="5"
            :content="parseCartLength"
          >
            <v-icon> mdi-cart </v-icon>
          </v-badge>
        </v-btn>

        <!-- <v-btn color="primary" outlined class="text-body-1">
          تسجيل الدخول
        </v-btn> -->
      </v-col>
    </v-row>
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <template v-slot:prepend>
        <v-list-item class="pa-5">
          <v-list-item-avatar class="ma-auto">
            <!-- <img src="https://randomuser.me/api/portraits/women/81.jpg" /> -->
            logo
          </v-list-item-avatar>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item nuxt to="/" active-class="primary--text" class="my-2">
          <v-list-item-title class="text-body-1">الرئيسية</v-list-item-title>
        </v-list-item>
        <v-list-item nuxt to="/store" active-class="primary--text" class="my-2">
          <v-list-item-title class="text-body-1">المتجر</v-list-item-title>
        </v-list-item>
        <v-list-group
          :value="false"
          no-action
          active-class="primary--text"
          class="my-2"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="text-body-1">الاقسام</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(cat, i) in categories"
            :key="i"
            nuxt
            :to="`/category/${cat.slug}`"
            class="my-2"
          >
            <v-list-item-title
              v-text="cat.name"
              class="text-body-1"
            ></v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item
          nuxt
          to="/courses"
          active-class="primary--text"
          class="my-2"
        >
          <v-list-item-title class="text-body-1"
            >الورشة التعليمة</v-list-item-title
          >
        </v-list-item>
        <v-list-item
          nuxt
          to="/helping-tools"
          active-class="primary--text"
          class="my-2"
        >
          <v-list-item-title class="text-body-1"
            >ادوات المساعدة</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["categories", "items"],
  data() {
    return {
      drawer: false,
      group: null,
      search: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  computed: {
    ...mapGetters(["getCartLength"]),
    parseCartLength() {
      return this.getCartLength.toString();
    },
  },
  methods: {
    showSideBar() {
      this.drawer = !this.drawer;
    },
    submitSearch() {
      this.$router.push({
        path: "/search",
        query: { query: this.search, page: 1 },
      });
      this.search = null;
    },
  },
};
</script>