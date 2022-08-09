<template>
  <v-form ref="createForm" v-model="createValid" lazy-validation>
    <v-text-field
      outlined
      label="اسم المنتج"
      v-model="option.name"
      :rules="[rules.required, rules.maxName]"
      max-length="75"
    >
    </v-text-field>
    <v-text-field
      outlined
      label="الرمز"
      hint="الرمز الخاص (للالوان فقط)"
      v-model="option.value"
      max-length="75"
    >
    </v-text-field>
    <v-text-field
      label="سعر المنتج"
      outlined
      number
      :rules="[rules.required]"
      v-model="option.price"
    ></v-text-field>
    <v-text-field
      label="سعر تكلفة المنتج"
      outlined
      number
      :rules="[rules.required]"
      v-model="option.purchase_price"
    ></v-text-field>
    <v-checkbox v-model="option.is_discount" label="هل يوجد خصم؟"></v-checkbox>
    <v-text-field
      label="سعر الخصم "
      outlined
      number
      v-model="option.discount_price"
    ></v-text-field>
    <v-text-field
      label="رمز المنتج"
      outlined
      number
      :rules="[rules.required]"
      v-model="option.sku"
    ></v-text-field>
    <v-text-field
      label="كمية المنتج"
      outlined
      number
      :rules="[rules.required]"
      v-model="option.in_stock"
    ></v-text-field>
    <v-checkbox
      v-model="option.is_main"
      label="هل الاختيار رئيسي؟"
    ></v-checkbox>
    <v-checkbox
      v-model="option.is_set"
      label="هل الاختيار مجموعة؟"
    ></v-checkbox>
    <v-select
      :items="options"
      item-text="name"
      item-value="id"
      label="نوع الاختيار"
      outlined
      :rules="[rules.required]"
      v-model="option.option_id"
    ></v-select>
    <v-file-input
      v-model="option.thumbnail_path"
      prepend-icon=""
      prepend-inner-icon="mdi-camera"
      class="mt-3"
      label="صورة الاختيار"
      :rules="rules.imageRequired"
      outlined
    ></v-file-input>
    <v-text-field
      label="وصف صورة المنتج"
      v-model="option.thumbnail_alt_text"
      outlined
      :rules="[rules.required]"
    ></v-text-field>
    <v-btn
      block
      color="primary"
      x-large
      class="font-wieght-bold text-h6"
      @click="saveOptionValue()"
    >
      حفظ الاختيار
    </v-btn>
  </v-form>
</template>
<script>
export default {
  props: {
    productId: Number,
    options: Array,
  },
  data() {
    return {
      createValid: true,
      rules: {
        required: (value) => !!value || "* الحقل مطلوب",
        maxName: (value) => (value && value.length <= 75) || "75 أحرف كحد أقصى",
        imageRequired: [
          (v) => !!v || "* الحقل مطلوب",
          (v) => (v && v.size > 0) || "* الحقل مطلوب",
        ],
      },
      option: {
        name: null,
        value: null,
        price: 0,
        purchase_price: 0,
        is_discount: false,
        is_main: false,
        is_set: false,
        discount_price: 0,
        sku: 0,
        in_stock: 0,
        option_id: 0,
        thumbnail_path: null,
        thumbnail_alt_text: null,
      },
    };
  },
  methods: {
    resetOption() {
      this.option.name = null;
      this.option.val = null;
      this.option.price = 0;
      this.option.purchase_price = 0;
      this.option.is_discount = false;
      this.option.is_main = false;
      this.option.is_set = false;
      this.option.discount_price = 0;
      this.option.sku = 0;
      this.option.in_stock = 0;
      this.option.option_id = 0;
      this.option.thumbnail_path = null;
      this.option.thumbnail_alt_text = null;
    },
    async saveOptionValue() {
      try {
        if (this.$refs.createForm.validate()) {
          let bodyFromData = new FormData();

          for (let dataKey in this.option) {
            bodyFromData.append(dataKey, this.option[dataKey]);
          }
          bodyFromData.append("product_id", this.productId);

          let result = await this.$axios({
            method: "POST",
            url: "api/dashboard/product/option-values/create",
            data: bodyFromData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (result.status === 200) {
            this.$emit("success", result.data);
            this.resetOption();
            // this.$refs.createForm.reset();
            this.$refs.createForm.resetValidation();
          }
        }
      } catch (error) {
        if (error.response.status === 400) {
          this.$emit("failed", error.response.data);
          this.resetOption();
          // this.$refs.createForm.reset();
          this.$refs.createForm.resetValidation();
        }
      }
    },
  },
};
</script>