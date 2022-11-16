<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-0">
          <v-card-title class="font-weight-bold text-h5 teal white--text pa-5">
            <h1>العلامات الموسومة</h1>
            <!-- العلامات الموسومة -->
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-card class="pa-5">
      <v-card-title class="font-weight-bold text-h6">
        أضافة علامة جديده
      </v-card-title>
      <v-row>
        <!-- Create New Tag Section Start -->
        <v-col cols="12" md="4">
          <v-form>
            <v-text-field
              label="الاسم"
              outlined
              v-model="tag.name"
            ></v-text-field>

            <v-btn
              color="primary"
              block
              x-large
              class="text-h6"
              @click="saveTag()"
            >
              حفظ العلامة الموسومة</v-btn
            >
          </v-form>
        </v-col>
        <!-- Create New Tag Section End -->
        <!-- Display Tag List Section Start -->
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="font-weight-bold text-h5 primary white--text">
              العلامات الموسومة
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
            <v-data-table :headers="headers" :items="tags" :search="search">
              <template v-slot:item.name="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.name }}
                </td>
              </template>
              <template v-slot:item.slug="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.slug }}
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
                  class="text-body-1 mb-1"
                  @click="editTag(item)"
                >
                  <v-icon small> mdi-pencil </v-icon>
                  تعديل
                </v-btn>
                <v-btn
                  color="error"
                  outlined
                  small
                  class="text-body-1 mb-1"
                  @click="deleteTag(item)"
                >
                  <v-icon small> mdi-delete </v-icon>
                  حذف
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <!-- Display Tag List Section End -->
      </v-row>
    </v-card>
    <!-- Edit Tag Section Start -->
    <v-dialog v-model="dialog" width="500">
      <EditTagForm
        :tag="editedTag"
        @close="close"
        @success="updateSuccess"
        @failed="updateFailed"
      />
    </v-dialog>
    <!-- Edit Tag Section End -->
  </v-container>
</template>

<script>
import EditTagForm from "~/components/dashboard/EditTagForm.vue";
import { mapActions } from "vuex";
export default {
  layout: "dashboard",
  // Fetch all Tag List
  async asyncData({ $axios }) {
    let fetchTags = await $axios.get("api/dashboard/tags");
    let tags = fetchTags.data;
    return { tags };
  },
  data() {
    return {
      search: "",
      tag: {
        name: "",
      },
      dialog: false,
      editedTagIndex: -1,
      editedTag: {
        name: null,
        id: -1,
      },
      headers: [
        {
          text: "اسم العلامة الموسومة",
          value: "name",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
        {
          text: "رابط العلامة الموسومة",
          value: "slug",
          class: "text-h6 font-weight-bold",
          align: "center",
        },
        {
          text: "تاريخ الانشاء",
          value: "updated_at",
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
    };
  },
  components: {
    EditTagForm,
  },
  methods: {
    ...mapActions(["snackbar"]),
    resetEditedTag() {
      this.editedTag.name = null;
      this.editedTag.id = -1;
      this.editedTagIndex = -1;
    },
    editTag(item) {
      this.editedTagIndex = this.tags.indexOf(item);
      this.editedTag.name = item.name;
      this.editedTag.id = item.id;
      this.dialog = true;
    },
    async saveTag() {
      try {
        let result = await this.$axios.post(
          "api/dashboard/tags/create",
          {
            name: this.tag.name,
          },
          {
            headers: {
              "Content-Type": "Application/json",
            },
          }
        );
        if (result.status === 201) {
          this.tags.push(result.data);
          this.tag.name = null;
          this.snackbar({
            status: true,
            color: "success",
            message: "تمت الاضافة بنجاح",
          });
        }
      } catch (error) {
        if (error.response.status === 400) {
          this.snackbar({
            status: true,
            color: "error",
            // message: error.response.data.name[0],
            message: Object.keys(error.response.data)
              .map((key) => `${key} = ${error.response.data[key]}`)
              .join("\n"),
          });
        }
      }
    },
    async deleteTag(item) {
      try {
        let result = await this.$axios.delete(
          `api/dashboard/tags/delete/${item.id}`,
          {
            headers: {
              "Content-Type": "Application/json",
            },
          }
        );
        if (result.status === 204) {
          this.tags = this.tags.filter((ele) => ele.id !== item.id);
          this.snackbar({
            status: true,
            color: "success",
            message: "تمت الحذف بنجاح",
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
      if (this.editedTagIndex > -1) {
        Object.assign(this.tags[this.editedTagIndex], val);
      }
      this.snackbar({
        status: true,
        color: "success",
        message: "تم التعديل بنجاح",
      });
      this.dialog = false;
      this.resetEditedTag();
    },
    updateFailed(val) {
      this.snackbar({
        status: true,
        color: "error",
        message: val,
      });
      this.dialog = false;
      this.resetEditedTag();
    },
    close() {
      this.resetEditedTag();
      this.dialog = false;
    },
  },
};
</script>