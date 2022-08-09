<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2">
      تعديل العلامة الموسومة ({{ this.tag.name }})
    </v-card-title>

    <v-card-text>
      <v-form class="mt-6">
        <v-text-field label="الاسم" outlined v-model="tag.name"></v-text-field>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="text-body-1" color="primary" @click="saveEditedTag">
        حفظ التعديل</v-btn
      >
      <v-btn color="error" @click="closeForm()"> غلق </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    tag: Object,
  },
  methods: {
    async saveEditedTag() {
      try {
        let result = await this.$axios.patch(
          `api/dashboard/tags/${this.tag.id}/edit`,
          {
            name: this.tag.name,
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