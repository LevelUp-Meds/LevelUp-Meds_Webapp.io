// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4N9KdAQpYaVd_c6KcfNQ6--oWr3PW928",
  authDomain: "levelupmeds.firebaseapp.com",
  projectId: "levelupmeds",
  storageBucket: "levelupmeds.appspot.com",
  messagingSenderId: "374568079675",
  appId: "1:374568079675:web:f7fcdea625d6efc342671e",
  measurementId: "G-PQY397FHD2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.id));
    const docs = await getDocs(q);
    if (docs.doc.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.id,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export { auth, db, signInWithGoogle, loginWithEmailAndPassword };
