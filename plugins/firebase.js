import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCvo4aCSY0zs8poKq72upU-3khacxxjAWU",
    authDomain: "hospitel-protect.firebaseapp.com",
    databaseURL: "https://hospitel-protect.firebaseio.com",
    projectId: "hospitel-protect",
    storageBucket: "hospitel-protect.appspot.com",
    messagingSenderId: "223523860800",
  })
}

firebase.firestore().settings({ timestampsInSnapshots: true })

const db = firebase.firestore()
const storage = firebase.storage()
const auth = firebase.auth()

export { storage, db, auth }
