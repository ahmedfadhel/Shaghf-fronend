<template>
  <div class="categroy-list pb-5">
    <CustomBreadcrumbs :items="breadcrubsItems" />

    <div class="categroy-products">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="mb-5">قسم - {{ categoryName }}</h1>
          </v-col>
        </v-row>
        <v-row v-if="!prod.length">
          <v-col cols="12" md="4" v-for="(sk, i) in Array(12)" :key="i">
            <v-skeleton-loader v-bind="attrs" type="card"></v-skeleton-loader>
          </v-col>
        </v-row>
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
        <v-row>
          <v-col colsd="12">
            <v-pagination
              v-model="page"
              :length="paginationLength"
              @input="changePagination"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import SingleProduct from "~/components/main/SingleProduct";
import CustomBreadcrumbs from "~/components/main/CustomBreadcrumbs.vue";

export default {
  async asyncData({ params, $axios, error, query }) {
    try {
      const page = query.page || 1;
      let result = await $axios.get(
        `api/store/category/${encodeURI(params.slug)}?page=${page}`
      );
      return {
        products: result.data.results,
        slug: params.slug,
        categoryName: result.data.results[0].product.category.name,
        categoryDescription:
          result.data.results[0].product.category.description,
        paginationLength: Math.ceil(result.data.count / result.data.page_size),
        page: result.data.page,
      };
    } catch (err) {
      error({ statusCode: 404, message: "Page not found" });
    }
  },
  watchQuery: ["page"],
  components: {
    SingleProduct,
    CustomBreadcrumbs,
  },
  head() {
    return {
      title: "متجر شغف - قسم " + this.categoryName,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.categoryDescription,
        },
      ],
    };
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
  methods: {
    changePagination() {
      this.$router.push({ query: { page: this.page } });
    },
  },
  computed: {
    breadcrubsItems() {
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
    prod() {
      return this.products;
    },
  },
};
</script>