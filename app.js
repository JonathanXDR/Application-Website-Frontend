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

//Sidebar
var status_sidebar = false;

function toggle_sidebar() {
  if (status_sidebar == false) {
    openNav();
  } else {
    closeNav();
  }
}

function openNav() {
  status_sidebar = true;
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginRight = "250px";
  document.getElementById("openbtn").style.marginRight = "250px";
}

function closeNav() {
  status_sidebar = false;
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginRight = "0";
  document.getElementById("openbtn").style.marginRight = "0";
}

/*Scroll Indicator
// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
} */

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
