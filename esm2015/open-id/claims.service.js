import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { inArray } from '../utils/array';
import * as i0 from "@angular/core";
/**
 * @description
 * Servicio para verificar si es usuario tiene o no permisos para realizar ciertas acciones
 * @example
 * constructor(private claimsService: ClaimsService) { }
 */
let ClaimsService = class ClaimsService {
    get openIdData() {
        return this._openIdData;
    }
    set openIdData(value) {
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
    hasPermission(requiredPermission) {
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
    atLeastPermissions(requiredPermissions) {
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
    hasPermissions(requiredPermissions) {
        for (let index = 0; index < requiredPermissions.length; index++) {
            if (!inArray(requiredPermissions[index], this.openIdData.claims)) {
                return false;
            }
        }
        return true;
    }
};
ClaimsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ClaimsService_Factory() { return new ClaimsService(); }, token: ClaimsService, providedIn: "root" });
ClaimsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ClaimsService);
export { ClaimsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhaW1zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbIm9wZW4taWQvY2xhaW1zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUV6Qzs7Ozs7R0FLRztBQUlILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFHdEIsSUFBVyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBQ0QsSUFBVyxVQUFVLENBQUMsS0FBaUI7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxhQUFhLENBQUMsa0JBQTBCO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxrQkFBa0IsQ0FBQyxtQkFBNkI7UUFDbkQsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUU3RCxJQUFJLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUM3RCxPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLGNBQWMsQ0FBQyxtQkFBNkI7UUFFL0MsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUU3RCxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzlELE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0osQ0FBQTs7QUE1RFksYUFBYTtJQUh6QixVQUFVLENBQUM7UUFDUixVQUFVLEVBQUUsTUFBTTtLQUNyQixDQUFDO0dBQ1csYUFBYSxDQTREekI7U0E1RFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZW5JZERhdGEgfSBmcm9tICcuL0lvcGVuLWlkLWNsaWVudCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaW5BcnJheSB9IGZyb20gJy4uL3V0aWxzL2FycmF5JztcclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogU2VydmljaW8gcGFyYSB2ZXJpZmljYXIgc2kgZXMgdXN1YXJpbyB0aWVuZSBvIG5vIHBlcm1pc29zIHBhcmEgcmVhbGl6YXIgY2llcnRhcyBhY2Npb25lc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsYWltc1NlcnZpY2U6IENsYWltc1NlcnZpY2UpIHsgfVxyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDbGFpbXNTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIF9vcGVuSWREYXRhOiBPcGVuSWREYXRhO1xyXG4gICAgcHVibGljIGdldCBvcGVuSWREYXRhKCk6IE9wZW5JZERhdGEge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVuSWREYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBvcGVuSWREYXRhKHZhbHVlOiBPcGVuSWREYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fb3BlbklkRGF0YSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBNw6l0b2RvIHBhcmEgdmVyaWZpY2FyIHNpIGVsIHVzdWFyaW8gdGllbmUgdW4gcGVybWlzb1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcXVpcmVkUGVybWlzc2lvbiAtIE5vbWJyZSBkZWwgcGVybWlzbyBhIGNvbnN1bHRhclxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHRoaXMuY2xhaW1zU2VydmljZS5oYXNQZXJtaXNzaW9uKCd1c2Vycy52aWV3Jyk7XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhc1Blcm1pc3Npb24ocmVxdWlyZWRQZXJtaXNzaW9uOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vcGVuSWREYXRhLmNsYWltcy5pbmRleE9mKHJlcXVpcmVkUGVybWlzc2lvbikgIT09IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBNw6l0b2RvIHBhcmEgdmVyaWZpY2FyIHNpIGVsIHVzdWFyaW8gdGllbmUgdW4gYWwgbWVub3MgdW4gcGVybWlzbyBkZWwgbGlzdGFkbyBjb25zdWx0YWRvXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByZXF1aXJlZFBlcm1pc3Npb25zIC0gQXJyZWdsbyBkZSBwZXJtaXNvcyBhIGNvbnN1bHRhclxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHRoaXMuY2xhaW1zU2VydmljZS5hdExlYXN0UGVybWlzc2lvbnMoWyd1c2Vycy52aWV3JywgJ3VzZXJzLnVwZGF0ZScsICd1c2Vycy5hZGQnXSk7XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0TGVhc3RQZXJtaXNzaW9ucyhyZXF1aXJlZFBlcm1pc3Npb25zOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCByZXF1aXJlZFBlcm1pc3Npb25zLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKGluQXJyYXkocmVxdWlyZWRQZXJtaXNzaW9uc1tpbmRleF0sIHRoaXMub3BlbklkRGF0YS5jbGFpbXMpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uXHJcbiAgICAgKiBNw6l0b2RvIHBhcmEgdmVyaWZpY2FyIHNpIGVsIHVzdWFyaW8gdGllbmUgdG9kb3MgbG9zIHBlcm1pc29zIGNvbnN1bHRhZG9zXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSByZXF1aXJlZFBlcm1pc3Npb25zIC0gQXJyZWdsbyBkZSBwZXJtaXNvcyBhIGNvbnN1bHRhclxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHRoaXMuY2xhaW1zU2VydmljZS5oYXNQZXJtaXNzaW9ucyhbJ3VzZXJzLnZpZXcnLCAndXNlcnMudXBkYXRlJywgJ3VzZXJzLmFkZCddKTtcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFzUGVybWlzc2lvbnMocmVxdWlyZWRQZXJtaXNzaW9uczogc3RyaW5nW10pOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHJlcXVpcmVkUGVybWlzc2lvbnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWluQXJyYXkocmVxdWlyZWRQZXJtaXNzaW9uc1tpbmRleF0sIHRoaXMub3BlbklkRGF0YS5jbGFpbXMpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==