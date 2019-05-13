<template>
  <v-container bg fill-height grid-list-md text-xs-center class="flex">
    <v-layout row wrap align-end class="center">
      <v-flex
        xs12
        md6
        offset-md3
      >
        <v-btn v-if="userData.status !== '1'" class="w-100" color="normal" @click="dialog = true">Додати запис у картку</v-btn>
      </v-flex>

      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.diagnosis }}</td>
          <td class="text-xs-left">{{ props.item.date }}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
          <td class="text-xs-left">{{ props.item.treatment }}</td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>

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
                    v-model="diagnosis"
                    :rules="nameRules"
                    label="Діагноз"
                    required
                  />
                  <v-text-field
                  v-model="description"
                  :rules="nameRules"
                  label="Опис"
                  required
                  />
                  <v-text-field
                    v-model="treatment"
                    :rules="nameRules"
                    label="Лікування"
                    required
                  />
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
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import * as fb from 'firebase'
  import { crypto } from '../../static/encrypt'
  export default {
    name: "EditUser",
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },
    computed: {
      userData() {
        return this.$store.state.user.userInfo
      }
    },
    methods: {
      close () {
        this.dialog = false
      },
      async save () {
        let diagnosis = await Promise.resolve(crypto(this.diagnosis, 1, this.crypto.x, this.crypto.y, this.crypto.k, this.crypto.alfa))
        let descr = await Promise.resolve(crypto(this.description, 1, this.crypto.x, this.crypto.y, this.crypto.k, this.crypto.alfa))
        let treatment = await Promise.resolve(crypto(this.treatment, 1, this.crypto.x, this.crypto.y, this.crypto.k, this.crypto.alfa))
        let date = await Promise.resolve(crypto(this.dateFormatted, 1, this.crypto.x, this.crypto.y, this.crypto.k, this.crypto.alfa))
        let data = {
          userId: this.$route.params.id,
          diagnosis: diagnosis.message,
          description: descr.message,
          treatment: treatment.message,
          date: date.message
        }
        let url = `http://localhost:4000/diseases/add`
        await axios.post(url, data).then(() => {
          console.log('success')
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
    async mounted() {
      await axios.get(`http://localhost:4000/crypto/${this.$route.params.id}`).then(res => {
        this.crypto = res.data[0]
      })
      let url = `http://localhost:4000/diseases/${this.$route.params.id}`
      await axios.get(url).then(async (response) => {
        this.desserts = response.data;
        for(let key in this.desserts) {
          this.desserts[key].diagnosis =
            await Promise.resolve(crypto(this.desserts[key].diagnosis, 2, this.crypto.x, this.crypto.y, this.crypto.k, this.crypto.alfa))
          this.desserts[key].description =
            await Promise.resolve(crypto(this.desserts[key].description, 2, this.crypto.x, this.crypto.y, this.crypto.k,  this.crypto.alfa))
          this.desserts[key].date =
            await Promise.resolve(crypto(this.desserts[key].date, 2, this.crypto.x, this.crypto.y, this.crypto.k,  this.crypto.alfa))
          this.desserts[key].treatment =
            await Promise.resolve(crypto(this.desserts[key].treatment, 2, this.crypto.x, this.crypto.y, this.crypto.k,  this.crypto.alfa))
        }
      });
    },
    data () {
      return {
        dialog: false,
        menu1: false,
        diagnosis: '',
        description: '',
        treatment: '',
        dateNew: '',
        nameRules: [
          v => !!v || 'Це поле не повинно бути пустим',
          v => v.length >= 2 || 'Введіть коректне значення',
          v => v.length <= 12 || 'Введіть коректне значення'
        ],
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
        headers: [
          { text: 'Діагноз', value: 'diagnoses' },
          { text: 'Дата', value: 'date' },
          { text: 'Опис', value: 'description' },
          { text: 'Лікування', value: 'treatment' },
        ],
        desserts: []
      }
    }
  }
</script>

<style scoped>
  .w-100 {
    width: 100%;
  }
  .elevation-1 {
    width: 100%;
  }
</style>



