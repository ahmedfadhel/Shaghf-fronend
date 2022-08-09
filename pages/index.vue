<template>
  <main style="position: relative">
    <!-- Index Banner Section  start  -->
    <Banner />
    <!-- Index Banner Section  End -->

    <!-- Main Categories Section Start -->

    <FeaturedCategory :categories="categories" />

    <!-- Main Categories Section End -->

    <!-- Featured Products Section Start -->

    <div id="featured-products" class="mt-10 pb-10">
      <v-container>
        <v-row>
          <v-col cols="12" align="center">
            <h3 class="text-h3 featured-header mt-5">المنتجات المميزة</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            xs="12"
            sm="6"
            md="4"
            v-for="(fProduct, i) in featuredProducts"
            :key="i"
          >
            <SingleProduct :product="fProduct" height="350px" />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <!-- Featured Products Section End -->
  </main>
</template>

<script>
import Banner from "~/components/main/index/Banner";
import FeaturedCategory from "~/components/main/FeaturedCategory.vue";
import SingleProduct from "~/components/main/SingleProduct.vue";
export default {
  async asyncData({ $axios }) {
    let catResult = await $axios.get("api/store/category");
    let featuredProductResult = await $axios.get("api/store/featured-products");
    return {
      categories: catResult.data,
      featuredProducts: featuredProductResult.data,
    };
  },
  components: {
    Banner,
    FeaturedCategory,
    SingleProduct,
  },

  data() {
    return {
      model: null,
    };
  },
};
</script>
// <style lang="scss" scoped>
#featured-products {
  position: relative;
  background-color: #f8f9fa !important ;
  .featured-header:before {
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