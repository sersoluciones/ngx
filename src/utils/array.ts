/**
 * @description
 * Función para verificar si un valor existe en un arreglo
 * @param {any} value Valor a encontrar
 * @param {any[]} array Arreglo objetivo de la busqueda
 * @returns {boolean}
 */
export function inArray(value: any, array: any[]): boolean {
  return array ? array.indexOf(value) !== -1 : false;
}

/**
 * @description
 * Función para verificar si un valor NO existe en un arreglo
 * @param {any} value Valor a encontrar
 * @param {any[]} array Arreglo objetivo de la busqueda
 * @returns {boolean}
 */
export function notInArray(value: any, array: any[]): boolean {
  return array ? array.indexOf(value) === -1 : false;
}

/**
 * @description
 * Función para crear un objeto con los datos agrupado de un arreglo por un valor dado
 * @param {any[]} array Arreglo para agrupar
 * @param {string | number} field Campo para agrupar
 * @returns {boolean}
 */
export function arrayGroupBy(array: any[], field: string | number): object {

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
export function getObjectByValue(array: any[], field: string | number, value: any): {} {

  for (let i = 0; i < array.length; i++) {

    if (array[i].hasOwnProperty(field)) {

      if (array[i][field] === value) {

        return array[i];

      } else {

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
export function getObjIndexByValue(array: any[], field: string | number, value: any): number {

  for (let i = 0; i < array.length; i++) {

    if (array[i].hasOwnProperty(field)) {

      if (array[i][field] === value) {

        return i;

      } else {

        for (const prop in array[i][field]) {

          if (array[i][field][prop] === value) {

            return i;

          }

        }

      }

    }

  }
}
