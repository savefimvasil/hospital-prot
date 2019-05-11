<template>
  <v-container bg fill-height grid-list-md text-xs-center class="flex">
    <v-layout row wrap align-end class="center">
      <v-flex
        xs12
        md6
        offset-md3
      >
        <RegisterDoctor />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import RegisterDoctor from "../../components/user/RegisterDoctor";
    export default {
        name: "add",
      components: {RegisterDoctor}
    }
</script>

<style scoped>

</style>
