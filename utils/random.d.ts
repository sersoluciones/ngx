/**
 * @description
 * Función para generar un código GUID aleatorio
 * @returns {string}
 */
export declare function guid(): string;
/**
 * @description
 * Función para generar un código alfanúmerico único
 * @returns {string}
 */
export declare function uniqueId(): string;
/**
 * @description
 * Función para obtener un número aleatorio
 * @param {number} min Número mínimo
 * @param {number} max Número máximo
 * @returns {number}
 */
export declare function getRandomInt(min: number, max: number): number;
export interface RandomPasswordOps {
    /**
     * Tamaño de la contraseña
     */
    length?: number;
    /***
     * Habilita si se incluyen números
     */
    numbers?: boolean;
    /**
     * Habilita si se incluyen caracteres especiales
     */
    specialChars?: boolean;
    /**
     * Habilita si se incluyen letras en mayúsculas
     */
    lettersUpperCase?: boolean;
    /**
     * Habilita si se incluyen letras en minúsculas
     */
    lettersLowerCase?: boolean;
}
/**
 * Función para generar contraseñas aleatorias
 * @param options Parametros de contraseña
 */
export declare function generatePassword(options?: RandomPasswordOps): string;
