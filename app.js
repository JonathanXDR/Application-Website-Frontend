// Get current system/browser theme
const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
if (darkThemeMq.matches) {
  // Theme set to dark.
} else {
  // Theme set to light.
}

// function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem("theme") === "dark-theme") {
    setTheme("light-theme");
  } else {
    setTheme("dark-theme");
  }
}

// Vintage Mode
let count = 0;
const text = document.querySelectorAll("h1, h2, h3, h4, h5, h6, span, button");

function countToggles() {
  count++;
  console.log(count);

  if (count >= 10) {
    document.getElementById("vintageModeContainer").style.display = "block";
    text.style.fontFamily = "VT323, monospace";
    text.style.color = "rgb(235, 235, 235)";
    text.style.textShadow = "var(--green-glow)";
    text.style.lineHeight = "1";
    text.style.transform = "translateZ(100px)";
    text.style.backfaceVisibility = "hidden";
  }
}

// Change favicon according to theme
// const faviconTag = document.getElementById("faviconTag");
// const isDark = window.matchMedia("(prefers-color-scheme: dark)");

// const changeFavicon = () => {
//   if (isDark.matches) faviconTag.href = ".favicon-dark.png";
//   else faviconTag.href = "favicon-light.png";
// };

// changeFavicon();
// setInterval(changeFavicon, 1000);

//Hexagon Progressbar1
var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};
window.onload = function () {
  const themeButton = document.getElementById("themeId");
  if (localStorage.getItem("theme") === "light-theme") {
    setTheme("light-theme");
    themeButton.checked = false;
  } else {
    setTheme("dark-theme");
    themeButton.checked = true;
  }
  //svgTimeline.style.height = 1000 + "px";

  var max = 2160;
  forEach(
    document.querySelectorAll(".hex-progress, .hex-progress2, .hex-progress3"),
    function (index, value) {
      percent = value.getAttribute("data-progress");
      value
        .querySelector(".fill, .fill2, .fill3")
        .setAttribute(
          "style",
          "stroke-dashoffset: " + ((100 - percent) / 100) * max
        );
      value.querySelector(".value, .value2, .value3").innerHTML = percent + "%";
    }
  );
};
