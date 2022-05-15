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
    document.querySelectorAll(
      '.hex-progress, .hex-progress2, .hex-progress3, .hex-progress4, .hex-progress5, .hex-progress6, .hex-progress7, .hex-progress8, .hex-progress9, .hex-progress10, .hex-progress11, .hex-progress12'
    ),
    function (index, value) {
      percent = value.getAttribute('data-progress');
      value
        .querySelector(
          '.fill, .fill2, .fill3, .fill4, .fill5, .fill6, .fill7, .fill8, .fill9, .fill10, .fill11, .fill12'
        )
        .setAttribute(
          'style',
          'stroke-dashoffset: ' + ((100 - percent) / 100) * max
        );
      value.querySelector(
        '.value, .value2, .value3, .value4, .value5, .value6, .value7, .value8, .value9, .value10, .value11, .value12'
      ).innerHTML = percent + '%';
    }
  );

  timelineScrolling();
  age();
  year();
};

// Get current system/browser theme
const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
if (darkThemeMq.matches) {
  // Theme set to dark.
  // window.alert('dark');
} else {
  // Theme set to light.
  // window.alert('light');
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

function hideBurger() {
  document.getElementById('active').checked = false;
  preventScrolling();
}

function preventScrolling() {
  if (document.getElementById('active').checked === true) {
    $('body').css('overflow', 'hidden');
    $('body').attr('scroll', 'no');
  } else {
    $('body').css('overflow', 'auto');
    $('body').attr('scroll', 'yes');
  }
}

/* ------------------------- open & close the modal ------------------------- */
const eventListener = (event) => {
  if (!document.getElementById('modalBox').contains(event.target)) {
    // alert('Clicked outside Box');
    toggleModal();
  }
};

function toggleModal() {
  if (modal.style.opacity === '1') {
    window.removeEventListener('click', eventListener);

    $('body').css('overflow', 'auto');
    $('body').attr('scroll', 'yes');

    modal.style.opacity = '0';
    // position modal off screen
    modal.style.position = 'absolute';
    modal.style.right = '100%';
  } else {
    // position modal on screen
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.right = '0';
    modal.style.bottom = '0';
    modal.style.opacity = '1';

    $('body').css('overflow', 'hidden');
    $('body').attr('scroll', 'no');

    setTimeout(() => {
      window.addEventListener('click', eventListener);
    }, 100);
  }
}

/* ------------------------------- dynamic age ------------------------------ */
function age() {
  // Enter your date of birth
  let d1 = 12; // date
  let m1 = 12; // month
  let y1 = 2005; // year

  let date = new Date();
  let d2 = date.getDate();
  let m2 = 1 + date.getMonth();
  let y2 = date.getFullYear();
  let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (d1 > d2) {
    d2 = d2 + month[m2 - 1];
    m2 = m2 - 1;
  }
  if (m1 > m2) {
    m2 = m2 + 12;
    y2 = y2 - 1;
  }
  let d = d2 - d1;
  let m = m2 - m1;
  let y = y2 - y1;

  document.getElementById('age').textContent = y;
}

/* --------------------- dynamic year of apprenticeship --------------------- */
function year() {
  // Enter your date of birth
  let d1 = 01; // date
  let m1 = 08; // month
  let y1 = 2021; // year

  let date = new Date();
  let d2 = date.getDate();
  let m2 = 1 + date.getMonth();
  let y2 = date.getFullYear();
  let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (d1 > d2) {
    d2 = d2 + month[m2 - 1];
    m2 = m2 - 1;
  }
  if (m1 > m2) {
    m2 = m2 + 12;
    y2 = y2 - 1;
  }

  let d = 01 - d1;
  let m = 01 - m1;
  let y = 2021 - y1 + 1;

  if (y > 4) {
    y = 4;
  }

  document.getElementById('year').textContent = y;
}

/* ------------------------------ Vintage Mode ------------------------------ */
let count = 0;
const text = document.querySelectorAll('h1, h2, h3, h4, h5, h6, span, button');

function countToggles() {
  count++;

  if (count >= 100) {
    document.getElementById('vintageModeContainer').style.display = 'block';
    text.style.fontFamily = 'VT323, monospace';
    text.style.color = 'rgb(235, 235, 235)';
    text.style.textShadow = 'var(--green-glow)';
    text.style.lineHeight = '1';
    text.style.transform = 'translateZ(100px)';
    text.style.backfaceVisibility = 'hidden';
  }
}

const changeFavicon = () => {
  const faviconTag = document.getElementById('faviconTag');
  if (localStorage.getItem('theme') === 'dark-theme') {
    faviconTag.href = '/img/favicon-dark.ico';
  } else {
    faviconTag.href = '/img/favicon-light.ico';
  }
};

/* -------------------------- Hexagon Progressbars -------------------------- */
var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

/* -------------------------------- Timeline -------------------------------- */
function timelineScrolling() {
  let ticking = false;
  let last_known_scroll_position = 0;
  let updatePath = false;

  const element = document.getElementById('svgTimeline');
  const path = element.querySelector('path');
  let totalLength = 0;

  let timelineHeight = 0;

  setTimeout(() => {
    timelineHeight = document.getElementById('first-steps').offsetHeight;
    // console.log(Math.ceil(timelineHeight));
    const size = parseInt(Math.ceil(timelineHeight));
    // console.log(size);

    element.setAttribute('viewBox', `0 0 8 ${size}`);
    element.setAttribute('height', size);
    element.setAttribute('xmlns', `http://www.w3.org/${size}/svg`);

    path.setAttribute('d', `M 4 0 L 4 ${size}`);

    path.setAttribute('stroke-dasharray', totalLength);

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
            // console.log(entry);
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
  }, 500);
}

if (document.getElementById('timeline') === true) {
  const timelineHeight = document.getElementById('first-steps').offsetHeight;
  console.log(timelineHeight);
}
