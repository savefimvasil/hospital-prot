import * as fb from 'firebase'
import { menuPatient, menuDoctor, menuAdmin } from '../../assets/menuPoints'

class User {
  constructor (id, status = 1) {
    this.id = id
    this.status = status
  }
}

const userStatus = 1

export default {
  async registerUser ({commit}, {email, password}) {
    commit('loading/setLoading', true)
    try {
      const user = await fb.auth().createUserWithEmailAndPassword(email, password)
      commit('setUser', new User(user.user.uid))
      commit('../loading/setLoading', false)
    } catch (error) {
      commit('../loading/setLoading', false)
      throw error
    }
  },
  async loginUser ({commit}, {email, password}) {
    try {
      const user = await fb.auth().signInWithEmailAndPassword(email, password)
      commit('setUser', new User(user.user.uid, userStatus))
      if (userStatus === 1) {
        commit('setMenuItems', menuPatient)
      } else if (userStatus === 2) {
        commit('setMenuItems', menuDoctor)
      } else if (userStatus === 3) {
        commit('setMenuItems', menuAdmin)
      }
    } catch (error) {
      throw error
    }
  },
  async logOutUser ({commit}) {
    commit('loading/setLoading', true)
    await fb.auth().signOut()
    commit('setUser', null)
    commit('../loading/setLoading', false)
  },
  autoLogin ({commit}, payload) {
    commit('setUser', new User(payload.uid, userStatus))
    if (userStatus === 1) {
      commit('setMenuItems', menuPatient)
    } else if (userStatus === 2) {
      commit('setMenuItems', menuDoctor)
    } else if (userStatus === 3) {
      commit('setMenuItems', menuAdmin)
    }
  }
}
