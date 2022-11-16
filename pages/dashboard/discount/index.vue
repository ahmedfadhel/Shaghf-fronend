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
              @click="saveCoupon()"
            >
              حفظ الكوبون</v-btn
            >
          </v-form>
        </v-col>
        <!-- Create New Tag Section End -->
        <!-- Display Tag List Section Start -->
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="font-weight-bold text-h5 primary white--text">
              الكوبونات
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
            <v-data-table :headers="headers" :items="coupons" :search="search">
              <template v-slot:item.code="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.code }}
                </td>
              </template>
              <template v-slot:item.discount_type="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.discount_type | discountTypeFilter }}
                </td>
              </template>
              <template v-slot:item.valid_from="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.valid_from }}
                </td>
              </template>
              <template v-slot:item.valid_to="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.valid_to }}
                </td>
              </template>
              <template v-slot:item.is_active="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  <!-- {{ item.is_active || isActiveFilter}} -->
                  <v-chip color="success" v-if="item.is_active">صالح</v-chip>
                  <v-chip color="error" v-else>غير صالح</v-chip>
                </td>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn
                  color="primary"
                  outlined
                  small
                  class="text-body-1 mb-1"
                  @click="editCoupon(item)"
                >
                  <v-icon small> mdi-pencil </v-icon>
                  تعديل
                </v-btn>
                <v-btn
                  color="error"
                  outlined
                  small
                  class="text-body-1 mb-1"
                  @click="deleteCoupon(item.id)"
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
    <!-- Edit Coupon Section Start -->

    <v-dialog v-model="dialog" width="500">
      <EditCouponForm
        :coupon="editedCoupon"
        @close="close"
        @success="updateSuccess"
        @failed="updateFailed"
      />
    </v-dialog>
    <!-- Edit Coupon Section End -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import EditCouponForm from "~/components/dashboard/EditCouponForm.vue";
export default {
  layout: "dashboard",
  async asyncData({ $axios }) {
    let fetchCoupons = await $axios.get("api/dashboard/coupons");
    let coupons = fetchCoupons.data;
    return { coupons };
  },
  components: {
    EditCouponForm,
  },
  data() {
    return {
      modal: false,
      modal1: false,
      dialog: false,
      search: "",
      editedCoupon: {
        id: -1,
        code: null,
        discount: null,
        discount_type: null,
        valid_from: null,
        valid_to: null,
      },
      editedCouponIndex: -1,
      headers: [
        {
          text: "كوبون الخصم",
          value: "code",
          class: "text-body-1  font-weight-bold",
          align: "center",
        },
        {
          text: "قيمة الخصم",
          value: "discount",
          class: "text-body-1  font-weight-bold",
          align: "center",
        },
        {
          text: "نوع الكوبون",
          value: "discount_type",
          class: "text-body-1  font-weight-bold",
          align: "center",
        },
        {
          text: " بدأ الكوبون",
          value: "valid_from",
          class: "text-body-1 font-weight-bold",
          align: "center",
        },
        {
          text: " انتهاء الكوبون",
          value: "valid_to",
          class: "text-body-1  font-weight-bold",
          align: "center",
        },
        {
          text: "حالة الكوبون",
          value: "is_active",
          class: "text-body-1  font-weight-bold",
          align: "center",
        },
        {
          text: "التحكم",
          value: "actions",
          class: "text-body-1  font-weight-bold",
          align: "center",
        },
      ],
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
        discount_type: "pr",

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
  methods: {
    ...mapActions(["snackbar"]),
    async saveCoupon() {
      try {
        let result = await this.$axios.post(
          "api/dashboard/coupon/create",
          {
            code: this.coupon.code,
            discount: this.coupon.discount,
            discount_type: this.coupon.discount_type,
            valid_from: this.coupon.valid_from,
            valid_to: this.coupon.valid_to,
          },
          {
            headers: {
              "Content-Type": "Application/json",
            },
          }
        );
        if (result.status === 200) {
          this.coupons.push(result.data);
          this.snackbar({
            status: true,
            color: "success",
            message: "تمت الاضافة بنجاح",
          });
          this.restCoupon();
        }
      } catch (error) {
        if (error.response.status === 400) {
          this.snackbar({
            status: true,
            color: "error",
            message: Object.keys(error.response.data)
              .map((key) => `${key}=${error.response.data[key]}`)
              .join("\n"),
          });
        }
      }
    },
    resetEditedCoupon() {
      this.editedCoupon.id = -1;
      this.editedCoupon.discount = null;
      this.editedCoupon.discount_type = null;
      this.editedCoupon.valid_from = null;
      this.editedCoupon.valid_to = null;
    },
    editCoupon(item) {
      this.editedCouponIndex = this.coupons.indexOf(item);
      this.editedCoupon.id = item.id;
      this.editedCoupon.code = item.code;
      this.editedCoupon.discount = item.discount;
      this.editedCoupon.discount_type = item.discount_type;
      this.editedCoupon.valid_from = item.valid_from;
      this.editedCoupon.valid_to = item.valid_to;
      this.dialog = true;
    },
    async deleteCoupon(id) {
      try {
        let result = await this.$axios.delete(
          `api/dashboard/coupon/${id}/delete`,
          {
            headers: {
              "Content-Type": "Application/json",
            },
          }
        );
        if (result.status === 204) {
          this.coupons = this.coupons.filter((ele) => ele.id !== id);
          this.snackbar({
            status: true,
            color: "success",
            message: "تمت الحذف بنجاح",
          });
        }
      } catch (error) {
        this.snackbar({
          status: true,
          color: "error",
          message: Object.keys(error.response.data)
            .map((key) => `${key} : ${error.response.data[key]}`)
            .join("\n"),
        });
      }
    },
    restCoupon() {
      this.coupon.code = "";
      this.coupon.discount = 0;
      this.coupon.discount_type = "pr";
      this.coupon.valid_from = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);

      this.coupon.valid_to = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
    },
    updateSuccess(val) {
      if (this.editedCouponIndex > -1) {
        Object.assign(this.coupons[this.editedCouponIndex], val);
      }
      this.snackbar({
        status: true,
        color: "success",
        message: "تم التعديل بنجاح",
      });
      this.dialog = false;
      this.resetEditedCoupon();
    },
    updateFailed(val) {
      this.snackbar({
        status: true,
        color: "error",
        message: val,
      });
      this.dialog = false;
      this.resetEditedCoupon();
    },
    close() {
      this.resetEditedCoupon();
      this.dialog = false;
    },
  },
  filters: {
    discountTypeFilter(val) {
      return val === "pr" ? "خصم قيمة" : "خصم التوصيل";
    },
  },
};
</script>