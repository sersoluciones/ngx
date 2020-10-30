import { OpenIdData } from './Iopen-id-client';
/**
 * @description
 * Servicio para verificar si es usuario tiene o no permisos para realizar ciertas acciones
 * @example
 * constructor(private claimsService: ClaimsService) { }
 */
export declare class ClaimsService {
    private _openIdData;
    get openIdData(): OpenIdData;
    set openIdData(value: OpenIdData);
    /**
     * @description
     * Método para verificar si el usuario tiene un permiso
     * @param {string} requiredPermission - Nombre del permiso a consultar
     * @example
     * this.claimsService.hasPermission('users.view');
     * @returns {boolean}
     */
    hasPermission(requiredPermission: string): boolean;
    /**
     * @description
     * Método para verificar si el usuario tiene un al menos un permiso del listado consultado
     * @param {string[]} requiredPermissions - Arreglo de permisos a consultar
     * @example
     * this.claimsService.atLeastPermissions(['users.view', 'users.update', 'users.add']);
     * @returns {boolean}
     */
    atLeastPermissions(requiredPermissions: string[]): boolean;
    /**
     * @description
     * Método para verificar si el usuario tiene todos los permisos consultados
     * @param {string[]} requiredPermissions - Arreglo de permisos a consultar
     * @example
     * this.claimsService.hasPermissions(['users.view', 'users.update', 'users.add']);
     * @returns {boolean}
     */
    hasPermissions(requiredPermissions: string[]): boolean;
}
