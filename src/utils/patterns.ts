/**
 * @description Colección de Regex comunes
 */
export module Patterns {
  export const PASSWORD = /^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])).{6,}$/;
  export const DOMAIN = /^([a-zA-Z0-9\_\-\.]{2,63})\.([a-zA-Z0-9]{2,})$/;
  export const EMAIL = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  export const IMAGE = /^image\/([a-zA-Z].*)$/;
  export const NUMBER = /[-]{0,1}[0-9]*[.]{0,1}[0-9]+/g;
  export const CC = /((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?/g;
}

export interface FullName {
    name?: string;
    lastName?: string;
    firstLastName?: string;
    secondLastName?: string;
    joined?: string;
}

export function parseName(input: string): FullName {

    const fullName = input.trim().toLowerCase().split(/\s+/).map(val => {

        if (!val.match(/\b(de|del|la|el)\b/g)) {
            return val.charAt(0).toUpperCase() + val.slice(1);
        }

        return val;

    }).join(' ');

    const result: FullName = {
        secondLastName: '',
        joined: ''
    };

    if (fullName.length > 0) {
        const nameTokens = fullName.match(/[A-ZÁ-ÚÑÜ][a-zá-úñü]+|([aeodlsz]+\s+)+[A-ZÁ-ÚÑÜ][a-zá-úñü]+/g) || [];

        if (nameTokens.length > 3) {
            result.name = nameTokens.slice(0, 2).join(' ');
        } else {
            result.name = nameTokens.slice(0, 1).join(' ');
        }

        if (nameTokens.length > 2) {
            result.firstLastName = nameTokens.slice(-2, -1).join(' ');
            result.secondLastName = nameTokens.slice(-1).join(' ');
        } else {
            result.firstLastName = nameTokens.slice(-1).join(' ');
        }

        result.lastName = [result.firstLastName, result.secondLastName].join(' ').trim();
        result.joined = [result.name, result.lastName, result.secondLastName].join(' ').trim();
    }

    return result;
}

export function stringToSlug(str: string): string {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    const to   = 'aaaaeeeeiiiioooouuuunc------';
    for (let i = 0, l = from.length ; i < l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}


