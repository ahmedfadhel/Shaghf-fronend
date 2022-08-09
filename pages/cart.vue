<template>
  <div class="cart">
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
    <div v-if="getCartLength">
      <div class="cart-list mt-5">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card elevation="0">
                <v-data-table
                  class="my-border"
                  :headers="headers"
                  :items="getCart"
                  :hide-default-footer="true"
                >
                  <template v-slot:item.thumbnail="{ item }">
                    <div class="pa-2">
                      <img
                        :src="item.thumbnail"
                        :alt="item.name"
                        height="100"
                        width="100"
                        class="thumbnail-image"
                      />
                    </div>
                  </template>
                  <template v-slot:item.productName="{ item }">
                    <td class="font-weight-bold text-center text-body-1">
                      {{ item.productName }}
                    </td>
                  </template>
                  <template v-slot:item.name="{ item }">
                    <td class="font-weight-bold text-center text-body-1">
                      {{ getOptionName(item) }}
                    </td>
                  </template>
                  <template v-slot:item.price="{ item }">
                    <td class="font-weight-bold text-center text-body-1">
                      {{ item.price }}
                    </td>
                  </template>
                  <template v-slot:item.qty="{ item }">
                    <td class="font-weight-bold text-center text-body-1">
                      {{ item.qty }}
                    </td>
                  </template>
                  <template v-slot:item.totalPrice="{ item }">
                    <td class="font-weight-bold text-center text-body-1">
                      {{ item.price * item.qty }}
                    </td>
                  </template>
                  <template v-slot:item.remove="{ item }">
                    <td class="font-weight-bold text-center text-body-1">
                      <v-btn color="primary" @click="deleteFromCart(item.id)">
                        <v-icon> mdi-delete </v-icon>
                      </v-btn>
                    </td>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="cart-info">
        <v-container>
          <v-row>
            <!-- cart info section controll cart or continuo shopping section start -->
            <v-col cols="12" sm="6" order-sm="6" offset-sm="2">
              <v-row>
                <v-col cols="12" md="6">
                  <v-btn
                    color="primary"
                    nuxt
                    to="#"
                    block
                    class="text-h6"
                    large
                  >
                    تعديل سلة المشتريات
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6">
                  <v-btn
                    color="primary"
                    outlined
                    nuxt
                    to="/store"
                    block
                    class="text-h6"
                    large
                  >
                    الاستمرار بالتسوق
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <!-- cart info section controll cart or continuo shopping section end -->

            <!-- cart total price section start-->
            <v-col cols="12" sm="4">
              <v-card elevation="0">
                <v-card-title class="text-h5">
                  مجموع الحساب الكلي
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="text-h5 mt-4">
                  الحساب :
                  <span>
                    {{ getCartTotalPrice }}
                    <sup>د.ع</sup>
                  </span>
                  <v-btn
                    color="primary"
                    block
                    x-large
                    class="mt-5 text-h5"
                    nuxt
                    to="/checkout"
                    :disabled="getCartLength ? false : true"
                  >
                    الاستمرار لتثبيت الطلب
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-col>
            <!-- cart total price section end-->
          </v-row>
        </v-container>
      </div>
    </div>
    <div v-else>
      <EmptyCart />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import EmptyCart from "~/components/main/EmptyCart.vue";
export default {
  components: {
    EmptyCart,
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
      headers: [
        {
          text: "الصورة",
          value: "thumbnail",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
        {
          text: "المنتج",
          value: "productName",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
        {
          text: "الاختيار",
          value: "name",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
        {
          text: "سعر المنتج",
          value: "price",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
        {
          text: "الكمية",
          value: "qty",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
        {
          text: "السعر الكلي",
          value: "totalPrice",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
        {
          text: "أزالة",
          value: "remove",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
      ],
    };
  },

  methods: {
    ...mapActions(["deleteFromCart"]),
    getOptionName(val) {
      return val.option === "qu" ? val.productName : val.name;
    },
  },
  computed: {
    ...mapGetters(["getCart", "getCartTotalPrice", "getCartLength"]),
    breadcrubsItems() {
      let currentPage = {
        text: "سلة المشتريات",
        disabled: true,
        href: `/cart`,
      };
      return [...this.items, currentPage];
    },
  },
};
</script>
<style lang="scss" scoped>
.thumbnail-image {
  border: 2px solid #aaa;
  padding: 1px;
  border-radius: 5px;
}
.my-border {
  border: 1px solid #dee2e6;
}
</style>