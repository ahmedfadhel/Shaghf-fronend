<template>
  <v-card class="single-product" nuxt :to="`/store/${product.product.slug}`">
    <v-img
      :height="height"
      :src="product.thumbnail.path"
      :alt="product.thumbnail.alt_text"
    >
      <span
        class="discount-lable primary white--text text-h6"
        v-if="isDiscount"
      >
        خصم {{ getDiscountPrecentage }}%</span
      >
      <span
        class="discount-lable primary white--text text-h6"
        v-if="isAvailable"
      >
        غير متوفر</span
      >
    </v-img>
    <v-card-title class="justify-center pb-2 text-h5">{{
      product.product.name
    }}</v-card-title>
    <v-card-text class="text-center primary--text">
      <span :class="getDiscountClasses"
        >{{ product.price }} <sup>د.ع</sup></span
      >
      <span class="text-sm-h6 text-h5 d-inline-block" v-if="isDiscount"
        >{{ getDiscountPrice }}
        <sup>د.ع</sup>
      </span>

      <v-btn class="text-body-1 mt-2" color="primary" block large elevation="0"
        >{{ getTextFromType }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["product", "height"],

  methods: {},
  computed: {
    isAvailable() {
      if (this.product.in_stock === 0) {
        return true;
      }
      return false;
    },
    getTextFromType() {
      switch (this.product.option.name) {
        case "qu":
          return "تحديد الكمية";
          break;

        default:
          return "تحديد أحد الخيارات";
          break;
      }
    },
    isDiscount() {
      return this.product.is_discount && this.product.in_stock !== 0
        ? true
        : false;
    },
    getDiscountPrice() {
      return this.product.discount_price;
    },
    getDiscountClasses() {
      return this.isDiscount
        ? "text-decoration-line-through text-sm-h6 text-h5 d-inline-block grey--text darken-2"
        : "text-sm-h6 text-h5 d-inline-block";
    },
    getDiscountPrecentage() {
      return Math.round(
        ((this.product.price - this.product.discount_price) /
          this.product.price) *
          100
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.v-responsive__content {
  .discount-lable {
    position: absolute;
    top: 19px;
    right: -43px;
    padding: 8px 40px;
    transform: rotate(45deg);
    text-transform: uppercase;
  }
}
</style>
