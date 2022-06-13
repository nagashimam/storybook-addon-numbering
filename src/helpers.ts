export const clearStyles = (selector: string | string[]) => {
  const selectors = Array.isArray(selector) ? selector : [selector];
  selectors.forEach(clearStyleFromEntireDocument);
};

const clearStyleFromEntireDocument = (selector: string) => {
  clearStyle(document, selector);
  document
    .querySelectorAll("iframe")
    .forEach((elm) => clearStyle(elm.contentDocument, selector));
};

const clearStyle = (document: Document, selector: string) => {
  const element = document.getElementById(selector);
  if (element && element.parentElement) {
    element.parentElement.removeChild(element);
  }
};

export const addNumberingStyleToEntireDocument = (
  selector: string,
  css: string
) => {
  addNumberingStyle(document, selector, css);
  document
    .querySelectorAll("iframe")
    .forEach((elm) => addNumberingStyle(elm.contentDocument, selector, css));
};

const addNumberingStyle = (
  document: Document,
  selector: string,
  css: string
) => {
  const existingStyle = document.getElementById(selector);

  if (existingStyle) {
    if (existingStyle.innerHTML !== css) {
      existingStyle.innerHTML = css;
    }
  } else {
    const style = document.createElement("style");
    style.setAttribute("id", selector);
    style.innerHTML = css;
    document.head.appendChild(style);
  }
};
