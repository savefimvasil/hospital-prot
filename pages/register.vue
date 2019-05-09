<template>
  <v-container bg fill-height grid-list-md text-xs-center class="flex">
    <v-layout row wrap align-end class="center">
      <v-flex
        xs12
        md6
        offset-md3
      >
        <RegisterPatient></RegisterPatient>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import RegisterPatient from '@/components/user/RegisterPatient'
  export default {
    name: "login",
    components: {
      RegisterPatient
    }
  }
</script>

<style scoped>

</style>
