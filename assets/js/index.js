// dark and light mode
const themeToggleButton = document.getElementById("theme-toggle-button");
const htmlElement = document.documentElement;

function updateAccessibilityAttributes(isDark) {
  themeToggleButton.setAttribute("aria-pressed", isDark ? "true" : "false");
}

const isSavedDark = localStorage.getItem("theme") === "dark";
const isSystemDark =
  !("theme" in localStorage) &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

if (isSavedDark || isSystemDark) {
  htmlElement.classList.add("dark");
  updateAccessibilityAttributes(true);
} else {
  htmlElement.classList.remove("dark");
  updateAccessibilityAttributes(false);
}
themeToggleButton.addEventListener("click", () => {
  const isDarkModeNow = htmlElement.classList.toggle("dark");
  localStorage.setItem("theme", isDarkModeNow ? "dark" : "light");
  updateAccessibilityAttributes(isDarkModeNow);
});

// ********************** Active link ************************** \\
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

const observerOptions = {
  root: null,
  rootMargin: "-30% 0px -50% 0px",
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);

    if (entry.isIntersecting) {
      const currentId = entry.target.getAttribute("id");

      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section)); // المسئول عن مراقبة كل سكشن

//  ***************************** Nav & tags    *********************************************8

const filterButtons = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove(
        "active",
        "bg-linear-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
      );
      btn.classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
      );
      btn.setAttribute("aria-pressed", "false");
    });

    button.classList.add(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
    );
    button.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
    );
    button.setAttribute("aria-pressed", "true");

    const filterValue = button.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      item.style.transition = "all 0.4s ease-in-out";

      if (filterValue === "all" || filterValue === itemCategory) {
        item.style.opacity = "1";
        item.style.transform = "scale(1)";
        item.style.display = "block";
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        setTimeout(() => {
          if (
            button.getAttribute("data-filter") !== "all" &&
            itemCategory !== button.getAttribute("data-filter")
          ) {
            item.style.display = "none";
          }
        }, 300);
      }
    });
  });
});

// ****************  scroll to up ************************

//scroll part ;
const scrollToTopBtn = document.getElementById("scroll-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.remove("opacity-0", "invisible");
    scrollToTopBtn.classList.add("opacity-100", "visible");
  } else {
    scrollToTopBtn.classList.remove("opacity-100", "visible");
    scrollToTopBtn.classList.add("opacity-0", "invisible");
  }
});

///   ********************   click part to top   *********************
if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

//   ********************  sidbar setting  ***************************

const settingsToggle = document.getElementById("settings-toggle");
const settingsSidebar = document.getElementById("settings-sidebar");
const closeSettings = document.getElementById("close-settings");
const resetSettings = document.getElementById("reset-settings");
const fontOptions = document.querySelectorAll(".font-option");
const colorsGrid = document.getElementById("theme-colors-grid");

const DEFAULTS = {
  font: "tajawal",
  themeName: "indigo",
  primary: "#4f46e5",
  accent: "#818cf8",
};

const themeColors = [
  { name: "indigo", primary: "#4f46e5", accent: "#818cf8" },
  { name: "emerald", primary: "#059669", accent: "#34d399" },
  { name: "cyan", primary: "#0891b2", accent: "#22d3ee" },
  { name: "rose", primary: "#e11d48", accent: "#fb7185" },
  { name: "amber", primary: "#d97706", accent: "#fbbf24" },
  { name: "violet", primary: "#7c3aed", accent: "#a78bfa" },
  { name: "fuchsia", primary: "#c026d3", accent: "#e879f9" },
  { name: "sky", primary: "#0284c7", accent: "#38bdf8" },
];

function toggleSidebar(open) {
  if (!settingsSidebar || !settingsToggle) return;

  settingsToggle.setAttribute("aria-expanded", open);
  settingsSidebar.setAttribute("aria-hidden", !open);

  open
    ? settingsSidebar.classList.remove("translate-x-full")
    : settingsSidebar.classList.add("translate-x-full");
}

if (settingsToggle) {
  settingsToggle.addEventListener("click", () => {
    const isExpanded = settingsToggle.getAttribute("aria-expanded") === "true";
    toggleSidebar(!isExpanded); //    لو كان مفتوح اقفلة او لوكان مقفول افتحة
  });
}

if (closeSettings) {
  closeSettings.addEventListener("click", () => toggleSidebar(false));
}

