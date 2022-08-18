<template>
  <div>
    <v-item-group active-class="selected-item" mandatory>
      <v-row desnse>
        <v-col v-for="(option, i) in options" :key="i" cols="2">
          <v-item v-slot="{ active, toggle }">
            <v-card
              class="d-flex align-center"
              @click="toggle"
              v-on:click="selectOption(i)"
              height="64"
            >
              <v-img
                :src="option.thumbnail.path"
                class="align-center"
                height="64"
              >
                <v-scroll-y-transition>
                  <div v-if="active" class="text-center">
                    <v-icon color="primary" large>
                      mdi-check-circle-outline</v-icon
                    >
                  </div>
                </v-scroll-y-transition>
              </v-img>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
    <v-divider class="my-5"></v-divider>
    <div class="product-selection">
      <v-container fluid class="px-0 py-0">
        <v-row>
          <v-col cols="4">
            <v-text-field
              type="number"
              outlined
              class="primary--text"
              lable="الكمية"
              v-model="selectedProduct.qty"
              @change="updateQty"
              :disabled="!is_available"
            >
              <v-icon
                slot="prepend"
                color="primary"
                @click="incQty()"
                :disabled="!is_available"
              >
                mdi-plus
              </v-icon>
              <v-icon
                slot="append-outer"
                color="primary"
                @click="decQty()"
                :disabled="!is_available"
              >
                mdi-minus
              </v-icon>
            </v-text-field>
          </v-col>
          <v-col cols="8">
            <v-btn
              color="primary"
              x-large
              class="text-body-1 font-weight-bold"
              block
              @click="addCart()"
              :disabled="!is_available"
              >أضافة الى السلة</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: ["options", "productId", "productName"],
  mounted() {
    let element = this.options.find((ele) => (ele.is_main ? ele.name : ""));
    this.name = element.name;
    this.stock = element.in_stock;
    this.selectedProduct.id = element.id;
    this.selectedProduct.name = element.name;
    if (element.in_stock) {
      this.is_available = true;
    } else {
      this.is_available = false;
    }
    this.selectedProduct.option = element.option.name;
    this.selectedProduct.price = element.is_discount
      ? element.discount_price
      : element.price;
    this.selectedProduct.thumbnail = element.thumbnail.path;
    this.selectedProduct.productId = this.productId;
    this.selectedProduct.productName = this.productName;
  },
  data() {
    return {
      name: "",
      selectedProduct: {
        id: -1,
        name: null,
        qty: 1,
        price: -1,
        thumbnail: null,
        option: null,
      },
      stock: -1,
      is_available: false,
    };
  },
  methods: {
    ...mapActions(["addToCart"]),
    selectOption(index) {
      this.name = this.options[index].name;
      this.selectedProduct.id = this.options[index].id;
      this.selectedProduct.name = this.options[index].name;
      this.selectedProduct.price = this.options[index].is_discount
        ? this.options[index].discount_price
        : this.options[index].price;

      this.options[index].in_stock
        ? (this.is_available = true)
        : (this.is_available = false);
      this.stock = this.options[index].in_stock;
      this.selectedProduct.qty = 1;
      this.selectedProduct.thumbnail = this.options[index].thumbnail.path;
      this.$emit("selectedOption", index);
    },
    resetSelectedProduct() {
      this.selectedProduct.id = -1;
      this.selectedProduct.name = null;
      this.selectedProduct.qty = 1;
      this.selectedProduct.price = -1;
      this.selectedProduct.thumbnail = null;
    },
    incQty() {
      if (this.selectedProduct.qty < this.stock) {
        this.selectedProduct.qty = parseInt(this.selectedProduct.qty) + 1;
      }
    },
    decQty() {
      if (this.selectedProduct.qty > 1) {
        this.selectedProduct.qty = parseInt(this.selectedProduct.qty) - 1;
      }
    },
    updateQty(val) {
      val <= this.stock && val > 0
        ? (this.selectedProduct.qty = val)
        : (this.selectedProduct.qty = 1);
    },
    addCart() {
      this.addToCart(this.selectedProduct);
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
// .selected-item {
//   border: 1px solid grey;
// }
</style>