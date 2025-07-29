document.addEventListener("DOMContentLoaded", function () {
  let totalSeconds = 30 * 60;

  const hEl = document.querySelector(".h-timer");
  const mEl = document.querySelector(".m-timer");
  const sEl = document.querySelector(".s-timer");

  function updateTimer() {
    if (totalSeconds < 0) return;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    hEl.textContent = String(hours).padStart(2, "0");
    mEl.textContent = String(minutes).padStart(2, "0");
    sEl.textContent = String(seconds).padStart(2, "0");

    totalSeconds--;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
});
