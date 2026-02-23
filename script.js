function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  preloader.classList.add("is-hidden");
  window.setTimeout(() => preloader.remove(), 500);
}

const PRELOADER_DURATION = 5000;

if (document.readyState === "complete") {
  window.setTimeout(hidePreloader, PRELOADER_DURATION);
} else {
  window.addEventListener("load", () => {
    window.setTimeout(hidePreloader, PRELOADER_DURATION);
  });
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

window.addEventListener("DOMContentLoaded", handleContactStatus);

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
// ================= COUNTER ANIMATION =================

const counters = document.querySelectorAll(".counter");

const runCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  let count = 0;
  const increment = target / 100;

  const update = () => {
    count += increment;
    if (count < target) {
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  };

  update();
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

counters.forEach(counter => observer.observe(counter));
// ================= DROPDOWN CLICK FIX =================

const dropdown = document.querySelector(".dropdown");
const toggle = document.querySelector(".dropdown-toggle");

toggle.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("active");
});

// Close when clicking outside
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});