import { app, signInWithEmailAndPassword, auth } from "./firebase.js";
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
