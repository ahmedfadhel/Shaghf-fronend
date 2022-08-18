<template>
  <div id="store">
    <CustomBreadcrumbs :items="items" />
    <!-- <div class="breadcrumbs grey lighten-4">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-breadcrumbs
              :items="items"
              large
              class="pt-2 pb-2"
            ></v-breadcrumbs>
          </v-col>
        </v-row>
      </v-container>
    </div> -->
    <v-container>
      <v-row>
        <!-- All Product List Section Start -->
        <v-col cols="12">
          <h1 class="mb-5">المنتجات</h1>
          <v-row v-if="!prod.length">
            <v-col cols="12" md="4" v-for="(sk, i) in Array(12)" :key="i">
              <v-skeleton-loader v-bind="attrs" type="card"></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="3"
              v-for="(product, i) in products"
              :key="i"
            >
              <SingleProduct :product="product" height="250px" />
            </v-col>
          </v-row>
          <v-row>
            <v-col colsd="12">
              <v-pagination
                v-model="page"
                :length="paginationLength"
                @input="changePagination"
              ></v-pagination>
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
import CustomBreadcrumbs from "~/components/main/CustomBreadcrumbs.vue";
export default {
  async asyncData({ $axios, query, error }) {
    try {
      const page = query.page || 1;
      // let catResult = await $axios.get("api/store/category");
      let proResult = await $axios.get("api/store/products?page=" + page);
      return {
        products: proResult.data.results,
        paginationLength: Math.ceil(
          proResult.data.count / proResult.data.page_size
        ),
        page: proResult.data.page,
      };
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404 });
      }
    }
  },
  watchQuery: ["page"],
  components: {
    SingleProduct,
    CustomBreadcrumbs,
  },

  data() {
    return {
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
      items: [
        {
          text: "الرئيسية",
          disabled: false,
          href: "/",
        },
        {
          text: "المتجر",
          disabled: true,
        },
      ],
    };
  },
  methods: {
    changePagination() {
      this.$router.push({ query: { page: this.page } });
    },
  },
  computed: {
    prod() {
      return this.products;
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