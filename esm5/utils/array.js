/**
 * @description
 * Función para verificar si un valor existe en un arreglo
 * @param {any} value Valor a encontrar
 * @param {any[]} array Arreglo objetivo de la busqueda
 * @returns {boolean}
 */
export function inArray(value, array) {
    return array ? array.indexOf(value) !== -1 : false;
}
/**
 * @description
 * Función para verificar si un valor NO existe en un arreglo
 * @param {any} value Valor a encontrar
 * @param {any[]} array Arreglo objetivo de la busqueda
 * @returns {boolean}
 */
export function notInArray(value, array) {
    return array ? array.indexOf(value) === -1 : false;
}
/**
 * @description
 * Función para convertir un string en string[]
 * @param value Valor a convertir
 */
export var toArray = function (value) { return Array.isArray(value) ? value : [value]; };
/**
 * @description
 * Función para crear un objeto con los datos agrupado de un arreglo por un valor dado
 * @param {any[]} array Arreglo para agrupar
 * @param {string | number} field Campo para agrupar
 * @returns {boolean}
 */
export function arrayGroupBy(array, field) {
    var array_group_by = {};
    for (var index = 0; index < array.length; ++index) {
        if (array_group_by[array[index][field]] === undefined) {
            array_group_by[array[index][field]] = [];
        }
        array_group_by[array[index][field]].push(array[index]);
    }
    return array_group_by;
}
/**
 * @description
 * Función para obtener un objeto contenido en un arreglo usando una pareja clave-valor para su busqueda
 * @param {any[]} array Arreglo de objetos
 * @param {string | number} field Campo de busqueda
 * @param {any} value Valor del campo de busqueda
 * @returns {object}
 */
export function getObjectByValue(array, field, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].hasOwnProperty(field)) {
            if (array[i][field] === value) {
                return array[i];
            }
            else {
                for (var prop in array[i][field]) {
                    if (array[i][field][prop] === value) {
                        return array[i];
                    }
                }
            }
        }
    }
}
/**
 * @description
 * Función para obtener el índice de un objeto contenido en un arreglo usando una pareja clave-valor para su busqueda
 * @param {any[]} array Arreglo de objetos
 * @param {string | number} field Campo de busqueda
 * @param {any} value Valor del campo de busqueda
 * @returns {number}
 */
