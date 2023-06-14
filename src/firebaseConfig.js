// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDoRnHy7pxVOfXmttOpHtLsMIgTxnmo4wo",
  authDomain: "instagram-clone-react-efc98.firebaseapp.com",
  projectId: "instagram-clone-react-efc98",
  storageBucket: "instagram-clone-react-efc98.appspot.com",
  messagingSenderId: "764854439630",
  appId: "1:764854439630:web:c4844d27d3e22dbd02ca9f",
  measurementId: "G-Z9121EBZPV",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = getStorage(firebaseApp);

export { db, auth, storage };

// export default db ;
