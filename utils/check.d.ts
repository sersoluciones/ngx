/**
 * @description
 * Función para verificar si una variable cumple con los siguiente:
 * - Si es un arreglo, verifica si tiene un tamaño mayor a cero
 * - No tiene ninguno de estos valores: '', null, undefined, NaN
 * @param {any | any[]} variable Variable a verificar
 * @returns {boolean}
 */
export declare function hasValue(variable: any | any[]): boolean;
/**
 * @description
 * Función para verificar si un objeto no esta vacío
 * @param {any} value Objeto a verificar
 * @returns {boolean}
 */
export declare function objHasValue(value: any): boolean;
