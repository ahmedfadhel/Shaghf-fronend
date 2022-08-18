<template>
  <div id="product">
    <CustomBreadcrumbs :items="breadcrubsItems" />

    <div class="product">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-carousel hide-delimiters height="auto" v-model="carouselModel">
              <v-carousel-item
                v-for="(image, i) in getAllImages"
                :key="i"
                eager
              >
                <v-img
                  :src="image.path"
                  :alt="image.alt_text"
                  contain
                  eager
                  height="100%"
                >
                </v-img>
              </v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col cols="12" md="6">
            <div class="product-info">
              <h1 class="text-h3">
                {{ product.name }}
                <span v-if="!is_available" class="primary--text"
                  >(غير متوفر)</span
                >
              </h1>
              <p class="primary--text mt-5 text-h4 mb-0" v-if="getIsDiscount">
                <span> {{ getDiscountPrice }} <sup>د.ع</sup> </span>
              </p>
              <p
                :class="
                  !getIsDiscount
                    ? 'primary--text text-h4 mt-5'
                    : 'text-decoration-line-through grey--text  darken-2 text-h4 mt-1 '
                "
              >
                <span>
                  {{ getCurrentPice }}
                  <sup>د.ع</sup>
                </span>
              </p>

              <p class="product-info_description">
                {{ product.description }}
              </p>
              <ColorOptions
                :options="product.product_options"
                :productId="product.id"
                :productName="product.name"
                v-if="getType === 'co'"
                @selectedOption="selectedOption"
              />
              <GeneralOptions
                :options="product.product_options"
                :productId="product.id"
                :productName="product.name"
                v-if="getType === 'ge'"
                @selectedOption="selectedOption"
              />
              <QuentityOptions
                :options="product.product_options"
                v-if="getType === 'qu'"
                @selectedOption="selectedOption"
                :productId="product.id"
                :productName="product.name"
              />
            </div>
            <v-row>
              <v-col cols="12">
                <span class="font-weight-bold text-body-1">القسم : </span>
                <v-chip
                  color="primary"
                  nuxt
                  :to="`/category/${product.category.slug}`"
                  >{{ product.category.name }}</v-chip
                >
              </v-col>
              <v-col cols="12">
                <span class="font-weight-bold text-body-1">الوسوم : </span>
                <v-chip
                  color="primary"
                  v-for="(tag, i) in product.tags"
                  :key="i"
                  class="mr-2"
                  >{{ tag.name }}</v-chip
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <RelatedProducts :products="relatedProducts" />
  </div>
</template>
<script>
import ColorOptions from "~/components/main/options/ColorOptions.vue";
import GeneralOptions from "~/components/main/options/GeneralOptions.vue";
import QuentityOptions from "~/components/main/options/QuentityOptions.vue";
import RelatedProducts from "~/components/main/RelatedProducts.vue";
import CustomBreadcrumbs from "~/components/main/CustomBreadcrumbs.vue";

import { mapActions } from "vuex";
export default {
  async asyncData({ params, $axios }) {
    let proResult = await $axios.get(
      encodeURI(`api/store/products/${params.slug}`)
    );
    return {
      product: proResult.data.product,
      relatedProducts: proResult.data.related_products,
    };
  },
  mounted() {
    this.product.product_options.forEach((el) => {
      if (el.is_main) {
        this.type = el.option.name;
        if (el.is_discount) {
          this.discountPrice = el.discount_price;
          this.isDiscount = true;
          this.currentPrice = el.price;
        } else {
          this.currentPrice = el.price;
        }
        el.in_stock ? (this.is_available = true) : (this.is_available = false);
      }
    });
  },

  data() {
    return {
      items: [
        {
          text: "المتجر",
          disabled: false,
          href: "/store",
        },
      ],
      currentPrice: 0,
      discountPrice: 0,
      type: "co",
      carouselModel: 0,
      isDiscount: false,
      is_available: false,
      optionStock: 0,
      selectedQty: 1,
      is_available: false,
    };
  },
  components: {
    ColorOptions,
    GeneralOptions,
    QuentityOptions,
    RelatedProducts,
    CustomBreadcrumbs,
  },
  methods: {
    ...mapActions(["snackbar"]),
    selectedOption(index) {
      this.carouselModel = index;
      if (this.product.product_options[index].is_discount) {
        this.isDiscount = true;
        this.discountPrice = this.product.product_options[index].discount_price;
      } else {
        this.isDiscount = false;
        this.currentPrice = this.product.product_options[index].price;
      }
      this.product.product_options[index].in_stock
        ? (this.is_available = true)
        : (this.is_available = false);
    },
  },
  computed: {
    breadcrubsItems() {
      let currentPage = {
        text: this.product.name,
        disabled: true,
        href: `/store/${this.product.slug}`,
      };
      return [...this.items, currentPage];
    },
    getAllImages() {
      let images = this.product.product_options.map((ele) => ele.thumbnail);
      return images;
    },
    getCurrentPice() {
      return this.currentPrice;
    },

    getDiscountPrice() {
      return this.discountPrice;
    },
    getIsDiscount() {
      return this.isDiscount;
    },
    getType() {
      return this.type;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-info {
  .product-info_description {
    font-size: 1.2rem;
    margin-top: 1rem;
  }
}
.v-carousel {
  border-radius: 5px;
}
#related-products {
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