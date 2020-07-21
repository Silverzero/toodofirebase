import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjlnTWiNFFFlGa3jogYVBAVyx22QCXY6U",
    authDomain: "todo-f4c34.firebaseapp.com",
    databaseURL: "https://todo-f4c34.firebaseio.com",
    projectId: "todo-f4c34",
    storageBucket: "todo-f4c34.appspot.com",
    messagingSenderId: "9394102614",
    appId: "1:9394102614:web:e36148f4e3a247797576f7",
    measurementId: "G-THXGT694ZG"
    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore()
const auth = firebase.auth()

export {db, auth}