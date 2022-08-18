<template>
  <div class="breadcrumbs grey lighten-4">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-breadcrumbs :items="items" large class="pt-2 pb-2"></v-breadcrumbs>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  props: {
    items: Array,
  },
};
</script>