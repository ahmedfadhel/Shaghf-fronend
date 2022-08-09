<template>
  <nav>
    <TopHeader />
    <v-divider></v-divider>
    <v-toolbar
      color="white"
      flat
      class="mt-0 pt-0"
      v-if="$vuetify.breakpoint.mdAndUp"
    >
      <v-container class="py-0 fill-height">
        <v-row>
          <v-col cols="12" align="center">
            <v-list dense>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                class="d-inline-block px-0"
              >
                <v-btn
                  v-if="item.to !== '/category'"
                  plain
                  x-large
                  class="text-h6 mr-1"
                  :to="item.to !== '/category' ? item.to : ''"
                  nuxt
                  active-class="primary--text"
                >
                  {{ item.title }}
                </v-btn>
                <v-menu bottom offset-y v-else>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      plain
                      x-large
                      class="text-h6 mr-1"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-chevron-down</v-icon>
                      {{ item.title }}
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      v-for="(cat, index) in categories"
                      :key="index"
                      nuxt
                      :to="`/category/${cat.slug}`"
                    >
                      <v-list-item-title>{{ cat.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>
  </nav>
</template>

<script>
import TopHeader from "~/components/main/TopHeader";
export default {
  async fetch() {
    let result = await this.$axios.get("api/store/category");
    this.categories = result.data;
  },
  components: {
    TopHeader,
  },
  data() {
    return {
      categories: [],
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          title: "الرئيسية",
          to: "/",
        },
        {
          title: "المتجر",
          to: "/store",
        },
        {
          title: "الاقسام",
          to: "/category",
        },
        {
          title: "الورشة التعليمة",
          to: "/courses",
        },
        {
          title: "ادوات المساعدة",
          to: "/helping-tools",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.v-btn:before {
  background-color: transparent;
}
</style>