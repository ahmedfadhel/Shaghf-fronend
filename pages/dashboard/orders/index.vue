<template>
  <div class="orders">
    <v-container>
      <v-row class="px-5">
        <v-col md="6">
          <h1>الطلبات</h1>
        </v-col>
        <v-col md="6" class="text-left">
          <v-btn color="primary" class="text-h6" large> اضافة طلب جديد </v-btn>
        </v-col>
      </v-row>
      <v-card class="mt-5">
        <v-container>
          <v-row>
            <v-col cols="12">
              <client-only>
                <v-data-table
                  :headers="headers"
                  :items="allOrders"
                  :search="search"
                  :custom-filter="filterBaseOnOrderStatus"
                >
                  <template v-slot:top>
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-select
                          v-model="search"
                          :items="orderStatus"
                          item-text="text"
                          item-value="abbr"
                          label="حالة الطلب"
                          class="mx-4"
                          outlined
                        ></v-select>
                      </v-col>
                      <!-- Oreders Filter By date -->
                      <v-col cols="12" sm="4">
                        <v-menu
                          ref="dialog"
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              outlined
                              label="تاريخ الطلب"
                              prepend-inner-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              clearable
                              clear-icon="mdi-close-circle"
                            ></v-text-field>
                          </template>

                          <v-date-picker v-model="date" multiple>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-menu
                          ref="monDialog"
                          v-model="menu1"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="monDate"
                              outlined
                              label="بحث عن طريق الشهر"
                              prepend-inner-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              clearable
                              clear-icon="mdi-close-circle"
                            ></v-text-field>
                          </template>

                          <v-date-picker v-model="monDate" type="month">
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog.save(monDate)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </template>
                  <template v-slot:item.total="{ item }">
                    <td class="font-weight-bold text-center text-body-1">
                      {{ item | getTotalPrice }}
                      <sup>د.ع</sup>
                    </td>
                  </template>
                  <template v-slot:item.order_status="{ item }">
                    <td>
                      <v-chip :color="orderStatusClass(item.order_status)">
                        {{ item.order_status | getOrderStatusName }}</v-chip
                      >
                    </td>
                  </template>

                  <template v-slot:item.actions="{ item }">
                    <v-btn
                      color="primary"
                      outlined
                      small
                      class="text-body-1"
                      @click="editOrderStatus(item)"
                    >
                      <v-icon small> mdi-pencil </v-icon>
                      تعديل
                    </v-btn>
                    <v-btn
                      color="success"
                      outlined
                      small
                      class="text-body-1"
                      nuxt
                      :to="`orders/${item.ref_code}/view`"
                    >
                      <v-icon small> mdi-eye </v-icon>
                      عرض الطلب
                    </v-btn>
                  </template>
                </v-data-table>
              </client-only>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <!-- Edit Order Dialog section Start -->
      <v-dialog
        v-model="updateOrderStatusDialog"
        width="500px"
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-2 mb-5">
            تعديل حالة الطلب ({{ currentOrderStatus.ref_code }})
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-select
                outlined
                :items="orderStatus"
                label="حالة الطلب"
                item-text="text"
                item-value="abbr"
                v-model="currentOrderStatus.order_status"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" class="text-body-1" @click="updateOrder()"
              >حفظ التعديل
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="text-body-1"
              outlined
              text
              @click="updateOrderStatusDialog = false"
              >غلق
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Edit Order Dialog section Endf -->
    </v-container>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  layout: "dashboard",
  async asyncData({ $axios }) {
    let orderRes = await $axios.get("api/dashboard/orders");
    return {
      orders: orderRes.data,
    };
  },
  data() {
    return {
      updateOrderStatusDialog: false,
      menu2: false,
      menu1: false,
      // monDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      //   .toISOString()
      //   .substr(0, 10),
      monDate: "",
      // date: [
      //   new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      //     .toISOString()
      //     .substr(0, 10),
      // ],
      date: [],
      search: "",
      currentOrderStatus: {
        ref_code: null,
        order_status: null,
        index: -1,
      },

      orderStatus: [
        {
          text: "كل الطلبات",
          abbr: "all",
        },
        {
          text: "تم استلام الطلب",
          abbr: "re",
        },
        {
          text: "تم تجهيز الطلب",
          abbr: "pre",
        },
        {
          text: "تم شحن الطلب",
          abbr: "sh",
        },
        {
          text: "تم تسليم الطلب",
          abbr: "de",
        },
      ],
      headers: [
        {
          text: "الاسم",
          value: "shipping.name",
          class: "font-weight-bold text-h6",
          align: "center",
          cellClass: "font-weight-bold text-body-1",
        },
        {
          text: "رقم الطلب",
          value: "ref_code",
          class: "font-weight-bold text-h6",
          align: "center",
          cellClass: "font-weight-bold text-body-1",
        },
        {
          text: "رقم الهاتف",
          value: "shipping.phone",
          class: "font-weight-bold text-h6",
          align: "center",
          cellClass: "font-weight-bold text-body-1",
        },
        {
          text: "قيمة الطلب",
          value: "total",
          class: "font-weight-bold text-h6",
          align: "center",
          cellClass: "font-weight-bold text-body-1",
        },
        {
          text: "حالة الطلب",
          value: "order_status",
          class: "font-weight-bold text-h6 ",
          cellClass: "font-weight-bold text-body-1",

          align: "center",
        },
        {
          text: "التاريخ",
          value: "created_at",
          class: "font-weight-bold text-h6",
          align: "center",
          cellClass: "font-weight-bold text-body-1",
        },
        {
          text: "العمليات",
          value: "actions",
          class: "font-weight-bold text-h6",
          align: "center",
          cellClass: "font-weight-bold text-body-1",
        },
      ],
    };
  },
  computed: {
    allOrders() {
      let conditions = [];
      if (this.date && this.date.length) {
        this.monDate = null;
        return this.orders.filter((ele) => this.date.includes(ele.created_at));
      }
      if (this.monDate) {
        this.date = null;
        return this.orders.filter((ele) =>
          ele.created_at.includes(this.monDate)
        );
      }

      return this.orders;
    },
  },
  filters: {
    getTotalPrice(val) {
      let total = val.items.reduce((a, b) => {
        return a + b.price * b.qty;
      }, 0);
      let shippingCost = val.shipping.gover === "بغداد" ? 5000 : 8000;
      return (total + shippingCost)
        .toString()
        .slice(0, -3)
        .concat("000")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getOrderStatusName(val) {
      switch (val) {
        case "de":
          return "تم تسليم الطلب";
          break;
        case "pre":
          return "تم تجهيز الطلب";
          break;
        case "sh":
          return "تم شحن الطلب";
          break;

        default:
          return "تم استلام الطلب";
      }
    },
  },
  methods: {
    ...mapActions(["snackbar"]),

    filterBaseOnOrderStatus(value, search, item) {
      return (value != null &&
        search != null &&
        item.order_status === search) ||
        (value != null && search != null && search === "all")
        ? item
        : "";
    },

    editOrderStatus(item) {
      this.updateOrderStatusDialog = true;
      this.currentOrderStatus.index = this.orders.findIndex(
        (ele) => ele.id === item.id
      );
      this.currentOrderStatus.order_status = item.order_status;
      this.currentOrderStatus.ref_code = item.ref_code;
    },

    resetCurrentOrderStatus() {
      this.updateOrderStatusDialog = false;
      this.currentOrderStatus.ref_code = null;
      this.currentOrderStatus.order_status = null;
      this.currentOrderStatus.index = null;
    },
    async updateOrder() {
      let res = await this.$axios({
        method: "post",
        url: "api/dashboard/orders/update-order",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          order_status: this.currentOrderStatus.order_status,
          order_ref: this.currentOrderStatus.ref_code,
        },
      });
      Object.assign(this.orders[this.currentOrderStatus.index], res.data);
      this.snackbar({
        message: "تم تعديل حالة الطلب بنجاح",
        color: "success",
        status: true,
      });
      this.resetCurrentOrderStatus();
    },
    orderStatusClass(val) {
      switch (val) {
        case "de":
          return "success";
          break;
        case "pre":
          return "orange";
          break;
        case "sh":
          return "yellow";
          break;

        default:
          return "error";
      }
    },
  },
};
</script>
