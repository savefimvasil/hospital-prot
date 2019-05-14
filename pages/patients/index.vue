<template>
  <v-container bg fill-height grid-list-md text-xs-center class="flex">
    <v-layout row wrap align-end class="center">
      <v-flex
        xs12
        md6
        offset-md3
      >
        <h1>Список Пацієнтів</h1>
      </v-flex>

      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.secondName }}</td>
          <td class="text-xs-left">{{ props.item.firstName }}</td>
          <td class="text-xs-left">{{ props.item.birthDate }}</td>
          <td class="text-xs-left">{{ props.item.gender }}</td>
          <td class="text-xs-left"><v-btn :to="'/diseases/' + props.item._id" flat small primary>Історія захворювань</v-btn></td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>

      <!--sd------------------------------------------------------------------------------------------------>
      <div v-if="dialog">
        <edit-user @input="closeDialog" :editedData="desserts[editedIndex]" />
      </div>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import EditUser from "../../components/user/EditUser";
  import {crypto} from "../../static/encrypt";

  export default {
    components: {EditUser},
    data: () => ({
      dialog: false,
      cryptos: null,
      headers: [
        { text: 'Прізвище', value: 'secondName' },
        { text: "Ім'я", value: 'firstName' },
        { text: 'Дата народження', value: 'birthDate' },
        { text: 'Пол', value: 'gender' },
        { text: 'Історія захворювань', value: '' }
      ],
      desserts: [],
      editedIndex: -1
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      userInfo() {
        return this.$store.state.user.userInfo
      },
    },

    mounted () {
      this.initialize()
    },

    methods: {
      async initialize () {
        if (this.userInfo.status === '3') {
          let url = `http://localhost:4000/patient`
          await axios.get(url).then(async res => {
            this.desserts = res.data
            for (let key in this.desserts) {
              await axios.get(`http://localhost:4000/crypto/${this.desserts[key]._id}`).then(async res => {
                this.cryptos = res.data[0]

                let firstName = await Promise.resolve(crypto(this.desserts[key].firstName, 2, this.cryptos.x, this.cryptos.y, this.cryptos.k, this.cryptos.alfa))
                let secondName = await Promise.resolve(crypto(this.desserts[key].secondName, 2, this.cryptos.x, this.cryptos.y, this.cryptos.k, this.cryptos.alfa))
                let password = await Promise.resolve(crypto(this.desserts[key].password, 2, this.cryptos.x, this.cryptos.y, this.cryptos.k, this.cryptos.alfa))
                let gender = await Promise.resolve(crypto(this.desserts[key].gender, 2, this.cryptos.x, this.cryptos.y, this.cryptos.k, this.cryptos.alfa))
                let birthDate = await Promise.resolve(crypto(this.desserts[key].birthDate, 2, this.cryptos.x, this.cryptos.y, this.cryptos.k, this.cryptos.alfa))
                let phone = await Promise.resolve(crypto(this.desserts[key].phone, 2, this.cryptos.x, this.cryptos.y, this.cryptos.k, this.cryptos.alfa))

                this.desserts[key].firstName = firstName
                this.desserts[key].secondName = secondName
                this.desserts[key].password = password
                this.desserts[key].gender = gender
                this.desserts[key].birthDate = birthDate
                this.desserts[key].phone = phone
              })
            }
          })
        } else {
          let url = `http://localhost:4000/patient/getUsersByDocId/${this.userInfo._id}`
          await axios.get(url).then(res => {
            this.desserts = res.data
          })
        }
      },

      closeDialog(payload) {
        this.dialog = payload
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.dialog = true
      },

      async deleteItem (item) {
        let url = `http://localhost:4000/patient/delete/${item._id}`
        await axios.delete(url).then(response => {
          console.log('success')
        });

        const index = this.desserts.indexOf(item)
        this.desserts.splice(index, 1)
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
