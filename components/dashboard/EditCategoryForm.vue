<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2">
      تعديل العلامة الموسومة ({{ this.category.name }})
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-form class="mt-6">
            <v-text-field
              label="الاسم"
              outlined
              :value="category.name"
              @change="onChangeName"
              ref="catName"
              name="name"
            ></v-text-field>
            <v-textarea
              label="الوصف"
              outlined
              :value="category.description"
              ref="catDescription"
              name="description"
              @change="onChnageDescription"
            >
            </v-textarea>
            <v-file-input
              outlined
              label="صورة القسم"
              prepend-icon=""
              prepend-inner-icon="mdi-camera"
              v-model="newCategory.thumbnail"
            ></v-file-input>
          </v-form>
        </v-col>
        <v-col cols="12" md="6">
          <v-list>
            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1">
                اسم القسم :
              </span>
              <span class="d-inline-block text-body-1">
                {{ this.category.name }}
              </span>
            </v-list-item>
            <v-list-item>
              <span class="d-inline-block font-weight-bold text-body-1">
                وصف القسم :
              </span>
              <span class="d-inline-block text-body-1">
                {{ this.category.description }}
              </span>
            </v-list-item>
            <v-list-item>
              <v-img
                :src="this.category.thumbnail"
                contain
                class="thumbnail-image"
              ></v-img>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn class="text-body-1" color="primary" @click="saveUpdateCategory()">
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
    category: Object,
  },
  data() {
    return {
      newCategory: {
        name: null,
        description: null,
        thumbnail: null,
      },
    };
  },
  methods: {
    resetNewCategory() {
      this.newCategory.name = null;
      this.newCategory.description = null;
      this.newCategory.thumbnail = null;
    },
    onChangeName(val) {
      if (this.$refs.catName.$attrs.name === "name") {
        this.newCategory.name = val;
      }
    },
    onChnageDescription(val) {
      if (this.$refs.catDescription.$attrs.name === "description") {
        this.newCategory.description = val;
      }
    },
    async saveUpdateCategory() {
      try {
        let bodyFormData = new FormData();
        if (
          this.newCategory.name &&
          this.newCategory.name !== this.category.name
        ) {
          bodyFormData.append("name", this.newCategory.name);
        }
        if (
          this.newCategory.description &&
          this.newCategory.description !== this.category.description
        ) {
          bodyFormData.append("description", this.newCategory.description);
        }
        if (this.newCategory.thumbnail) {
          bodyFormData.append("thumbnail", this.newCategory.thumbnail);
        }
        let result = await this.$axios({
          method: "PATCH",
          url: `api/dashboard/category/${this.category.id}/edit`,
          data: bodyFormData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (result.status === 200) {
          this.$emit("success", result.data);
          this.resetNewCategory();
        }
      } catch (error) {
        this.$emit("failed", error.response.data.message);
        this.resetNewCategory();
      }
    },

    close() {
      this.$emit("close");
      this.resetNewCategory();
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