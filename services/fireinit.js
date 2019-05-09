import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

let config = {
  apiKey: "AIzaSyCvo4aCSY0zs8poKq72upU-3khacxxjAWU",
  authDomain: "hospitel-protect.firebaseapp.com",
  databaseURL: "https://hospitel-protect.firebaseio.com",
  projectId: "hospitel-protect",
  storageBucket: "hospitel-protect.appspot.com",
  messagingSenderId: "223523860800",
  appId: "1:223523860800:web:622861a5243abff6"
};

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export default firebase
