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
