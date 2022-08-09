<template>
  <v-container>
    <v-row class="px-5">
      <v-col md="6">
        <h1>الخيارات الخاصة بالمنتج - {{ product.name }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <h3
                  class="text-h5 font-weight-bold primary--text text--darken-1"
                >
                  أضافة خيار جديد
                </h3>
              </v-col>
              <v-col cols="12" md="4">
                <v-divider class="mb-8"></v-divider>
                <CreateOptionValueForm
                  :product-id="product.id"
                  :options="options"
                  @success="createSuccess"
                  @failed="createFailed"
                />
              </v-col>
              <v-col cols="12" md="8">
                <v-card>
                  <v-card-title
                    class="font-weight-bold text-h5 primary white--text"
                  >
                    خيارات المنتج
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="بحث"
                      single-line
                      dark
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-data-table
                    :headers="headers"
                    :items="optionValues"
                    :items-per-page="10"
                    :search="search"
                    :footer-props="{
                      'items-per-page-options': [10, 20, 30, -1],
                    }"
                  >
                    <template v-slot:item.actions="{ item }">
                      <v-btn
                        @click="editOptionValue(item)"
                        color="primary"
                        outlined
                        small
                        class="text-body-1 mt-2"
                      >
                        <v-icon small> mdi-pencil </v-icon>
                        تعديل
                      </v-btn>
                      <v-btn
                        color="error"
                        outlined
                        small
                        class="text-body-1 my-2"
                        @click="deleteOption(item)"
                      >
                        <v-icon small> mdi-delete </v-icon>
                        حذف
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- edit dialog section start -->
    <v-dialog v-model="dialog" width="800">
      <EditOptionValueForm
        @close="close"
        :option="copyOptionValues"
        :options="options"
        @success="updateSuccess"
        @failed="updateFailed"
      />
    </v-dialog>
    <!-- edit dialog section End -->
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
import EditOptionValueForm from "~/components/dashboard/EditOptionValueForm.vue";
import CreateOptionValueForm from "~/components/dashboard/CreateOptionValueForm.vue";
export default {
  layout: "dashboard",
  async asyncData({ $axios, params }) {
    let result = await $axios.get(`api/dashboard/product/view/${params.id}`);
    let optionValuesResult = await $axios.get(
      `api/dashboard/product/${params.id}/option-values`
    );
    let optionResult = await $axios.get("api/dashboard/options");
    return {
      product: result.data,
      options: optionResult.data,
      optionValues: optionValuesResult.data,
    };
  },
  data() {
    return {
      dialog: false,
      optionValueIndex: -1,
      search: "",
      headers: [
        {
          value: "id",
          text: "التسلسل",
          align: "center",
          class: "font-weight-bold text-body-1",
        },
        {
          value: "name",
          text: "اسم الاختيار",
          align: "center",
          class: "font-weight-bold text-body-1",
        },
        {
          value: "price",
          text: "السعر",
          align: "center",
          class: "font-weight-bold text-body-1",
        },
        {
          value: "is_main",
          text: "الاختيار رئيسي؟",
          align: "center",
          class: "font-weight-bold text-body-1",
        },
        {
          value: "product.name",
          text: "المنتج",
          align: "center",
          class: "font-weight-bold text-body-1",
        },
        {
          value: "option.name",
          text: "نوع الاختيار",
          align: "center",
          class: "font-weight-bold text-body-1",
        },
        {
          value: "actions",
          text: "العمليات",
          align: "center",
          class: "font-weight-bold text-body-1",
        },
      ],

      copyOptionValues: {
        id: -1,
        name: null,
        value: null,
        price: 0,
        purchase_price: 0,
        is_discount: false,
        is_main: false,
        discount_price: 0,
        sku: null,
        in_stock: 0,
        option: {
          name: null,
          id: -1,
        },
        thumbnail: {
          path: null,
          alt_text: null,
        },
      },
    };
  },
  components: {
    EditOptionValueForm,
    CreateOptionValueForm,
  },
  methods: {
    ...mapActions(["snackbar"]),
    async deleteOption(item) {
      try {
        let result = await this.$axios.delete(
          `api/dashboard/product/option-values/delete/${item.id}`
        );

        if (result.status === 204) {
          this.optionValues = this.optionValues.filter(
            (el) => el.id !== item.id
          );
          this.snackbar({
            status: true,
            message: "تمت الازالة بنجاح",
            color: "success",
          });
        }
      } catch (error) {
        this.snackbar({
          status: true,
          message: error.response.data.message,
          color: "error",
        });
      }
    },
    resetCopyOptionValues() {
      this.copyOptionValues.id = -1;
      this.copyOptionValues.name = null;
      this.copyOptionValues.value = null;
      this.copyOptionValues.price = 0;
      this.copyOptionValues.purchase_price = 0;
      this.copyOptionValues.is_discount = false;
      this.copyOptionValues.is_main = false;
      this.copyOptionValues.discount_price = 0;
      this.copyOptionValues.in_stock = 0;
      this.copyOptionValues.sku = null;
      this.copyOptionValues.option.name = null;
      this.copyOptionValues.option.id = -1;
      this.copyOptionValues.thumbnail.path = null;
      this.copyOptionValues.thumbnail.alt_text = null;
    },
    editOptionValue(item) {
      this.optionValueIndex = this.optionValues.indexOf(item);
      this.copyOptionValues.id = item.id;
      this.copyOptionValues.name = item.name;
      this.copyOptionValues.value = item.value;
      this.copyOptionValues.price = item.price;
      this.copyOptionValues.purchase_price = item.purchase_price;
      this.copyOptionValues.is_discount = item.is_discount;
      this.copyOptionValues.is_main = item.is_main;
      this.copyOptionValues.discount_price = item.discount_price;
      this.copyOptionValues.in_stock = item.in_stock;
      this.copyOptionValues.sku = item.sku;
      this.copyOptionValues.option.name = item.option.name;
      this.copyOptionValues.option.id = item.option.id;
      this.copyOptionValues.thumbnail.path = item.thumbnail.path;
      this.copyOptionValues.thumbnail.alt_text = item.thumbnail.alt_text;
      this.dialog = true;
    },
    createSuccess(val) {
      this.optionValues.unshift(val);
      this.snackbar({
        status: true,
        message: "تمت الاضافة بنجاح",
        color: "success",
      });
    },
    createFailed(val) {
      this.snackbar({
        status: true,
        message: Object.keys(val)
          .map((key) => `${key} : ${val[key]}`)
          .join("<br/>"),
        color: "error",
      });
    },
    updateSuccess(val) {
      Object.assign(this.optionValues[this.optionValueIndex], val);
      this.snackbar({
        status: true,
        message: "تم التعديل بنجاح",
        color: "success",
      });
      this.resetCopyOptionValues();
      this.close();
    },
    updateFailed(val) {
      this.snackbar({
        status: true,
        message: Object.keys(val)
          .map((key) => `${key} : ${val[key]}`)
          .join("<br/>"),
        color: "error",
      });
      this.resetCopyOptionValues();
      this.close();
    },
    close() {
      this.optionValueIndex = -1;
      this.dialog = false;
    },
  },
};
</script>