function setFont(fontName) {
  document.body.classList.remove(
    "font-alexandria",
    "font-tajawal",
    "font-cairo",
  );
  document.body.classList.add(`font-${fontName}`);

  fontOptions.forEach((btn) => {
    const isActive = btn.getAttribute("data-font") === fontName;

    const action = isActive ? "add" : "remove";
    btn.classList[action](
      "active",
      "border-primary",
      "bg-slate-50",
      "dark:bg-slate-800/50",
    );

    btn.setAttribute("aria-checked", isActive ? "true" : "false");
  });

  localStorage.setItem("user-font", fontName);
}

fontOptions.forEach((option) => {
  option.addEventListener("click", () =>
    setFont(option.getAttribute("data-font")),
  );
});

function applyThemeColor(primary, accent, themeName) {
  document.documentElement.style.setProperty("--color-primary", primary);
  document.documentElement.style.setProperty("--color-accent", accent);

  localStorage.setItem("user-theme-primary", primary);
  localStorage.setItem("user-theme-accent", accent);
  localStorage.setItem("user-theme-name", themeName);

  document.querySelectorAll(".color-option").forEach((btn) => {
    const isActive = btn.getAttribute("data-theme") === themeName;
    const action = isActive ? "add" : "remove";

    btn.classList[action](
      "active-color",
      "ring-4",
      "ring-offset-2",
      "ring-primary",
      "dark:ring-offset-slate-900",
    );
  });
}

if (colorsGrid) {
  colorsGrid.innerHTML = "";

  themeColors.forEach((color) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className =
      "color-option w-full h-12 rounded-full transition-all duration-300 cursor-pointer relative border-2 border-transparent";
    btn.style.backgroundColor = color.primary;
    btn.style.setProperty("--theme-color", color.primary);
    btn.setAttribute("data-theme", color.name);
    btn.setAttribute("aria-label", `ثيم اللون ${color.name}`);

    btn.innerHTML = `<span class="absolute bottom-1 left-1 w-3 h-3 rounded-full" style="background-color: ${color.accent}"></span>`;

    btn.addEventListener("click", () =>
      applyThemeColor(color.primary, color.accent, color.name),
    );

    colorsGrid.appendChild(btn);
  });
}

if (resetSettings) {
  resetSettings.addEventListener("click", () => {
    setFont(DEFAULTS.font);
    applyThemeColor(DEFAULTS.primary, DEFAULTS.accent, DEFAULTS.themeName);
  });
}

const savedFont = localStorage.getItem("user-font") || DEFAULTS.font;
const savedPrimary =
  localStorage.getItem("user-theme-primary") || DEFAULTS.primary;
const savedAccent =
  localStorage.getItem("user-theme-accent") || DEFAULTS.accent;
const savedThemeName =
  localStorage.getItem("user-theme-name") || DEFAULTS.themeName;

setFont(savedFont);
applyThemeColor(savedPrimary, savedAccent, savedThemeName);

//  *************************  slider  setting ****************************

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("testimonials-carousel");
  const cards = document.querySelectorAll(".testimonial-card");
  const nextBtn = document.getElementById("next-testimonial");
  const prevBtn = document.getElementById("prev-testimonial");
  const indicators = document.querySelectorAll(".carousel-indicator");

  let currentIndex = 0;
  const totalCards = cards.length;

  function getVisibleCardsCount() {
    if (window.innerWidth >= 1024) return 3; // lg:w-1/3
    if (window.innerWidth >= 640) return 2; // sm:w-1/2
    return 1;
  }

  function updateCarousel() {
    const visibleCards = getVisibleCardsCount();
    const maxIndex = Math.max(0, totalCards - visibleCards);

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    const cardWidth = 100 / visibleCards;
    const offset = currentIndex * cardWidth;

    carousel.style.transform = `translateX(${offset}%)`;

    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add("bg-accent");
        indicator.classList.remove("bg-slate-400", "dark:bg-slate-600");
        indicator.setAttribute("aria-selected", "true");
      } else {
        indicator.classList.remove("bg-accent");
        indicator.classList.add("bg-slate-400");
        indicator.setAttribute("aria-selected", "false");
      }
    });
  }

  nextBtn.addEventListener("click", () => {
    const visibleCards = getVisibleCardsCount();
    if (currentIndex < totalCards - visibleCards) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    const visibleCards = getVisibleCardsCount();
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = Math.max(0, totalCards - visibleCards);
    }
    updateCarousel();
  });

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", (e) => {
      currentIndex = parseInt(e.target.getAttribute("data-index"));
      updateCarousel();
    });
  });

  window.addEventListener("resize", updateCarousel);
  updateCarousel();
});

