<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>

        <!--<v-list-tile-->
          <!--v-for="(item, i) in items"-->
          <!--:key="i"-->
          <!--:to="item.to"-->
          <!--router-->
          <!--exact-->
        <!--&gt;-->
          <!--<v-list-tile-content>-->
            <!--<v-list-tile-title v-text="item.title" />-->
          <!--</v-list-tile-content>-->
        <!--</v-list-tile>-->

        <v-list-tile
        v-if="!user"
        to="/login"
        router
        exact
      >
        <v-list-tile-content>
          <v-list-tile-title v-text="'Увійти'" />
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-else
        @click="logout"
        router
        exact
      >
        <v-list-tile-content>
          <v-list-tile-title v-text="'Вийти'" />
        </v-list-tile-content>
      </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-spacer />
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user
    }
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      // items: [
      //   {
      //     icon: 'apps',
      //     title: 'Welcome',
      //     to: '/'
      //   },
      //   {
      //     icon: 'bubble_chart',
      //     title: 'Inspire',
      //     to: '/login'
      //   }
      // ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('user/logOutUser')
      this.$router.push('/login')
    }
  }
}
</script>
