const appendText = (parent, tag, className, text) => {
  if (!text) {
    return null;
  }

  const el = document.createElement(tag);
  el.className = className;
  el.textContent = text;
  parent.appendChild(el);
  return el;
};

export function renderSmall(definition) {
  const wrapper = document.createElement("div");
  wrapper.className = "about-me-widget";

  const header = document.createElement("div");
  header.className = "about-me-header";
  appendText(header, "h3", "about-me-name", definition.name);
  appendText(header, "p", "about-me-subtitle", definition.subtitle);
  wrapper.appendChild(header);

  appendText(wrapper, "p", "about-me-bio", definition.shortBio);

  const focusItems = Array.isArray(definition.currentFocus) ? definition.currentFocus : [];
  if (focusItems.length) {
    const focusList = document.createElement("ul");
    focusList.className = "about-me-focus-list";

    focusItems.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      focusList.appendChild(listItem);
    });

    wrapper.appendChild(focusList);
  }

  const details = [definition.education, definition.location].filter(Boolean);
  if (details.length) {
    const meta = document.createElement("p");
    meta.className = "about-me-meta";
    meta.textContent = details.join(" / ");
    wrapper.appendChild(meta);
  }

  const links = Array.isArray(definition.links) ? definition.links : [];
  if (links.length) {
    const linkList = document.createElement("div");
    linkList.className = "about-me-links";

    links.forEach((link) => {
      if (!link.url) {
        return;
      }

      const anchor = document.createElement("a");
      anchor.href = link.url;
      anchor.textContent = link.label || link.url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      linkList.appendChild(anchor);
    });

    wrapper.appendChild(linkList);
  }

  return wrapper;
}
