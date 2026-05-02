export function renderSmall(definition) {
  const wrapper = document.createElement("div");
  wrapper.className = "text-widget";

  const body = document.createElement("p");
  body.textContent = definition.body;
  if (definition.fontSize) {
    body.style.fontSize = definition.fontSize;
  }

  wrapper.appendChild(body);

  if (definition.link && definition.linkMode !== "none") {
    const link = document.createElement("a");
    link.href = definition.link;
    link.textContent = definition.linkText || "Learn more";
    link.rel = "noreferrer";

    if (definition.linkMode === "button") {
      link.className = "button-link";
    }

    wrapper.appendChild(link);
  }

  return wrapper;
}
