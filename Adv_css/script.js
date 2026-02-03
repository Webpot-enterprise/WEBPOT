// script.js for Adv_css Tailwind UI

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

function setTheme(dark) {
  if (dark) {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    themeIcon.innerHTML = '<path d="M21.64 13.64A9 9 0 1 1 12 3v0a7 7 0 0 0 9.64 10.64z"/>';
  } else {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    themeIcon.innerHTML = '<path d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.95 7.07l-.71-.71M6.34 6.34l-.71-.71"/>';
  }
}

// Initial theme
setTheme(localStorage.getItem('theme') === 'dark');

themeToggle.addEventListener('click', () => {
  setTheme(!html.classList.contains('dark'));
});

// Smart Navbar Hide/Reveal
let lastScroll = 0;
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const curr = window.scrollY;
  if (curr > lastScroll && curr > 80) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastScroll = curr;
});

// Reveal on Scroll
const revealEls = document.querySelectorAll('.feature-card, .stat-box');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadein');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObs.observe(el));

// 3D Card Hover Effect
const cards = document.querySelectorAll('.feature-card');
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;
    card.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) scale(1.05)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      let curr = 0;
      const step = Math.ceil(target / 60);
      function update() {
        curr += step;
        if (curr >= target) {
          el.textContent = target;
        } else {
          el.textContent = curr;
          requestAnimationFrame(update);
        }
      }
      update();
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObs.observe(el));

// Loader (simulate on page load)
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  loader.classList.remove('hidden');
  setTimeout(() => loader.classList.add('hidden'), 900);
});
