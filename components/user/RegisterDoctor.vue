<template>
  <div>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    />
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
    />
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
    />
    <v-btn :disabled="!valid" color="info" :justify-end="true">Success</v-btn>
    <nuxt-link to="/">Увійти</nuxt-link>
  </div>
</template>

<script>
    export default {
      name: "RegisterDoctor",
      data() {
        return {
          valid: false,
          password: '',
          passwordRules: [
            v => !!v || 'Password is required',
            v => v.length >= 8 || 'Password must contain more than 8 characters',
            v => v.length <= 16 || 'Name must be less than 16 characters'
          ],
          email: '',
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
          ]
        }
      }
    }
</script>

<style scoped>

</style>
