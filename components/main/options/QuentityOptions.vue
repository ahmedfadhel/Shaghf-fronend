<template>
  <div>
    <v-row desnse>
      <v-col v-for="(option, i) in options" :key="i" cols="3">
        <span class="d-block text-xs-body-2 text-sm-h6"
          >الكمية {{ option.name }}
        </span>
        <span class="text-xs-body-2 text-sm-h6">
          {{ option.price }} \ كيلو
        </span>
      </v-col>
    </v-row>
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
            >
              <v-icon slot="prepend" color="primary" @click="incQty()">
                mdi-plus
              </v-icon>
              <v-icon slot="append-outer" color="primary" @click="decQty()">
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
    this.selectedProduct.qty = 1;
    this.selectedProduct.option = element.option.name;
    this.selectedProduct.price = element.is_discount
      ? element.discount_price
      : element.price;
    this.selectedProduct.thumbnail = element.thumbnail.path;
    this.selectedProduct.productId = this.productId;
    this.selectedProduct.productName = this.productName;
    this.options.filter((ele, i) => {
      this.values.push({
        index: i,
        id: ele.id,
        qty: ele.name.split("-"),
      });
    });
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
        productId: -1,
        productName: null,
        option: null,
      },
      stock: -1,
      values: [],
    };
  },
  computed: {},
  methods: {
    ...mapActions(["addToCart"]),
    selectOption(index) {
      this.name = this.options[index].name;
    },
    resetSelectedProduct() {
      this.selectedProduct.id = -1;
      this.selectedProduct.name = null;
      this.selectedProduct.qty = 1;
      this.selectedProduct.price = -1;
      this.selectedProduct.thumbnail = null;
      this.selectedProduct.option = null;
    },
    incQty() {
      if (this.selectedProduct.qty < this.stock) {
        this.selectedProduct.qty = parseInt(this.selectedProduct.qty) + 1;
      }
      this.checkQtyPrice(this.selectedProduct.qty);
    },
    decQty() {
      if (this.selectedProduct.qty > 1) {
        this.selectedProduct.qty = parseInt(this.selectedProduct.qty) - 1;
      }
      this.checkQtyPrice(this.selectedProduct.qty);
    },
    updateQty(val) {
      val <= this.stock && val > 0
        ? (this.selectedProduct.qty = val)
        : (this.selectedProduct.qty = 1);
      this.checkQtyPrice(this.selectedProduct.qty);
    },
    checkQtyPrice(val) {
      for (let i = 0; i < this.values.length; i++) {
        if (
          (val >= parseInt(this.values[i].qty[0]) &&
            val <= parseInt(this.values[i].qty[1])) ||
          isNaN(parseInt(this.values[i].qty[1]))
        ) {
          this.selectedProduct.id = this.values[i].id;
          this.selectedProduct.name = this.options[this.values[i].index].name;
          this.selectedProduct.option =
            this.options[this.values[i].index].option.name;
          this.selectedProduct.price = this.options[this.values[i].index]
            .is_discount
            ? this.options[this.values[i].index].discount_price
            : this.options[this.values[i].index].price;
          this.selectedProduct.thumbnail =
            this.options[this.values[i].index].thumbnail.path;

          this.$emit("selectedOption", this.values[i].index);
          break;
        }
      }
    },
    addCart() {
      this.addToCart(this.selectedProduct);
    },
  },
};
</script>
<style lang="scss" scoped>
// .selected-item {
//   border: 1px solid grey;
// }
</style>