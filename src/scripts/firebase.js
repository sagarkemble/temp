import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  update,
  equalTo,
  remove,
  push,
  query,
  orderByChild,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDxg1_YR4kZ2nnZ2hm32Oyjb4CUrnlXpvQ",
  authDomain: "lesp-resources-fd879.firebaseapp.com",
  projectId: "lesp-resources-fd879",
  storageBucket: "lesp-resources-fd879.firebasestorage.app",
  messagingSenderId: "422274455357",
  appId: "1:422274455357:web:c04e0d829e7715e87ad754",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

export function getStudentData() {
  const dbpath = ref(db, "students");
  return get(dbpath)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("data exists");
        return snapshot.val();
      } else {
        console.log("No data available");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error fetching student data:", error);
    });
}
export {
  app,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  auth,
  db,
  ref,
  set,
  get,
  onValue,
  equalTo,
  update,
  remove,
  push,
  query,
  getDatabase,
  orderByChild,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
};
