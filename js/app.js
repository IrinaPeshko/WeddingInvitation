import { util } from "./util.js";
import { theme } from "./theme.js";
import { audio } from "./audio.js";
import { progress } from "./progress.js";
import { pagination } from "./pagination.js";

window.util = util;
window.theme = theme;
window.audio = audio;
window.progress = progress;
window.pagination = pagination;

document.addEventListener("DOMContentLoaded", function () {
  const targetDate = new Date("August 3, 2024 15:00:00").getTime();

  function getDeclension(number, one, two, five) {
    if (number % 10 == 1 && number % 100 != 11) {
      return one;
    } else if ([2, 3, 4].indexOf(number % 10) >= 0 && [12, 13, 14].indexOf(number % 100) < 0) {
      return two;
    } else {
      return five;
    }
  }

  const countdownFunction = setInterval(function () {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days + "\n " + getDeclension(days, "день", "дня", "дней");
    document.getElementById("hours").innerText = hours + "\n " + getDeclension(hours, "час", "часа", "часов");
    document.getElementById("minutes").innerText = minutes + "\n " + getDeclension(minutes, "минуту", "минуты", "минут");
    document.getElementById("seconds").innerText = seconds + "\n " + getDeclension(seconds, "секунду", "секунды", "секунд");

    if (distance < 0) {
      clearInterval(countdownFunction);
      document.querySelector(".countdown-timer").innerHTML =
        "Событие началось!";
    }
  }, 1000);
});
