import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDoRnHy7pxVOfXmttOpHtLsMIgTxnmo4wo",
  authDomain: "instagram-clone-react-efc98.firebaseapp.com",
  projectId: "instagram-clone-react-efc98",
  storageBucket: "instagram-clone-react-efc98.appspot.com",
  messagingSenderId: "764854439630",
  appId: "1:764854439630:web:c4844d27d3e22dbd02ca9f",
  measurementId: "G-Z9121EBZPV",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();
const db = app.firestore();

export { auth, db, storage };

//  export default db ;
