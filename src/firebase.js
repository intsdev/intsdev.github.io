import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAoM9yCbM5rjKl8GZNWr585_TDKgQsS1CA",
  authDomain: "intsdev-portfolio.firebaseapp.com",
  databaseURL: "https://intsdev-portfolio.firebaseio.com",
  projectId: "intsdev-portfolio",
  storageBucket: "intsdev-portfolio.appspot.com",
  messagingSenderId: "716222304116"
});

let db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

export default db;