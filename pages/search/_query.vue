<template>
  <div class="products-search">
    <CustomBreadcrumbs :items="items" />
    <v-container>
      <v-row class="py-5">
        <v-col cols="6">
          <p class="text-body-1">
            <strong>
              {{ this.$route.query.query }}
            </strong>
            ( {{ products.length }} منتج متوفر)
          </p>
        </v-col>
        <v-col cols="6" class="text-left">
          <v-btn color="primary" nuxt to="/store"> عد للتسوق </v-btn>
          <v-spacer></v-spacer>
        </v-col>
      </v-row>
      <v-row v-if="$fetchState.pending">
        <v-col cols="12" md="4" v-for="(sk, i) in Array(12)" :key="i">
          <v-skeleton-loader v-bind="attrs" type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="6" sm="6" md="3" v-for="(product, i) in products" :key="i">
          <SingleProduct :product="product" height="250px" :search="true" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-pagination></v-pagination>
        </v-col>
      </v-row>
    </v-container>

    <button @click="$fetch">Refresh</button>
  </div>
</template>

<script>
import CustomBreadcrumbs from "~/components/main/CustomBreadcrumbs.vue";
import SingleProduct from "~/components/main/SingleProduct.vue";
export default {
  head() {
    return {
      title: "متجر شغف - بحث " + this.$route.query.query,
    };
  },
  data() {
    return {
      products: [],
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
        page: 1,
        paginationLength: 1,
      },
      items: [
        {
          text: "الرئيسية",
          disabled: false,
          href: "/",
        },
        {
          text: "المتجر",
          disabled: false,
          href: "/store",
        },
        {
          text: "بحث",
          disabled: true,
        },
      ],
    };
  },
  components: {
    CustomBreadcrumbs,
    SingleProduct,
  },
  watch: {
    "$route.query": "$fetch",
  },
  async fetch() {
    let result = await this.$axios.get(
      encodeURI("api/store/search/" + this.$route.query.query)
    );
    console.log(result.data);
    this.products = result.data;
  },
  methods: {
    changePagination() {
      console.log("test");
    },
  },
};
</script>