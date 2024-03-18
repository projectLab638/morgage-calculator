import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtI-xZKFGS0l8SLVtFMbaW46ts8VTPPcY",
  authDomain: "loans-7d67a.firebaseapp.com",
  projectId: "loans-7d67a",
  storageBucket: "loans-7d67a.appspot.com",
  messagingSenderId: "137972462257",
  appId: "1:137972462257:web:1a9ed889b3f8e427e7a890",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
