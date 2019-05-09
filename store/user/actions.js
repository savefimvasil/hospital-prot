import * as fb from 'firebase'

class User {
  constructor (id, status = 1) {
    this.id = id
    this.status = status
  }
}

export default {
  async registerUser ({commit}, {email, password}) {
    commit('loading/setLoading', true)
    try {
      const user = await fb.auth().createUserWithEmailAndPassword(email, password)
      commit('setUser', new User(user.user.uid))
      commit('loading/setLoading', false)
    } catch (error) {
      commit('loading/setLoading', false)
      throw error
    }
  },
  async loginUser ({commit}, {email, password}) {
    commit('loading/setLoading', true)
    try {
      const user = await fb.auth().signInWithEmailAndPassword(email, password)
      commit('setUser', new User(user.user.uid, 1))
      commit('loading/setLoading', false)
    } catch (error) {
      commit('loading/setLoading', false)
      throw error
    }
  },
  async logOutUser ({commit}) {
    commit('loading/setLoading', true)
    await fb.auth().signOut()
    commit('setUser', null)
    commit('loading/setLoading', false)
  },
  autoLogin ({commit}, payload) {
    commit('setUser', new User(payload.uid, 1))
  }
}
