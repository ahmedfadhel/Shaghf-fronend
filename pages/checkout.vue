<template>
  <div class="checkout">
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
    <v-container>
      <v-row v-if="getCartLength">
        <v-col cols="12" sm="6">
          <h3 class="text-h5 font-weight-bold">معلومات الشحن</h3>
          <v-card elevation="0" class="my-border mt-4">
            <v-card-text>
              <v-form
                ref="shippingInfoForm"
                v-model="shippingInfoFormValid"
                lazy-validation
              >
                <v-text-field
                  label="أسم العميل"
                  v-model="shippingInfo.name"
                  outlined
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  label="البلد"
                  outlined
                  value="العراق"
                  disabled
                ></v-text-field>
                <v-select
                  label="المحافظة"
                  :items="states"
                  v-model="shippingInfo.gover"
                  item-text="state"
                  item-value="abbr"
                  outlined
                  :rules="[rules.required]"
                ></v-select>
                <v-text-field
                  label="المدينة"
                  v-model="shippingInfo.city"
                  outlined
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  label="أقرب نقطة دالة"
                  v-model="shippingInfo.near_point"
                  outlined
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  label="رقم الهاتف"
                  v-model="shippingInfo.phone"
                  outlined
                  :rules="[rules.required, rules.phone]"
                >
                </v-text-field>
                <v-textarea
                  label="ملاحظات التوصيل"
                  placeholder="مثلا التوصيل صباحاً"
                  v-model="shippingInfo.notes"
                  outlined
                >
                </v-textarea>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <h3 class="text-h5 font-weight-bold">معلومات الطلب</h3>
          <v-card elevation="0" class="my-border mt-4">
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center text-h6 font-weight-bold">
                        المنتج
                      </th>
                      <th class="text-center text-h6 font-weight-bold">
                        الكمية
                      </th>
                      <th class="text-center text-h6 font-weight-bold">
                        السعر
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in getCart" :key="i">
                      <td class="text-center text-body-1">
                        {{
                          item.option === "qu" ? item.productName : item.name
                        }}
                      </td>
                      <td class="text-center text-body-1">
                        {{ item.qty }}
                      </td>
                      <td class="text-center text-body-1">
                        {{ item.price * item.qty }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center text-h6 font-weight-bold">
                        سعر الشحن
                      </td>
                      <td></td>
                      <td class="text-center text-h6 font-weight-bold">
                        {{ getShippingCost }}
                        <sup>د.ع</sup>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center text-h6 font-weight-bold">
                        الحساب الكلي
                      </td>
                      <td></td>
                      <td class="text-center text-h6 font-weight-bold">
                        {{ getCartTotalPrice + getShippingCost }}
                        <sup>د.ع</sup>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="primary"
                block
                class="text-h6 font-weight-bold"
                x-large
                @click="submitOrder()"
              >
                تثبيت الطلب
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <EmptyCart />
      </v-row>
    </v-container>
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
          text: "الرئيسية",
          disabled: false,
          href: "/",
        },
        {
          text: "سلة المشتريات",
          disabled: false,
          href: "/cart",
        },
      ],
      states: [
        {
          state: "الانبار",
          abbr: "an",
        },
        {
          state: "بابل",
          abbr: "ba",
        },
        {
          state: "بغداد",
          abbr: "bg",
        },
        {
          state: "البصرة",
          abbr: "bs",
        },
        {
          state: "الناصرية",
          abbr: "na",
        },
        {
          state: "الديوانية",
          abbr: "di",
        },
        {
          state: "ديالى",
          abbr: "dy",
        },
        {
          state: "دهوك",
          abbr: "dh",
        },
        {
          state: "أربيل",
          abbr: "er",
        },
        {
          state: "الحلة",
          abbr: "ha",
        },
        {
          state: "كربلاء",
          abbr: "ka",
        },
        {
          state: "كركوك",
          abbr: "ki",
        },
        {
          state: "العمارة",
          abbr: "am",
        },
        {
          state: "السماوة",
          abbr: "sa",
        },
        {
          state: "نجف",
          abbr: "nj",
        },
        {
          state: "الموصل",
          abbr: "mo",
        },
        {
          state: "صلاح الدين",
          abbr: "sa",
        },
        {
          state: "السليمانية",
          abbr: "su",
        },
        {
          state: "الكوت",
          abbr: "ku",
        },
      ],
      shippingInfo: {
        name: "",
        gover: "bg",
        city: null,
        near_point: null,
        phone: null,
        notes: null,
      },
      shippingInfoFormValid: false,
      rules: {
        required: (value) => !!value || "* الحقل مطلوب",
        maxLength: (value) => value.length <= 75 || "75 أحرف كحد أقصى",
        phone: (value) =>
          /^(((?:\+|00)964)|(0)*)7[578]\d{8}$/gm.test(value) ||
          "* رقم الهاتف غير صحيح",
      },
    };
  },
  computed: {
    ...mapGetters([
      "getCart",
      "getCartTotalPrice",
      "getShortCart",
      "getCartLength",
    ]),
    breadcrubsItems() {
      let currentPage = {
        text: "تثبيت الطلب",
        disabled: true,
        href: `/checkout`,
      };
      return [...this.items, currentPage];
    },
    getShippingCost() {
      return this.shippingInfo.gover === "bg" ? 5000 : 8000;
    },
  },

  methods: {
    ...mapActions(["snackbar", "clearCart"]),
    resetShippingInfo() {
      this.shippingInfo.name = null;
      this.shippingInfo.gover = "bg";
      this.shippingInfo.city = null;
      this.shippingInfo.near_point = null;
      this.shippingInfo.phone = null;
      this.shippingInfo.notes = null;
    },

    async submitOrder() {
      if (this.$refs.shippingInfoForm.validate()) {
        let result = await this.$axios({
          url: "api/dashboard/checkout",
          method: "post",
          data: {
            shipping: {
              ...this.shippingInfo,
            },
            cart: [...this.getShortCart],
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (result.status === 201) {
          this.snackbar({
            message: result.data.message,
            status: true,
            color: "success",
          });
          this.resetShippingInfo();
          this.clearCart();
          this.$router.replace({ path: "/" });
        }
      } else {
        this.snackbar({
          status: true,
          color: "error",
          message: "يرجى ملأ معلومات الشحن",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.my-border {
  border: 1px solid #dee2e6;
}
</style>