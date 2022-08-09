<template>
  <v-snackbar
    v-model="getSnackbar.status"
    :color="getSnackbar.color"
    top
    centered
    timeout="10000"
  >
    <!-- <span>{{ getSnackbar.message }}</span> -->
    <span v-html="getSnackbar.message"></span>
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="closeSnackbar()">
        غلق
      </v-btn>
    </template>

    <!-- <v-btn text color="white" class="d-inline-block">غلق</v-btn> -->
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["color", "type", "message"],
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["getSnackbar"]),
  },
  methods: {
    ...mapActions(["snackbar"]),
    closeSnackbar() {
      this.snackbar({
        status: false,
        color: "",
        message: "",
      });
    },
  },
};
</script>