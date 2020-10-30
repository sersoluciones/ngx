/**
 * @description
 * Servicio para obtener, actualizar y borrar cookies en el navegador web
 * @example
 * constructor(cookiesService: CookiesService) { }
 *
 * this.cookiesService.get('Test'); // Obtiene el valor de una cookie
 * this.cookiesService.set('Test', '123'); // Setea valor de una cookie
 * this.cookiesService.delete('Test'); // Elimina una cookie
 * this.cookiesService.deleteAll(); // Elimina todas las cookies
 */
export declare class CookiesService {
    constructor();
    /**
     * @description
     * Obtiene todas las cookies
     * @returns {}
     */
    getAll(): {};
    /**
     * @description
     * Obtiene el valor de una cookie
     * @param {string} name - Nombre de la cookie
     * @returns {any} Valor de la cookie
     */
    get(name: string): any;
    /**
     * @param name     Nombre
     * @param value    valor
     * @param expires  Unix Timestamp en que será vigente la cookie o un objeto `Date`
     * @param path     Ruta
     * @param domain   Dominio
     * @param secure   Cookie segura
     * @param sameSite OWASP samesite token `Lax` ó `Strict`
     */
    set(name: string, value: any, expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: 'Lax' | 'Strict'): void;
    /**
    * @param name   Nombre
    * @param path   Ruta
    * @param domain Dominio
    */
    delete(name: string, path?: string, domain?: string): void;
    /**
     * @description
     * elimina todas las cookes
     */
    deleteAll(): void;
}
