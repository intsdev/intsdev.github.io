import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAoM9yCbM5rjKl8GZNWr585_TDKgQsS1CA",
  authDomain: "intsdev-portfolio.firebaseapp.com",
  databaseURL: "https://intsdev-portfolio.firebaseio.com",
  projectId: "intsdev-portfolio",
  storageBucket: "intsdev-portfolio.appspot.com",
  messagingSenderId: "716222304116"
};
firebase.initializeApp(config);

export default firebase;