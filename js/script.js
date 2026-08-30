document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. THEME TOGGLE (Event Listener Only)
  // ==========================================================================
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // ==========================================================================
  // 2. MOBILE NAVIGATION MENU TOGGLE
  // ==========================================================================
  const mobileToggle = document.getElementById("mobileMenuToggle");
  const navList = document.getElementById("primaryNav");

  if (mobileToggle && navList) {
    mobileToggle.addEventListener("click", () => {
      navList.classList.toggle("active");
    });
  }

  // ==========================================================================
  // 3. PORTFOLIO CATEGORY FILTERING
  // ==========================================================================
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".portfolio-item");

  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active-filter"));
        btn.classList.add("active-filter");

        const filterValue = btn.getAttribute("data-filter");

        projectCards.forEach((card) => {
          const category = card.getAttribute("data-category");
          if (filterValue === "all" || filterValue === category) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // ==========================================================================
  // 4. CONTACT FORM VALIDATION & SUBMISSION TO EMAIL
  // ==========================================================================
  const contactForm = document.getElementById("contactForm");
  const statusBox = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");

  if (contactForm && statusBox) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Completely stops the page from redirecting

      const name = document.getElementById("userName").value.trim();
      const email = document.getElementById("userEmail").value.trim();
      const message = document.getElementById("userMsg").value.trim();

      if (!name || !email || !message) {
        statusBox.className = "status-box error";
        statusBox.textContent = "⚠️ Please fill out all fields.";
        statusBox.style.display = "block";
        return;
      }

      // Set loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending... ⏳";
      }
      statusBox.className = "status-box";
      statusBox.style.display = "block";
      statusBox.textContent = "Sending your message...";

      // Replace 'YOUR_FORM_ID' with your Formspree Form ID
      const endpoint = "https://formspree.io/f/xdeokblb";

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
          }),
        });

        if (response.ok) {
          statusBox.className = "status-box success";
          statusBox.textContent =
            "✨ Message sent successfully! I will get back to you soon.";
          contactForm.reset();
        } else {
          const data = await response.json();
          statusBox.className = "status-box error";
          statusBox.textContent = data.errors
            ? data.errors.map((err) => err.message).join(", ")
            : "⚠️ Failed to send message. Please try again.";
        }
      } catch (err) {
        statusBox.className = "status-box error";
        statusBox.textContent =
          "⚠️ Network error. Please check your connection and try again.";
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message 🚀";
        }
        setTimeout(() => {
          statusBox.style.display = "none";
        }, 6000);
      }
    });
  }
});
