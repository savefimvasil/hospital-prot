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

        <v-list-tile
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>

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
    },
    menuItems() {
      return this.$store.state.user.menuItems
    }
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
    }
  },
  methods: {
    logout(){
      this.$router.push('/login')
      this.$store.dispatch('user/logOutUser')
      window.location.reload();
    }
  }
}
</script>
