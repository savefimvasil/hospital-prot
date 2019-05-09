import firebase from 'firebase';

export default async function({ store, route, redirect }) {
  store.dispatch('loading/setLoading', true)
  await firebase.auth().onAuthStateChanged(user => {
    if (user) {
      store.dispatch('user/autoLogin', user)
      store.dispatch('loading/setLoading', false)
      store.state.user.user !== null && route.name == 'login' ? redirect('/') : ''
      store.state.user.user !== null && route.name == 'register' ? redirect('/') : ''
    }
  })
}
