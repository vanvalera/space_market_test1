document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audiopub-audio");

  const btnBackward = document.querySelector('[data-cy="button-backward"]');
  const btnForward = document.querySelector('[data-cy="button-forward"]');

  btnBackward?.addEventListener("click", () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  });

  btnForward?.addEventListener("click", () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  });

  const playBtn = document.querySelector(".btnPlayPause.play");
  const pauseBtn = document.querySelector(".btnPlayPause:not(.play)");
  const currentTimeSpan = document.querySelector(
    '[data-testid="current-time"]'
  );
  const totalTimeSpan = document.querySelector('[data-testid="total-time"]');
  const seekbar = document.querySelector(".seekbar");
  const playbackButton = document.getElementById("playback-rate-button");
  const rateMenu = document.getElementById("playback-rate-combobox");

  function formatTime(sec) {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  }

  audio.addEventListener("loadedmetadata", () => {
    totalTimeSpan.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    currentTimeSpan.textContent = formatTime(audio.currentTime);
    seekbar.value = (audio.currentTime / audio.duration) * 100 || 0;
    seekbar.style.setProperty("--value", `${seekbar.value}%`);
  });

  seekbar.addEventListener("input", () => {
    audio.currentTime = (seekbar.value / 100) * audio.duration;
  });

  playBtn.addEventListener("click", () => {
    audio.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";

    const mediaControl = document.querySelector(".media-control");
    if (mediaControl) {
      Array.from(mediaControl.children).forEach((child) => {
        child.style.opacity = "1";
        child.style.visibility = "visible";
      });
    }
    const playbackButton = document.getElementById("playback-rate-button");
    if (playbackButton) {
      playbackButton.style.opacity = "1";
      playbackButton.style.visibility = "visible";
    }
  });

  pauseBtn.addEventListener("click", () => {
    audio.pause();
    pauseBtn.style.display = "none";
    playBtn.style.display = "inline-block";
  });

  playbackButton.addEventListener("click", () => {
    rateMenu.style.display =
      rateMenu.style.display === "block" ? "none" : "block";
  });

  rateMenu.querySelectorAll(".option-element").forEach((btn) => {
    btn.addEventListener("click", () => {
      const rate = parseFloat(btn.textContent);
      audio.playbackRate = rate;
      playbackButton.textContent = btn.textContent;
      rateMenu.style.display = "none";
    });
  });

  document.addEventListener("click", (e) => {
    if (!rateMenu.contains(e.target) && e.target !== playbackButton) {
      rateMenu.style.display = "none";
    }
  });
});
