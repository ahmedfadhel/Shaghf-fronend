<template>
  <div class="follow-order">
    <CustomBreadcrumbs :items="items" class="mb-10" />
    <v-container>
      <v-form @submit.prevent="fetchOrders" ref="form" v-model="form">
        <v-row>
          <v-col cols="12" md="6" offset-md="3">
            <div class="d-flex">
              <v-btn x-large outlined color="primary" @click="fetchOrders">
                اطلب حالة الطلب
              </v-btn>
              <v-text-field
                :rules="[rules.required, rules.phone]"
                class="mr-4"
                label="رقم الهاتف"
                placeholder="07xx-xxx-xxxx"
                outlined
                clearable
                v-model="phone"
                @click:clear="clearPhone"
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
      </v-form>
      <v-row v-if="!getOrders.length">
        <v-col
          cols="12"
          v-if="!getOrders.length && empty"
          align="center"
          class="primary--text"
        >
          <h2 class="text-h5">رقم الهاتف الذي استخدمته ليس لدية طلبات</h2>
        </v-col>
        <v-col cols="12" align="center">
          <h1 class="text-h3">استخدم رقم هاتفك لمتابعة طلبك</h1>
          <v-btn color="primary" x-large nuxt to="/store" class="mt-5 text-h6">
            عد للتسوق
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" md="8" offset-md="2">
          <v-data-table
            :headers="headers"
            :items="getOrders"
            hide-default-footer
            disable-pagination
          >
            <template v-slot:item.order_status="{ item }">
              <v-chip
                :color="getOrderColorStatus(item.order_status)"
                text-color="black"
              >
                {{ item.order_status | getOrderName }}
              </v-chip>
              <span :class="getOrderColorStatus(item.order_status)"></span>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CustomBreadcrumbs from "~/components/main/CustomBreadcrumbs.vue";
import { mapActions } from "vuex";
export default {
  components: {
    CustomBreadcrumbs,
  },
  data() {
    return {
      form: true,
      phone: null,
      orders: [],
      empty: false,
      rules: {
        required: (value) => !!value || "* الحقل مطلوب",
        phone: (value) =>
          /^(((?:\+|00)964)|(0)*)7[5789]\d{8}$/gm.test(value) ||
          "* رقم الهاتف غير صحيح",
      },
      items: [
        {
          text: "الرئيسية",
          disabled: false,
          href: "/",
        },
        {
          text: "المتجر",
          disabled: false,
          href: "/store",
        },
        {
          text: "متابعة الطلب",
          disabled: true,
        },
      ],
      headers: [
        {
          text: "اسم العميل",
          align: "center",
          sortable: false,
          value: "shipping.name",
          class: "font-weight-bold text-h5",
          cellClass: "text-h6 ",
        },
        {
          text: "رقم الطلب",
          align: "center",
          sortable: false,
          value: "ref_code",
          class: "font-weight-bold text-h5",
          cellClass: "text-h6",
        },
        {
          text: "تاريخ الطلب",
          align: "center",
          sortable: false,
          value: "created_at",
          class: "font-weight-bold text-h5",
          cellClass: "text-h6",
        },
        {
          text: "حالة الطلب",
          align: "center",
          sortable: true,
          value: "order_status",
          class: "font-weight-bold text-h5",
          cellClass: "text-h6",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["snackbar"]),
    async fetchOrders() {
      if (this.$refs.form.validate()) {
        try {
          let result = await this.$axios({
            url: "api/orders/track-order",
            method: "POST",
            data: {
              phone: this.phone,
            },
            headers: {
              "Content-Type": "application/json",
            },
          });
          if ((result.status = 200) && result.data.length) {
            this.orders = [...result.data];
          } else {
            this.orders = [];
            this.empty = true;
          }
        } catch (error) {
          this.snackbar({
            status: true,
            color: "error",
            message: error.response.data,
          });
        }
      }
    },
    clearPhone() {
      this.$refs.form.resetValidation();
    },
    getOrderColorStatus(status) {
      switch (status) {
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
  computed: {
    getOrders() {
      return this.orders;
    },
  },
  filters: {
    getOrderName(status) {
      switch (status) {
        case "re":
          return "تم استلام الطلب";
          break;
        case "pre":
          return "تم تجهيز الطلب";
          break;
        case "sh":
          return "تم شحن الطلب";
          break;

        default:
          return "تم تسليم الطلب";
          break;
      }
    },
  },
};
</script>