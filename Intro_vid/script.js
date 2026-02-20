const LOAD_DURATION_MS = 4000;
const EXIT_FADE_MS = 300;

window.addEventListener("DOMContentLoaded", () => {
  const loaderScreen = document.getElementById("loaderScreen");

  setTimeout(() => {
    if (loaderScreen) {
      loaderScreen.classList.add("is-exiting");
    }

    setTimeout(() => {
      window.location.href = "../index.html";
    }, EXIT_FADE_MS);
  }, LOAD_DURATION_MS);
});
