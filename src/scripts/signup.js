import { app, db, ref, onValue, getDatabase, get } from "./firebase.js";

// student details var
const studentDetailsSection = document.querySelector(
  "#student-details-section",
);
const studentDetailsForm = document.querySelector("#student-details-form");
const firstNameInput = document.querySelector("#first-name-input");
const firstNameInputRelatedError = document.querySelector(
  "#first-name-related-error",
);
const lastNameInput = document.querySelector("#last-name-input");
const lastNameInputRelatedError = document.querySelector(
  "#last-name-related-error",
);
const rollNumberInput = document.querySelector("#roll-no-input");
const rollNumberInputRelatedError = document.querySelector(
  "#roll-no-related-error",
);

// student credential var
const formRelatedError = document.querySelector("#form-related-error");
const studentCredentialSection = document.querySelector(
  "#student-credential-section",
);
const studentCredentialForm = document.querySelector(
  "#student-credential-form",
);
const emailInput = document.querySelector("#email-input");
const emailInputRelatedError = document.querySelector("#email-related-error");
const passwordInput = document.querySelector("#password-input");
const passwordInputRelatedError = document.querySelector(
  "#password-related-error",
);
const reEnterPasswordInput = document.querySelector("#re-enter-password-input");
const reEnterPasswordInputRelatedError = document.querySelector(
  "#re-enter-password-related-error",
);
const studentCredentialFormPreviousButton = document.querySelector(
  "#student-credential-form-previous-button",
);
const pfpSelectionSection = document.querySelector("#pfp-selection-section");
const pfpSelectionForm = document.querySelector("#pfp-selection-form");
const selectedPfp = document.querySelector("#selected-pfp");
const maleToggleButton = document.querySelector("#male-toggle-button");
const femaleToggleButton = document.querySelector("#female-toggle-button");
const pfpContainer = document.querySelector(".pfp-container");
let studentData;
const dbRef = ref(db, "students");
let localObj = {
  firstName: "",
  lastName: "",
  rollNo: "",
  email: "",
  role: "",
  pfp: "",
};
onValue(dbRef, (snapshot) => {
  studentData = snapshot.val();
  console.log(studentData);
});
studentDetailsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  firstNameInputRelatedError.textContent = "";
  lastNameInputRelatedError.textContent = "";
  rollNumberInputRelatedError.textContent = "";
  let firstNameValue = firstNameInput.value.trim();
  let lastNameValue = lastNameInput.value.trim();
  let rollNumberValue = parseInt(rollNumberInput.value.trim());
  if (firstNameValue === "" || lastNameValue === "" || rollNumberValue === "") {
    if (firstNameValue === "") {
      firstNameInput.classList.toggle("error-border");
      firstNameInputRelatedError.textContent = "First name required";
    }
    if (lastNameValue === "") {
      lastNameInput.classList.toggle("error-border");
      lastNameInputRelatedError.textContent = "Last name required";
    }
    if (isNaN(rollNumberValue)) {
      rollNumberInputRelatedError.textContent = "Roll no required";
      rollNumberInput.classList.toggle("error-border");
    }
    return;
  }
  if (String(rollNumberValue).length < 6) {
    rollNumberInputRelatedError.textContent = "Enter a valid roll no";
    return;
  }
  if (rollNumberExists(rollNumberValue)) {
    rollNumberInputRelatedError.textContent = "Roll number used";
    return;
  } else {
    localObj.firstName = firstNameValue;
    localObj.lastName = lastNameValue;
    localObj.rollNo = rollNumberValue;
    await fadeOutEffect(studentDetailsSection);
    await fadeInEffect(studentCredentialSection);
  }
});
studentCredentialForm.addEventListener("submit", (e) => {
  e.preventDefault();
  emailInputRelatedError.textContent = "";
  passwordInputRelatedError.textContent = "";
  reEnterPasswordInputRelatedError.textContent = "";
  let emailValue = emailInput.value.trim();
  let passwordValue = passwordInput.value;
  let reEnterPasswordValue = reEnterPasswordInput.value;
  if (
    emailValue === "" ||
    passwordValue === "" ||
    reEnterPasswordValue === ""
  ) {
    if (emailValue === "") {
      emailInputRelatedError.textContent = "Email required";
    }
    if (passwordValue === "") {
      passwordInputRelatedError.textContent = "Password required";
    }
    if (reEnterPasswordValue === "") {
      reEnterPasswordInputRelatedError.textContent = "Required";
    }
    return;
  }
  if (passwordValue != reEnterPasswordValue) {
    passwordInputRelatedError.textContent = "Passwords don't match";
    reEnterPasswordInputRelatedError.textContent = "Passwords don't match";
    return;
  }
  if (passwordValue.length < 6) {
    passwordInputRelatedError.textContent = "at least 6 character needed";
    return;
  }
  if (emailExists(emailValue)) {
    emailInputRelatedError.textContent = "Email used";
    return;
  }
  localObj.email = emailValue;
  localObj.role = "student";
  console.log(localObj);
});
studentCredentialFormPreviousButton.addEventListener("click", async () => {
  await fadeOutEffect(studentCredentialSection);
  await fadeInEffect(studentDetailsSection);
});

