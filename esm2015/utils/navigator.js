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
export function getStyles(element) {
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
export function browserWidth() {
    return 0 < window.innerWidth ? window.innerWidth : screen.width;
}
/* if (bowser) {
  $('body').addClass('bos-' + bowser.osname.replace(/ /g, "") + ' bosv-' + bowser.osversion.replace(/ /g, "")
  + ' bn-' + bowser.name.replace(/ /g, "") + ' bv-' + bowser.version.replace(/ /g, ""));
} */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJ1dGlscy9uYXZpZ2F0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxZQUFZO0lBQzFCLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDbEUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3hFLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7S0FDSjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLFNBQVMsQ0FBQyxPQUFnQjtJQUN4QyxPQUFPLENBQUMsQ0FBQyxPQUFPLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTTtZQUM3RCxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO1lBQzdELENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsWUFBWTtJQUMxQixPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2xFLENBQUM7QUFFRDs7O0lBR0kiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBGdW5jacOzbiBwYXJhIHZlcmlmaWNhciBzaSBlbCBuYXZlZ2Fkb3IgZGlzcG9uZSBkZSBsZWN0b3IgUERGXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc1BkZlZpZXdlcigpIHtcclxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgd2luZG93Lm5hdmlnYXRvci5wbHVnaW5zLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBpZiAod2luZG93Lm5hdmlnYXRvci5wbHVnaW5zW2luZGV4XS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigncGRmJykgPiAtMSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBGdW5jacOzbiBwYXJhIGV4dHJhZXIgdG9kYXMgbGFzIHJlZ2xhcyBDU1MgYXBsaWNhZGFzIGEgdW4gZWxlbWVudG8gRE9NXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCBFbGVtZW50byBET01cclxuICogQHJldHVybnMge0NTU1N0eWxlRGVjbGFyYXRpb259XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3R5bGVzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICByZXR1cm4gIShlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpID8ge30gOlxyXG4gICAgICBlbGVtZW50Lm93bmVyRG9jdW1lbnQgJiYgZWxlbWVudC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3Lm9wZW5lclxyXG4gICAgICAgICAgPyBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVxyXG4gICAgICAgICAgOiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBGdW5jacOzbiBwYXJhIG9idGVuZXIgZWwgYW5jaG8gZGUgbGEgdmVudGFuYSBvIHBlc3Rhw7FhIGRlIGxhIHDDoWdpbmFcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBicm93c2VyV2lkdGgoKTogbnVtYmVyIHtcclxuICByZXR1cm4gMCA8IHdpbmRvdy5pbm5lcldpZHRoID8gd2luZG93LmlubmVyV2lkdGggOiBzY3JlZW4ud2lkdGg7XHJcbn1cclxuXHJcbi8qIGlmIChib3dzZXIpIHtcclxuICAkKCdib2R5JykuYWRkQ2xhc3MoJ2Jvcy0nICsgYm93c2VyLm9zbmFtZS5yZXBsYWNlKC8gL2csIFwiXCIpICsgJyBib3N2LScgKyBib3dzZXIub3N2ZXJzaW9uLnJlcGxhY2UoLyAvZywgXCJcIilcclxuICArICcgYm4tJyArIGJvd3Nlci5uYW1lLnJlcGxhY2UoLyAvZywgXCJcIikgKyAnIGJ2LScgKyBib3dzZXIudmVyc2lvbi5yZXBsYWNlKC8gL2csIFwiXCIpKTtcclxufSAqL1xyXG4iXX0=