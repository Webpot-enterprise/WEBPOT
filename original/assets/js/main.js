const PRELOADER_DURATION = 700;

function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("active");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  elements.forEach((element) => observer.observe(element));
}

function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  preloader.classList.add("is-hidden");
  window.setTimeout(() => {
    if (preloader.parentNode) {
      preloader.remove();
    }
  }, 500);
}

function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const finish = () => window.setTimeout(hidePreloader, PRELOADER_DURATION);

  if (document.readyState === "complete") {
    finish();
  } else {
    window.addEventListener("load", finish, { once: true });
  }
}

function handleContactStatus() {
  const statusElement = document.getElementById("quick-form-status");
  if (!statusElement) return;

  const statusMap = {
    success: {
      text: "Message successfully received by Webpot. We'll contact you soon!",
      className: "is-success"
    },
    partial: {
      text: "Message received by Webpot. Confirmation email could not be sent to your inbox.",
      className: "is-warning"
    },
    invalid: {
      text: "Please submit a valid contact request with required details.",
      className: "is-error"
    },
    error: {
      text: "We could not send your message right now. Please try again or email info@webpot.co.in.",
      className: "is-error"
    }
  };

  const params = new URLSearchParams(window.location.search);
  const status = params.get("contact_status");
  if (!status || !statusMap[status]) return;

  const selected = statusMap[status];
  statusElement.textContent = selected.text;
  statusElement.classList.add("is-visible", selected.className);

  params.delete("contact_status");
  const newQuery = params.toString();
  const newUrl = `${window.location.pathname}${newQuery ? `?${newQuery}` : ""}${window.location.hash}`;
  window.history.replaceState({}, document.title, newUrl);
}

function initFaq() {
  const faqButtons = document.querySelectorAll(".faq-question");
  if (!faqButtons.length) return;

  faqButtons.forEach((button, index) => {
    const item = button.closest(".faq-item");
    const answer = item ? item.querySelector(".faq-answer") : null;
    if (!item || !answer) return;

    if (!answer.id) {
      answer.id = `faq-answer-${index + 1}`;
    }

    button.setAttribute("aria-controls", answer.id);
    button.setAttribute("aria-expanded", item.classList.contains("active") ? "true" : "false");

    button.addEventListener("click", () => {
      const willOpen = !item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach((faqItem) => {
        const faqButton = faqItem.querySelector(".faq-question");
        faqItem.classList.remove("active");
        if (faqButton) {
          faqButton.setAttribute("aria-expanded", "false");
        }
      });

      if (willOpen) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function animateCounter(counter) {
  if (counter.dataset.counted === "true") return;

  const target = Number(counter.getAttribute("data-target"));
  if (!Number.isFinite(target)) return;

  counter.dataset.counted = "true";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    counter.textContent = String(target);
    return;
  }

  const duration = 1400;
  const startTime = performance.now();

  const update = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = String(Math.round(target * eased));

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = String(target);
    }
  };

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.55 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");
  if (!dropdowns.length) return;

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      dropdowns.forEach((item) => {
        if (item !== dropdown) {
          item.classList.remove("active");
        }
      });
      dropdown.classList.toggle("active");
    });
  });

  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("active");
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
  });
}

function initStickyNav() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const updateNavbar = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });
}

function initSmoothScroll() {
  const samePageAnchors = document.querySelectorAll('a[href^="#"]');
  if (!samePageAnchors.length) return;

  samePageAnchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState({}, document.title, targetId);
    });
  });
}

function initTemplateControls() {
  window.openTemplate = function openTemplate() {
    const modal = document.getElementById("templateModal");
    if (modal) {
      modal.style.display = "flex";
    }
  };

  window.closeTemplate = function closeTemplate() {
    const modal = document.getElementById("templateModal");
    if (modal) {
      modal.style.display = "none";
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  revealOnScroll();
  initPreloader();
  handleContactStatus();
  initFaq();
  initCounters();
  initDropdowns();
  initStickyNav();
  initSmoothScroll();
  initTemplateControls();
});
