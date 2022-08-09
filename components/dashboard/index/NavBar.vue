<template>
  <nav>
    <v-navigation-drawer v-model="drawer" app right>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 font-weight-bold">
            لوحة التحكم
          </v-list-item-title>
          <v-list-item-subtitle class="font-weight-bold">
            متجر شغف
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          color="red"
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- end navigation drawer section -->
    <!-- start nav bar section -->
    <v-app-bar app clipped-left>
      <!-- <Notifications /> -->
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="$vuetify.breakpoint.mdAndDown"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-weight-bold">متجر شغف</v-toolbar-title>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar v-bind="attrs" v-on="on">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </template>
        <v-list>
          <v-list-item color="red" class="log-out">
            <v-list-item-content>
              <v-list-item-title>تسجيل الخروج</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-home",
          title: "لوحة التحكم",
          to: "/dashboard",
        },
        {
          icon: "mdi-shopping",
          title: "المنتجات",
          to: "/dashboard/products",
        },
        {
          icon: "mdi-family-tree",
          title: "الاقسام",
          to: "/dashboard/category",
        },
        {
          icon: "mdi-tag-multiple",
          title: "العلامات",
          to: "/dashboard/tags",
        },
        {
          icon: "mdi-cart",
          title: "الطلبات",
          to: "/dashboard/orders",
        },
        {
          icon: "mdi-account",
          title: "الاعضاء",
          to: "/dashboard/accounts",
        },
        {
          icon: "mdi-comment",
          title: "المراجعات",
          to: "/dashboard/reviews",
        },
        {
          icon: "mdi-chart-pie",
          title: "الاحصائيات",
          to: "/dashboard/statistics",
        },
      ],
    };
  },
};
</script>