<template>
  <v-layout row>
<!--    <v-flex xs12 sm6 offset-sm3>-->
<!--      <v-card>-->
<!--        <v-img-->
<!--          v-if="userInfo.status === '1'"-->
<!--          src="https://www.summahealth.org/-/media/images/patientvisitor/patient-visitor-guidelines.jpg?h=520&w=1920&la=en&hash=83D5817929549328FEBCA9C816F00BF1F73E2436"-->
<!--          height="200px"-->
<!--        >-->
<!--        </v-img>-->
<!--        <v-img-->
<!--          v-else-->
<!--          src="https://www.rd.com/wp-content/uploads/2017/09/02_doctor_Insider-Tips-to-Choosing-the-Best-Primary-Care-Doctor_519507367_Stokkete.jpg"-->
<!--          height="200px"-->
<!--        >-->
<!--        </v-img>-->
<!--        <v-card-title primary-title>-->
<!--          <div>-->
<!--            <div class="headline">Ім'я: {{userInfo.firstName}}</div>-->
<!--            <div class="headline">Прізвище: {{userInfo.secondName}}</div>-->
<!--            <br>-->
<!--            <span class="black&#45;&#45;text">{{userInfo.birthDate}} {{userInfo.gender === 'male' ? 'Чоловічий' : 'Жіночий'}}</span><br>-->
<!--            <span class="black&#45;&#45;text">Ваш Email: {{userInfo.email}}</span><br>-->
<!--            <span class="black&#45;&#45;text">Ваш телефон: {{userInfo.phone}}</span>-->
<!--          </div>-->
<!--        </v-card-title>-->
<!--        <v-card-actions>-->
<!--          <v-spacer></v-spacer>-->
<!--          <v-btn flat @click="setDialog" color="blue darken-1">Редагувати особисті дані</v-btn>-->
<!--        </v-card-actions>-->
<!--      </v-card>-->

<!--      <div v-if="dialog === true">-->
<!--        <edit-user @input="closeDialog" :editedData="userInfo"/>-->
<!--      </div>-->
<!--    </v-flex>-->
  </v-layout>
</template>

<script>
  import axios from 'axios'
  import EditUser from "../../components/user/EditUser";
  import {crypto} from '../../static/encrypt'

  export default {
    name: "index",
    components: {EditUser},
    async asyncData ({ route }) {
      let cryptos = await axios.get(`http://localhost:4000/crypto/${route.params.id}`)
      let userData = await axios.get(`http://localhost:4000/patient/findUserById/${route.params.id}`)

      console.log(cryptos, userData)
      //
      let firstName = await Promise.resolve(crypto(userData.data.firstName, 2, parseInt(cryptos.x), parseInt(cryptos.y), parseInt(cryptos.k), parseInt(cryptos.alfa)))
      // let secondName = await Promise.resolve(crypto(userData.data.secondName, 2, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      // let password = await Promise.resolve(crypto(userData.data.password, 2, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      // let gender = await Promise.resolve(crypto(userData.data.gender, 2, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      // let birthDate = await Promise.resolve(crypto(userData.data.birthDate, 2, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      // let phone = await Promise.resolve(crypto(userData.data.phone, 2, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      // let profession = await Promise.resolve(crypto(userData.data.profession, 2, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      // let category = await Promise.resolve(crypto(userData.data.category, 2, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      //
      console.log(firstName)
      // let info = {
      //   firstName, secondName, password, gender, birthDate, phone, profession, category
      // }
      // console.log(info)
      return { userInfo: userData, cryptos: cryptos.data }
    },
    data(vm) {
      return {
        dialog: false,
      }
    },
    methods: {
      setDialog() {
        this.editedData = this.userInfo
        this.dialog = true
      },
      closeDialog(payload) {
        this.dialog = payload
      }
    }
  }
</script>

<style scoped>
</style>