export function getObjIndexByValue(array, field, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].hasOwnProperty(field)) {
            if (array[i][field] === value) {
                return i;
            }
            else {
                for (var prop in array[i][field]) {
                    if (array[i][field][prop] === value) {
                        return i;
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbInV0aWxzL2FycmF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxPQUFPLENBQUMsS0FBVSxFQUFFLEtBQVk7SUFDOUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNyRCxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLFVBQVUsQ0FBQyxLQUFVLEVBQUUsS0FBWTtJQUNqRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3JELENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUFHLFVBQUMsS0FBVSxJQUFlLE9BQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUF0QyxDQUFzQyxDQUFDO0FBRXhGOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQUMsS0FBWSxFQUFFLEtBQXNCO0lBRS9ELElBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUUxQixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRTtRQUVqRCxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDckQsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUMxQztRQUVELGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDeEQ7SUFFRCxPQUFPLGNBQWMsQ0FBQztBQUN4QixDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxLQUFZLEVBQUUsS0FBc0IsRUFBRSxLQUFVO0lBRS9FLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBRXJDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUVsQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBRTdCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBRWpCO2lCQUFNO2dCQUVMLEtBQUssSUFBTSxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUVsQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7d0JBRW5DLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUVqQjtpQkFFRjthQUVGO1NBRUY7S0FFRjtBQUNILENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLEtBQVksRUFBRSxLQUFzQixFQUFFLEtBQVU7SUFFakYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFFckMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBRWxDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFFN0IsT0FBTyxDQUFDLENBQUM7YUFFVjtpQkFBTTtnQkFFTCxLQUFLLElBQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFFbEMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFO3dCQUVuQyxPQUFPLENBQUMsQ0FBQztxQkFFVjtpQkFFRjthQUVGO1NBRUY7S0FFRjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIEZ1bmNpw7NuIHBhcmEgdmVyaWZpY2FyIHNpIHVuIHZhbG9yIGV4aXN0ZSBlbiB1biBhcnJlZ2xvXHJcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZSBWYWxvciBhIGVuY29udHJhclxyXG4gKiBAcGFyYW0ge2FueVtdfSBhcnJheSBBcnJlZ2xvIG9iamV0aXZvIGRlIGxhIGJ1c3F1ZWRhXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluQXJyYXkodmFsdWU6IGFueSwgYXJyYXk6IGFueVtdKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGFycmF5ID8gYXJyYXkuaW5kZXhPZih2YWx1ZSkgIT09IC0xIDogZmFsc2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogRnVuY2nDs24gcGFyYSB2ZXJpZmljYXIgc2kgdW4gdmFsb3IgTk8gZXhpc3RlIGVuIHVuIGFycmVnbG9cclxuICogQHBhcmFtIHthbnl9IHZhbHVlIFZhbG9yIGEgZW5jb250cmFyXHJcbiAqIEBwYXJhbSB7YW55W119IGFycmF5IEFycmVnbG8gb2JqZXRpdm8gZGUgbGEgYnVzcXVlZGFcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbm90SW5BcnJheSh2YWx1ZTogYW55LCBhcnJheTogYW55W10pOiBib29sZWFuIHtcclxuICByZXR1cm4gYXJyYXkgPyBhcnJheS5pbmRleE9mKHZhbHVlKSA9PT0gLTEgOiBmYWxzZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBGdW5jacOzbiBwYXJhIGNvbnZlcnRpciB1biBzdHJpbmcgZW4gc3RyaW5nW11cclxuICogQHBhcmFtIHZhbHVlIFZhbG9yIGEgY29udmVydGlyXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdG9BcnJheSA9ICh2YWx1ZTogYW55KTogc3RyaW5nW10gPT4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV07XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIEZ1bmNpw7NuIHBhcmEgY3JlYXIgdW4gb2JqZXRvIGNvbiBsb3MgZGF0b3MgYWdydXBhZG8gZGUgdW4gYXJyZWdsbyBwb3IgdW4gdmFsb3IgZGFkb1xyXG4gKiBAcGFyYW0ge2FueVtdfSBhcnJheSBBcnJlZ2xvIHBhcmEgYWdydXBhclxyXG4gKiBAcGFyYW0ge3N0cmluZyB8IG51bWJlcn0gZmllbGQgQ2FtcG8gcGFyYSBhZ3J1cGFyXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5R3JvdXBCeShhcnJheTogYW55W10sIGZpZWxkOiBzdHJpbmcgfCBudW1iZXIpOiBvYmplY3Qge1xyXG5cclxuICBjb25zdCBhcnJheV9ncm91cF9ieSA9IHt9O1xyXG5cclxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXkubGVuZ3RoOyArK2luZGV4KSB7XHJcblxyXG4gICAgaWYgKGFycmF5X2dyb3VwX2J5W2FycmF5W2luZGV4XVtmaWVsZF1dID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgYXJyYXlfZ3JvdXBfYnlbYXJyYXlbaW5kZXhdW2ZpZWxkXV0gPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhcnJheV9ncm91cF9ieVthcnJheVtpbmRleF1bZmllbGRdXS5wdXNoKGFycmF5W2luZGV4XSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYXJyYXlfZ3JvdXBfYnk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogRnVuY2nDs24gcGFyYSBvYnRlbmVyIHVuIG9iamV0byBjb250ZW5pZG8gZW4gdW4gYXJyZWdsbyB1c2FuZG8gdW5hIHBhcmVqYSBjbGF2ZS12YWxvciBwYXJhIHN1IGJ1c3F1ZWRhXHJcbiAqIEBwYXJhbSB7YW55W119IGFycmF5IEFycmVnbG8gZGUgb2JqZXRvc1xyXG4gKiBAcGFyYW0ge3N0cmluZyB8IG51bWJlcn0gZmllbGQgQ2FtcG8gZGUgYnVzcXVlZGFcclxuICogQHBhcmFtIHthbnl9IHZhbHVlIFZhbG9yIGRlbCBjYW1wbyBkZSBidXNxdWVkYVxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9iamVjdEJ5VmFsdWUoYXJyYXk6IGFueVtdLCBmaWVsZDogc3RyaW5nIHwgbnVtYmVyLCB2YWx1ZTogYW55KToge30ge1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgaWYgKGFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkKSkge1xyXG5cclxuICAgICAgaWYgKGFycmF5W2ldW2ZpZWxkXSA9PT0gdmFsdWUpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFycmF5W2ldO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIGFycmF5W2ldW2ZpZWxkXSkge1xyXG5cclxuICAgICAgICAgIGlmIChhcnJheVtpXVtmaWVsZF1bcHJvcF0gPT09IHZhbHVlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYXJyYXlbaV07XHJcblxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogRnVuY2nDs24gcGFyYSBvYnRlbmVyIGVsIMOtbmRpY2UgZGUgdW4gb2JqZXRvIGNvbnRlbmlkbyBlbiB1biBhcnJlZ2xvIHVzYW5kbyB1bmEgcGFyZWphIGNsYXZlLXZhbG9yIHBhcmEgc3UgYnVzcXVlZGFcclxuICogQHBhcmFtIHthbnlbXX0gYXJyYXkgQXJyZWdsbyBkZSBvYmpldG9zXHJcbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVtYmVyfSBmaWVsZCBDYW1wbyBkZSBidXNxdWVkYVxyXG4gKiBAcGFyYW0ge2FueX0gdmFsdWUgVmFsb3IgZGVsIGNhbXBvIGRlIGJ1c3F1ZWRhXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2JqSW5kZXhCeVZhbHVlKGFycmF5OiBhbnlbXSwgZmllbGQ6IHN0cmluZyB8IG51bWJlciwgdmFsdWU6IGFueSk6IG51bWJlciB7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICBpZiAoYXJyYXlbaV0uaGFzT3duUHJvcGVydHkoZmllbGQpKSB7XHJcblxyXG4gICAgICBpZiAoYXJyYXlbaV1bZmllbGRdID09PSB2YWx1ZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gaTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBhcnJheVtpXVtmaWVsZF0pIHtcclxuXHJcbiAgICAgICAgICBpZiAoYXJyYXlbaV1bZmllbGRdW3Byb3BdID09PSB2YWx1ZSkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcblxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcbn1cclxuIl19