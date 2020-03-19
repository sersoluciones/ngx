
/**
 * @description
 * Función para verificar si el navegador dispone de lector PDF
 * @returns {boolean}
 */
export function hasPdfViewer() {
  for (let index = 0; index < window.navigator.plugins.length; index++) {
      if (window.navigator.plugins[index].name.toLowerCase().indexOf('pdf') > -1) {
          return true;
      }
  }

  return false;
}

/**
 * @description
 * Función para extraer todas las reglas CSS aplicadas a un elemento DOM
 * @param {Element} element Elemento DOM
 * @returns {CSSStyleDeclaration}
 */
export function getStyles(element: Element) {
  return !(element instanceof HTMLElement) ? {} :
      element.ownerDocument && element.ownerDocument.defaultView.opener
          ? element.ownerDocument.defaultView.getComputedStyle(element)
          : window.getComputedStyle(element);
}

/**
 * @description
 * Función para obtener el ancho de la ventana o pestaña de la página
 * @returns {number}
 */
export function browserWidth(): number {
  return 0 < window.innerWidth ? window.innerWidth : screen.width;
}

/* if (bowser) {
  $('body').addClass('bos-' + bowser.osname.replace(/ /g, "") + ' bosv-' + bowser.osversion.replace(/ /g, "")
  + ' bn-' + bowser.name.replace(/ /g, "") + ' bv-' + bowser.version.replace(/ /g, ""));
} */
