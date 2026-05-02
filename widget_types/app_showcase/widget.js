const createLink = (href, label, className) => {
  const link = document.createElement("a");
  link.href = href || "#";
  link.textContent = label;
  link.className = className;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
};

export function renderSmall(definition) {
  const wrapper = document.createElement("div");
  wrapper.className = "app-showcase-widget";

  const description = document.createElement("p");
  description.className = "app-showcase-description";
  description.textContent = definition.description || "";
  wrapper.appendChild(description);

  const actions = document.createElement("div");
  actions.className = "app-showcase-actions";

  const appStoreSection = document.createElement("div");
  appStoreSection.className = "app-showcase-section app-showcase-section--store";

  if (definition.iconSrc) {
    const icon = document.createElement("img");
    icon.className = "app-showcase-icon";
    icon.src = definition.iconSrc;
    icon.alt = definition.iconAlt || `${definition.title} app icon`;
    icon.loading = "lazy";
    appStoreSection.appendChild(icon);
  } else {
    const icon = document.createElement("div");
    icon.className = "app-showcase-icon app-showcase-icon--placeholder";
    icon.setAttribute("aria-label", `${definition.title} app icon placeholder`);
    icon.textContent = definition.iconText || "App";
    appStoreSection.appendChild(icon);
  }

  appStoreSection.appendChild(
    createLink(definition.appStoreUrl, definition.appStoreLabel || " Download", "app-showcase-button")
  );

  const websiteSection = document.createElement("div");
  websiteSection.className = "app-showcase-section app-showcase-section--website";

  if (definition.websiteIconSrc) {
    const websiteIcon = document.createElement("img");
    websiteIcon.className = "app-showcase-icon app-showcase-website-icon";
    if (definition.websiteIconInvertOnDark) {
      websiteIcon.classList.add("app-showcase-website-icon--invert-dark");
    }
    websiteIcon.src = definition.websiteIconSrc;
    websiteIcon.alt = definition.websiteIconAlt || `${definition.title} website icon`;
    websiteIcon.loading = "lazy";
    websiteSection.appendChild(websiteIcon);
  }

  websiteSection.appendChild(
    createLink(definition.websiteUrl, definition.websiteLabel || "Website", "app-showcase-button app-showcase-button--secondary")
  );

  actions.appendChild(appStoreSection);
  actions.appendChild(websiteSection);
  wrapper.appendChild(actions);

  return wrapper;
}
