/**
 * @description
 * Función para verificar si una variable cumple con los siguiente:
 * - Si es un arreglo, verifica si tiene un tamaño mayor a cero
 * - No tiene ninguno de estos valores: '', null, undefined, NaN
 * @param {any | any[]} variable Variable a verificar
 * @returns {boolean}
 */
export function hasValue(variable: any | any[]): boolean {

    console.log(variable, [null, undefined].indexOf(variable) === -1, typeof variable === 'object');

    if (Array.isArray(variable)) {

        return 0 < variable.length;

    } else if ([null, undefined].indexOf(variable) === -1 && typeof variable === 'object') {

        return JSON.stringify(variable) !== '{}';

    } else {
        console.log('entra');
        return ['', null, undefined, NaN].indexOf(variable) === -1;

    }
}

/**
 * @description
 * Función para verificar si un objeto no esta vacío
 * @param {any} value Objeto a verificar
 * @returns {boolean}
 */
export function objHasValue(value: any): boolean {
    return Object.keys(value).length > 0;
}
