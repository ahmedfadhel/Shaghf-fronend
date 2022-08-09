<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2">
      تعديل العلامة الموسومة ({{ option.name }})
    </v-card-title>

    <v-card-text>
      <v-row>
        <!-- Edit form section start -->
        <v-col cols="12" md="6">
          <v-form class="mt-6">
            <v-text-field
              outlined
              label="اسم المنتج"
              ref="opName"
              :rules="[rules.maxName]"
              max-length="75"
              @change="onChangeName"
              :value="option.name"
            >
            </v-text-field>
            <v-text-field
              outlined
              label="الرمز"
              hint="الرمز الخاص (للالوان فقط)"
              ref="opValue"
              max-length="75"
              @change="onChangeValue"
              :value="option.value"
            >
            </v-text-field>
            <v-text-field
              label="سعر المنتج"
              outlined
              number
              :value="option.price"
              ref="opPrice"
              @change="onChangePrice"
            ></v-text-field>
            <v-text-field
              label="سعر تكلفة المنتج"
              outlined
              number
              :value="option.purchase_price"
              ref="opPurchasePrice"
              @change="onChangePurchasePrice"
            ></v-text-field>
            <v-checkbox
              label="هل يوجد خصم؟"
              :input-value="option.is_discount"
              ref="opIsDiscount"
              @change="onChangeIsDiscount"
            ></v-checkbox>
            <v-text-field
              label="سعر الخصم "
              outlined
              number
              :value="option.discount_price"
              ref="opDiscountPrice"
              @change="onChangeDiscountPrice"
            ></v-text-field>
            <v-text-field
              label="رمز المنتج"
              outlined
              number
              :value="option.sku"
              ref="opSku"
              @change="onChangeSku"
            ></v-text-field>
            <v-text-field
              label="كمية المنتج"
              outlined
              number
              :value="option.in_stock"
              ref="opInStock"
              @change="onChangeInStock"
            ></v-text-field>
            <v-checkbox
              label="هل الاختيار رئيسي؟"
              :input-value="option.is_main"
              ref="opIsMain"
              @change="onChangeIsMain"
            ></v-checkbox>
            <v-select
              :items="options"
              item-text="name"
              item-value="id"
              label="نوع الاختيار"
              outlined
              :value="option.option.id"
              ref="opOptionValue"
              @change="onChangeOption"
            ></v-select>
            <v-file-input
              prepend-icon=""
              prepend-inner-icon="mdi-camera"
              class="mt-3"
              label="صورة الاختيار"
              v-model="editOptionValues.thumbnail_path"
              outlined
            ></v-file-input>
            <v-text-field
              label="وصف صورة المنتج"
              outlined
              :value="option.thumbnail.alt_text"
              ref="opThumbnailAltText"
              @change="onChangeThumbnailAltText"
            ></v-text-field>
          </v-form>
        </v-col>
        <!-- Edit form section end -->

        <!-- old information display section start -->
        <v-col cols="12" md="6">
          <v-list>
            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1">
                اسم الاختيار :
              </span>
              <span class="d-inline-block mr-2 text-body-1">{{
                option.name
              }}</span>
            </v-list-item>
            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1">
                الرمز :
              </span>
              <span class="d-inline-block mr-2 text-body-1">{{
                option.value
              }}</span>
            </v-list-item>

            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1">
                السعر :
              </span>
              <span class="d-inline-block mr-2 text-body-1">
                {{ option.price }} <sup>د.ع</sup>
              </span>
            </v-list-item>
            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1">
                تكلفة الشراء :
              </span>
              <span class="d-inline-block mr-2">
                {{ option.purchase_price }} <sup>د.ع</sup>
              </span>
            </v-list-item>
            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1">
                هل يوجد خصم؟
              </span>
              <span
                v-if="option.is_discount"
                class="d-inline-block mr-2 text-body-1"
                >نعم</span
              >
              <span v-else class="d-inline-block mr-2 text-body-1">كلا</span>
            </v-list-item>
            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1">
                سعر الخصم :
              </span>
              <span class="d-inline-block mr-2 text-body-1">
                {{ option.discount_price }} <sup>د.ع</sup>
              </span>
            </v-list-item>
            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1">
                هل الاختيار رئيسي؟
              </span>
              <span
                v-if="option.is_main"
                class="d-inline-block mr-2 text-body-1"
                >نعم</span
              >
              <span v-else class="d-inline-block mr-2 text-body-1">كلا</span>
            </v-list-item>
            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1">
                رمز الاختيار:
              </span>
              <span class="d-inline-block mr-2 text-body-1">
                {{ option.sku }}
              </span>
            </v-list-item>
            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1">
                كمية الاختيار:
              </span>
              <span class="d-inline-block mr-2 text-body-1">
                {{ option.in_stock }}
              </span>
            </v-list-item>
            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1">
                نوع الاختيار :
              </span>
              <span class="d-inline-block mr-2 text-body-1">
                {{ option.option.name }}
              </span>
            </v-list-item>
            <v-list-item>
              <v-list-item-group>
                <span class="d-inline-block font-weight-bold text-body-1">
                  صورة الاختيار:
                </span>

                <v-img
                  class="thumbnail-image"
                  eager
                  :src="option.thumbnail.path"
                ></v-img>
              </v-list-item-group>
            </v-list-item>
            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1">
                وصف الصوره :
              </span>
              <span class="d-inline-block mr-2 text-body-1">
                {{ option.thumbnail.alt_text }}
              </span>
            </v-list-item>
          </v-list>
        </v-col>
        <!-- old information display section End -->
      </v-row>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        class="text-body-1"
        color="primary"
        @click="saveUpdateOptionValue()"
      >
        حفظ التعديل</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn color="error" @click="close()"> غلق </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    option: Object,
    options: Array,
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "* الحقل مطلوب",
        maxName: (value) => (value && value.length <= 75) || "75 أحرف كحد أقصى",
        imageRequired: [
          (v) => !!v || "* الحقل مطلوب",
          (v) => (v && v.size > 0) || "* الحقل مطلوب",
        ],
      },
      editOptionValues: {
        name: "",
        value: "",
        price: 0,
        purchase_price: 0,
        is_discount: false,
        is_main: false,
        discount_price: 0,
        sku: 0,
        in_stock: 0,
        option_id: 0,
        thumbnail_path: null,
        thumbnail_alt_text: "",
      },
    };
  },
  methods: {
    resetEditOptionValue() {
      this.editOptionValues.name = null;
      this.editOptionValues.value = null;
      this.editOptionValues.price = 0;
      this.editOptionValues.purchase_price = 0;
      this.editOptionValues.is_discount = false;
      this.editOptionValues.is_main = false;
      this.editOptionValues.discount_price = 0;
      this.editOptionValues.sku = 0;
      this.editOptionValues.in_stock = 0;
      this.editOptionValues.option_id = 0;
      this.editOptionValues.thumbnail_path = null;
      this.editOptionValues.thumbnail_alt_text = "";
    },
    onChangeName(val) {
      console.log(val);
      this.editOptionValues.name = val;
    },
    onChangeValue(val) {
      this.editOptionValues.value = val;
    },
    onChangePrice(val) {
      this.editOptionValues.price = val;
    },
    onChangePurchasePrice(val) {
      this.editOptionValues.purchase_price = val;
    },
    onChangeIsDiscount(val) {
      this.editOptionValues.is_discount = val;
    },
    onChangeDiscountPrice(val) {
      this.editOptionValues.discount_price = val;
    },
    onChangeSku(val) {
      this.editOptionValues.sku = val;
    },
    onChangeInStock(val) {
      this.editOptionValues.in_stock = val;
    },
    onChangeIsMain(val) {
      this.editOptionValues.is_main = val;
    },
    onChangeOption(val) {
      this.editOptionValues.option_id = val;
    },
    onChangeThumbnailAltText(val) {
      this.editOptionValues.thumbnail_alt_text = val;
    },

    async saveUpdateOptionValue() {
      let bodyFormData = new FormData();
      if (
        this.editOptionValues.name &&
        this.option.name !== this.editOptionValues.name
      ) {
        bodyFormData.append("name", this.editOptionValues.name);
      }
      if (
        this.editOptionValues.value &&
        this.option.value !== this.editOptionValues.value
      ) {
        bodyFormData.append("value", this.editOptionValues.value);
      }
      if (
        this.editOptionValues.price &&
        this.option.price !== this.editOptionValues.price
      ) {
        bodyFormData.append("price", this.editOptionValues.price);
      }
      if (
        this.editOptionValues.purchase_price &&
        this.option.purchase_price !== this.editOptionValues.purchase_price
      ) {
        bodyFormData.append(
          "purchase_price",
          this.editOptionValues.purchase_price
        );
      }
      if (
        this.editOptionValues.is_discount &&
        this.option.is_discount !== this.editOptionValues.is_discount
      ) {
        bodyFormData.append("is_discount", this.editOptionValues.is_discount);
      }
      if (
        this.editOptionValues.discount_price &&
        this.option.discount_price !== this.editOptionValues.discount_price
      ) {
        bodyFormData.append(
          "discount_price",
          this.editOptionValues.discount_price
        );
      }
      if (
        this.editOptionValues.sku &&
        this.option.sku !== this.editOptionValues.sku
      ) {
        bodyFormData.append("sku", this.editOptionValues.sku);
      }
      if (
        this.editOptionValues.is_main &&
        this.option.is_main !== this.editOptionValues.is_main
      ) {
        bodyFormData.append("is_main", this.editOptionValues.is_main);
      }
      if (
        this.editOptionValues.in_stock &&
        this.option.in_stock !== this.editOptionValues.in_stock
      ) {
        bodyFormData.append("in_stock", this.editOptionValues.in_stock);
      }
      if (
        this.editOptionValues.option_id &&
        this.option.option.id !== this.editOptionValues.option_id
      ) {
        bodyFormData.append("option_id", this.editOptionValues.option_id);
      }
      if (
        this.editOptionValues.thumbnail_alt_text &&
        this.option.thumbnail.alt_text !==
          this.editOptionValues.thumbnail_alt_text
      ) {
        bodyFormData.append(
          "thumbnail_alt_text",
          this.editOptionValues.thumbnail_alt_text
        );
      }
      if (this.editOptionValues.thumbnail_path) {
        bodyFormData.append(
          "thumbnail_path",
          this.editOptionValues.thumbnail_path
        );
      }
      try {
        let result = await this.$axios({
          method: "PATCH",
          url: `api/dashboard/product/option-values/${this.option.id}/edit`,
          data: bodyFormData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (result.status === 200) {
          this.$emit("success", result.data);
        }
      } catch (error) {
        if (error.response.status === 404) {
          this.$emit("failed", error.response.data);
        } else if (error.response.status === 400) {
          this.$emit("failed", error.response.data);
        }
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>