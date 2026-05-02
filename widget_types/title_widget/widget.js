export function renderSmall(definition) {
  const wrapper = document.createElement("div");
  wrapper.className = "title-widget";
  wrapper.textContent = definition.text;

  if (definition.fontFamily) {
    wrapper.style.fontFamily = definition.fontFamily;
  }
  if (definition.fontSize) {
    wrapper.style.fontSize = definition.fontSize;
  }
  if (definition.fontWeight) {
    wrapper.style.fontWeight = definition.fontWeight;
  }
  if (definition.textColor) {
    wrapper.style.color = definition.textColor;
  }

  return wrapper;
}
