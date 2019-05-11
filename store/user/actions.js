import * as fb from 'firebase'
import { menuPatient, menuDoctor, menuAdmin } from '../../assets/menuPoints'
import axios from 'axios'

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
      await axios.post(url, userData).then(() => {
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
    await axios.get(url).then((response) => {
      user = response.data;
    });
    try {
      let url = 'http://localhost:4000/doctor/add'
      await axios.post(url, userData).then(() => {
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
