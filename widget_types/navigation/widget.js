(function () {
  function translatedText(key, fallback) {
    if (!key || !window.languageManager || typeof window.languageManager.t !== "function") {
      return fallback;
    }
    return window.languageManager.t(key) || fallback;
  }

  function attachLanguageKey(element, key) {
    if (key) {
      element.dataset.languageKey = key;
    }
  }

  function createNavigationWidget(definition) {
    var article = document.createElement("article");
    article.className = "navigation-widget";

    var title = document.createElement("h2");
    title.textContent = translatedText(definition.titleKey, definition.title);
    attachLanguageKey(title, definition.titleKey);

    var description = document.createElement("p");
    description.textContent = translatedText(definition.descriptionKey, definition.description);
    attachLanguageKey(description, definition.descriptionKey);

    var button = document.createElement("a");
    button.className = "button";
    button.href = definition.buttonHref;
    button.textContent = translatedText(definition.buttonTextKey, definition.buttonText);
    attachLanguageKey(button, definition.buttonTextKey);

    article.appendChild(title);
    article.appendChild(description);
    article.appendChild(button);
    return article;
  }

  window.NavigationWidget = { create: createNavigationWidget };
})();
