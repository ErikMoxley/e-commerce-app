import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//where I'd enter Firebase APIkey.
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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  //firestore calls batch for us
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  //Will fire off batch for us using .commit
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      //encode URI used to convert non-url characters that you don't see in normal urls
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  //
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//google signin + pop up, have to enable google or whichever method in firebase console as well
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
