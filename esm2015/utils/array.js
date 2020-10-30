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
export const toArray = (value) => Array.isArray(value) ? value : [value];
/**
 * @description
 * Función para crear un objeto con los datos agrupado de un arreglo por un valor dado
 * @param {any[]} array Arreglo para agrupar
 * @param {string | number} field Campo para agrupar
 * @returns {boolean}
 */
export function arrayGroupBy(array, field) {
    const array_group_by = {};
    for (let index = 0; index < array.length; ++index) {
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
    for (let i = 0; i < array.length; i++) {
        if (array[i].hasOwnProperty(field)) {
            if (array[i][field] === value) {
                return array[i];
            }
            else {
                for (const prop in array[i][field]) {
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
    for (let i = 0; i < array.length; i++) {
        if (array[i].hasOwnProperty(field)) {
            if (array[i][field] === value) {
                return i;
            }
            else {
                for (const prop in array[i][field]) {
                    if (array[i][field][prop] === value) {
                        return i;
                    }
                }
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbInV0aWxzL2FycmF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxPQUFPLENBQUMsS0FBVSxFQUFFLEtBQVk7SUFDOUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNyRCxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLFVBQVUsQ0FBQyxLQUFVLEVBQUUsS0FBWTtJQUNqRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3JELENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBVSxFQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFeEY7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FBQyxLQUFZLEVBQUUsS0FBc0I7SUFFL0QsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBRTFCLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFO1FBRWpELElBQUksY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNyRCxjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzFDO1FBRUQsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUN4RDtJQUVELE9BQU8sY0FBYyxDQUFDO0FBQ3hCLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEtBQVksRUFBRSxLQUFzQixFQUFFLEtBQVU7SUFFL0UsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFFckMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBRWxDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFFN0IsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFFakI7aUJBQU07Z0JBRUwsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBRWxDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRTt3QkFFbkMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBRWpCO2lCQUVGO2FBRUY7U0FFRjtLQUVGO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsS0FBWSxFQUFFLEtBQXNCLEVBQUUsS0FBVTtJQUVqRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUVyQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFFbEMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUU3QixPQUFPLENBQUMsQ0FBQzthQUVWO2lCQUFNO2dCQUVMLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUVsQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7d0JBRW5DLE9BQU8sQ0FBQyxDQUFDO3FCQUVWO2lCQUVGO2FBRUY7U0FFRjtLQUVGO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogRnVuY2nDs24gcGFyYSB2ZXJpZmljYXIgc2kgdW4gdmFsb3IgZXhpc3RlIGVuIHVuIGFycmVnbG9cclxuICogQHBhcmFtIHthbnl9IHZhbHVlIFZhbG9yIGEgZW5jb250cmFyXHJcbiAqIEBwYXJhbSB7YW55W119IGFycmF5IEFycmVnbG8gb2JqZXRpdm8gZGUgbGEgYnVzcXVlZGFcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5BcnJheSh2YWx1ZTogYW55LCBhcnJheTogYW55W10pOiBib29sZWFuIHtcclxuICByZXR1cm4gYXJyYXkgPyBhcnJheS5pbmRleE9mKHZhbHVlKSAhPT0gLTEgOiBmYWxzZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBGdW5jacOzbiBwYXJhIHZlcmlmaWNhciBzaSB1biB2YWxvciBOTyBleGlzdGUgZW4gdW4gYXJyZWdsb1xyXG4gKiBAcGFyYW0ge2FueX0gdmFsdWUgVmFsb3IgYSBlbmNvbnRyYXJcclxuICogQHBhcmFtIHthbnlbXX0gYXJyYXkgQXJyZWdsbyBvYmpldGl2byBkZSBsYSBidXNxdWVkYVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBub3RJbkFycmF5KHZhbHVlOiBhbnksIGFycmF5OiBhbnlbXSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBhcnJheSA/IGFycmF5LmluZGV4T2YodmFsdWUpID09PSAtMSA6IGZhbHNlO1xyXG59XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIEZ1bmNpw7NuIHBhcmEgY29udmVydGlyIHVuIHN0cmluZyBlbiBzdHJpbmdbXVxyXG4gKiBAcGFyYW0gdmFsdWUgVmFsb3IgYSBjb252ZXJ0aXJcclxuICovXHJcbmV4cG9ydCBjb25zdCB0b0FycmF5ID0gKHZhbHVlOiBhbnkpOiBzdHJpbmdbXSA9PiBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXTtcclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogRnVuY2nDs24gcGFyYSBjcmVhciB1biBvYmpldG8gY29uIGxvcyBkYXRvcyBhZ3J1cGFkbyBkZSB1biBhcnJlZ2xvIHBvciB1biB2YWxvciBkYWRvXHJcbiAqIEBwYXJhbSB7YW55W119IGFycmF5IEFycmVnbG8gcGFyYSBhZ3J1cGFyXHJcbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVtYmVyfSBmaWVsZCBDYW1wbyBwYXJhIGFncnVwYXJcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlHcm91cEJ5KGFycmF5OiBhbnlbXSwgZmllbGQ6IHN0cmluZyB8IG51bWJlcik6IG9iamVjdCB7XHJcblxyXG4gIGNvbnN0IGFycmF5X2dyb3VwX2J5ID0ge307XHJcblxyXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheS5sZW5ndGg7ICsraW5kZXgpIHtcclxuXHJcbiAgICBpZiAoYXJyYXlfZ3JvdXBfYnlbYXJyYXlbaW5kZXhdW2ZpZWxkXV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBhcnJheV9ncm91cF9ieVthcnJheVtpbmRleF1bZmllbGRdXSA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGFycmF5X2dyb3VwX2J5W2FycmF5W2luZGV4XVtmaWVsZF1dLnB1c2goYXJyYXlbaW5kZXhdKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBhcnJheV9ncm91cF9ieTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBGdW5jacOzbiBwYXJhIG9idGVuZXIgdW4gb2JqZXRvIGNvbnRlbmlkbyBlbiB1biBhcnJlZ2xvIHVzYW5kbyB1bmEgcGFyZWphIGNsYXZlLXZhbG9yIHBhcmEgc3UgYnVzcXVlZGFcclxuICogQHBhcmFtIHthbnlbXX0gYXJyYXkgQXJyZWdsbyBkZSBvYmpldG9zXHJcbiAqIEBwYXJhbSB7c3RyaW5nIHwgbnVtYmVyfSBmaWVsZCBDYW1wbyBkZSBidXNxdWVkYVxyXG4gKiBAcGFyYW0ge2FueX0gdmFsdWUgVmFsb3IgZGVsIGNhbXBvIGRlIGJ1c3F1ZWRhXHJcbiAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2JqZWN0QnlWYWx1ZShhcnJheTogYW55W10sIGZpZWxkOiBzdHJpbmcgfCBudW1iZXIsIHZhbHVlOiBhbnkpOiB7fSB7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICBpZiAoYXJyYXlbaV0uaGFzT3duUHJvcGVydHkoZmllbGQpKSB7XHJcblxyXG4gICAgICBpZiAoYXJyYXlbaV1bZmllbGRdID09PSB2YWx1ZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gYXJyYXlbaV07XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gYXJyYXlbaV1bZmllbGRdKSB7XHJcblxyXG4gICAgICAgICAgaWYgKGFycmF5W2ldW2ZpZWxkXVtwcm9wXSA9PT0gdmFsdWUpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhcnJheVtpXTtcclxuXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBGdW5jacOzbiBwYXJhIG9idGVuZXIgZWwgw61uZGljZSBkZSB1biBvYmpldG8gY29udGVuaWRvIGVuIHVuIGFycmVnbG8gdXNhbmRvIHVuYSBwYXJlamEgY2xhdmUtdmFsb3IgcGFyYSBzdSBidXNxdWVkYVxyXG4gKiBAcGFyYW0ge2FueVtdfSBhcnJheSBBcnJlZ2xvIGRlIG9iamV0b3NcclxuICogQHBhcmFtIHtzdHJpbmcgfCBudW1iZXJ9IGZpZWxkIENhbXBvIGRlIGJ1c3F1ZWRhXHJcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZSBWYWxvciBkZWwgY2FtcG8gZGUgYnVzcXVlZGFcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRPYmpJbmRleEJ5VmFsdWUoYXJyYXk6IGFueVtdLCBmaWVsZDogc3RyaW5nIHwgbnVtYmVyLCB2YWx1ZTogYW55KTogbnVtYmVyIHtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgIGlmIChhcnJheVtpXS5oYXNPd25Qcm9wZXJ0eShmaWVsZCkpIHtcclxuXHJcbiAgICAgIGlmIChhcnJheVtpXVtmaWVsZF0gPT09IHZhbHVlKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIGFycmF5W2ldW2ZpZWxkXSkge1xyXG5cclxuICAgICAgICAgIGlmIChhcnJheVtpXVtmaWVsZF1bcHJvcF0gPT09IHZhbHVlKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxufVxyXG4iXX0=