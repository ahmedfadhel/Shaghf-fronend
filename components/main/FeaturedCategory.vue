<template>
  <div id="main-categories" class="mt-10">
    <v-container>
      <v-row>
        <v-col cols="12" align="center">
          <h3 class="text-h3 cat-header">الاقسام</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-slide-group v-model="model" class="pa-4" show-arrows>
            <v-slide-item
              v-for="(cat, i) in categories"
              :key="i"
              v-slot="{ active, toggle }"
              class="mx-2"
            >
              <v-card
                height="400px"
                width="400px"
                nuxt
                :to="`/category/${cat.slug}`"
              >
                <v-img
                  :src="cat.thumbnail"
                  class="white--text align-end"
                  contain
                  width="100%"
                  height="100%"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                  <v-card-title
                    class="font-wight-bold text-h5 justify-center"
                    v-text="cat.name"
                  ></v-card-title>
                </v-img>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  props: {
    categories: Array,
  },
  data() {
    return {
      model: null,
    };
  },
};
</script>

<style lang="scss" scoped>
#main-categories {
  position: relative;
  // background-color: #f8f9fa !important;
  .cat-header:before {
    content: "";
    left: 50%;
    top: 0;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    position: absolute;
    width: 40px;
    height: 2px;
    background: #7971ea;
  }
}
</style>