// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBRlnm1dq2wE_Ja-p9Hca4YjDa-1HQHsio",
  authDomain: "dicord-clone-6484b.firebaseapp.com",
  projectId: "dicord-clone-6484b",
  storageBucket: "dicord-clone-6484b.appspot.com",
  messagingSenderId: "521625001157",
  appId: "1:521625001157:web:41ed32e2693c19b4d224ac",
  measurementId: "G-CTLCS508SM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;