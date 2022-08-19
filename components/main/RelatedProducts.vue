<template>
  <div class="related_products mt-10 pb-10 grey lighten-4">
    <v-container>
      <v-row>
        <v-col cols="12" align="center">
          <h3 class="text-h3 related-header mt-5">منتجات ذات صله</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          xs="12"
          sm="6"
          md="3"
          v-for="(product, i) in products"
          :key="i"
        >
          <SingleProduct :product="product" height="250px" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SingleProduct from "~/components/main/SingleProduct.vue";
export default {
  props: {
    products: Array,
  },
  components: {
    SingleProduct,
  },
};
</script>

<style lang="scss">
.related-products {
  position: relative;
  background-color: #f8f9fa !important ;
  .related-header:before {
    content: "";
    left: 50%;
    top: 15px;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    position: absolute;
    width: 60px;
    height: 2px;
    background: #7971ea;
  }
}
</style>