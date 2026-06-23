// Reveal-on-scroll animation
(function () {
  const targets = document.querySelectorAll(
    ".section-title, .card, .format-card, .arrow-list li, .check-list li, .hero-facts li, .pull-quote, .lead-text, .result-final, .author-block"
  );
  targets.forEach((el) => el.setAttribute("data-reveal", ""));

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  targets.forEach((el) => io.observe(el));
})();

// Signup form (front-end only — no backend wired up)
(function () {
  const form = document.getElementById("signupForm");
  if (!form) return;
  const success = document.getElementById("formSuccess");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const contact = form.contact.value.trim();
    if (!name || !contact) {
      form.reportValidity();
      return;
    }
    // No backend yet: store locally and confirm to the user.
    try {
      const leads = JSON.parse(localStorage.getItem("course_leads") || "[]");
      leads.push({
        name,
        contact,
        comment: form.comment.value.trim(),
        at: new Date().toISOString(),
      });
      localStorage.setItem("course_leads", JSON.stringify(leads));
    } catch (_) {}

    form.querySelector('button[type="submit"]').disabled = true;
    if (success) success.hidden = false;
    form.reset();
  });
})();
