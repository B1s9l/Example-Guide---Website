const getPhotoDescription = (definition) => definition.imageDescription || definition.description;

const createPhotoMeta = (definition) => {
  const metaBits = [definition.date, definition.location].filter(Boolean);
  if (!metaBits.length) {
    return null;
  }

  const meta = document.createElement("p");
  meta.className = "photo-meta";
  meta.textContent = metaBits.join(" · ");
  return meta;
};

const createPhotoOverlay = (definition) => {
  const titleText = definition.imageTitle;
  const descriptionText = getPhotoDescription(definition);
  const meta = createPhotoMeta(definition);

  if (!titleText && !descriptionText && !meta) {
    return null;
  }

  const overlay = document.createElement("figcaption");
  overlay.className = "photo-overlay";

  if (titleText) {
    const title = document.createElement("h3");
    title.className = "photo-overlay-title";
    title.textContent = titleText;
    overlay.appendChild(title);
  }

  if (descriptionText) {
    const description = document.createElement("p");
    description.className = "photo-overlay-description";
    description.textContent = descriptionText;
    overlay.appendChild(description);
  }

  if (meta) {
    overlay.appendChild(meta);
  }

  return overlay;
};

export function renderSmall(definition) {
  const wrapper = document.createElement("figure");
  wrapper.className = "photo-frame";
  wrapper.tabIndex = 0;
  wrapper.setAttribute("aria-label", `${definition.imageTitle || definition.title || "Photo"} photo preview`);

  const image = document.createElement("img");
  image.className = "photo-image";
  image.src = definition.previewSrc;
  image.alt = definition.alt || definition.imageTitle || "Photo";
  image.loading = "lazy";

  wrapper.appendChild(image);
  const overlay = createPhotoOverlay(definition);
  if (overlay) {
    wrapper.appendChild(overlay);
  }

  return wrapper;
}

export function renderLarge(definition) {
  const wrapper = document.createElement("div");
  wrapper.className = "photo-large";

  const titleText = definition.imageTitle || definition.title;
  if (titleText) {
    const title = document.createElement("h2");
    title.className = "photo-large-title";
    title.textContent = titleText;
    wrapper.appendChild(title);
  }

  const frame = document.createElement("div");
  frame.className = "photo-large-frame";

  const image = document.createElement("img");
  image.className = "photo-large-image";
  image.src = definition.fullSrc;
  image.alt = definition.alt || definition.imageTitle || "Photo";
  image.loading = "lazy";

  frame.appendChild(image);
  wrapper.appendChild(frame);

  const details = document.createElement("div");
  details.className = "photo-large-details";

  const metaBits = [definition.location, definition.date].filter(Boolean);
  if (metaBits.length) {
    const meta = document.createElement("p");
    meta.className = "photo-large-meta";
    meta.textContent = metaBits.join(" · ");
    details.appendChild(meta);
  }

  const descriptionText = getPhotoDescription(definition);
  if (descriptionText) {
    const description = document.createElement("p");
    description.className = "photo-large-description";
    description.textContent = descriptionText;
    details.appendChild(description);
  }

  if (details.children.length) {
    wrapper.appendChild(details);
  }

  return wrapper;
}