//*******************/    form setting          ******************
const form = document.querySelector("form");
const selectWrappers = document.querySelectorAll(".custom-select-wrapper");

selectWrappers.forEach((wrapper) => {
  const select = wrapper.querySelector(".custom-select");
  const optionsMenu = wrapper.querySelector(".custom-options");
  const options = wrapper.querySelectorAll(".custom-option");
  const selectedText = wrapper.querySelector(".selected-text");

  select.addEventListener("click", (e) => {
    e.stopPropagation();
    const isExpanded = select.getAttribute("aria-expanded") === "true";
    closeAllSelects();
    select.setAttribute("aria-expanded", isExpanded ? "false" : "true");
    optionsMenu.classList[isExpanded ? "add" : "remove"]("hidden");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const val = option.getAttribute("data-value");
      selectedText.textContent = val;
      selectedText.classList.remove("text-slate-500", "dark:text-slate-400");
      select.setAttribute("data-selected-value", val);
      options.forEach((opt) =>
        opt.setAttribute("aria-selected", opt === option ? "true" : "false"),
      );
      select.setAttribute("aria-expanded", "false");
      optionsMenu.classList.add("hidden");
    });
  });
});

const closeAllSelects = () => {
  document
    .querySelectorAll(".custom-select")
    .forEach((sel) => sel.setAttribute("aria-expanded", "false"));
  document
    .querySelectorAll(".custom-options")
    .forEach((opt) => opt.classList.add("hidden"));
};
document.addEventListener("click", closeAllSelects);

form
  .querySelectorAll("input[required], textarea[required]")
  .forEach((input) => {
    input.addEventListener("input", () => {
      const parentDiv = input.closest("div");
      const errorMsg = parentDiv.querySelector(".error-msg");

      if (errorMsg) {
        errorMsg.classList.add("hidden");
      }
      input.classList.remove("border-red-500", "focus:border-red-500");
      input.classList.add("border-slate-300", "dark:border-slate-600");
    });
  });

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    let isFormValid = true;

    // 1. التحقق من الحقول الأساسية التي تحتوي على Required
    const requiredInputs = form.querySelectorAll(
      "input[required], textarea[required]",
    );

    requiredInputs.forEach((input) => {
      const parentDiv = input.closest("div");
      const errorMsg = parentDiv.querySelector(".error-msg");

      if (input.value.trim() === "") {
        isFormValid = false;

        if (errorMsg) {
          errorMsg.classList.remove("hidden");
        }
        input.classList.add("border-red-500", "focus:border-red-500");
        input.classList.remove("border-slate-300", "dark:border-slate-600");
      } else {
        if (errorMsg) {
          errorMsg.classList.add("hidden");
        }
        input.classList.remove("border-red-500", "focus:border-red-500");
        input.classList.add("border-slate-300", "dark:border-slate-600");
      }
    });

    selectWrappers.forEach((wrapper) => {
      const select = wrapper.querySelector(".custom-select");
      const name = select.getAttribute("data-name");
      const value = select.getAttribute("data-selected-value");

      if (!value) {
        isFormValid = false;
        select.classList.add("border-red-500", "focus:border-red-500");
      } else {
        select.classList.remove("border-red-500", "focus:border-red-500");
        data[name] = value;
      }
    });

    if (!isFormValid) {
      Swal.fire({
        title: "عذراً!",
        text: "يرجى ملء كافة الحقول المطلوبة واختيار نوع المشروع والميزانية المتوقعة قبل الإرسال.",
        icon: "warning",
        confirmButtonText: "تمام، فهمت",
        confirmButtonColor: "#3b82f6",
        customClass: {
          popup: "rounded-2xl dark:bg-slate-800 dark:text-white",
        },
      });
    } else {
      Swal.fire({
        title: "تم الإرسال بنجاح!",
        text: "شكراً لتواصلك معي يا غالي، هراجع تفاصيل مشروعك وأرد عليك في أقرب وقت.",
        icon: "success",
        confirmButtonText: "رائع",
        confirmButtonColor: "#10b981",
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "rounded-2xl dark:bg-slate-800 dark:text-white",
        },
      });

      form.reset();

      document.querySelectorAll(".selected-text").forEach((txt) => {
        txt.textContent = txt.closest("[data-name='budget']")
          ? "اختر الميزانية"
          : "اختر نوع المشروع";
        txt.classList.add("text-slate-500", "dark:text-slate-400");
      });

      document.querySelectorAll(".custom-select").forEach((sel) => {
        sel.removeAttribute("data-selected-value");
        sel.classList.remove("border-red-500", "focus:border-red-500");
      });
    }
  });
}
