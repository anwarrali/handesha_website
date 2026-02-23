class I18n {
  constructor() {
    this.translations = null;
    this.currentLang = localStorage.getItem("preferredLanguage") || "en";
    this.init();
  }

  async init() {
    await this.loadTranslations();
    this.setupLanguageButtons();
    this.applyTranslations();
    this.setupDirection();
    this.hideLoading();
  }

  async loadTranslations() {
    try {
      const response = await fetch("translations.json");
      this.translations = await response.json();
      console.log("Translations loaded successfully");
    } catch (error) {
      console.error("Failed to load translations:", error);
    }
  }

  setupLanguageButtons() {
    // Update active state of language buttons
    document
      .getElementById("lang-en")
      .classList.toggle("active", this.currentLang === "en");
    document
      .getElementById("lang-ar")
      .classList.toggle("active", this.currentLang === "ar");
  }

  changeLanguage(lang) {
    if (lang === this.currentLang) return;

    this.currentLang = lang;
    localStorage.setItem("preferredLanguage", lang);

    // Update button states
    this.setupLanguageButtons();

    // Apply translations
    this.applyTranslations();

    // Setup direction (RTL/LTR)
    this.setupDirection();

    // Trigger any custom events
    document.dispatchEvent(
      new CustomEvent("languageChanged", { detail: { language: lang } }),
    );
  }

  applyTranslations() {
    if (!this.translations) return;

    const langData = this.translations[this.currentLang];

    // Update all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = this.getNestedTranslation(langData, key);

      if (translation) {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          element.placeholder = translation;
        } else if (element.tagName === "META") {
          element.setAttribute("content", translation);
        } else {
          element.textContent = translation;
        }
      }
    });

    // Update placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      const translation = this.getNestedTranslation(langData, key);
      if (translation) {
        element.placeholder = translation;
      }
    });

    // Update page title
    const titleElement = document.querySelector("title");
    if (titleElement) {
      titleElement.textContent = `${langData.common.siteName}`;
    }

    // Update HTML lang attribute
    document.documentElement.lang = this.currentLang;
  }

  getNestedTranslation(obj, path) {
    return path
      .split(".")
      .reduce(
        (current, key) => (current && current[key] ? current[key] : null),
        obj,
      );
  }

  setupDirection() {
    if (this.currentLang === "ar") {
      document.documentElement.dir = "rtl";
      document.body.classList.add("rtl");
    } else {
      document.documentElement.dir = "ltr";
      document.body.classList.remove("rtl");
    }
  }

  hideLoading() {
    const overlay = document.getElementById("loading-overlay");
    if (overlay) {
      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 500);
    }
  }

  // Helper method to get translation programmatically
  t(key, params = {}) {
    if (!this.translations) return key;

    let text =
      this.getNestedTranslation(this.translations[this.currentLang], key) ||
      key;

    // Replace parameters
    Object.keys(params).forEach((param) => {
      text = text.replace(`{{${param}}}`, params[param]);
    });

    return text;
  }
}

// Initialize i18n when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.i18n = new I18n();
});
