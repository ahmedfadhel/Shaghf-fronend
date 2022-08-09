<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="d-flex align-center pa-5" max-width="100%">
          <v-avatar
            color="primary lighten-2 d-flex flex-column justify-center align-content-center"
            size="56"
          >
            <v-icon class="white--text"> mdi-currency-usd </v-icon>
          </v-avatar>
          <div class="d-flex flex-column mr-4 align-center justify-center">
            <h2 class="black--text align-content-center">المبيعات الكلية</h2>
            <p class="text-subtitle-1">
              {{ sales | addNumberComma }} <sup>د.ع</sup>
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="d-flex align-center pa-5" max-width="100%">
          <v-avatar
            color="success lighten-2 d-flex flex-column justify-center align-content-center"
            size="56"
          >
            <v-icon class="white--text"> mdi-truck </v-icon>
          </v-avatar>
          <div class="d-flex flex-column mr-4 align-center justify-center">
            <h2 class="black--text align-content-center">الطلبات الكلية</h2>
            <p class="text-subtitle-1">
              {{ totalOrders }}
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="d-flex align-center pa-5" max-width="100%">
          <v-avatar
            color="orange lighten-2 d-flex flex-column justify-center align-content-center"
            size="56"
          >
            <v-icon class="white--text"> mdi-basket </v-icon>
          </v-avatar>
          <div class="d-flex flex-column mr-4 align-center justify-center">
            <h2 class="black--text align-content-center">المنتجات الكلية</h2>
            <p class="text-subtitle-1">
              {{ products }}
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title
            class="font-weight-bold text-h5 blue lighten-3 white--text"
            >إحصاءات المبيعات</v-card-title
          >
          <v-divider></v-divider>
          <LineChart :chartData="chartData" :options="options" :height="200" />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title
            class="font-weight-bold text-h5 blue lighten-3 white--text"
          >
            الطلبات
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            :item-class="itemClasses"
            :headers="headers"
            :items="orders"
            :items-per-page="5"
            class="elevation-1"
            :footer-props="{
              'items-per-page-text': 'عدد الطلبات بالصفحة الواحدة',
            }"
          >
            <template v-slot:item.name="{ item }">
              <td class="font-weight-bold text-center text-body-1">
                {{ item.name }}
              </td>
            </template>
            <template v-slot:item.phone="{ item }">
              <td class="font-weight-bold text-center text-body-1">
                {{ item.phone }}
              </td>
            </template>
            <template v-slot:item.total="{ item }">
              <td class="font-weight-bold text-center text-body-1">
                {{ item.total }}
              </td>
            </template>
            <template v-slot:item.status="{ item }">
              <td class="font-weight-bold text-center text-body-1">
                {{ item.status }}
              </td>
            </template>
            <template v-slot:item.date="{ item }">
              <td class="font-weight-bold text-center text-body-1">
                {{ item.date }}
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LineChart from "~/components/dashboard/index/LineChart.vue";
export default {
  layout: "dashboard",
  components: {
    LineChart,
  },
  data() {
    return {
      sales: 12000,
      totalOrders: 100,
      products: 60,
      chartData: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "المبيعات",
            data: [10, 5, 10, 40, 12, 52, 32, 23, 56, 76, 11, 12],
          },
        ],
      },
      options: {
        mantainAspectRatio: false,
        responsive: true,
        height: 100,
      },
      headers: [
        {
          text: "أسم العميل",
          align: "center",
          sortable: false,
          value: "name",
          class: "text-h6 font-weight-bold",
        },
        {
          text: "رقم الهاتف",
          value: "phone",
          align: "center",
          class: "text-h6 font-weight-bold",
        },
        {
          text: "قيمة الطلب",
          value: "total",
          align: "center",
          class: "text-h6 font-weight-bold",
        },
        {
          text: "حالة الطلب",
          value: "status",
          align: "center",
          class: "text-h6 font-weight-bold",
        },
        {
          text: "تاريخ الطلبية",
          value: "date",
          align: "center",
          class: "text-h6 font-weight-bold",
        },
      ],
      orders: [
        {
          name: "أحمد رياض",
          phone: 159,
          total: 6.0,
          status: "تم التسليم",
          date: "2022-06-01",
        },
      ],
    };
  },
  filters: {
    addNumberComma: function (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  methods: {
    itemClasses(item) {
      return "item-font-size";
    },
  },
};
</script>

<style lang="scss" scoped>
.card-test {
  position: relative;
}
.line-chart {
  max-height: 10px;
}
</style>
