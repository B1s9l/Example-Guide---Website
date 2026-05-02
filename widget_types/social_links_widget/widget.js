export function renderSmall(definition) {
  const wrapper = document.createElement("div");
  wrapper.className = "social-links-widget";

  const list = document.createElement("ul");
  list.className = "social-links-list";

  const links = Array.isArray(definition.links) ? definition.links : [];
  const theme = document.documentElement.dataset.theme || "dark";
  links.forEach((link) => {
    const item = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.className = "social-link";

    const themedIcon = theme === "light" ? link.iconSrcLight : link.iconSrcDark;
    const iconSrc = themedIcon || link.iconSrc;

    if (iconSrc) {
      const img = document.createElement("img");
      img.src = iconSrc;
      img.alt = link.iconAlt || link.label || "";
      img.loading = "lazy";
      img.className = "social-link-icon";
      if (link.iconSrcLight) {
        img.dataset.srcLight = link.iconSrcLight;
      }
      if (link.iconSrcDark) {
        img.dataset.srcDark = link.iconSrcDark;
      }
      anchor.appendChild(img);
    } else {
      anchor.textContent = link.label;
    }

    if (!anchor.textContent && !anchor.querySelector("img")) {
      anchor.textContent = link.label || "Link";
    }
    item.appendChild(anchor);
    list.appendChild(item);
  });

  wrapper.appendChild(list);
  return wrapper;
}
