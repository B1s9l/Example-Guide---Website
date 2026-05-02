document.documentElement.classList.add("js-enabled");

window.THEME_MANAGER_CONFIG = {
  "themePickerEnabled": true,
  "useSystemSettings": true,
  "defaultTheme": "Default.light",
  "themes": [
    {
      "name": "Default",
      "type": "standard",
      "hasDark": true,
      "swatch": "#0f766e"
    },
    {
      "name": "My Custom Theme",
      "type": "custom",
      "hasDark": true,
      "swatch": "#2563eb"
    }
  ]
};
window.LANGUAGE_MANAGER_CONFIG = {
  "defaultLanguage": "en",
  "languages": [
    {
      "name": "en"
    },
    {
      "name": "de"
    }
  ]
};

(function () {
  var config = window.THEME_MANAGER_CONFIG;
  if (!config || !config.themes || !config.themes.length) {
    return;
  }

  var root = document.documentElement;
  var storageKey = "website-theme";
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  var current = readStoredTheme() || parseThemeRef(config.defaultTheme);

  if (config.useSystemSettings && prefersDark) {
    current.mode = prefersDark.matches ? "dark" : "light";
  }

  applyTheme(current.theme, current.mode);
  if (config.themePickerEnabled) {
    createThemePicker();
  }

  if (config.useSystemSettings && prefersDark && prefersDark.addEventListener) {
    prefersDark.addEventListener("change", function (event) {
      current.mode = event.matches ? "dark" : "light";
      applyTheme(current.theme, current.mode);
      writeStoredTheme(current.theme, current.mode);
      updatePickerState();
    });
  }

  function parseThemeRef(value) {
    var index = value.lastIndexOf(".");
    return {
      theme: index > -1 ? value.slice(0, index) : config.themes[0].name,
      mode: index > -1 ? value.slice(index + 1) : "light"
    };
  }

  function readStoredTheme() {
    try {
      var value = window.localStorage.getItem(storageKey);
      return value ? parseThemeRef(value) : null;
    } catch (error) {
      return null;
    }
  }

  function writeStoredTheme(theme, mode) {
    try {
      window.localStorage.setItem(storageKey, theme + "." + mode);
    } catch (error) {}
  }

  function findTheme(name) {
    return config.themes.find(function (theme) {
      return theme.name === name;
    }) || config.themes[0];
  }

  function applyTheme(themeName, mode) {
    var theme = findTheme(themeName);
    var nextMode = mode;
    if (nextMode === "dark" && !theme.hasDark) {
      nextMode = "light";
    }
    current = { theme: theme.name, mode: nextMode };
    root.setAttribute("data-theme", current.theme);
    root.setAttribute("data-mode", current.mode);
    root.style.colorScheme = current.mode === "dark" ? "dark" : "light";
  }

  function createThemePicker() {
    var picker = document.createElement("div");
    picker.className = "theme-picker";
    picker.setAttribute("aria-label", "Theme picker");

    config.themes.forEach(function (theme) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "theme-picker-button";
      button.style.setProperty("--theme-swatch", theme.swatch);
      button.setAttribute("aria-label", theme.name);
      button.addEventListener("click", function () {
        applyTheme(theme.name, current.mode);
        writeStoredTheme(current.theme, current.mode);
        updatePickerState();
      });
      picker.appendChild(button);
    });

    var modeButton = document.createElement("button");
    modeButton.type = "button";
    modeButton.className = "theme-picker-button theme-mode-toggle";
    modeButton.addEventListener("click", function () {
      applyTheme(current.theme, current.mode === "dark" ? "light" : "dark");
      writeStoredTheme(current.theme, current.mode);
      updatePickerState();
    });
    picker.appendChild(modeButton);

    document.body.appendChild(picker);
    updatePickerState();
  }

  function updatePickerState() {
    var picker = document.querySelector(".theme-picker");
    if (!picker) {
      return;
    }
    Array.prototype.forEach.call(picker.querySelectorAll(".theme-picker-button:not(.theme-mode-toggle)"), function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("aria-label") === current.theme ? "true" : "false");
    });
    var modeButton = picker.querySelector(".theme-mode-toggle");
    if (modeButton) {
      var isDark = current.mode === "dark";
      modeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      modeButton.innerHTML = isDark ? moonIcon() : sunIcon();
    }
  }

  function sunIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>';
  }

  function moonIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.99 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 20.99 12.79Z"></path></svg>';
  }
})();

(function () {
  var config = window.LANGUAGE_MANAGER_CONFIG;
  if (!config || !config.languages || !config.languages.length) {
    return;
  }

  var root = document.documentElement;
  var storageKey = "website-language";
  var currentLanguage = readStoredLanguage() || config.defaultLanguage;
  var fallbackLanguage = config.defaultLanguage || "en";
  var translations = {};

  window.languageManager = {
    get currentLanguage() {
      return currentLanguage;
    },
    setLanguage: setLanguage,
    t: translate
  };

  setLanguage(currentLanguage);

  function readStoredLanguage() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function writeStoredLanguage(language) {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch (error) {}
  }

  function isConfiguredLanguage(language) {
    return config.languages.some(function (item) {
      return item.name === language;
    });
  }

  function setLanguage(language) {
    var nextLanguage = isConfiguredLanguage(language) ? language : fallbackLanguage;
    currentLanguage = nextLanguage;
    root.setAttribute("lang", currentLanguage);
    root.setAttribute("data-language", currentLanguage);
    writeStoredLanguage(currentLanguage);
    updatePickers();
    loadLanguage(currentLanguage).then(function (data) {
      translations = data || {};
      applyTranslations();
    });
  }

  function loadLanguage(language) {
    return window.fetch("/languages/" + encodeURIComponent(language) + ".json")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Language file not found");
        }
        return response.json();
      })
      .catch(function () {
        if (language !== fallbackLanguage) {
          return loadLanguage(fallbackLanguage);
        }
        return {};
      });
  }

  function translate(key) {
    return Object.prototype.hasOwnProperty.call(translations, key) ? translations[key] : "";
  }

  function applyTranslations() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-language-key]"), function (element) {
      var value = translate(element.getAttribute("data-language-key"));
      if (value) {
        element.textContent = value;
      }
    });
  }

  function updatePickers() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-language-picker]"), function (picker) {
      picker.value = currentLanguage;
      if (!picker.dataset.languagePickerReady) {
        picker.dataset.languagePickerReady = "true";
        picker.addEventListener("change", function () {
          setLanguage(picker.value);
        });
      }
    });
  }
})();
