<template>
  <div class="categroy-list pb-5">
    <div class="breadcrumbs grey lighten-4">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-breadcrumbs
              :items="breadcrubsItems"
              large
              class="pt-2 pb-2"
            ></v-breadcrumbs>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="categroy-products">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="mb-5">المنتجات</h1>
          </v-col>
          <v-container>
            <v-row v-if="products.length">
              <v-col
                cols="12"
                sm="6"
                md="3"
                v-for="(product, i) in products"
                :key="i"
              >
                <SingleProduct :product="product" height="250px"
              /></v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12">
                <NoItemFound />
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import SingleProduct from "~/components/main/SingleProduct";
import NoItemFound from "~/components/main/NoItemFound.vue";
export default {
  async asyncData({ params, $axios, error }) {
    try {
      let result = await $axios.get(
        `api/store/category/${encodeURI(params.slug)}`
      );
      console.log(result.data);
      return {
        products: result.data,
        slug: params.slug,
      };
    } catch (err) {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
  components: {
    SingleProduct,
    NoItemFound,
  },
  data() {
    return {
      items: [
        {
          text: "المتجر",
          disabled: false,
          href: "/store",
        },
        {
          text: "الاقسام",
          disabled: true,
        },
      ],
    };
  },
  computed: {
    breadcrubsItems() {
      console.log(this.products.length);
      let currentPage = {
        text: this.products.length
          ? this.products[0].product.category.name
          : this.slug,
        disabled: true,
        href: this.products.length
          ? `/category/${this.products[0].product.category.slug}`
          : `/category/${this.slug}`,
      };
      return [...this.items, currentPage];
    },
  },
};
</script>