<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          v-if="userInfo.status === '1'"
          src="https://www.summahealth.org/-/media/images/patientvisitor/patient-visitor-guidelines.jpg?h=520&w=1920&la=en&hash=83D5817929549328FEBCA9C816F00BF1F73E2436"
          height="200px"
        >
        </v-img>
        <v-img
          v-else
          src="https://www.rd.com/wp-content/uploads/2017/09/02_doctor_Insider-Tips-to-Choosing-the-Best-Primary-Care-Doctor_519507367_Stokkete.jpg"
          height="200px"
        >
        </v-img>
        <v-card-title primary-title>
          <div>
            <div class="headline">Ім'я: {{userInfo.firstName}}</div>
            <div class="headline">Прізвище: {{userInfo.secondName}}</div>
            <br>
            <span class="black--text">{{userInfo.birthDate}} {{userInfo.gender === 'male' ? 'Чоловічий' : 'Жіночий'}}</span><br>
            <span class="black--text">Ваш Email: {{userInfo.email}}</span><br>
            <span class="black--text">Ваш телефон: {{userInfo.phone}}</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="setDialog" color="blue darken-1">Редагувати особисті дані</v-btn>
        </v-card-actions>
      </v-card>

        <div v-if="dialog === true">
          <edit-user @input="closeDialog" :editedData="userInfo"/>
        </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import EditUser from "../../components/user/EditUser";
  export default {
    name: "index",
    components: {EditUser},
    data(vm) {
      return {
        dialog: false
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.user.userInfo
      }
    },
    methods: {
      setDialog() {
        this.editedData = this.userInfo
        this.dialog = true
      },
      closeDialog(payload) {
        console.log(payload)
        this.dialog = payload
      }
    }
  }
</script>

<style scoped>

</style>
