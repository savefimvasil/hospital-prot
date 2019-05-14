import * as fb from 'firebase'
import { menuPatient, menuDoctor, menuAdmin } from '../../assets/menuPoints'
import axios from 'axios'
import { getY, getX, getP, getK, getG, getBits, getAlfa} from '../../static/cryptoConstants'

import {crypto} from '@/static/encrypt.js'

class User {
  constructor (id, status = 1, email, userInfo) {
    this.id = id
    this.status = status
    this.email = email
    this.userInfo = userInfo
  }
}

export default {
  async registerUser ({commit}, userData) {

    try {
      let url = 'http://localhost:4000/patient/add'
      let idU = ''
      await axios.post(url, userData).then(async (response) => {
        let url = 'http://localhost:4000/crypto/add'
        let p = getP()
        let g = getG()
        let x = getX(p)
        let y = getY(p, g, x)
        let k = getK(p)
        let alfa = getAlfa(k, g, p)
        let CryptoData = {
          id: response.data.business,
          x: x,
          y: y,
          k: k,
          alfa: alfa
        }

        idU = response.data.business
        await axios.post(url, CryptoData).then(() => {
          console.log('success')
        })
      });

      let data, cryptos
      await axios.get(`http://localhost:4000/patient/findUserById/${idU}`).then((res) => {
        data = res.data
      })
      await axios.get(`http://localhost:4000/crypto/${data._id}`).then(res => {
        cryptos = res.data[0]
      })

      let firstName = await Promise.resolve(crypto(data.firstName, 1, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      let secondName = await Promise.resolve(crypto(data.secondName, 1, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      let password = await Promise.resolve(crypto(data.password, 1, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      let gender = await Promise.resolve(crypto(data.gender, 1, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      let birthDate = await Promise.resolve(crypto(data.birthDate, 1, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      let phone = await Promise.resolve(crypto(data.phone, 1, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))

      axios.post(
        `http://localhost:4000/patient/update/${data._id}`,
        {
          firstName: firstName.message,
          secondName: secondName.message,
          password: password.message,
          gender: gender.message,
          birthDate: birthDate.message,
          phone: phone.message,
          email: data.email
        }).then(() => {
        console.log('success')
      });

      const user = await fb.auth().createUserWithEmailAndPassword(userData.email, userData.password)
      commit('setUser', new User(user.user.uid, 1, userData.email))

    } catch (error) {
      console.log(error)
      throw error
    }
  },
  async registerDoctor ({commit, dispatch, router}, userData) {
    let url = `http://localhost:4000/doctor/findUser/${userData.store.email}`
    let user
    let idU = ''

    await axios.get(url).then((response) => {
      user = response.data;
    });

    try {
      let url = 'http://localhost:4000/doctor/add'
      await axios.post(url, userData).then(async (response) => {
        let url = 'http://localhost:4000/crypto/add'
        let p = getP()
        let g = getG()
        let x = getX(p)
        let y = getY(p, g, x)
        let k = getK(p)
        let alfa = getAlfa(k, g, p)
        let CryptoData = {
          id: response.data.business,
          x: x,
          y: y,
          k: k,
          alfa: alfa
        }
        idU = response.data.business
        await axios.post(url, CryptoData).then(() => {
          console.log('success')
        })
      });

      let data, cryptos
      await axios.get(`http://localhost:4000/doctor/findUserById/${idU}`).then((res) => {
        data = res.data
      })
      await axios.get(`http://localhost:4000/crypto/${data._id}`).then(res => {
        cryptos = res.data[0]
      })

      let firstName = await Promise.resolve(crypto(data.firstName, 1, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      let secondName = await Promise.resolve(crypto(data.secondName, 1, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      let password = await Promise.resolve(crypto(data.password, 1, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      let gender = await Promise.resolve(crypto(data.gender, 1, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      let birthDate = await Promise.resolve(crypto(data.birthDate, 1, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      let phone = await Promise.resolve(crypto(data.phone, 1, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      let profession = await Promise.resolve(crypto(data.profession, 1, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))
      let category = await Promise.resolve(crypto(data.category, 1, cryptos.x, cryptos.y, cryptos.k, cryptos.alfa))

      axios.post(
        `http://localhost:4000/doctor/update/${data._id}`,
        {
          firstName: firstName.message,
          secondName: secondName.message,
          password: password.message,
          gender: gender.message,
          birthDate: birthDate.message,
          phone: phone.message,
          profession: profession.message,
          category: category.message,
          email: data.email
        }).then(() => {
        console.log('success')
      });

      await fb.auth().createUserWithEmailAndPassword(userData.email, userData.password)

      dispatch('logOutUser')
      dispatch('loginUser', user[0])

    } catch (error) {
      console.log(error)
      throw error
    }
  },
  async loginUser ({commit}, {email, password}) {
    let url = `http://localhost:4000/patient/findUser/${email}`
    let userData
    await axios.get(url).then((response) => {
      userData = response.data;
    });
    if (userData.length === 0) {
      url = `http://localhost:4000/doctor/findUser/${email}`
      await axios.get(url).then((response) => {
        userData = response.data;
      });
    }
    try {
      const user = await fb.auth().signInWithEmailAndPassword(email, password)
      commit('setUser', new User(user.user.uid, userData[0].status, email))
      if (userData[0].status == 1) {
        commit('setMenuItems', menuPatient)
      } else if (userData[0].status == 2) {
        commit('setMenuItems', menuDoctor)
      } else if (userData[0].status == 3) {
        commit('setMenuItems', menuAdmin)
      }
    } catch (error) {
      throw error
    }
  },
  async logOutUser ({commit}) {
    await fb.auth().signOut()
    commit('setUser', null)
  },
  async autoLogin ({commit}, payload) {
    let a = await crypto('папапапапапапапапапапапапапапапапапапапа', 1)
    let dec = await crypto(a.message, 2, a.x, '', '', a.alfa)

    let url = `http://localhost:4000/patient/findUser/${payload.email}`
    let userData
    await axios.get(url).then((response) => {
      userData = response.data;
    });
    if (userData.length === 0) {
      url = `http://localhost:4000/doctor/findUser/${payload.email}`
      await axios.get(url).then((response) => {
        userData = response.data;
      });
    }
    commit('setUserInfo', userData[0])
    commit('setUser', new User(payload.uid, userData.status, payload.email))
    if (userData[0].status == 1) {
      commit('setMenuItems', menuPatient)
    } else if (userData[0].status == 2) {
      commit('setMenuItems', menuDoctor)
    } else if (userData[0].status == 3) {
      commit('setMenuItems', menuAdmin)
    }
  }
}
