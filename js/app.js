import { util } from "./util.js";
import { like } from "./like.js";
import { theme } from "./theme.js";
import { audio } from "./audio.js";
import { comment } from "./comment.js";
import { progress } from "./progress.js";
import { pagination } from "./pagination.js";

window.util = util;
window.like = like;
window.theme = theme;
window.audio = audio;
window.comment = comment;
window.progress = progress;
window.pagination = pagination;

document.addEventListener("DOMContentLoaded", function () {
  const targetDate = new Date("August 3, 2024 15:00:00").getTime();

  const countdownFunction = setInterval(function () {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days + " дней";
    document.getElementById("hours").innerText = hours + " часов";
    document.getElementById("minutes").innerText = minutes + " минут";
    document.getElementById("seconds").innerText = seconds + " секунд";

    if (distance < 0) {
      clearInterval(countdownFunction);
      document.querySelector(".countdown-timer").innerHTML =
        "Событие началось!";
    }
  }, 1000);
});
