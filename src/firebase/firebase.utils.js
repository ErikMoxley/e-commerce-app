import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD3KV7zoMnivXdzHBN4-63t1To7W6u418w",
  authDomain: "e-commerce-app-b6133.firebaseapp.com",
  databaseURL: "https://e-commerce-app-b6133.firebaseio.com",
  projectId: "e-commerce-app-b6133",
  storageBucket: "e-commerce-app-b6133.appspot.com",
  messagingSenderId: "618869871245",
  appId: "1:618869871245:web:2ccc875ccfe937662b88c4",
  measurementId: "G-PMGP1V6DS9"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//google signin + pop up, have to enable google or whichever method in firebase console as well
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
