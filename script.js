// Scroll reveal - Guard against missing elements
const reveals = document.querySelectorAll(".reveal");
if (reveals.length > 0) {
  window.addEventListener("scroll", () => {
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  });
}

// Navbar shrink effect - Guard against missing navbar
const navbar = document.querySelector(".navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("shrink", window.scrollY > 50);
  });
}

// FAQ Toggle - Guard against missing FAQ elements
const faqQuestions = document.querySelectorAll(".faq-question");
if (faqQuestions.length > 0) {
  faqQuestions.forEach(button => {
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
}

// Modal functions commented out - not used in current HTML
// function openLogin() {
//   const modal = document.getElementById("loginModal");
//   if (modal) modal.style.display = "flex";
// }
// function closeLogin() {
//   const modal = document.getElementById("loginModal");
//   if (modal) modal.style.display = "none";
// }
// function openTemplate() {
//   const modal = document.getElementById("templateModal");
//   if (modal) modal.style.display = "flex";
// }
// function closeTemplate() {
//   const modal = document.getElementById("templateModal");
//   if (modal) modal.style.display = "none";
// }
