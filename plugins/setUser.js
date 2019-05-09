import firebase from 'firebase';

export default async function({ store, route, redirect }) {
  store.dispatch('loading/setLoading', true)
  let us
  await firebase.auth().onAuthStateChanged(user => {
    if (user) {
      store.dispatch('user/autoLogin', user)
      store.dispatch('loading/setLoading', false)
    }
    store.state.user.user !== null && route.name === 'login' ? redirect('/') : ''
    store.state.user.user !== null && route.name === 'register' ? redirect('/') : ''
    store.state.user.user === null && route.name === 'index' ? redirect('/login') : ''
    store.state.user.user === null && route.name === 'profile' ? redirect('/login') : ''
    store.state.user.user === null && route.name === 'patients' ? redirect('/login') : ''
    store.state.user.user === null && route.name === 'staff' ? redirect('/login') : ''
  })
}
