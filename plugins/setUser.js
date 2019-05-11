import firebase from 'firebase';

export default async function({ store, route, redirect }) {
  store.dispatch('loading/setLoading', true)
  await firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      await store.dispatch('user/autoLogin', user)
      store.dispatch('loading/setLoading', false)
    }
    user !== null && route.name === 'login' ? redirect('/') : ''
    user !== null && route.name === 'register' ? redirect('/') : ''
    user === null && route.name !== 'login' ? redirect('/login') : ''
    user === null && route.name !== 'register' ? redirect('/login') : ''
  })
}
