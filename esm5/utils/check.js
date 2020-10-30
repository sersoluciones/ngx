/**
 * @description
 * Función para verificar si una variable cumple con los siguiente:
 * - Si es un arreglo, verifica si tiene un tamaño mayor a cero
 * - No tiene ninguno de estos valores: '', null, undefined, NaN
 * @param {any | any[]} variable Variable a verificar
 * @returns {boolean}
 */
export function hasValue(variable) {
    if (Array.isArray(variable)) {
        return 0 < variable.length;
    }
    else {
        return ['', null, undefined, NaN].indexOf(variable) === -1;
    }
}
/**
 * @description
 * Función para verificar si un objeto no esta vacío
 * @param {any} value Objeto a verificar
 * @returns {boolean}
 */
export function objHasValue(value) {
    return Object.keys(value).length > 0;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbInV0aWxzL2NoZWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsUUFBUSxDQUFDLFFBQXFCO0lBQzVDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUMzQixPQUFPLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0tBQzVCO1NBQU07UUFDTCxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQzVEO0FBQ0gsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxLQUFVO0lBQ3BDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIEZ1bmNpw7NuIHBhcmEgdmVyaWZpY2FyIHNpIHVuYSB2YXJpYWJsZSBjdW1wbGUgY29uIGxvcyBzaWd1aWVudGU6XHJcbiAqIC0gU2kgZXMgdW4gYXJyZWdsbywgdmVyaWZpY2Egc2kgdGllbmUgdW4gdGFtYcOxbyBtYXlvciBhIGNlcm9cclxuICogLSBObyB0aWVuZSBuaW5ndW5vIGRlIGVzdG9zIHZhbG9yZXM6ICcnLCBudWxsLCB1bmRlZmluZWQsIE5hTlxyXG4gKiBAcGFyYW0ge2FueSB8IGFueVtdfSB2YXJpYWJsZSBWYXJpYWJsZSBhIHZlcmlmaWNhclxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNWYWx1ZSh2YXJpYWJsZTogYW55IHwgYW55W10pOiBib29sZWFuIHtcclxuICBpZiAoQXJyYXkuaXNBcnJheSh2YXJpYWJsZSkpIHtcclxuICAgIHJldHVybiAwIDwgdmFyaWFibGUubGVuZ3RoO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gWycnLCBudWxsLCB1bmRlZmluZWQsIE5hTl0uaW5kZXhPZih2YXJpYWJsZSkgPT09IC0xO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBGdW5jacOzbiBwYXJhIHZlcmlmaWNhciBzaSB1biBvYmpldG8gbm8gZXN0YSB2YWPDrW9cclxuICogQHBhcmFtIHthbnl9IHZhbHVlIE9iamV0byBhIHZlcmlmaWNhclxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBvYmpIYXNWYWx1ZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPiAwO1xyXG59XHJcbiJdfQ==