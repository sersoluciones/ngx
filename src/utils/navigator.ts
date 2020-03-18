
export function hasPdfViewer() {
  for (let index = 0; index < window.navigator.plugins.length; index++) {
      if (window.navigator.plugins[index].name.toLowerCase().indexOf('pdf') > -1) {
          return true;
      }
  }

  return false;
}

export function getStyles(element: Element) {
  return !(element instanceof HTMLElement) ? {} :
      element.ownerDocument && element.ownerDocument.defaultView.opener
          ? element.ownerDocument.defaultView.getComputedStyle(element)
          : window.getComputedStyle(element);
}

export function browserWidth(): number {
  return 0 < window.innerWidth ? window.innerWidth : screen.width;
}

/* if (bowser) {
  $('body').addClass('bos-' + bowser.osname.replace(/ /g, "") + ' bosv-' + bowser.osversion.replace(/ /g, "")
  + ' bn-' + bowser.name.replace(/ /g, "") + ' bv-' + bowser.version.replace(/ /g, ""));
} */
