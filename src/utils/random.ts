import { mergeObjs } from './object';

/**
 * @description
 * Función para generar un código GUID aleatorio
 * @returns {string}
 */
export function guid(): string {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/**
 * @description
 * Función para generar un código alfanúmerico único
 * @returns {string}
 */
export function uniqueId(): string {
  const today = new Date();
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4() + Math.floor((today.getTime() * Math.random()));
}

function s4(): string {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}

/**
 * @description
 * Función para obtener un número aleatorio
 * @param {number} min Número mínimo
 * @param {number} max Número máximo
 * @returns {number}
 */
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


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
export function generatePassword(options?: RandomPasswordOps) {

    const defaultOptions: RandomPasswordOps = {
        length: 8,
        numbers: true,
        specialChars: false,
        lettersLowerCase: true,
        lettersUpperCase: true
    };

    mergeObjs(defaultOptions, options);

    let charset = '';

    if (defaultOptions?.numbers) {
        charset += '0123456789';
    }

    if (defaultOptions?.lettersLowerCase) {
        charset += 'abcdefghijklmnopqrstuvwxyz';
    }

    if (defaultOptions?.lettersUpperCase) {
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    if (defaultOptions?.specialChars) {
        charset += '!#$%&\()*+,-./:;<=>?@^[\\]^_`{|}~';
    }

    let retVal = '';

    for (let i = 0, n = charset.length; i < defaultOptions.length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    return retVal;
}
