export default function({ store, redirect, route }) {
  store.state.user.user !== null && route.name === 'login' ? redirect('/') : ''
  store.state.user.user !== null && route.name === 'register' ? redirect('/') : ''
  store.state.user.user === null && route.name === 'index' ? redirect('/login') : ''
  store.state.user.user === null && route.name === 'profile' ? redirect('/login') : ''
  store.state.user.user === null && route.name === 'patients' ? redirect('/login') : ''
  store.state.user.user === null && route.name === 'staff' ? redirect('/login') : ''
}
