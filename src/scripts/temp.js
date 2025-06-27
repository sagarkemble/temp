const maleToggleButton = document.querySelector("#male-toggle-button");
const femaleToggleButton = document.querySelector("#female-toggle-button");
const pfpContainer = document.querySelector(".pfp-container");
const selectedPfp = document.querySelector("#selected-pfp");
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
