<template>
  <v-form v-model="valid">
    <v-container bg fill-height grid-list-md text-xs-center class="flex">
      <v-layout row wrap align-end class="center">
        <v-flex
          xs12
          md6
          offset-md3
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Електронна адреса"
            required
          />
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Пароль"
            required
            type="password"
          />
          <v-btn :disabled="!valid" color="info" @click="loginUser">Увійти</v-btn>
          <nuxt-link to="/register">Зареєструватися</nuxt-link>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        valid: false,
        password: '',
        passwordRules: [
          v => !!v || 'Пароль не повинен бути пустим',
          v => v.length >= 8 || 'Пароль повинен складатися більш ніж з 8 символів',
          v => v.length <= 16 || 'Пароль повинен складатися менш ніж з 18 символів'
        ],
        email: '',
        emailRules: [
          v => !!v || 'Електрона адреса не повинна бути пустою',
          v => /.+@.+/.test(v) || 'Не вірний формат Електроної адреси'
        ]
      }
    },
    methods: {
      async loginUser() {
        let loginData = {
          email: this.email,
          password: this.password
        }
        await this.$store.dispatch('user/loginUser', loginData)
        this.$router.push('/')

      }
    }
  }
</script>

<style scoped>

</style>
