<template>
  <div id="store">
    <v-container>
      <v-row>
        <!-- Filter Section Start -->
        <v-col cols="12" md="3">
          <v-card class="mx-auto elevation-0 rounded" tile>
            <v-card-title>الاقسام</v-card-title>
            <v-divider></v-divider>
            <v-list>
              <v-list-item-group v-model="selectedCat" color="primary">
                <v-list-item @click="restCateogoriesProducts()">
                  <v-list-item-content class="primary--text text-body-1">
                    كل الاقسام
                  </v-list-item-content>
                  <v-list-item-icon>
                    ({{ allCategoriesProducts }})
                  </v-list-item-icon>
                </v-list-item>
                <v-list-item
                  v-for="(cat, i) in categories"
                  :key="i"
                  exact
                  @click="filterByCategory(cat.id)"
                >
                  <v-list-item-content class="primary--text text-body-1">
                    <v-list-item-title v-text="cat.name"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    ({{ cat.product_category.length }})
                  </v-list-item-icon>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <!-- Filter Section End -->
        <!-- All Product List Section Start -->
        <v-col cols="12" md="9">
          <h1 class="mb-5">المنتجات</h1>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
              v-for="(product, i) in prod"
              :key="i"
            >
              <SingleProduct :product="product" height="250px" />
            </v-col>
          </v-row>
        </v-col>
        <!-- All Product List Section End -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SingleProduct from "~/components/main/SingleProduct";
export default {
  async asyncData({ $axios }) {
    let proResult = await $axios.get("api/store/products");
    let catResult = await $axios.get("api/store/category");
    return {
      products: proResult.data,
      categories: catResult.data,
    };
  },
  components: {
    SingleProduct,
  },
  mounted() {
    this.allProducts = [...this.products];
  },
  data() {
    return {
      loading: false,
      selectedCat: -1,
      allProducts: [],
    };
  },
  methods: {
    filterByCategory(id) {
      this.allProducts = this.products.filter(
        (ele) => ele.product.category.id === id
      );
    },
    restCateogoriesProducts() {
      this.allProducts = [...this.products];
    },
  },
  computed: {
    prod() {
      return this.allProducts;
    },
    allCategoriesProducts() {
      let sum = this.categories.reduce((a, b) => {
        return a + b.product_category.length;
      }, 0);
      return sum;
    },
  },
};
</script>
<style lang="scss" scoped>
.theme--light.v-card {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>