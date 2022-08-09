<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2"> تعديل المنتج </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-form class="mt-6">
            <v-text-field
              label="الاسم"
              outlined
              name="name"
              ref="proName"
              :value="product.name"
              @change="onChangeName"
            ></v-text-field>
            <v-textarea
              label="الوصف"
              outlined
              name="description"
              ref="proDescription"
              :value="product.description"
              @change="onChangeDescription"
            >
            </v-textarea>
            <v-select
              :items="categories"
              item-text="name"
              item-value="id"
              label="الاقسام"
              ref="proCategory"
              :value="product.category.id"
              outlined
              @change="onChangeCategory"
            ></v-select>
            <v-select
              :items="tags"
              item-text="name"
              item-value="id"
              label="العلامات الموسومة"
              :value="product.tags"
              @change="onChangeTags"
              ref="proTags"
              multiple
              outlined
            ></v-select>
            <v-checkbox
              label="هل المنتج مميز؟"
              :input-value="product.is_featured"
              ref="proIsFeatured"
              @change="onChangeIsFeatured"
            ></v-checkbox>
          </v-form>
        </v-col>
        <v-col cols="12" md="6">
          <v-list>
            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1 ml-2">
                اسم المنتج :
              </span>
              <span class="d-inline-block text-body-1">
                {{ product.name }}
              </span>
              <span class="d-inline-block text-body-1"> </span>
            </v-list-item>
            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1 ml-2">
                وصف المنتج :
              </span>
              <span class="d-inline-block text-body-1 ml-2">
                {{ product.description }}
              </span>
            </v-list-item>
            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1 ml-2">
                قسم المنتج:
              </span>
              <span class="d-inline-block text-body-1">
                {{ product.category.name }}
              </span>
            </v-list-item>
            <v-list-item>
              <v-row>
                <v-col cols="5" class="py-2 pl-0"
                  ><span class="d-inline-block font-weight-bold text-body-1">
                    العلامات الموسومة:
                  </span></v-col
                >
                <v-col
                  cols="2"
                  v-for="(tag, i) in product.tags"
                  class="pa-0"
                  :key="i"
                >
                  <span class="d-inline-block text-body-1 tag-border pa-1">
                    {{ tag.name }}
                  </span>
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item class="mt-5">
              <span class="d-inline-block font-weight-bold text-body-1 ml-2">
                هل المنتج مميز؟:
              </span>
              <span
                class="d-inline-block text-body-1"
                v-if="product.is_featured"
              >
                نعم
              </span>
              <span class="d-inline-block text-body-1" v-else> كلا </span>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn class="text-body-1" color="primary" @click="updateProduct()">
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
    product: Object,
    tags: Array,
    categories: Array,
  },
  data() {
    return {
      editProductValue: {
        // name: "",
        // description: "",
        // tags_id: [],
        // category_id: -1,
        // is_featured: false,
      },
    };
  },
  methods: {
    onChangeName(val) {
      this.editProductValue.name = val;
    },
    onChangeDescription(val) {
      this.editProductValue.description = val;
    },
    onChangeCategory(val) {
      this.editProductValue.category_id = val;
    },
    onChangeTags(val) {
      this.editProductValue.tags_id = val.slice();
    },
    onChangeIsFeatured(val) {
      this.editProductValue.is_featured = val;
    },
    async updateProduct() {
      // let result = await this.$axios({
      //   method: "PATCH",
      //   url: `api/dashboard/product/${this.product.id}/edit`,
      //   data: this.editProductValue,
      //   headers: {
      //     "Content-Type": "Application/json",
      //   },
      // });
      // if (result.status === 200) {
      //   this.$emit("success", result.data);
      // } else {
      //   this.$emit("failed");
      // }
      // working code
      try {
        let result = await this.$axios({
          method: "PATCH",
          url: `api/dashboard/product/${this.product.id}/edit`,
          data: this.editProductValue,
          headers: {
            "Content-Type": "Application/json",
          },
        });
        if (result.status === 200) {
          this.$emit("success", result.data);
        }
      } catch (error) {
        console.log(error.response);
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
<style lang="scss" scoped>
.tag-border {
  border: 1px solid gray;
  margin-left: 5px;
  border-radius: 5px;
}
</style>