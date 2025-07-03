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
const navigation = document.querySelector(".navigation");
let activeNavIcon = null;
const slider = document.querySelector(".slider");
navigation.addEventListener("click", (e) => {
  if (e.target.tagName === "DIV") return;

  if (activeNavIcon) {
    activeNavIcon.classList.remove("activeIcon");
    activeNavIcon.setAttribute("fill", "#8D9DA6");
  }

  e.target.classList.add("activeIcon");
  e.target.setAttribute("fill", "#ffffff");
  activeNavIcon = e.target;

  const iconWrapper = e.target.closest(".icon-wrapper");

  // get slider and icon offsets
  const navRect = navigation.getBoundingClientRect();
  const iconRect = iconWrapper.getBoundingClientRect();

  // detect lg breakpoint (Tailwind default: 1024px)
  const isLgScreen = window.innerWidth >= 1024;

  if (isLgScreen) {
    // vertical nav: move on Y-axis
    const translateY =
      iconRect.top -
      navRect.top +
      iconWrapper.offsetHeight / 2 -
      slider.offsetHeight / 2;
    slider.style.transform = `translateY(${translateY}px)`;
  } else {
    // horizontal nav: move on X-axis
    const translateX =
      iconRect.left -
      navRect.left +
      iconWrapper.offsetWidth / 2 -
      slider.offsetWidth / 2;
    slider.style.transform = `translateX(${translateX}px)`;
  }
});
window.addEventListener("DOMContentLoaded", () => {
  const defaultIcon = document.querySelector(".navigation .icon-wrapper svg");
  if (!defaultIcon) return;
  defaultIcon.classList.add("activeIcon");
  defaultIcon.setAttribute("fill", "#ffffff");
  activeNavIcon = defaultIcon;

  const iconWrapper = defaultIcon.closest(".icon-wrapper");

  const navRect = navigation.getBoundingClientRect();
  const iconRect = iconWrapper.getBoundingClientRect();
  const isLgScreen = window.innerWidth >= 1024;

  if (isLgScreen) {
    const translateY =
      iconRect.top -
      navRect.top +
      iconWrapper.offsetHeight / 2 -
      slider.offsetHeight / 2;
    slider.style.transform = `translateY(${translateY}px)`;
  } else {
    const translateX =
      iconRect.left -
      navRect.left +
      iconWrapper.offsetWidth / 2 -
      slider.offsetWidth / 2;
    slider.style.transform = `translateX(${translateX}px)`;
  }
});

// subject page related var and listners
let dbSubjectData;
let studentData;
let dbSemesterData;
// const subjectDbpath
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log(user);
    await getStudentData(user.email);
  } else {
    window.location.href = "../login.html"; // redirect to login page
  }
});

async function getStudentData(inputEmail) {
  const path = ref(db, "students");
  const q = query(
    ref(db, "students"),
    orderByChild("email"),
    equalTo(inputEmail),
  );
  const snapshot = await get(q)
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const studentArray = Object.values(data);
        studentData = studentArray[0];
        console.log(studentData);
        console.log(studentData.sem);

        await getClassRoomData();
      } else {
        window.href = "html/dashboard.html";
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}
function getClassRoomData() {
  const dbpath = ref(db, `semesters/${studentData.sem}`);
  return get(dbpath)
    .then((snapshot) => {
      if (snapshot.exists()) {
        dbSemesterData = snapshot.val();
        console.log(dbSemesterData);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      // window.location.href = "error.html";
      console.error(error);
    });
}
