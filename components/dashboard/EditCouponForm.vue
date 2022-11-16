<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2">
      تعديل كوبون الخصم ({{ coupon.code }})
    </v-card-title>

    <v-card-text>
      <v-form class="mt-6">
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
            <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
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
            <v-btn text color="primary" @click="modal1 = false"> Cancel </v-btn>
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
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="text-body-1" color="primary" @click="saveEditedCoupon()">
        حفظ التعديل</v-btn
      >
      <v-btn color="error" @click="closeForm()"> غلق </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    coupon: Object,
  },
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
    };
  },
  methods: {
    async saveEditedCoupon() {
      try {
        let result = await this.$axios.put(
          `api/dashboard/coupon/${this.coupon.id}/update`,
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
        if (result.status === 200) this.$emit("success", result.data);
      } catch (error) {
        this.$emit("failed", error.response.data.message);
      }
    },
    closeForm() {
      this.$emit("close");
    },
  },
};
</script>