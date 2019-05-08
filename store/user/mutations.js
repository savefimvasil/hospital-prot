export default {
  setUser(state, payload) {
    state.user = payload
  },
  setLoginStatus(state, payload) {
    state.isLogin = payload
  },
  setAdminStatus(state, payload) {
    state.isAdmin = payload
  },
  setMenuItems(state, payload) {
    state.menuItems = payload
  }
}
