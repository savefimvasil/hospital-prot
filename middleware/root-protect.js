export default function({ store, redirect, route }) {
  store.state.user.user !== null && route.name == 'login' ? redirect('/') : ''
  store.state.user.user !== null && route.name == 'register' ? redirect('/') : ''
}
