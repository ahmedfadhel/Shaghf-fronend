<template>
  <v-container>
    <v-row class="mb-5">
      <v-col cols="12">
        <h1>التعليقات و التقيمات</h1>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title class="text-h4 pr-5"> التعليقات </v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-data-table :headers="headers" :items="comments">
              <template v-slot:item.product="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.product }}
                </td>
              </template>
              <template v-slot:item.name="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.name }}
                </td>
              </template>
              <template v-slot:item.comment="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.comment }}
                </td>
              </template>

              <template v-slot:item.date="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.date }}
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
                  @click="editCategory(item)"
                >
                  <v-icon small> mdi-delete </v-icon>
                  حذف
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card class="mt-5">
      <v-card-title class="text-h4 pr-5"> التقيمات </v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-data-table :headers="ratingHeaders" :items="ratings">
              <template v-slot:item.product="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.product }}
                </td>
              </template>
              <template v-slot:item.name="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.name }}
                </td>
              </template>
              <template v-slot:item.rating="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  <v-rating
                    full-icon="mdi-star"
                    half-icon="mdi-star-half-full"
                    hover
                    half-increments
                    length="5"
                    :value="item.rating"
                    readonly
                    background-color="orange lighten-3"
                    color="orange"
                  ></v-rating>
                </td>
              </template>

              <template v-slot:item.date="{ item }">
                <td class="font-weight-bold text-center text-body-1">
                  {{ item.date }}
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
                  @click="editCategory(item)"
                >
                  <v-icon small> mdi-delete </v-icon>
                  حذف
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
export default {
  layout: "dashboard",
  data() {
    return {
      headers: [
        {
          text: "المنتج",
          value: "product",
          class: "font-weight-bold text-h6",
          align: "center",
        },
        {
          text: "اسم العميل",
          value: "name",
          class: "font-weight-bold text-h6",
          align: "center",
        },
        {
          text: "التعليق",
          value: "comment",
          class: "font-weight-bold text-h6",
          align: "center",
        },
        {
          text: "التاريخ",
          value: "date",
          class: "font-weight-bold text-h6",
          align: "center",
        },

        {
          text: "العمليات",
          value: "actions",
          class: "font-weight-bold text-h6",
          align: "center",
        },
      ],
      comments: [
        {
          product: "المنتج الاول",
          name: "اسم العميل الاول",
          phone: "07710029217",
          comment: "التعليق الاول",

          date: "20-10-2022",
        },
      ],
      ratingHeaders: [
        {
          text: "المنتج",
          value: "product",
          class: "font-weight-bold text-h6",
          align: "center",
        },
        {
          text: "اسم العميل",
          value: "name",
          class: "font-weight-bold text-h6",
          align: "center",
        },
        {
          text: "التقييم",
          value: "rating",
          class: "font-weight-bold text-h6",
          align: "center",
        },
        {
          text: "التاريخ",
          value: "date",
          class: "font-weight-bold text-h6",
          align: "center",
        },

        {
          text: "العمليات",
          value: "actions",
          class: "font-weight-bold text-h6",
          align: "center",
        },
      ],
      ratings: [
        {
          product: "المنتج الاول",
          name: "اسم العميل الاول",
          phone: "07710029217",
          rating: 2.5,

          date: "20-10-2022",
        },
      ],
    };
  },
};
</script>