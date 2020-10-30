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
var CookiesService = /** @class */ (function () {
    function CookiesService() {
    }
    /**
     * @description
     * Obtiene todas las cookies
     * @returns {}
     */
    CookiesService.prototype.getAll = function () {
        var cookies = {};
        if (document.cookie && document.cookie !== '') {
            var split = document.cookie.split('; ');
            for (var i = 0; i < split.length; i += 1) {
                var cookie = split[i].split('=');
                var currentCookie = decodeURIComponent(cookie[0].trim());
                var currentValue = decodeURIComponent(cookie.slice(1, split[i].length - 1).join('='));
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
    };
    /**
     * @description
     * Obtiene el valor de una cookie
     * @param {string} name - Nombre de la cookie
     * @returns {any} Valor de la cookie
     */
    CookiesService.prototype.get = function (name) {
        var cookies = this.getAll();
        if (cookies.hasOwnProperty(name)) {
            return cookies[name];
        }
        return null;
    };
    /**
     * @param name     Nombre
     * @param value    valor
     * @param expires  Unix Timestamp en que será vigente la cookie o un objeto `Date`
     * @param path     Ruta
     * @param domain   Dominio
     * @param secure   Cookie segura
     * @param sameSite OWASP samesite token `Lax` ó `Strict`
     */
    CookiesService.prototype.set = function (name, value, expires, path, domain, secure, sameSite) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        var cookieString = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';
        if (expires) {
            if (typeof expires === 'number') {
                var dateExpires = new Date(expires * 1000);
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
    };
    /**
    * @param name   Nombre
    * @param path   Ruta
    * @param domain Dominio
    */
    CookiesService.prototype.delete = function (name, path, domain) {
        this.set(name, '', new Date('Thu, 01 Jan 1970 00:00:01 GMT'), path, domain);
    };
    /**
     * @description
     * elimina todas las cookes
     */
    CookiesService.prototype.deleteAll = function () {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf('=');
            var name_1 = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name_1 + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
    };
    CookiesService.ɵprov = i0.ɵɵdefineInjectable({ factory: function CookiesService_Factory() { return new CookiesService(); }, token: CookiesService, providedIn: "root" });
    CookiesService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], CookiesService);
    return CookiesService;
}());
export { CookiesService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJjb29raWUvY29va2llcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQzs7Ozs7Ozs7OztHQVVHO0FBSUg7SUFFRTtJQUFnQixDQUFDO0lBRWpCOzs7O09BSUc7SUFDSSwrQkFBTSxHQUFiO1FBRUUsSUFBTSxPQUFPLEdBQU8sRUFBRSxDQUFDO1FBRXZCLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRTtZQUM3QyxJQUFNLEtBQUssR0FBYSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVwRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QyxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQyxJQUFNLGFBQWEsR0FBVyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDbkUsSUFBTSxZQUFZLEdBQVEsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFFN0YsMERBQTBEO2dCQUMxRCxJQUFJLFlBQVksS0FBSyxNQUFNLEVBQUU7b0JBQzNCLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQy9CO3FCQUFNLElBQUksWUFBWSxL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QUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzNELFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBSSxHQUFHLHlDQUF5QyxDQUFDO1NBQ3BFO0lBQ0gsQ0FBQzs7SUF6SVUsY0FBYztRQUgxQixVQUFVLENBQUM7WUFDVixVQUFVLEVBQUUsTUFBTTtTQUNuQixDQUFDO09BQ1csY0FBYyxDQTBJMUI7eUJBMUpEO0NBMEpDLEFBMUlELElBMElDO1NBMUlZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIFNlcnZpY2lvIHBhcmEgb2J0ZW5lciwgYWN0dWFsaXphciB5IGJvcnJhciBjb29raWVzIGVuIGVsIG5hdmVnYWRvciB3ZWJcclxuICogQGV4YW1wbGVcclxuICogY29uc3RydWN0b3IoY29va2llc1NlcnZpY2U6IENvb2tpZXNTZXJ2aWNlKSB7IH1cclxuICpcclxuICogdGhpcy5jb29raWVzU2VydmljZS5nZXQoJ1Rlc3QnKTsgLy8gT2J0aWVuZSBlbCB2YWxvciBkZSB1bmEgY29va2llXHJcbiAqIHRoaXMuY29va2llc1NlcnZpY2Uuc2V0KCdUZXN0JywgJzEyMycpOyAvLyBTZXRlYSB2YWxvciBkZSB1bmEgY29va2llXHJcbiAqIHRoaXMuY29va2llc1NlcnZpY2UuZGVsZXRlKCdUZXN0Jyk7IC8vIEVsaW1pbmEgdW5hIGNvb2tpZVxyXG4gKiB0aGlzLmNvb2tpZXNTZXJ2aWNlLmRlbGV0ZUFsbCgpOyAvLyBFbGltaW5hIHRvZGFzIGxhcyBjb29raWVzXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb29raWVzU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIE9idGllbmUgdG9kYXMgbGFzIGNvb2tpZXNcclxuICAgKiBAcmV0dXJucyB7fVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRBbGwoKToge30ge1xyXG5cclxuICAgIGNvbnN0IGNvb2tpZXM6IHt9ID0ge307XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LmNvb2tpZSAmJiBkb2N1bWVudC5jb29raWUgIT09ICcnKSB7XHJcbiAgICAgIGNvbnN0IHNwbGl0OiBzdHJpbmdbXSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BsaXQubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBjb25zdCBjb29raWUgPSBzcGxpdFtpXS5zcGxpdCgnPScpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb29raWU6IHN0cmluZyA9IGRlY29kZVVSSUNvbXBvbmVudChjb29raWVbMF0udHJpbSgpKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWU6IGFueSA9IGRlY29kZVVSSUNvbXBvbmVudChjb29raWUuc2xpY2UoMSwgc3BsaXRbaV0ubGVuZ3RoIC0gMSkuam9pbignPScpKTtcclxuXHJcbiAgICAgICAgLy8gSW50ZW50YSBjb252ZXJ0aXIgYSB0aXBvcyBkZSBkYXRvIGRpZmVyZW50ZXMgYSAnc3RyaW5nJ1xyXG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgY29va2llc1tjdXJyZW50Q29va2llXSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50VmFsdWUgPT09ICdmYWxzZScpIHtcclxuICAgICAgICAgIGNvb2tpZXNbY3VycmVudENvb2tpZV0gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvb2tpZXNbY3VycmVudENvb2tpZV0gPSBKU09OLnBhcnNlKGN1cnJlbnRWYWx1ZSk7XHJcbiAgICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgY29va2llc1tjdXJyZW50Q29va2llXSA9IGN1cnJlbnRWYWx1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvb2tpZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBPYnRpZW5lIGVsIHZhbG9yIGRlIHVuYSBjb29raWVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIE5vbWJyZSBkZSBsYSBjb29raWVcclxuICAgKiBAcmV0dXJucyB7YW55fSBWYWxvciBkZSBsYSBjb29raWVcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0KG5hbWU6IHN0cmluZyk6IGFueSB7XHJcblxyXG4gICAgY29uc3QgY29va2llcyA9IHRoaXMuZ2V0QWxsKCk7XHJcblxyXG4gICAgaWYgKGNvb2tpZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgcmV0dXJuIGNvb2tpZXNbbmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIG5hbWUgICAgIE5vbWJyZVxyXG4gICAqIEBwYXJhbSB2YWx1ZSAgICB2YWxvclxyXG4gICAqIEBwYXJhbSBleHBpcmVzICBVbml4IFRpbWVzdGFtcCBlbiBxdWUgc2Vyw6EgdmlnZW50ZSBsYSBjb29raWUgbyB1biBvYmpldG8gYERhdGVgXHJcbiAgICogQHBhcmFtIHBhdGggICAgIFJ1dGFcclxuICAgKiBAcGFyYW0gZG9tYWluICAgRG9taW5pb1xyXG4gICAqIEBwYXJhbSBzZWN1cmUgICBDb29raWUgc2VndXJhXHJcbiAgICogQHBhcmFtIHNhbWVTaXRlIE9XQVNQIHNhbWVzaXRlIHRva2VuIGBMYXhgIMOzIGBTdHJpY3RgXHJcbiAgICovXHJcbiAgcHVibGljIHNldChcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIHZhbHVlOiBhbnksXHJcbiAgICBleHBpcmVzPzogbnVtYmVyIHwgRGF0ZSxcclxuICAgIHBhdGg/OiBzdHJpbmcsXHJcbiAgICBkb21haW4/OiBzdHJpbmcsXHJcbiAgICBzZWN1cmU/OiBib29sZWFuLFxyXG4gICAgc2FtZVNpdGU/OiAnTGF4JyB8ICdTdHJpY3QnXHJcbiAgKTogdm9pZCB7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvb2tpZVN0cmluZzogc3RyaW5nID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSArICc7JztcclxuXHJcbiAgICBpZiAoZXhwaXJlcykge1xyXG4gICAgICBpZiAodHlwZW9mIGV4cGlyZXMgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgY29uc3QgZGF0ZUV4cGlyZXM6IERhdGUgPSBuZXcgRGF0ZShleHBpcmVzICogMTAwMCk7XHJcblxyXG4gICAgICAgIGNvb2tpZVN0cmluZyArPSAnZXhwaXJlcz0nICsgZGF0ZUV4cGlyZXMudG9VVENTdHJpbmcoKSArICc7JztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb29raWVTdHJpbmcgKz0gJ2V4cGlyZXM9JyArIGV4cGlyZXMudG9VVENTdHJpbmcoKSArICc7JztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChwYXRoKSB7XHJcbiAgICAgIGNvb2tpZVN0cmluZyArPSAncGF0aD0nICsgcGF0aCArICc7JztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9tYWluKSB7XHJcbiAgICAgIGNvb2tpZVN0cmluZyArPSAnZG9tYWluPScgKyBkb21haW4gKyAnOyc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNlY3VyZSkge1xyXG4gICAgICBjb29raWVTdHJpbmcgKz0gJ3NlY3VyZTsnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzYW1lU2l0ZSkge1xyXG4gICAgICBjb29raWVTdHJpbmcgKz0gJ3NhbWVTaXRlPScgKyBzYW1lU2l0ZSArICc7JztcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWVTdHJpbmc7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiBAcGFyYW0gbmFtZSAgIE5vbWJyZVxyXG4gICogQHBhcmFtIHBhdGggICBSdXRhXHJcbiAgKiBAcGFyYW0gZG9tYWluIERvbWluaW9cclxuICAqL1xyXG4gIHB1YmxpYyBkZWxldGUobmFtZTogc3RyaW5nLCBwYXRoPzogc3RyaW5nLCBkb21haW4/OiBzdHJpbmcpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLnNldChuYW1lLCAnJywgbmV3IERhdGUoJ1RodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDEgR01UJyksIHBhdGgsIGRvbWFpbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBlbGltaW5hIHRvZGFzIGxhcyBjb29rZXNcclxuICAgKi9cclxuICBwdWJsaWMgZGVsZXRlQWxsKCkge1xyXG4gICAgY29uc3QgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBjb29raWUgPSBjb29raWVzW2ldO1xyXG4gICAgICBjb25zdCBlcVBvcyA9IGNvb2tpZS5pbmRleE9mKCc9Jyk7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSBlcVBvcyA+IC0xID8gY29va2llLnN1YnN0cigwLCBlcVBvcykgOiBjb29raWU7XHJcbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyAnPTtleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UJztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19