function rollNumberExists(inputRollNo) {
  if (!studentData) {
    return;
  }
  for (let key in studentData) {
    const student = studentData[key];
    if (student.rollNo === inputRollNo) {
      return true;
    } else return false;
  }
}
function emailExists(inputEmail) {
  if (!studentData) {
    return;
  }
  for (let key in studentData) {
    const student = studentData[key];
    if (student.email === inputEmail) {
      return true;
    } else return false;
  }
}
async function fadeInEffect(element) {
  element.classList.remove("hidden");
  element.style.opacity = "0";
  const durationStr = getComputedStyle(element).transitionDuration;
  let ms;
  if (durationStr.endsWith("ms")) {
    ms = parseFloat(durationStr);
  } else if (durationStr.endsWith("s")) {
    ms = parseFloat(durationStr) * 1000;
  }
  element.style.opacity = "1";
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fadeOutEffect(element) {
  element.style.opacity = "0";
  const durationStr = getComputedStyle(element).transitionDuration;
  let ms;
  if (durationStr.endsWith("ms")) {
    ms = parseFloat(durationStr);
  } else if (durationStr.endsWith("s")) {
    ms = parseFloat(durationStr) * 1000;
  }
  await new Promise((resolve) => setTimeout(resolve, ms));
  element.classList.add("hidden");
}
femaleToggleButton.addEventListener("click", () => {
  maleToggleButton.classList.remove("bg-surface-3");
  femaleToggleButton.classList.add("bg-surface-3");
});
maleToggleButton.addEventListener("click", () => {
  femaleToggleButton.classList.remove("bg-surface-3");
  maleToggleButton.classList.add("bg-surface-3");
});
pfpContainer.addEventListener("click", async (e) => {
  if (e.target.tagName !== "IMG") return;
  await fadeOutEffect(selectedPfp);
  selectedPfp.firstElementChild.src = e.target.currentSrc;
  await new Promise((resolve) => {
    if (selectedPfp.firstElementChild.complete) {
      resolve();
    } else {
      selectedPfp.firstElementChild.onload = () => resolve();
    }
  });
  fadeInEffect(selectedPfp);
});
fetch(
  "https://imagekit.io/public/share/yn9gz2n2g/bb7d04ae0ef34a45577240f8eb275de5209e8369ae25ebf90599dd18c11192e83a3caad060d241738cc84b91e07ab204782da63248817ef5ed4751591e8390df5bb74397adcc28f9e0a5cdea6cdf60fd",
)
  .then((response) => response.json())
  .then((data) => {
    console.log("JSON data:", data);
  })
  .catch((error) => console.error("Fetch error:", error));
