<template>
  <v-container>
    <v-card class="mb-0">
      <v-card-title class="font-weight-bold text-h5 teal white--text pa-5">
        <h1>المنتجات</h1>
      </v-card-title>
    </v-card>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <h3
                  class="text-h5 font-weight-bold primary--text text--darken-1"
                >
                  أضافة منتج جديد
                </h3>
              </v-col>
              <v-col cols="12" md="4">
                <v-divider class="mb-8"></v-divider>
                <!-- Create New Product Section Start -->
                <v-form ref="createForm" v-model="createValid">
                  <v-text-field
                    outlined
                    label="اسم المنتج"
                    v-model="product.name"
                    :rules="[rules.required, rules.maxName]"
                    max-length="75"
                  >
                  </v-text-field>
                  <v-textarea
                    outlined
                    label="وصف المنتج"
                    v-model="product.description"
                    :rules="[rules.required]"
                  >
                  </v-textarea>
                  <v-autocomplete
                    label="الاقسام"
                    outlined
                    :items="categories"
                    item-text="name"
                    item-value="id"
                    v-model="product.category_id"
                    :rules="[rules.required]"
                  >
                  </v-autocomplete>
                  <v-autocomplete
                    :items="tags"
                    item-text="name"
                    item-value="id"
                    outlined
                    multiple
                    label="العلامات الموسومة"
                    v-model="product.tags_id"
                    :rules="[rules.tagRequired]"
                  >
                  </v-autocomplete>

                  <v-checkbox
                    label="هل المنتج مميز؟"
                    v-model="product.is_featured"
                    class="mr-2"
                  ></v-checkbox>
                  <v-btn
                    block
                    color="primary"
                    x-large
                    class="font-wieght-bold text-h6"
                    @click="saveProduct()"
                  >
                    حفظ المنتج
                  </v-btn>
                </v-form>
                <!-- Create New Product Section End -->
              </v-col>
              <!-- List All Products Section Start -->
              <v-col cols="12" md="8">
                <v-card>
                  <v-card-title
                    class="font-weight-bold text-h5 primary white--text"
                  >
                    المنتجات
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
                    :items="products"
                    :search="search"
                    :items-per-page="20"
                  >
                    <template v-slot:item.name="{ item }">
                      <td class="font-weight-bold text-center text-body-1">
                        {{ item.name }}
                      </td>
                    </template>
                    <template v-slot:item.category="{ item }">
                      <td class="font-weight-bold text-center text-body-1">
                        {{ item.category.name }}
                      </td>
                    </template>
                    <template v-slot:item.updated_at="{ item }">
                      <td class="font-weight-bold text-center text-body-1">
                        {{ item.updated_at }}
                      </td>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-btn
                        color="primary"
                        outlined
                        small
                        class="text-body-1"
                        @click="editProduct(item)"
                      >
                        <v-icon small> mdi-pencil </v-icon>
                        تعديل
                      </v-btn>
                      <v-btn
                        color="primary"
                        outlined
                        small
                        class="text-body-1"
                        nuxt
                        exact
                        :to="`products/${item.id}/create-option`"
                      >
                        <v-icon small> mdi-pencil </v-icon>
                        اضافة خيارات
                      </v-btn>
                      <v-btn
                        color="error"
                        outlined
                        small
                        class="text-body-1"
                        @click="deleteProduct(item)"
                      >
                        <v-icon small> mdi-delete </v-icon>
                        حذف
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>
                <!-- List All Products Section End -->
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Edit Product Dialog Section Start -->
    <v-dialog v-model="dialog" width="800">
      <EditProductForm
        @close="close"
        :product="copyProduct"
        :tags="tags"
        :categories="categories"
        @success="updateSuccess"
        @failed="updateFailed"
      />
    </v-dialog>
    <!-- Edit Product Dialog Section End -->
  </v-container>
