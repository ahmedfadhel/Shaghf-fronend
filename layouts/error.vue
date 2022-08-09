<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      <!-- {{ pageNotFound }} -->
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>4<span>0</span>4</h1>
          </div>
          <h2>لم يتم العثور على الصفحة التي طلبتها</h2>
          <v-btn
            color="primary"
            nuxt
            to="/store"
            large
            class="font-body-bold text-h6"
          >
            الاستمرار بالتسوق
          </v-btn>
        </div>
      </div>
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

