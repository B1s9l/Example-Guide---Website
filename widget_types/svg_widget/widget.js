const normalizeScale = (scale) => {
  if (typeof scale === "number" && Number.isFinite(scale)) {
    return `${scale * 100}%`;
  }

  if (typeof scale === "string" && scale.trim()) {
    return scale;
  }

  return "100%";
};

export function renderSmall(definition) {
  const wrapper = document.createElement("div");
  wrapper.className = "svg-widget";

  const image = document.createElement("img");
  image.className = "svg-widget-image";
  image.src = definition.src;
  image.alt = definition.alt || definition.title || "";
  image.loading = "lazy";
  image.style.width = normalizeScale(definition.scale);

  wrapper.appendChild(image);
  return wrapper;
}
