<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-0">
          <v-card-title class="font-weight-bold text-h5 teal white--text pa-5">
            <h1>الاقسام</h1>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-card class="pa-5">
      <v-row>
        <v-col cols="12" md="4">
          <v-form ref="createForm" v-model="createValid">
            <v-text-field
              label="الاسم"
              outlined
              v-model="category.name"
              :rules="[rules.required]"
            ></v-text-field>
            <v-textarea
              label="وصف القسم"
              outlined
              v-model="category.description"
              :rules="[rules.required]"
            ></v-textarea>
            <v-file-input
              label="صورة القسم"
              class="mt-3"
              outlined
              prepend-inner-icon="mdi-camera"
              prepend-icon=""
              v-model="category.thumbnail"
              :rules="[rules.required]"
            ></v-file-input>
            <v-btn
              color="primary"
              block
              x-large
              class="text-h6"
              @click="saveCategory()"
            >
              حفظ القسم</v-btn
            >
          </v-form>
        </v-col>
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="font-weight-bold text-h5 primary white--text">
              الاقسام
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
              :items="categories"
              :search="search"
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
              <template v-slot:item.name="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.name }}
                </td>
              </template>
              <template v-slot:item.description="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.description }}
                </td>
              </template>
              <template v-slot:item.slug="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.slug }}
                </td>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn
                  color="primary"
                  outlined
                  small
                  class="text-body-1"
                  @click="editCategory(item)"
                >
                  <v-icon small> mdi-pencil </v-icon>
                  تعديل
                </v-btn>
                <v-btn
                  color="error"
                  outlined
                  small
                  class="text-body-1"
                  @click="deleteCategory(item)"
                >
                  <v-icon small> mdi-delete </v-icon>
                  حذف
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="dialog" width="800">
      <EditCategoryForm
        :category="editCategoryItem"
        @close="close"
        @success="updateSuccess"
        @failed="updateFailed"
      />
    </v-dialog>
  </v-container>
</template>
<script>
import EditCategoryForm from "~/components/dashboard/EditCategoryForm.vue";
import { mapActions } from "vuex";
export default {
  layout: "dashboard",
  async asyncData({ $axios }) {
    let result = await $axios.get("api/dashboard/category");
    let categories = result.data;
    return { categories };
  },
  data() {
    return {
      createValid: true,
      dialog: false,
      search: "",
      category: {
        name: "",
        description: "",
        thumbnail: null,
      },
      editCategoryItem: {
        name: null,
        description: null,
      },
      editCategoryIndex: -1,
      headers: [
        {
          text: "صورة القسم",
          value: "thumbnail",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
        {
          text: "اسم القسم",
          value: "name",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
        {
          text: "وصف القسم",
          value: "description",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
        {
          text: "رابط القسم",
          value: "slug",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
        {
          text: "التحكم",
          value: "actions",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
      ],
      rules: {
        required: (value) => !!value || "* الحقل مطلوب",
      },
    };
  },
  components: {
    EditCategoryForm,
  },
  methods: {
    ...mapActions(["snackbar"]),

    async saveCategory() {
      if (this.$refs.createForm.validate()) {
        try {
          let bodyFormData = new FormData();
          bodyFormData.append("name", this.category.name);
          bodyFormData.append("description", this.category.description);
          bodyFormData.append("thumbnail", this.category.thumbnail);
          let result = await this.$axios({
            method: "post",
            url: "api/dashboard/category/create",
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (result.status === 201) {
            this.categories.unshift(result.data);
            this.snackbar({
              status: true,
              color: "success",
              message: "تمت الاضافة بنجاح",
            });
            this.category.name = "";
            this.category.description = "";
            this.category.thumbnail = null;
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
          }
        }
      }
    },
    editCategory(item) {
      this.editCategoryIndex = this.categories.indexOf(item);
      this.editCategoryItem = {
        id: item.id,
        name: item.name,
        description: item.description,
        thumbnail: item.thumbnail,
      };
      this.dialog = true;
    },
    // Delete Category method
    async deleteCategory(item) {
      try {
        let result = await this.$axios.delete(
          `api/dashboard/category/delete/${item.id}`,
          {
            headers: {
              "Content-Type": "Application/json",
            },
          }
        );
        if (result.status === 204) {
          this.categories = this.categories.filter((ele) => ele.id !== item.id);
          this.snackbar({
            status: true,
            color: "success",
            message: "تمت الازالة بنجاح",
          });
        }
      } catch (error) {
        if (error.response.status === 404) {
          this.snackbar({
            status: true,
            color: "error",
            message: error.response.data.message,
          });
        }
      }
    },
    updateSuccess(val) {
      if (this.editCategoryIndex > -1) {
        Object.assign(this.categories[this.editCategoryIndex], val);
        this.snackbar({
          status: true,
          color: "success",
          message: "تم التعديل بنجاح",
        });
      }
      this.dialog = false;
    },
    updateFailed(val) {
      this.snackbar({
        status: true,
        color: "error",
        message: val,
      });
      this.dialog = false;
    },
    // Close the dialog and reset variables
    close() {
      this.editCategoryIndex = -1;
      this.dialog = false;
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