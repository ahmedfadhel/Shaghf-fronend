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
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
            placeholder="بحث"
          ></v-text-field>
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
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      group: null,
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
  },
};
</script>