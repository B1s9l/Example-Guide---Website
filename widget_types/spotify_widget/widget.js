export function renderSmall(definition) {
  const wrapper = document.createElement("div");
  wrapper.className = "spotify-widget";

  const iframe = document.createElement("iframe");
  iframe.title = definition.title || "Spotify playlist";
  iframe.src = definition.embedSrc || definition.playlistUrl || "";
  iframe.width = "100%";
  iframe.height = String(definition.embedHeight || 352);
  iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  iframe.loading = "lazy";
  iframe.style.border = "0";
  iframe.style.borderRadius = "16px";

  wrapper.appendChild(iframe);
  return wrapper;
}
