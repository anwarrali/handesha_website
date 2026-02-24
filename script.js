// Default configuration
const defaultConfig = {
  hero_slogan: "Empowering Future Engineers",
  about_title: "About Our Club",
  about_description:
    "Handesha Sah is a dynamic engineering club dedicated to fostering innovation, collaboration, and excellence among aspiring engineers. We believe in learning by doing, where every project is an opportunity to grow and every challenge is a stepping stone to success.",
  contact_title: "Contact Us",
  primary_color: "#092b56",
  secondary_color: "#a3ddfd",
  text_color: "#092b56",
  background_color: "#ffffff",
  accent_color: "#0a4d8c",
  font_family: "Poppins",
  font_size: 16,
};

// Initialize Element SDK
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => {
      // Update hero slogan
      const heroSlogan = document.getElementById("hero-slogan");
      if (heroSlogan) {
        heroSlogan.textContent =
          config.hero_slogan || defaultConfig.hero_slogan;
      }

      // Update about section
      const aboutTitle = document.getElementById("about-title");
      if (aboutTitle) {
        aboutTitle.textContent =
          config.about_title || defaultConfig.about_title;
      }

      const aboutDesc = document.getElementById("about-description");
      if (aboutDesc) {
        aboutDesc.textContent =
          config.about_description || defaultConfig.about_description;
      }

      // Update contact title
      const contactTitle = document.getElementById("contact-title");
      if (contactTitle) {
        contactTitle.textContent =
          config.contact_title || defaultConfig.contact_title;
      }

      // Apply colors
      const primaryColor = config.primary_color || defaultConfig.primary_color;
      const secondaryColor =
        config.secondary_color || defaultConfig.secondary_color;
      const backgroundColor =
        config.background_color || defaultConfig.background_color;
      const accentColor = config.accent_color || defaultConfig.accent_color;

      document.documentElement.style.setProperty("--primary", primaryColor);
      document.documentElement.style.setProperty("--secondary", secondaryColor);
      document.documentElement.style.setProperty(
        "--background",
        backgroundColor,
      );
      document.documentElement.style.setProperty("--accent", accentColor);

      // Apply font family
      const fontFamily = config.font_family || defaultConfig.font_family;
      document.body.style.fontFamily = `${fontFamily}, sans-serif`;

      // Apply font size scaling
      const fontSize = config.font_size || defaultConfig.font_size;
      document.documentElement.style.fontSize = `${fontSize}px`;
    },
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () => config.background_color || defaultConfig.background_color,
          set: (value) => {
            config.background_color = value;
            window.elementSdk.setConfig({ background_color: value });
          },
        },
        {
          get: () => config.secondary_color || defaultConfig.secondary_color,
          set: (value) => {
            config.secondary_color = value;
            window.elementSdk.setConfig({ secondary_color: value });
          },
        },
        {
          get: () => config.primary_color || defaultConfig.primary_color,
          set: (value) => {
            config.primary_color = value;
            window.elementSdk.setConfig({ primary_color: value });
          },
        },
        {
          get: () => config.accent_color || defaultConfig.accent_color,
          set: (value) => {
            config.accent_color = value;
            window.elementSdk.setConfig({ accent_color: value });
          },
        },
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (value) => {
          config.font_family = value;
          window.elementSdk.setConfig({ font_family: value });
        },
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (value) => {
          config.font_size = value;
          window.elementSdk.setConfig({ font_size: value });
        },
      },
    }),
    mapToEditPanelValues: (config) =>
      new Map([
        ["hero_slogan", config.hero_slogan || defaultConfig.hero_slogan],
        ["about_title", config.about_title || defaultConfig.about_title],
        [
          "about_description",
          config.about_description || defaultConfig.about_description,
        ],
        ["contact_title", config.contact_title || defaultConfig.contact_title],
      ]),
  });
}

