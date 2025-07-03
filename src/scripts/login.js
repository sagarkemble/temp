import {
  app,
  signInWithEmailAndPassword,
  auth,
  get,
  equalTo,
  ref,
  db,
  orderByChild,
  query,
} from "./firebase.js";
// import { getStudentData } from "./firebase.js";
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  speed: 250,
  effect: "fade",
  autoplay: {
    delay: 2000,
  },
  fadeEffect: {
    crossFade: true,
  },
});

const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const emailRelatedError = document.querySelector("#email-related-error");
const passwordRelatedError = document.querySelector("#password-related-error");
const formRelatedError = document.querySelector("#form-related-error");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  emailRelatedError.textContent = "";
  passwordRelatedError.textContent = "";
  formRelatedError.textContent = "";
  if (emailInput.value.trim() === "" || passwordInput.value.trim() === "") {
    if (emailInput.value.trim() === "") {
      emailRelatedError.textContent = "Email required";
    }
    if (passwordInput.value.trim() === "") {
      passwordRelatedError.textContent = "Password required";
    }
    return;
  }
  const email = emailInput.value;
  const password = passwordInput.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      console.log("user logged in ");
      roleCheck(email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      if (errorCode === "auth/invalid-credential") {
        formRelatedError.textContent = "Invalid credential";
        console.log("user not logged in invalid credential");
      }
    });
});
async function roleCheck(email) {
  const path = ref(db, "students");
  const q = query(ref(db, "students"), orderByChild("email"), equalTo(email));
  const snapshot = await get(q)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);
        window.location.href = "html/dashboard.html";
      } else {
        window.href = "html/dashboard.html";
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}
