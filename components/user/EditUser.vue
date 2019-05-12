<template>
  <v-dialog v-model="dialog" max-width="500px" v-if="dialog">
    <v-card>
      <v-card-title>
        <span class="headline">Редагування даних користувача и</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex>
              <v-text-field
                v-model="editedDataFirstName"
                :rules="nameRules"
                label="Ім'я"
                required
              />
              <v-text-field
                v-model="editedDataSecondName"
                :rules="nameRules"
                label="Прізвище"
                required
              />
              <v-radio-group v-model="editedDataGender" row>
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
                v-if="editedDataCategory"
                :items="items"
                v-model="editedDataCategory"
              ></v-select>
              <v-select
                v-if="editedDataProfession"
                :items="professions"
                v-model="editedDataProfession"
              ></v-select>
              <v-text-field
                v-model="editedDataEmail"
                :rules="emailRules"
                label="Електрона адреса"
                required
              />
              <v-text-field
                v-model="editedDataPhone"
                :rules="phoneRules"
                label="Номер телефону"
                required
              />
              <v-text-field
                v-model="editedDataPassword"
                :rules="passwordRules"
                label="Пароль"
                required
              />
              <v-text-field
                v-model="editedDataConfirmPassword"
                :rules="confirmPasswordRules"
                label="Повторіть пароль"
                required
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import axios from 'axios'
  import * as fb from 'firebase'
  export default {
    name: "EditUser",
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
      dialog() {
        if(this.dialog === false) {
          this.$emit('input', false)
        }
      }
    },
    props: ['editedData'],
    mounted() {
      this.dialog = true
      this.editedDataFirstName = this.editedData.firstName
      this.editedDataSecondName = this.editedData.secondName
      this.editedDataGender = this.editedData.gender
      this.editedDataBirthDate = this.editedData.dateFormatted
      this.editedDataEmail = this.editedData.email
      this.editedDataPhone = this.editedData.phone
      this.editedDataPassword = this.editedData.password
      this.editedDataProfession = this.editedData.profession
      this.editedDataCategory = this.editedData.category
    },
    methods: {
      close () {
        this.dialog = false
        this.$emit('input', false)
      },
      save () {
        let data = {
          firstName: this.editedDataFirstName,
          secondName: this.editedDataSecondName,
          gender: this.editedDataGender,
          birthDate: this.dateFormatted,
          email: this.editedDataEmail,
          phone: this.editedDataPhone,
          password: this.editedDataPassword,
          profession: this.editedDataProfession,
          category: this.editedDataCategory
        }
        if (this.editedData.status === '1') {
          let url = `http://localhost:4000/patient/update/${this.editedData._id}`
          axios.post(url, data).then(() => {
            this.$router.push('/')
          });
        }
        else {
          let url = `http://localhost:4000/doctor/update/${this.editedData._id}`
          axios.post(url, data).then(() => {
            this.$router.push('/')
          });
        }
        let user = fb.auth().currentUser;
        user.updatePassword(this.editedData.password).then(function() {
          console.log('success')
        }).catch(function(error) {
          console.log(error)
        });
        this.close()
        window.location.reload()
      },
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
    },
    data () {
      return {
        dialog: false,
        menu1: false,
        editedDataFirstName: '',
        editedDataSecondName: '',
        editedDataGender: '',
        editedDataBirthDate: '',
        editedDataCategory: '',
        editedDataProfession: '',
        editedDataEmail: '',
        editedDataPhone: '',
        editedDataPassword: '',
        editedDataConfirmPassword: '',
        editedData: null,
        items: ['Друга', 'Перша', 'Вища'],
        professions: [
          'Медична сестра',
          'Стоматолог',
          'Терапевт',
          'Психотерапевт',
          'Педиатр',
          'Офтальмолог',
          'Врач функциональной диагностики',
          'Невролог',
          'Отоларинголог',
          'Хирург',
          'Гинеколог'
        ],
        nameRules: [
          v => !!v || 'Це поле не повинно бути пустим',
          v => v.length >= 2 || 'Введіть коректне значення',
          v => v.length <= 12 || 'Введіть коректне значення'
        ],
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
        passwordRules: [
          v => !!v || 'Пароль не повинен бути пустим',
          v => v.length >= 8 || 'Пароль повинен складатися більш ніж з 8 символів',
          v => v.length <= 16 || 'Пароль повинен складатися менш ніж з 18 символів'
        ],
        confirmPasswordRules: [
          v => !!v || 'Пароль не повинен бути пустим',
          v => v === this.editedData.password || 'Паролі повинні співпадати',
        ],
        emailRules: [
          v => !!v || 'Електрона адреса не повинна бути пустою',
          v => /.+@.+/.test(v) || 'Не вірний формат Електроної адреси'
        ],
        phoneRules: [
          v => !!v || 'Номер телефону не повинен бути пустим',
          v => v.length === 13 || 'Введіть правильний номер телефону'
        ],
        confirmPassword: ''
      }
    }
  }
</script>

<style scoped>

</style>
