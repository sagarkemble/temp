import {
  app,
  signInWithEmailAndPassword,
  auth,
  get,
  equalTo,
  ref,
  db,
  orderByChild,
  onAuthStateChanged,
  query,
} from "./firebase.js";
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.email);
  } else {
    window.location.href = "login.html";
  }
});
