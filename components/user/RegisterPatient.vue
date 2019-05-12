<template>
  <v-form v-model="valid">
    <h2>Реєстрація пацієнта</h2>
    <v-text-field
      v-model="firstName"
      :rules="nameRules"
      label="Ім'я"
      required
    />
    <v-text-field
      v-model="secondName"
      :rules="nameRules"
      label="Прізвище"
      required
    />
    <v-radio-group v-model="gender" row>
      <v-radio label="Чоловічий" value="male"></v-radio>
      <v-radio label="Жіночий" value="female"></v-radio>
    </v-radio-group>
      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateFormatted"
            label="День Народження"
            persistent-hint
            prepend-icon="event"
            @blur="date = parseDate(dateFormatted)"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
      </v-menu>
      <v-select
        :items="doctorList[0]"
        v-model="doctor"
      ></v-select>
      {{doctor}}
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Електрона адреса"
        required
      />
      <v-text-field
        v-model="phone"
        :rules="phoneRules"
        label="Номер телефону"
        required
      />
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Пароль"
        type="password"
        required
      />
      <v-text-field
        v-model="confirmPassword"
        :rules="confirmPasswordRules"
        label="Повторіть пароль"
        type="password"
        required
      />
      <v-btn :disabled="!valid" color="info" :justify-end="true" @click="registerUser">Зареєструватися</v-btn>
      <nuxt-link to="/login">Увійти</nuxt-link>
  </v-form>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "RegisterPatient",
    data(vm) {
      return {
        menu1: false,
        valid: false,
        firstName: '',
        secondName: '',
        gender: 'male',
        nameRules: [
          v => !!v || 'Це поле не повинно бути пустим',
          v => v.length >= 2 || 'Введіть коректне значення',
          v => v.length <= 12 || 'Введіть коректне значення'
        ],
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        password: '',
        passwordRules: [
          v => !!v || 'Пароль не повинен бути пустим',
          v => v.length >= 8 || 'Пароль повинен складатися більш ніж з 8 символів',
          v => v.length <= 16 || 'Пароль повинен складатися менш ніж з 18 символів'
        ],
        confirmPassword: '',
        confirmPasswordRules: [
          v => !!v || 'Пароль не повинен бути пустим',
          v => v === this.password || 'Паролі повинні співпадати',
        ],
        email: '',
        emailRules: [
          v => !!v || 'Електрона адреса не повинна бути пустою',
          v => /.+@.+/.test(v) || 'Не вірний формат Електроної адреси'
        ],
        phone: '+380',
        phoneRules: [
          v => !!v || 'Номер телефону не повинен бути пустим',
          v => v.length === 13 || 'Введіть правильний номер телефону'
        ],
        doctorList: [[], []],
        doctor: ''
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },
    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      registerUser() {
        let ind = this.doctorList[0].indexOf(this.doctor)
        let userData = {
          status: 1,
          firstName: this.firstName,
          secondName: this.secondName,
          gender: this.gender,
          birthDate: this.dateFormatted,
          email: this.email,
          phone: this.phone,
          password: this.password,
          doctor: this.doctorList[1][ind]
        }
        this.$store.dispatch('user/registerUser', userData)
          .then(() => {
            this.$router.push('/')
          })
          .catch(error => {
            alert(error.message)
          })
      }
    },
    mounted() {
      let url = `http://localhost:4000/doctor`
      axios.get(url).then(res => {
        for(let key in res.data) {
          this.doctorList[0].push(res.data[key].firstName + ' ' + res.data[key].secondName)
          this.doctorList[1].push(res.data[key]._id)
        }
      })
    }
  }
</script>

<style scoped>
</style>
