<template>
  <v-container bg fill-height grid-list-md text-xs-center class="flex">
    <v-layout row wrap align-end class="center">
      <v-flex
        xs12
        md6
        offset-md3
      >
        <h1>Ласкаво просимо</h1>
        <h2>Оберіть пункт меню</h2>
        <v-btn v-for="item in menuItems" :key="item.title" class="w-100" :to="item.to" color="normal">{{item.title}}</v-btn>
        <v-btn v-if="userInfo.status === '1'" class="w-100" :to="'diseases/' + userInfo._id" color="normal">Захворювання</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'index',
  computed: {
    loading() {
      return this.$store.state.loading.loading
    },
    menuItems() {
      return this.$store.state.user.menuItems
    },
    userInfo() {
      return this.$store.state.user.userInfo
    }
  }
}
</script>

<style>
h1, h2, h3, h4, p {
  color: #616161;
}
h2{
  padding-bottom: 10px;
}
.w-100 {
  width: 100%;
}
</style>