// Define the updateActivePeriod function FIRST
function updateActivePeriod() {
  const startDate = new Date("2025-04-01"); // April 2025
  const currentDate = new Date();

  let monthsActive = (currentDate.getFullYear() - startDate.getFullYear()) * 12;
  monthsActive -= startDate.getMonth();
  monthsActive += currentDate.getMonth();

  if (currentDate.getDate() < startDate.getDate()) {
    monthsActive--;
  }

  const yearsActive = Math.floor(monthsActive / 12);
  const remainingMonths = monthsActive % 12;

  const numberElement = document.getElementById("active-number");
  const textElement = document.getElementById("active-text");

  // Check if elements exist
  if (!numberElement || !textElement) {
    console.log("Active period elements not found yet");
    return;
  }

  const currentLang = document.documentElement.lang || "en";

  if (yearsActive < 1) {
    const monthsToShow = remainingMonths || 1; // Show at least 1 month
    numberElement.textContent = monthsToShow;

    if (currentLang === "ar") {
      textElement.textContent = monthsToShow === 1 ? "شهر نشط" : "أشهر نشطة";
      textElement.setAttribute("data-i18n", "about.stats.months");
    } else {
      textElement.textContent = `month${monthsToShow > 1 ? "s" : ""} Active`;
      textElement.setAttribute("data-i18n", "about.stats.months");
    }
  } else {
    numberElement.textContent = yearsActive;

    if (currentLang === "ar") {
      textElement.textContent = yearsActive === 1 ? "سنة نشط" : "سنوات نشطة";
      textElement.setAttribute("data-i18n", "about.stats.years");
    } else {
      textElement.textContent = `year${yearsActive > 1 ? "s" : ""} Active`;
      textElement.setAttribute("data-i18n", "about.stats.years");
    }
  }

  console.log(
    `Active period updated: ${yearsActive} years, ${remainingMonths} months`,
  );
}

// Then add all your event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Call updateActivePeriod immediately
  updateActivePeriod();

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const successMsg = document.getElementById("form-success");
      if (successMsg) {
        successMsg.classList.remove("hidden");

        setTimeout(() => {
          successMsg.classList.add("hidden");
        }, 5000);
      }
    });
  }

  const revealElements = document.querySelectorAll(".reveal");

  function checkReveal() {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", checkReveal);
  checkReveal();

  const navbar = document.querySelector("nav");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("shadow-md");
      } else {
        navbar.classList.remove("shadow-md");
      }
    });
  }

  const memberBtn = document.getElementById("member-btn");
  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSev7pXZutFCqne3u9GGefEN26efqq_EMd3-RnRcOiucF7Cy_g/viewform";

  const MEMBERSHIP_START = new Date("2026-09-21");
  const MEMBERSHIP_END = new Date("2026-9-30");

  if (memberBtn) {
    memberBtn.addEventListener("click", function () {
      const currentDate = new Date();

      if (currentDate >= MEMBERSHIP_START && currentDate <= MEMBERSHIP_END) {
        window.open(GOOGLE_FORM_URL, "_blank");
      } else {
        showMembershipMessage();
      }
    });
  }

  document.addEventListener("languageChanged", function (e) {
    const memberBtn = document.getElementById("member-btn");
    const memberPrompt = document.querySelector(
      ".footer .text-white\\/80.text-sm.mb-4",
    );

    if (window.i18n && memberBtn) {
      const span = memberBtn.querySelector("span");
      if (span) {
        span.textContent = window.i18n.t("contact.social.memberButton");
      }
    }

    // Update active period when language changes
    updateActivePeriod();
  });

  function showMembershipMessage() {
    let messageDiv = document.getElementById("membership-message");

    if (!messageDiv) {
      messageDiv = document.createElement("div");
      messageDiv.id = "membership-message";
      messageDiv.className =
        "fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-xl shadow-xl z-[9999] transform transition-all duration-500 animate-slide-in";
      messageDiv.style.maxWidth = "300px";
      document.body.appendChild(messageDiv);
    }

    const currentLang = document.documentElement.lang || "en";
    const translations = window.i18n
      ? window.i18n.translations[currentLang]
      : null;

    if (translations && translations.footer && translations.footer.membership) {
      const msg = translations.footer.membership;
      messageDiv.innerHTML = `
            <div class="flex items-start gap-3">
                <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <p class="font-bold mb-1">${msg.title}</p>
                    <p class="text-sm opacity-90">${msg.message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="text-white/80 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        `;
    } else {
      if (currentLang === "ar") {
        messageDiv.innerHTML = `
                <div class="flex items-start gap-3">
                    <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p class="font-bold mb-1">التسجيل مغلق</p>
                        <p class="text-sm opacity-90">التسجيل لعضوية النادي غير متاح حالياً. يرجى المتابعة معنا على وسائل التواصل لمعرفة مواعيد فتح باب العضوية.</p>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" class="text-white/80 hover:text-white">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            `;
      } else {
        messageDiv.innerHTML = `
                <div class="flex items-start gap-3">
                    <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p class="font-bold mb-1">Membership Closed</p>
                        <p class="text-sm opacity-90">Membership registration is not open at this time. Please follow us on social media for updates on when membership opens.</p>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" class="text-white/80 hover:text-white">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            `;
      }
    }

    setTimeout(() => {
      if (messageDiv && messageDiv.parentNode) {
        messageDiv.style.opacity = "0";
        messageDiv.style.transform = "translateX(100%)";
        setTimeout(() => {
          if (messageDiv.parentNode) {
            messageDiv.remove();
          }
        }, 500);
      }
    }, 8000);
  }
});

window.addEventListener("load", function () {
  updateActivePeriod();
});
