// ================= LOADER =================
const loader = document.createElement('div');
loader.id = 'loader';
document.body.prepend(loader);

window.addEventListener('DOMContentLoaded', () => {
  loader.style.display = 'block';
  setTimeout(() => loader.style.display = 'none', 900);
});

// ================= THEME TOGGLE =================
const themeBtn = document.getElementById('theme-toggle');

function setTheme(dark) {
  document.body.classList.toggle('dark-mode', dark);
  themeBtn.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

setTheme(localStorage.getItem('theme') === 'dark');

themeBtn?.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark-mode'));
});

// ================= NAVBAR SCROLL EFFECT =================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 30);
});

// ================= REVEAL ON SCROLL =================
const revealObs = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document
  .querySelectorAll('.reveal, .solution-card, .plan-card, .service-card')
  .forEach(el => revealObs.observe(el));

// ================= 3D CARD HOVER =================
document
  .querySelectorAll('.solution-card, .plan-card, .service-card')
  .forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      card.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

// ================= FAQ =================
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    document.querySelectorAll('.faq-item').forEach(f => {
      if (f !== item) f.classList.remove('active');
    });
    item.classList.toggle('active');
  });
});

// ================= ICON HOVER =================
document.querySelectorAll('.footer-socials i').forEach(icon => {
  icon.addEventListener('mouseenter', () => icon.classList.add('fa-bounce'));
  icon.addEventListener('mouseleave', () => icon.classList.remove('fa-bounce'));
});

// ================= COUNTERS =================
document.querySelectorAll('.counter').forEach(el => {
  const target = +el.dataset.target;
  let curr = 0;
  const step = Math.ceil(target / 60);

  const update = () => {
    curr += step;
    if (curr >= target) {
      el.textContent = target;
    } else {
      el.textContent = curr;
      requestAnimationFrame(update);
    }
  };

  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      update();
    }
  }).observe(el);
});

// ================= FAB =================
const fabContainer = document.getElementById('fab-container');
const fabToggle = document.getElementById('fab-toggle');

let fabOpen = false;

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) fabContainer?.classList.add('visible');
  else fabContainer?.classList.remove('visible');
});

fabToggle?.addEventListener('click', () => {
  fabOpen = !fabOpen;
  fabToggle.classList.toggle('open', fabOpen);
});
