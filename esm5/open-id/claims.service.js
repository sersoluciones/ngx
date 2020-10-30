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
var ClaimsService = /** @class */ (function () {
    function ClaimsService() {
    }
    Object.defineProperty(ClaimsService.prototype, "openIdData", {
        get: function () {
            return this._openIdData;
        },
        set: function (value) {
            this._openIdData = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @description
     * Método para verificar si el usuario tiene un permiso
     * @param {string} requiredPermission - Nombre del permiso a consultar
     * @example
     * this.claimsService.hasPermission('users.view');
     * @returns {boolean}
     */
    ClaimsService.prototype.hasPermission = function (requiredPermission) {
        return this.openIdData.claims.indexOf(requiredPermission) !== -1;
    };
    /**
     * @description
     * Método para verificar si el usuario tiene un al menos un permiso del listado consultado
     * @param {string[]} requiredPermissions - Arreglo de permisos a consultar
     * @example
     * this.claimsService.atLeastPermissions(['users.view', 'users.update', 'users.add']);
     * @returns {boolean}
     */
    ClaimsService.prototype.atLeastPermissions = function (requiredPermissions) {
        for (var index = 0; index < requiredPermissions.length; index++) {
            if (inArray(requiredPermissions[index], this.openIdData.claims)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @description
     * Método para verificar si el usuario tiene todos los permisos consultados
     * @param {string[]} requiredPermissions - Arreglo de permisos a consultar
     * @example
     * this.claimsService.hasPermissions(['users.view', 'users.update', 'users.add']);
     * @returns {boolean}
     */
    ClaimsService.prototype.hasPermissions = function (requiredPermissions) {
        for (var index = 0; index < requiredPermissions.length; index++) {
            if (!inArray(requiredPermissions[index], this.openIdData.claims)) {
                return false;
            }
        }
        return true;
    };
    ClaimsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ClaimsService_Factory() { return new ClaimsService(); }, token: ClaimsService, providedIn: "root" });
    ClaimsService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], ClaimsService);
    return ClaimsService;
}());
export { ClaimsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhaW1zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbIm9wZW4taWQvY2xhaW1zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUV6Qzs7Ozs7R0FLRztBQUlIO0lBQUE7S0E0REM7SUF6REcsc0JBQVcscUNBQVU7YUFBckI7WUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDNUIsQ0FBQzthQUNELFVBQXNCLEtBQWlCO1lBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUM7OztPQUhBO0lBS0Q7Ozs7Ozs7T0FPRztJQUNJLHFDQUFhLEdBQXBCLFVBQXFCLGtCQUEwQjtRQUMzQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksMENBQWtCLEdBQXpCLFVBQTBCLG1CQUE2QjtRQUNuRCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBRTdELElBQUksT0FBTyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzdELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksc0NBQWMsR0FBckIsVUFBc0IsbUJBQTZCO1FBRS9DLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFFN0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUM5RCxPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7SUEzRFEsYUFBYTtRQUh6QixVQUFVLENBQUM7WUFDUixVQUFVLEVBQUUsTUFBTTtTQUNyQixDQUFDO09BQ1csYUFBYSxDQTREekI7d0JBekVEO0NBeUVDLEFBNURELElBNERDO1NBNURZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVuSWREYXRhIH0gZnJvbSAnLi9Jb3Blbi1pZC1jbGllbnQnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGluQXJyYXkgfSBmcm9tICcuLi91dGlscy9hcnJheSc7XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIFNlcnZpY2lvIHBhcmEgdmVyaWZpY2FyIHNpIGVzIHVzdWFyaW8gdGllbmUgbyBubyBwZXJtaXNvcyBwYXJhIHJlYWxpemFyIGNpZXJ0YXMgYWNjaW9uZXNcclxuICogQGV4YW1wbGVcclxuICogY29uc3RydWN0b3IocHJpdmF0ZSBjbGFpbXNTZXJ2aWNlOiBDbGFpbXNTZXJ2aWNlKSB7IH1cclxuICovXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2xhaW1zU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfb3BlbklkRGF0YTogT3BlbklkRGF0YTtcclxuICAgIHB1YmxpYyBnZXQgb3BlbklkRGF0YSgpOiBPcGVuSWREYXRhIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbklkRGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgb3BlbklkRGF0YSh2YWx1ZTogT3BlbklkRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX29wZW5JZERhdGEgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogTcOpdG9kbyBwYXJhIHZlcmlmaWNhciBzaSBlbCB1c3VhcmlvIHRpZW5lIHVuIHBlcm1pc29cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXF1aXJlZFBlcm1pc3Npb24gLSBOb21icmUgZGVsIHBlcm1pc28gYSBjb25zdWx0YXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB0aGlzLmNsYWltc1NlcnZpY2UuaGFzUGVybWlzc2lvbigndXNlcnMudmlldycpO1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXNQZXJtaXNzaW9uKHJlcXVpcmVkUGVybWlzc2lvbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbklkRGF0YS5jbGFpbXMuaW5kZXhPZihyZXF1aXJlZFBlcm1pc3Npb24pICE9PSAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogTcOpdG9kbyBwYXJhIHZlcmlmaWNhciBzaSBlbCB1c3VhcmlvIHRpZW5lIHVuIGFsIG1lbm9zIHVuIHBlcm1pc28gZGVsIGxpc3RhZG8gY29uc3VsdGFkb1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcmVxdWlyZWRQZXJtaXNzaW9ucyAtIEFycmVnbG8gZGUgcGVybWlzb3MgYSBjb25zdWx0YXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB0aGlzLmNsYWltc1NlcnZpY2UuYXRMZWFzdFBlcm1pc3Npb25zKFsndXNlcnMudmlldycsICd1c2Vycy51cGRhdGUnLCAndXNlcnMuYWRkJ10pO1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdExlYXN0UGVybWlzc2lvbnMocmVxdWlyZWRQZXJtaXNzaW9uczogc3RyaW5nW10pOiBib29sZWFuIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcmVxdWlyZWRQZXJtaXNzaW9ucy5sZW5ndGg7IGluZGV4KyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbkFycmF5KHJlcXVpcmVkUGVybWlzc2lvbnNbaW5kZXhdLCB0aGlzLm9wZW5JZERhdGEuY2xhaW1zKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvblxyXG4gICAgICogTcOpdG9kbyBwYXJhIHZlcmlmaWNhciBzaSBlbCB1c3VhcmlvIHRpZW5lIHRvZG9zIGxvcyBwZXJtaXNvcyBjb25zdWx0YWRvc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcmVxdWlyZWRQZXJtaXNzaW9ucyAtIEFycmVnbG8gZGUgcGVybWlzb3MgYSBjb25zdWx0YXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB0aGlzLmNsYWltc1NlcnZpY2UuaGFzUGVybWlzc2lvbnMoWyd1c2Vycy52aWV3JywgJ3VzZXJzLnVwZGF0ZScsICd1c2Vycy5hZGQnXSk7XHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhc1Blcm1pc3Npb25zKHJlcXVpcmVkUGVybWlzc2lvbnM6IHN0cmluZ1tdKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCByZXF1aXJlZFBlcm1pc3Npb25zLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpbkFycmF5KHJlcXVpcmVkUGVybWlzc2lvbnNbaW5kZXhdLCB0aGlzLm9wZW5JZERhdGEuY2xhaW1zKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG4iXX0=