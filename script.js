// --- ADVANCED FRONTEND FEATURES (2026 UPGRADE) --- //
// Loader
const loader = document.createElement('div');
loader.id = 'loader';
document.body.prepend(loader);
window.addEventListener('DOMContentLoaded', () => {
  loader.style.display = 'block';
  setTimeout(() => loader.style.display = 'none', 900);
});

// Theme Toggle (fixed in navbar)
const themeBtn = document.getElementById('theme-toggle');
function setTheme(dark) {
  if (dark) {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '☀️';
    themeBtn.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    themeBtn.textContent = '🌙';
    themeBtn.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}
setTheme(localStorage.getItem('theme') === 'dark');
themeBtn.onclick = () => setTheme(!document.body.classList.contains('dark-mode'));

// Navbar glass/blur effect on scroll (NO shrink/hide)
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  const curr = window.scrollY;
  if (curr > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Reveal on Scroll
const reveals = document.querySelectorAll('.reveal, .solution-card, .plan-card, .service-card');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => revealObs.observe(el));

// 3D Card Hover Effect
const cards = document.querySelectorAll('.solution-card, .plan-card, .service-card');
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;
    card.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) scale(1.04)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Scroll reveal
const revealElements = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  revealElements.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

function openTemplate() {
  document.getElementById("templateModal").style.display = "flex";
}
function closeTemplate() {
  document.getElementById("templateModal").style.display = "none";
}
// FAQ Toggle
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.parentElement;

    // Close other open FAQs (accordion behavior)
    document.querySelectorAll(".faq-item").forEach(faq => {
      if (faq !== item) faq.classList.remove("active");
    });

    // Toggle current
    item.classList.toggle("active");
  });
});

// Animated SVG Icons (for .footer-socials, .solution-card, etc.)
document.querySelectorAll('.footer-socials i, .solution-card i, .plan-card i').forEach(icon => {
  icon.addEventListener('mouseenter', () => icon.classList.add('fa-bounce'));
  icon.addEventListener('mouseleave', () => icon.classList.remove('fa-bounce'));
});

// Counter Animation (for stats, if present)
document.querySelectorAll('.counter').forEach(el => {
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
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      update();
      obs.disconnect();
    }
  }, { threshold: 0.5 });
  obs.observe(el);
});
// ================= PARALLAX SCROLLING ================= //
const heroSection = document.querySelector('.hero');
if (heroSection && window.innerWidth > 768) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroRect = heroSection.getBoundingClientRect();
    if (heroRect.top < window.innerHeight) {
      const offset = scrollY * 0.5;
      heroSection.style.backgroundPosition = `0 ${offset}px`;
    }
  });
}

// ================= FLOATING ACTION BUTTON (FAB) ================= //
const fabContainer = document.getElementById('fab-container');
const fabToggle = document.getElementById('fab-toggle');
let fabOpen = false;

if (fabContainer && fabToggle) {
  // Show FAB after scrolling 300px
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      fabContainer.classList.add('visible');
    } else {
      fabContainer.classList.remove('visible');
      if (fabOpen) {
        fabToggle.classList.remove('open');
        fabOpen = false;
      }
    }
  });

  // Toggle FAB menu
  fabToggle.addEventListener('click', () => {
    fabOpen = !fabOpen;
    fabToggle.classList.toggle('open', fabOpen);
  });

  // Close FAB menu when clicking a link
  document.querySelectorAll('.fab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      fabToggle.classList.remove('open');
      fabOpen = false;
    });
  });
}