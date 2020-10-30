/**
 * @description
 * Función para verificar si un valor existe en un arreglo
 * @param {any} value Valor a encontrar
 * @param {any[]} array Arreglo objetivo de la busqueda
 * @returns {boolean}
 */
export declare function inArray(value: any, array: any[]): boolean;
/**
 * @description
 * Función para verificar si un valor NO existe en un arreglo
 * @param {any} value Valor a encontrar
 * @param {any[]} array Arreglo objetivo de la busqueda
 * @returns {boolean}
 */
export declare function notInArray(value: any, array: any[]): boolean;
/**
 * @description
 * Función para convertir un string en string[]
 * @param value Valor a convertir
 */
export declare const toArray: (value: any) => string[];
/**
 * @description
 * Función para crear un objeto con los datos agrupado de un arreglo por un valor dado
 * @param {any[]} array Arreglo para agrupar
 * @param {string | number} field Campo para agrupar
 * @returns {boolean}
 */
export declare function arrayGroupBy(array: any[], field: string | number): object;
/**
 * @description
 * Función para obtener un objeto contenido en un arreglo usando una pareja clave-valor para su busqueda
 * @param {any[]} array Arreglo de objetos
 * @param {string | number} field Campo de busqueda
 * @param {any} value Valor del campo de busqueda
 * @returns {object}
 */
export declare function getObjectByValue(array: any[], field: string | number, value: any): {};
/**
 * @description
 * Función para obtener el índice de un objeto contenido en un arreglo usando una pareja clave-valor para su busqueda
 * @param {any[]} array Arreglo de objetos
 * @param {string | number} field Campo de busqueda
 * @param {any} value Valor del campo de busqueda
 * @returns {number}
 */
export declare function getObjIndexByValue(array: any[], field: string | number, value: any): number;
