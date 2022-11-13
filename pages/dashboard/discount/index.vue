<template>
  <div class="discount">
    <v-row>
      <v-col cols="12">
        <v-card class="mb-0">
          <v-card-title class="font-weight-bold text-h5 teal white--text pa-5">
            <h1>كوبونات الخصم</h1>
            <!-- العلامات الموسومة -->
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-card class="pa-5">
      <v-card-title class="font-weight-bold text-h6">
        أضافة كوبون جديد
      </v-card-title>
      <v-row>
        <!-- Create New Tag Section Start -->
        <v-col cols="12" md="4">
          <v-form>
            <v-text-field
              label="رمز الكوبون"
              outlined
              v-model="coupon.code"
            ></v-text-field>
            <v-text-field
              label="قيمة الكوبون"
              outlined
              step="0.01"
              type="number"
              v-model="coupon.discount"
            ></v-text-field>
            <v-select
              v-model="coupon.discount_type"
              :hint="`${coupon.discount_type.text}, ${coupon.discount_type.abbr}`"
              :items="coupon_discount_type"
              item-text="text"
              item-value="abbr"
              label="نوع الخصم"
              outlined
            ></v-select>
            <!-- valid from date picker start -->
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="coupon.valid_from"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  outlined
                  v-model="coupon.valid_from"
                  label="تاريخ بداية صلاحية الكوبون"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="coupon.valid_from" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(coupon.valid_from)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
            <!-- valid from date picker end -->
            <!-- valid to date picker start -->
            <v-dialog
              ref="dialog1"
              v-model="modal1"
              :return-value.sync="coupon.valid_to"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  outlined
                  v-model="coupon.valid_to"
                  label="تاريخ انتهاء صلاحية الكوبون"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="coupon.valid_to" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal1 = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog1.save(coupon.valid_to)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
            <!-- valid to date picker end -->
            <v-btn
              color="primary"
              block
              x-large
              class="text-h6"
              @click="console.log('saved')"
            >
              حفظ الكوبون</v-btn
            >
          </v-form>
        </v-col>
        <!-- Create New Tag Section End -->
        <!-- Display Tag List Section Start -->
        <!-- <v-col cols="12" md="8">
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
        </v-col> -->
        <!-- Display Tag List Section End -->
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      modal: false,
      modal1: false,
      coupon_discount_type: [
        {
          text: "قيمة",
          abbr: "pr",
        },
        {
          text: "توصيل",
          abbr: "sh",
        },
      ],
      coupon: {
        code: "",
        discount: 0,
        discount_type: {
          text: "قيمة",
          abbr: "pr",
        },

        valid_from: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        valid_to: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },
    };
  },
};
</script>