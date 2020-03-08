import { Injectable } from '@angular/core';

/**
 * @description
 * Servicio para obtener, actualizar y borrar cookies en el navegador web
 * @example
 * CookiesService.get('Test'); // Obtiene el valor de una cookie
 * CookiesService.set('Test', '123'); // Setea valor de una cookie
 * CookiesService.delete('Test'); // Elimina una cookie
 * CookiesService.deleteAll(); // Elimina todas las cookies
 */
@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor() { }

  /**
   * @description
   * Obtiene todas las cookies
   * @returns {}
   */
  public getAll(): {} {

    const cookies: {} = {};

    if (document.cookie && document.cookie !== '') {
      const split: string[] = document.cookie.split('; ');

      for (let i = 0; i < split.length; i += 1) {
        const cookie = split[i].split('=');
        const currentCookie: string = decodeURIComponent(cookie[0].trim());
        const currentValue: any = decodeURIComponent(cookie.slice(1, split[i].length - 1).join('='));

        // Intenta convertir a tipos de dato diferentes a 'string'
        if (currentValue === 'true') {
          cookies[currentCookie] = true;
        } else if (currentValue === 'false') {
          cookies[currentCookie] = false;

        } else {
          try {
            cookies[currentCookie] = JSON.parse(currentValue);
          } catch {
            cookies[currentCookie] = currentValue;
          }
        }

      }
    }

    return cookies;
  }

  /**
   * @description
   * Obtiene el valor de una cookie
   * @param {string} name - Nombre de la cookie
   * @returns {any} Valor de la cookie
   */
  public get(name: string): any {

    const cookies = this.getAll();

    if (cookies.hasOwnProperty(name)) {
      return cookies[name];
    }

    return null;
  }


  /**
   * @param name     Nombre
   * @param value    valor
   * @param expires  Número de días en que será vigente la cookie o un objeto `Date` (30 dìas por defecto)
   * @param path     Ruta
   * @param domain   Dominio
   * @param secure   Cookie segura
   * @param sameSite OWASP samesite token `Lax` ó `Strict`
   */
  public set(
    name: string,
    value: any,
    expires?: number | Date,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite?: 'Lax' | 'Strict'
  ): void {

    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    let cookieString: string = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';

    if (expires) {
      if (typeof expires === 'number') {
        const dateExpires: Date = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);

        cookieString += 'expires=' + dateExpires.toUTCString() + ';';
      } else {
        cookieString += 'expires=' + expires.toUTCString() + ';';
      }
    }

    if (path) {
      cookieString += 'path=' + path + ';';
    }

    if (domain) {
      cookieString += 'domain=' + domain + ';';
    }

    if (secure) {
      cookieString += 'secure;';
    }

    if (sameSite) {
      cookieString += 'sameSite=' + sameSite + ';';
    }

    document.cookie = cookieString;
  }


  /**
  * @param name   Nombre
  * @param path   Ruta
  * @param domain Dominio
  */
  public delete(name: string, path?: string, domain?: string): void {

    this.set(name, '', new Date('Thu, 01 Jan 1970 00:00:01 GMT'), path, domain);
  }

  /**
   * @description
   * elimina todas las cookes
   */
  public deleteAll() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }
}
