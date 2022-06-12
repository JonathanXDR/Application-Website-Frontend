window.onload = function () {
  const themeButton = document.getElementById('theme-id');
  if (localStorage.getItem('theme') === 'light') {
    setTheme('light');
    themeButton.checked = false;
  } else {
    setTheme('dark');
    themeButton.checked = true;
  }

  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
  if (darkThemeMq.matches) {
    setTheme('dark');
    themeButton.checked = true;
  } else {
    setTheme('light');
    themeButton.checked = false;
  }

  changeFavicon();

  const max = 2160;
  forEach(document.querySelectorAll('.hex-progress'), function (index, value) {
    percent = value.getAttribute('data-progress');
    value
      .querySelector('.fill')
      .setAttribute(
        'style',
        'stroke-dashoffset: ' + ((100 - percent) / 100) * max
      );
    value.querySelector('.card-text').innerHTML = percent + '%';
  });

  const tileOverlayToggle = document.querySelectorAll('.tile-overlay-toggle');
  forEach(tileOverlayToggle, function (index, value) {
    value.addEventListener('change', function () {
      if (this.checked) {
        value.parentElement.classList.add('expanded');
      } else {
        value.parentElement.classList.remove('expanded');
      }
    });
  });

  timelineScrolling();
  age();
  appYear();
  currentYear();
  intersectionObserver();
  setCurrentItem();
};

function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

function toggleTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
  changeFavicon();
}

/* -------------------------- IntersectionObserver -------------------------- */

function intersectionObserver() {
  const inViewport = (entries, observer) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-inViewport', entry.isIntersecting);
    });
  };

  const Obs = new IntersectionObserver(inViewport);
  const obsOptions = {};

  const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
  ELs_inViewport.forEach((EL) => {
    Obs.observe(EL, obsOptions);
  });
}

/* ---------------------------------- Menu ---------------------------------- */

function setCurrentItem() {
  const items = document.getElementsByClassName('item');
  for (let i = 0; i < 4; i++) {
    items[i].addEventListener('click', function () {
      closeNav();
      const current = document.getElementsByClassName('current');
      if (current.length > 0) {
        current[0].className = current[0].className.replace(' current', '');
      }
      this.className += ' current';
    });
  }
}

const burgerClicked = () => {
  const nav = document.getElementById('myNav');
  nav.classList.toggle('nav--open');
  nav.classList.toggle('nav--close');
};

const closeNav = () => {
  const nav = document.getElementById('myNav');
  nav.classList.add('nav--close');
  nav.classList.remove('nav--open');
};

function isIntoView(elem) {
  const documentViewTop = $(window).scrollTop();
  const documentViewBottom = documentViewTop + $(window).height();

  const elementTop = $(elem).offset().top;
  const elementBottom = elementTop + $(elem).height();

  return elementBottom <= documentViewBottom && elementTop >= documentViewTop;
}

let lastItertionInView = true;

$(window).scroll(function () {
  const scrollTop = $(window).scrollTop();
  const sections = $('section');
  const navbarLinks = $('nav ul li a');
  let currentId = '';
  sections.each(function () {
    const section = $(this);
    const sectionId = section.attr('id');
    const sectionTop = section.offset().top - 52;
    const sectionBottom = sectionTop + section.height();
    if (scrollTop >= sectionTop && scrollTop <= sectionBottom) {
      currentId = sectionId;
    }
  });

  navbarLinks.each(function () {
    const link = $(this);
    const linkId = link.attr('href').split('#')[1];
    if (currentId === linkId) {
      link.addClass('current');
    } else {
      link.removeClass('current');
      lastItertionInView = false;
    }
  });
});

/* ---------------------------------- Modal --------------------------------- */

const eventListener = (event) => {
  if (!document.getElementById('modalBox').contains(event.target)) {
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

/* ----------------------------------- Age ---------------------------------- */

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

/* ------------------------- Year Of Apprenticeship ------------------------- */

function appYear() {
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

  document.getElementById('app-year').textContent = y;
}

/* ------------------------------ Current Year ------------------------------ */

function currentYear() {
  document.getElementById('current-year').textContent =
    new Date().getFullYear();
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
  const faviconTag = document.getElementById('favicon-tag');
  if (localStorage.getItem('theme') === 'dark') {
    faviconTag.href = '/img/favicon-dark.ico';
  } else {
    faviconTag.href = '/img/favicon-light.ico';
  }
};

/* -------------------------- Hexagon Progressbars -------------------------- */

let forEach = function (array, callback, scope) {
  for (let i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

/* -------------------------------- Timeline -------------------------------- */

function timelineScrolling() {
  let ticking = false;
  let last_known_scroll_position = 0;
  let updatePath = false;

  const element = document.getElementById('svg-timeline');
  const path = element.querySelector('path');
  let totalLength = 0;

  let timelineHeight = 0;

  setTimeout(() => {
    timelineHeight = document.getElementById('timeline-id').offsetHeight;
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
  const timelineHeight = document.getElementById('timeline-id').offsetHeight;
  console.log(timelineHeight);
}
