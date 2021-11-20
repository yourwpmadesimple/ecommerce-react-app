import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyALeOmA0WrkraSF-kxPDaIkE8XnShpCNOc",
  authDomain: "crown-clothing-db-f7582.firebaseapp.com",
  projectId: "crown-clothing-db-f7582",
  storageBucket: "crown-clothing-db-f7582.appspot.com",
  messagingSenderId: "641322507138",
  appId: "1:641322507138:web:e8c7d7c93175bdada84d9b",
  measurementId: "G-RMJGXGF6H1",
};

export const createUserProfileDoc = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
