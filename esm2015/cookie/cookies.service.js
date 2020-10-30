import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
let CookiesService = class CookiesService {
    constructor() {
    }
    /**
     * @description
     * Obtiene todas las cookies
     * @returns {}
     */
    getAll() {
        const cookies = {};
        if (document.cookie && document.cookie !== '') {
            const split = document.cookie.split('; ');
            for (let i = 0; i < split.length; i += 1) {
                const cookie = split[i].split('=');
                const currentCookie = decodeURIComponent(cookie[0].trim());
                const currentValue = decodeURIComponent(cookie.slice(1, split[i].length - 1).join('='));
                // Intenta convertir a tipos de dato diferentes a 'string'
                if (currentValue === 'true') {
                    cookies[currentCookie] = true;
                }
                else if (currentValue === 'false') {
                    cookies[currentCookie] = false;
                }
                else {
                    try {
                        cookies[currentCookie] = JSON.parse(currentValue);
                    }
                    catch (_a) {
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
    get(name) {
        const cookies = this.getAll();
        if (cookies.hasOwnProperty(name)) {
            return cookies[name];
        }
        return null;
    }
    /**
     * @param name     Nombre
     * @param value    valor
     * @param expires  Unix Timestamp en que será vigente la cookie o un objeto `Date`
     * @param path     Ruta
     * @param domain   Dominio
     * @param secure   Cookie segura
     * @param sameSite OWASP samesite token `Lax` ó `Strict`
     */
    set(name, value, expires, path, domain, secure, sameSite) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        let cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';
        if (expires) {
            if (typeof expires === 'number') {
                const dateExpires = new Date(expires * 1000);
                cookieString += 'expires=' + dateExpires.toUTCString() + ';';
            }
            else {
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
    delete(name, path, domain) {
        this.set(name, '', new Date('Thu, 01 Jan 1970 00:00:01 GMT'), path, domain);
    }
    /**
     * @description
     * elimina todas las cookes
     */
    deleteAll() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
    }
};
CookiesService.ɵprov = i0.ɵɵdefineInjectable({ factory: function CookiesService_Factory() { return new CookiesService(); }, token: CookiesService, providedIn: "root" });
CookiesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CookiesService);
export { CookiesService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJjb29raWUvY29va2llcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQzs7Ozs7Ozs7OztHQVVHO0FBSUgsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUV6QjtJQUFnQixDQUFDO0lBRWpCOzs7O09BSUc7SUFDSSxNQUFNO1FBRVgsTUFBTSxPQUFPLEdBQU8sRUFBRSxDQUFDO1FBRXZCLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRTtZQUM3QyxNQUFNLEtBQUssR0FBYSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVwRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLGFBQWEsR0FBVyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDbkUsTUFBTSxZQUFZLEdBQVEsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFFN0YsMERBQTBEO2dCQUMxRCxJQUFJLFlBQVksS0FBSyxNQUFNLEVBQUU7b0JBQzNCLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUM7aUJB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QUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDM0QsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcseUNBQXlDLENBQUM7U0FDcEU7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7QUExSVksY0FBYztJQUgxQixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0dBQ1csY0FBYyxDQTBJMUI7U0ExSVksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogU2VydmljaW8gcGFyYSBvYnRlbmVyLCBhY3R1YWxpemFyIHkgYm9ycmFyIGNvb2tpZXMgZW4gZWwgbmF2ZWdhZG9yIHdlYlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBjb25zdHJ1Y3Rvcihjb29raWVzU2VydmljZTogQ29va2llc1NlcnZpY2UpIHsgfVxyXG4gKlxyXG4gKiB0aGlzLmNvb2tpZXNTZXJ2aWNlLmdldCgnVGVzdCcpOyAvLyBPYnRpZW5lIGVsIHZhbG9yIGRlIHVuYSBjb29raWVcclxuICogdGhpcy5jb29raWVzU2VydmljZS5zZXQoJ1Rlc3QnLCAnMTIzJyk7IC8vIFNldGVhIHZhbG9yIGRlIHVuYSBjb29raWVcclxuICogdGhpcy5jb29raWVzU2VydmljZS5kZWxldGUoJ1Rlc3QnKTsgLy8gRWxpbWluYSB1bmEgY29va2llXHJcbiAqIHRoaXMuY29va2llc1NlcnZpY2UuZGVsZXRlQWxsKCk7IC8vIEVsaW1pbmEgdG9kYXMgbGFzIGNvb2tpZXNcclxuICovXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvb2tpZXNTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogT2J0aWVuZSB0b2RhcyBsYXMgY29va2llc1xyXG4gICAqIEByZXR1cm5zIHt9XHJcbiAgICovXHJcbiAgcHVibGljIGdldEFsbCgpOiB7fSB7XHJcblxyXG4gICAgY29uc3QgY29va2llczoge30gPSB7fTtcclxuXHJcbiAgICBpZiAoZG9jdW1lbnQuY29va2llICYmIGRvY3VtZW50LmNvb2tpZSAhPT0gJycpIHtcclxuICAgICAgY29uc3Qgc3BsaXQ6IHN0cmluZ1tdID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpO1xyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdC5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGNvbnN0IGNvb2tpZSA9IHNwbGl0W2ldLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgY29uc3QgY3VycmVudENvb2tpZTogc3RyaW5nID0gZGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZVswXS50cmltKCkpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZTogYW55ID0gZGVjb2RlVVJJQ29tcG9uZW50KGNvb2tpZS5zbGljZSgxLCBzcGxpdFtpXS5sZW5ndGggLSAxKS5qb2luKCc9JykpO1xyXG5cclxuICAgICAgICAvLyBJbnRlbnRhIGNvbnZlcnRpciBhIHRpcG9zIGRlIGRhdG8gZGlmZXJlbnRlcyBhICdzdHJpbmcnXHJcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICBjb29raWVzW2N1cnJlbnRDb29raWVdID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZSA9PT0gJ2ZhbHNlJykge1xyXG4gICAgICAgICAgY29va2llc1tjdXJyZW50Q29va2llXSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29va2llc1tjdXJyZW50Q29va2llXSA9IEpTT04ucGFyc2UoY3VycmVudFZhbHVlKTtcclxuICAgICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICBjb29raWVzW2N1cnJlbnRDb29raWVdID0gY3VycmVudFZhbHVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29va2llcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIE9idGllbmUgZWwgdmFsb3IgZGUgdW5hIGNvb2tpZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gTm9tYnJlIGRlIGxhIGNvb2tpZVxyXG4gICAqIEByZXR1cm5zIHthbnl9IFZhbG9yIGRlIGxhIGNvb2tpZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQobmFtZTogc3RyaW5nKTogYW55IHtcclxuXHJcbiAgICBjb25zdCBjb29raWVzID0gdGhpcy5nZXRBbGwoKTtcclxuXHJcbiAgICBpZiAoY29va2llcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICByZXR1cm4gY29va2llc1tuYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gbmFtZSAgICAgTm9tYnJlXHJcbiAgICogQHBhcmFtIHZhbHVlICAgIHZhbG9yXHJcbiAgICogQHBhcmFtIGV4cGlyZXMgIFVuaXggVGltZXN0YW1wIGVuIHF1ZSBzZXLDoSB2aWdlbnRlIGxhIGNvb2tpZSBvIHVuIG9iamV0byBgRGF0ZWBcclxuICAgKiBAcGFyYW0gcGF0aCAgICAgUnV0YVxyXG4gICAqIEBwYXJhbSBkb21haW4gICBEb21pbmlvXHJcbiAgICogQHBhcmFtIHNlY3VyZSAgIENvb2tpZSBzZWd1cmFcclxuICAgKiBAcGFyYW0gc2FtZVNpdGUgT1dBU1Agc2FtZXNpdGUgdG9rZW4gYExheGAgw7MgYFN0cmljdGBcclxuICAgKi9cclxuICBwdWJsaWMgc2V0KFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgdmFsdWU6IGFueSxcclxuICAgIGV4cGlyZXM/OiBudW1iZXIgfCBEYXRlLFxyXG4gICAgcGF0aD86IHN0cmluZyxcclxuICAgIGRvbWFpbj86IHN0cmluZyxcclxuICAgIHNlY3VyZT86IGJvb2xlYW4sXHJcbiAgICBzYW1lU2l0ZT86ICdMYXgnIHwgJ1N0cmljdCdcclxuICApOiB2b2lkIHtcclxuXHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29va2llU3RyaW5nOiBzdHJpbmcgPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpICsgJzsnO1xyXG5cclxuICAgIGlmIChleHBpcmVzKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgZXhwaXJlcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBjb25zdCBkYXRlRXhwaXJlczogRGF0ZSA9IG5ldyBEYXRlKGV4cGlyZXMgKiAxMDAwKTtcclxuXHJcbiAgICAgICAgY29va2llU3RyaW5nICs9ICdleHBpcmVzPScgKyBkYXRlRXhwaXJlcy50b1VUQ1N0cmluZygpICsgJzsnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvb2tpZVN0cmluZyArPSAnZXhwaXJlcz0nICsgZXhwaXJlcy50b1VUQ1N0cmluZygpICsgJzsnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBhdGgpIHtcclxuICAgICAgY29va2llU3RyaW5nICs9ICdwYXRoPScgKyBwYXRoICsgJzsnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb21haW4pIHtcclxuICAgICAgY29va2llU3RyaW5nICs9ICdkb21haW49JyArIGRvbWFpbiArICc7JztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2VjdXJlKSB7XHJcbiAgICAgIGNvb2tpZVN0cmluZyArPSAnc2VjdXJlOyc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNhbWVTaXRlKSB7XHJcbiAgICAgIGNvb2tpZVN0cmluZyArPSAnc2FtZVNpdGU9JyArIHNhbWVTaXRlICsgJzsnO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZVN0cmluZztcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAqIEBwYXJhbSBuYW1lICAgTm9tYnJlXHJcbiAgKiBAcGFyYW0gcGF0aCAgIFJ1dGFcclxuICAqIEBwYXJhbSBkb21haW4gRG9taW5pb1xyXG4gICovXHJcbiAgcHVibGljIGRlbGV0ZShuYW1lOiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcsIGRvbWFpbj86IHN0cmluZyk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuc2V0KG5hbWUsICcnLCBuZXcgRGF0ZSgnVGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMSBHTVQnKSwgcGF0aCwgZG9tYWluKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIGVsaW1pbmEgdG9kYXMgbGFzIGNvb2tlc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBkZWxldGVBbGwoKSB7XHJcbiAgICBjb25zdCBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29raWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGNvb2tpZSA9IGNvb2tpZXNbaV07XHJcbiAgICAgIGNvbnN0IGVxUG9zID0gY29va2llLmluZGV4T2YoJz0nKTtcclxuICAgICAgY29uc3QgbmFtZSA9IGVxUG9zID4gLTEgPyBjb29raWUuc3Vic3RyKDAsIGVxUG9zKSA6IGNvb2tpZTtcclxuICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArICc9O2V4cGlyZXM9VGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMCBHTVQnO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=