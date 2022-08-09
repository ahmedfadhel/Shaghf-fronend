<template>
  <v-col cols="12" align="center" class="py-10">
    <img src="~/assets/images/no-item-found.jpg" alt="لا توجد منتجات" />
    <h3 class="my-2 text-h5">
      <!-- <strong></strong> -->
      لم يتم العثور على منتجات في هذا القسم
    </h3>

    <v-btn color="primary" class="text-h6 my-5" x-large nuxt to="/store">
      الاستمرار بالتسوق
    </v-btn>
  </v-col>
</template>