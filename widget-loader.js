(function () {
  var area = document.getElementById("widget-area");
  if (!area || !window.WIDGET_ORDER || !window.WIDGET_DEFINITIONS || !window.NavigationWidget) {
    return;
  }

  window.WIDGET_ORDER.forEach(function (widgetId) {
    var definition = window.WIDGET_DEFINITIONS[widgetId];
    if (definition && definition.type === "navigation") {
      area.appendChild(window.NavigationWidget.create(definition));
    }
  });
})();
