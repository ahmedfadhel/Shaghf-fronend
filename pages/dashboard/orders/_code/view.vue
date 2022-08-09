<template>
  <div class="order-details">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="mb-0 elevation-0">
            <v-card-title
              class="font-weight-bold text-h5 teal white--text pa-5"
            >
              قائمة المواد الخاصة بالطلب رقم ({{ order.ref_code }})
            </v-card-title>
          </v-card>
          <v-card-text class="pa-0">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center font-weight-bold text-h6">
                      صورة المنتج
                    </th>
                    <th class="text-center font-weight-bold text-h6">المنتج</th>
                    <th class="text-center font-weight-bold text-h6">
                      الاختيار
                    </th>
                    <th class="text-center font-weight-bold text-h6">الكمية</th>
                    <th class="text-center font-weight-bold text-h6">السعر</th>
                    <th class="text-center font-weight-bold text-h6">
                      السعر الكلي
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.items" :key="item.id">
                    <td class="text-center">
                      <div class="pa-2">
                        <img
                          :src="item.product.thumbnail.path"
                          :alt="item.product.thumbnail.alt_text"
                          height="100"
                          width="100"
                          class="thumbnail-image"
                        />
                      </div>
                    </td>
                    <td class="text-center text-body-1 font-weight-bold">
                      {{ item.product.product.name }}
                    </td>
                    <td class="text-center text-body-1 font-weight-bold">
                      {{
                        item.product.option.name === "qu"
                          ? item.product.product.name
                          : item.product.name
                      }}
                    </td>
                    <td class="text-center text-body-1 font-weight-bold">
                      {{ item.qty }}
                    </td>
                    <td class="text-center text-body-1 font-weight-bold">
                      {{ item.price }}
                    </td>
                    <td class="text-center text-body-1 font-weight-bold">
                      {{ item | getQtyPrice }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-title
              class="font-weight-bold text-h6 teal white--text pa-3"
            >
              ملخص القائمة</v-card-title
            >
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td class="text-right text-h6 font-weight-bold">
                        رقم الطلب
                      </td>

                      <td class="text-left font-weight-bold text-body-1">
                        {{ order.ref_code }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-right text-h6 font-weight-bold">
                        عدد المنتجات
                      </td>

                      <td class="text-left font-weight-bold text-body-1">
                        {{ getTotalQty }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-right text-h6 font-weight-bold">
                        سعر الشحن
                      </td>

                      <td class="text-left font-weight-bold text-body-1">
                        {{ getShippingCost }}
                        <sup>د.ع</sup>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-right text-h6 font-weight-bold">
                        تكلفة القائمة
                      </td>

                      <td class="text-left font-weight-bold text-body-1">
                        {{ getOrderCost }}
                        <sup>د.ع</sup>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-right text-h6 font-weight-bold">
                        التكلفة النهائية
                      </td>

                      <td class="text-left font-weight-bold text-body-1">
                        {{ getTotalCost }}
                        <sup>د.ع</sup>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-title class="font-weight-bold text-h6 teal white--text pa-3"
              >معلومات الشحن</v-card-title
            >
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td class="text-right text-h6 font-weight-bold">
                        اسم العميل
                      </td>

                      <td class="text-left font-weight-bold text-body-1">
                        {{ order.shipping.name }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-right text-h6 font-weight-bold">
                        المحافظة
                      </td>

                      <td class="text-left font-weight-bold text-body-1">
                        {{ order.shipping.gover }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-right text-h6 font-weight-bold">
                        المدينة
                      </td>

                      <td class="text-left font-weight-bold text-body-1">
                        {{ order.shipping.city }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-right text-h6 font-weight-bold">
                        اقرب نقطة دالة
                      </td>

                      <td class="text-left font-weight-bold text-body-1">
                        {{ order.shipping.near_point }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-right text-h6 font-weight-bold">
                        رقم الهاتف
                      </td>

                      <td class="text-left font-weight-bold text-body-1">
                        {{ order.shipping.phone }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  async asyncData({ $axios, params }) {
    let result = await $axios.get(
      `api/dashboard/orders/retreive-order/${params.code}`
    );
    return {
      order: result.data,
    };
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    getShippingCost() {
      return this.order.shipping.gover === "بغداد" ? 5000 : 8000;
    },
    getTotalQty() {
      return this.order.items.reduce((a, b) => {
        return a + b.qty;
      }, 0);
    },
    getOrderCost() {
      return (
        Math.floor(
          this.order.items.reduce((a, b) => {
            return a + b.price * b.qty;
          }, 0) / 1000
        ) * 1000
      );
    },
    getTotalCost() {
      return this.getOrderCost + this.getShippingCost;
    },
  },
  filters: {
    getQtyPrice(item) {
      return item.qty * item.price;
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
</style>