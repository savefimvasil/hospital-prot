export default {
  async setUser({ commit }, type = constants.SEEKER_SITE_TYPE) {
    await commit('user/setUser', type)
    return Promise.resolve()
  },
  async setAdminStatus({ commit, getters }) {
    await commit(
      'user/setAdminStatus', true
    )
    return Promise.resolve()
  }
}
