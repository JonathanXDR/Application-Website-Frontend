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

// open and close modal
function toggleModal() {
  if (modal.style.opacity === '1') {
    modal.style.opacity = '0';
    // position modal off screen
    modal.style.position = 'absolute';
    modal.style.left = '-1000%';
  } else {
    // position modal on screen
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.right = '0';
    modal.style.bottom = '0';
    modal.style.opacity = '1';
  }
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

// Typing Effect
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = ['hard', 'fun', 'a journey', 'LIFE'];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains('typing'))
      cursorSpan.classList.add('typing');
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove('typing');
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains('typing'))
      cursorSpan.classList.add('typing');
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove('typing');
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

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
let ticking = false;
let last_known_scroll_position = 0;
let updatePath = false;

const element = document.getElementById('svgTimeline');
const path = element.querySelector('path');
let totalLength = 0;

initPath(path);

function initPath(path) {
  totalLength = path.getTotalLength();
  path.style.strokeDasharray = `${totalLength}`;
  path.style.strokeDashoffset = totalLength;
}

function handleEntries(entries) {
  console.log(entries);
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      console.log(entry.target);
    }
  });
}

let observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(entry);
        updatePath = true;
      } else {
        updatePath = false;
      }
    });
  },
  { rootMargin: '0px 0px 0px 0px' }
);

observer.observe(element);

function doSomething(scroll_pos) {
  if (!updatePath) {
    return;
  }
  window.requestAnimationFrame(() => {
    const center = window.innerHeight / 2;
    const boundaries = path.getBoundingClientRect();
    const top = boundaries.top;
    const height = boundaries.height;
    const percentage = (center - top) / height;
    const drawLength = percentage > 0 ? totalLength * percentage : 0;
    path.style.strokeDashoffset =
      drawLength < totalLength ? totalLength - drawLength : 0;
  });
}

window.addEventListener('scroll', function (e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      doSomething(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});

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
