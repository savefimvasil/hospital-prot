<template>
  <v-container bg fill-height grid-list-md text-xs-center class="flex">
    <v-layout row wrap align-end class="center">
      <v-flex
        xs12
        md6
        offset-md3
      >
        <h1>Редагування штату співробітників</h1>
        <v-btn class="w-100" to="/staff/add" color="normal">Додати лікаря</v-btn>
      </v-flex>

      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.secondName }}</td>
          <td class="text-xs-left">{{ props.item.firstName }}</td>
          <td class="text-xs-left">{{ props.item.birthDate }}</td>
          <td class="text-xs-left">{{ props.item.gender }}</td>
          <td class="text-xs-left">{{ props.item.profession }}</td>
          <td class="text-xs-left">{{ props.item.category }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
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
  export default {
    components: {EditUser},
    data: () => ({
      dialog: false,
      headers: [
        { text: 'Прізвище', value: 'secondName' },
        { text: "Ім'я", value: 'firstName' },
        { text: 'Дата народження', value: 'birthDate' },
        { text: 'Пол', value: 'gender' },
        { text: 'Профессія', value: 'profession' },
        { text: 'Категорія', value: 'category' },
        { text: 'Дії', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
        let url = `http://localhost:4000/doctor`
        await axios.get(url).then(res => {
          this.desserts = res.data
        })
      },
      closeDialog(payload) {
        console.log(payload)
        this.dialog = payload
      },
      editItem (item) {
        console.log(item)
        this.editedIndex = this.desserts.indexOf(item)
        this.dialog = true
      },

      async deleteItem (item) {
        let url = `http://localhost:4000/doctor/delete/${item._id}`
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