</template>
<script>
import EditProductForm from "~/components/dashboard/EditProductForm.vue";
import { mapActions } from "vuex";
export default {
  layout: "dashboard",
  async asyncData({ $axios }) {
    let tagResult = await $axios.get("api/dashboard/tags");
    let catResult = await $axios.get("api/dashboard/category");
    let prodcutsResult = await $axios.get("api/dashboard/products");

    return {
      tags: tagResult.data,
      categories: catResult.data,
      products: prodcutsResult.data,
    };
  },
  data() {
    return {
      createValid: true,
      dialog: false,
      productInex: -1,
      search: "",

      headers: [
        {
          value: "id",
          text: "#",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
        {
          value: "name",
          text: "أسم المنتج",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
        {
          value: "category",
          text: "القسم",
          class: "text-h6 font-weight-bold",
          align: "center",
        },

        {
          value: "updated_at",
          text: "التاريخ",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
        {
          value: "actions",
          text: "التحكم",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
      ],
      rules: {
        required: (value) => !!value || "* الحقل مطلوب",
        maxName: (value) => value.length <= 75 || "75 أحرف كحد أقصى",
        tagRequired: (value) =>
          (value.length && Array.isArray(value)) || "* الحقل مطلوب",
      },

      product: {
        name: "",
        description: "",
        tags_id: [],
        category_id: -1,
        is_featured: false,
      },
      copyProduct: {
        id: -1,
        name: null,
        description: null,
        tags: [],
        category: {
          name: null,
          id: -1,
        },
        is_featured: false,
      },
    };
  },
  components: {
    EditProductForm,
  },
  methods: {
    ...mapActions(["snackbar"]),
    resetCopyProduct() {
      this.copyProduct.id = -1;
      this.copyProduct.name = null;
      this.copyProduct.description = null;
      this.copyProduct.category.id = -1;
      (this.copyProduct.category.name = null), (this.copyProduct.tags = []);
      this.copyProduct.is_featured = false;
    },
    async saveProduct() {
      try {
        if (this.$refs.createForm.validate()) {
          let result = await this.$axios({
            method: "POST",
            url: "api/dashboard/product/create",
            data: this.product,
            headers: {
              "Content-Type": "Application/json",
            },
          });
          if (result.status === 200) {
            this.snackbar({
              status: true,
              color: "success",
              message: "تمت الاضافة بنجاح",
            });
            this.products.unshift(result.data);
          }
        }
      } catch (error) {
        if (error.response.status === 400) {
          this.snackbar({
            status: true,
            color: "error",
            message: Object.keys(error.response.data)
              .map((key) => `${key} : ${error.response.data[key]}`)
              .join("<br/>"),
          });
          this.product.name = "";
          this.product.description = "";
          this.product.category = -1;
          this.product.tags = [];
          this.product.is_featured = false;
          this.$refs.createForm.resetValidation();
        }
      }
    },
    async deleteProduct(item) {
      try {
        let result = await this.$axios.delete(
          `api/dashboard/products/delete/${item.id}`
        );
        if (result.status === 204) {
          this.products = this.products.filter((ele) => ele.id !== item.id);
          this.snackbar({
            status: true,
            message: "تمت الازالة بنجاح",
            color: "success",
          });
        }
      } catch (error) {
        if (error.response.status === 404) {
          this.snackbar({
            status: true,
            message: error.response.data.message,
            color: "error",
          });
        }
      }
    },
    editProduct(item) {
      this.productInex = this.products.indexOf(item);
      this.copyProduct.id = item.id;
      this.copyProduct.name = item.name;
      this.copyProduct.description = item.description;
      this.copyProduct.tags = item.tags;
      this.copyProduct.category.name = item.category.name;
      this.copyProduct.category.id = item.category.id;
      this.copyProduct.is_featured = item.is_featured;
      this.dialog = true;
    },

    updateSuccess(val) {
      Object.assign(this.products[this.productInex], val);
      this.snackbar({
        message: "تم التعديل بنجاح",
        status: true,
        color: "success",
      });
      this.dialog = false;
      this.productIndex = -1;
      this.resetCopyProduct();
    },
    updateFailed(val) {
      this.snackbar({
        message: Object.keys(val)
          .map((key) => `${key} : ${val[key]}`)
          .join("<br/>"),
        status: true,
        color: "error",
      });
      this.dialog = false;
      this.productIndex = -1;
      this.resetCopyProduct();
    },
    close() {
      this.dialog = false;
      this.productIndex = -1;
      this.resetCopyProduct();
    },
  },
};
</script>

<style lang="scss" scoped>
.tag-border {
  border: 1px solid gray;
  border-radius: 5px;
}
</style>