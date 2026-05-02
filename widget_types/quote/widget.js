export function renderSmall(definition) {
  const wrapper = document.createElement("figure");
  wrapper.className = "quote-widget";

  const quote = document.createElement("blockquote");
  quote.className = "quote-widget-text";
  quote.textContent = definition.text || "";
  wrapper.appendChild(quote);

  if (definition.author) {
    const author = document.createElement("figcaption");
    author.className = "quote-widget-author";
    author.textContent = definition.author;
    wrapper.appendChild(author);
  }

  return wrapper;
}
