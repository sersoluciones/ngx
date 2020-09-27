import { OpenIdData } from './Iopen-id-client';
import { Injectable } from '@angular/core';
import { inArray } from '../utils/array';

/**
 * @description
 * Servicio para verificar si es usuario tiene o no permisos para realizar ciertas acciones
 * @example
 * constructor(private claimsService: ClaimsService) { }
 */
@Injectable({
    providedIn: 'root'
})
export class ClaimsService {

    private _openIdData: OpenIdData;
    public get openIdData(): OpenIdData {
        return this._openIdData;
    }
    public set openIdData(value: OpenIdData) {
        this._openIdData = value;
    }

    /**
     * @description
     * Método para verificar si el usuario tiene un permiso
     * @param {string} requiredPermission - Nombre del permiso a consultar
     * @example
     * this.claimsService.hasPermission('users.view');
     * @returns {boolean}
     */
    public hasPermission(requiredPermission: string): boolean {
        return this.openIdData.claims.indexOf(requiredPermission) !== -1;
    }

    /**
     * @description
     * Método para verificar si el usuario tiene un al menos un permiso del listado consultado
     * @param {string[]} requiredPermissions - Arreglo de permisos a consultar
     * @example
     * this.claimsService.atLeastPermissions(['users.view', 'users.update', 'users.add']);
     * @returns {boolean}
     */
    public atLeastPermissions(requiredPermissions: string[]): boolean {
        for (let index = 0; index < requiredPermissions.length; index++) {

            if (inArray(requiredPermissions[index], this.openIdData.claims)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @description
     * Método para verificar si el usuario tiene todos los permisos consultados
     * @param {string[]} requiredPermissions - Arreglo de permisos a consultar
     * @example
     * this.claimsService.hasPermissions(['users.view', 'users.update', 'users.add']);
     * @returns {boolean}
     */
    public hasPermissions(requiredPermissions: string[]): boolean {

        for (let index = 0; index < requiredPermissions.length; index++) {

            if (!inArray(requiredPermissions[index], this.openIdData.claims)) {
                return false;
            }
        }

        return true;
    }
}
