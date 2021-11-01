// Get current system/browser theme
const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
if (darkThemeMq.matches) {
  // Theme set to dark.
} else {
  // Theme set to light.
}

// function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem('theme') === 'dark-theme') {
    setTheme('light-theme');
  } else {
    setTheme('dark-theme');
  }
  changeFavicon();
}

// Vintage Mode
let count = 0;
const text = document.querySelectorAll('h1, h2, h3, h4, h5, h6, span, button');

function countToggles() {
  count++;

  if (count >= 10) {
    document.getElementById('vintageModeContainer').style.display = 'block';
    text.style.fontFamily = 'VT323, monospace';
    text.style.color = 'rgb(235, 235, 235)';
    text.style.textShadow = 'var(--green-glow)';
    text.style.lineHeight = '1';
    text.style.transform = 'translateZ(100px)';
    text.style.backfaceVisibility = 'hidden';
  }
}

// // Popup
// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function () {
//   modal.style.display = "block";
// };

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

// Change favicon according to theme
// const isDark = window.matchMedia("(prefers-color-scheme: dark)");

const changeFavicon = () => {
  const faviconTag = document.getElementById('faviconTag');
  if (localStorage.getItem('theme') === 'dark-theme') {
    faviconTag.href = '/img/favicon-dark.ico';
  } else {
    faviconTag.href = '/img/favicon-light.ico';
  }
};

// changeFavicon();
// setInterval(changeFavicon, 1000);

// Word Rotation
setInterval(function () {
  const show = document.querySelector('.mask span[data-show]');
  const next =
    show.nextElementSibling || document.querySelector('.mask span:first-child');

  const up = document.querySelector('.mask span[data-up]');

  if (up) {
    up.removeAttribute('data-up');
  }

  show.removeAttribute('data-show');
  show.setAttribute('data-up', '');

  next.setAttribute('data-show', '');
}, 2000);

//Hexagon Progressbars
var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

window.onload = function () {
  changeFavicon();
  const themeButton = document.getElementById('themeId');
  if (localStorage.getItem('theme') === 'light-theme') {
    setTheme('light-theme');
    themeButton.checked = false;
  } else {
    setTheme('dark-theme');
    themeButton.checked = true;
  }

  var max = 2160;
  forEach(
    document.querySelectorAll('.hex-progress, .hex-progress2, .hex-progress3'),
    function (index, value) {
      percent = value.getAttribute('data-progress');
      value
        .querySelector('.fill, .fill2, .fill3')
        .setAttribute(
          'style',
          'stroke-dashoffset: ' + ((100 - percent) / 100) * max
        );
      value.querySelector('.value, .value2, .value3').innerHTML = percent + '%';
    }
  );
};

// Timeline
// const timelineHeight = document.getElementsByClassName("timeline");
// const lineHeight = document.getElementById("svgLine");
// shape.setAttribute("viewBox", "-250 -250 500 750");

var controller = new ScrollMagic.Controller();
TweenMax.set('#line', { visibility: 0 });

var tweenOne = new TweenMax.fromTo(
  '#line',
  1,
  { drawSVG: '0%' },
  { drawSVG: '10%' }
);

var scene1 = new ScrollMagic.Scene({
  triggerElement: '#line',
})
  .setTween(tweenOne)
  .addTo(controller);

var tweenTwo = new TweenMax.fromTo(
  '#line',
  1,
  { drawSVG: '10%' },
  { drawSVG: '20%' }
);

var scene2 = new ScrollMagic.Scene({
  triggerElement: '.dayTwo',
})
  .setTween(tweenTwo)
  .addTo(controller);

var tweenThree = new TweenMax.fromTo(
  '#line',
  1,
  { drawSVG: '20%' },
  { drawSVG: '40%' }
);

var scene3 = new ScrollMagic.Scene({
  triggerElement: '.dayThree',
})
  .setTween(tweenThree)
  .addTo(controller);

var tweenFour = new TweenMax.fromTo(
  '#line',
  1,
  { drawSVG: '40%' },
  { drawSVG: '65%' }
);

var scene3 = new ScrollMagic.Scene({
  triggerElement: '.dayFour',
})
  .setTween(tweenFour)
  .addTo(controller);

var tweenFive = new TweenMax.fromTo(
  '#line',
  1,
  { drawSVG: '65%' },
  { drawSVG: '85%' }
);

var scene3 = new ScrollMagic.Scene({
  triggerElement: '.dayFive',
})
  .setTween(tweenFive)
  .addTo(controller);

var tweenSix = new TweenMax.fromTo(
  '#line',
  1,
  { drawSVG: '85%' },
  { drawSVG: '102%' }
);

var scene3 = new ScrollMagic.Scene({
  triggerElement: '.daySix',
})
  .setTween(tweenSix)
  .addTo(controller);

// Check if music cover is visible in viewport
// function isInViewport(el) {
//   const rect = el.getBoundingClientRect();
//   return (
//     rect.top >= 0 &&
//     rect.left >= 0 &&
//     rect.bottom <=
//       (window.innerHeight || document.documentElement.clientHeight) &&
//     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//   );
// }

// const box = document.querySelector("gallery-item, music-slide");
// const message = document.querySelector("#message");

// document.addEventListener(
//   "scroll",
//   function () {
//     const messageText = isInViewport(box)
//       ? "The box is visible in the viewport"
//       : "The box is not visible in the viewport";

//     message.textContent = messageText;
//   },
//   {
//     passive: true,
//   }
// );
