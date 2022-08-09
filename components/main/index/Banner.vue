<template>
  <div id="banner">
    <v-container>
      <v-row>
        <v-col cols="12" md="6" align="center">
          <img src="images/2.jpg" width="100%" height="100%" />
        </v-col>
        <v-col cols="12" md="6">
          <h1 class="text-h1 mb-10 mt-5">عنوان رئيسي</h1>
          <p class="text-body-1 mb-10">
            هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
            القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
            الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي
            توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى
            نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء.
          </p>
          <v-btn
            color="purple lighten-2"
            class="font-weight-bold white--text"
            x-large
          >
            أبدأ بالتسوق
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
#banner {
  position: relative;
  background-color: #a6f3ed;
}
</style>