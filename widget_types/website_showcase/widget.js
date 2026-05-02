export function renderSmall(definition) {
  const wrapper = document.createElement("div");
  wrapper.className = "website-showcase-widget";

  const description = document.createElement("p");
  description.className = "website-showcase-description";
  description.textContent = definition.description || "";
  wrapper.appendChild(description);

  const link = document.createElement("a");
  link.href = definition.url || "#";
  link.textContent = definition.linkLabel || "Visit";
  link.className = "website-showcase-button";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  wrapper.appendChild(link);

  return wrapper;
}
