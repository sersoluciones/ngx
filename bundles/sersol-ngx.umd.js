(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('leaflet'), require('leaflet.markercluster'), require('@sersol/leaflet-plugins/leaflet-fullscreen'), require('@sersol/leaflet-plugins/leaflet-mouseposition'), require('rxjs/operators'), require('@angular/forms'), require('rxjs/BehaviorSubject'), require('rxjs/Observable'), require('rxjs/Subject'), require('rxjs/add/operator/filter'), require('rxjs/add/operator/map'), require('rxjs/add/operator/distinctUntilChanged'), require('rxjs/add/observable/combineLatest'), require('@angular/common'), require('@angular/platform-browser'), require('@tweenjs/tween.js')) :
    typeof define === 'function' && define.amd ? define('@sersol/ngx', ['exports', '@angular/core', 'rxjs', 'leaflet', 'leaflet.markercluster', '@sersol/leaflet-plugins/leaflet-fullscreen', '@sersol/leaflet-plugins/leaflet-mouseposition', 'rxjs/operators', '@angular/forms', 'rxjs/BehaviorSubject', 'rxjs/Observable', 'rxjs/Subject', 'rxjs/add/operator/filter', 'rxjs/add/operator/map', 'rxjs/add/operator/distinctUntilChanged', 'rxjs/add/observable/combineLatest', '@angular/common', '@angular/platform-browser', '@tweenjs/tween.js'], factory) :
    (global = global || self, factory((global.sersol = global.sersol || {}, global.sersol.ngx = {}), global.ng.core, global.rxjs, global.leaflet, null, null, null, global.rxjs.operators, global.ng.forms, global.rxjs.BehaviorSubject, global.rxjs.Observable, global.rxjs.Subject, global.rxjs['add/operator/filter'], global.rxjs['add/operator/map'], global.rxjs['add/operator/distinctUntilChanged'], global.rxjs['add/observable/combineLatest'], global.ng.common, global.ng.platformBrowser, global.tween_js));
}(this, (function (exports, core, rxjs, leaflet, leaflet_markercluster, leafletFullscreen, leafletMouseposition, operators, forms, BehaviorSubject, Observable, Subject, filter, map, distinctUntilChanged, combineLatest, common, platformBrowser, tween_js) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

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
        CookiesService.ɵprov = core["ɵɵdefineInjectable"]({ factory: function CookiesService_Factory() { return new CookiesService(); }, token: CookiesService, providedIn: "root" });
        CookiesService = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], CookiesService);
        return CookiesService;
    }());

    /**
     * @description
     * Función para insertar scritps externos (ejem: gapi, facebook sdk)
     * @example
     * constructor(private externalScriptService: ExternalScriptService) { }
     *
     * this.externalScriptService.insert('google-jssdk', 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded');
     * @param {string} id - Id para la etiqueta script
     * @param {string} src - url para la etiqueta script
     */
    var ExternalScriptService = /** @class */ (function () {
        function ExternalScriptService() {
        }
        ExternalScriptService.prototype.insert = function (id, src) {
            var fjs = document.getElementsByTagName('script')[0];
            if (document.getElementById(id)) {
                return;
            }
            var js = document.createElement('script');
            js.id = id;
            js.src = src;
            fjs.parentNode.insertBefore(js, fjs);
        };
        ExternalScriptService.ɵprov = core["ɵɵdefineInjectable"]({ factory: function ExternalScriptService_Factory() { return new ExternalScriptService(); }, token: ExternalScriptService, providedIn: "root" });
        ExternalScriptService = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], ExternalScriptService);
        return ExternalScriptService;
    }());

    /**
     * @description
     * Clase para obtener, observar y cambiar el esquema de color claro/oscuro
     * @example
     * constructor(prefersColorSchemeService: PrefersColorSchemeService) { }
     *
     * this.prefersColorSchemeService.init(); // Setea el esquema inicial
     * this.prefersColorSchemeService.watch(); // Observa cambio de esquema en OS
     */
    var PrefersColorSchemeService = /** @class */ (function () {
        function PrefersColorSchemeService() {
            this._SchemeLightClassName = 'scheme-light';
            this._SchemeDarkClassName = 'scheme-dark';
            this.Scheme = window.matchMedia('(prefers-color-scheme: dark)');
        }
        Object.defineProperty(PrefersColorSchemeService.prototype, "Scheme", {
            get: function () {
                return this._Scheme;
            },
            set: function (value) {
                this._Scheme = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrefersColorSchemeService.prototype, "SchemeLightClassName", {
            get: function () {
                return this._SchemeLightClassName;
            },
            set: function (value) {
                this._SchemeLightClassName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrefersColorSchemeService.prototype, "SchemeDarkClassName", {
            get: function () {
                return this._SchemeDarkClassName;
            },
            set: function (value) {
                this._SchemeDarkClassName = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @description
         * Inicializar el esquema de color
         * @usageNotes
         * Usarse unicamente si se desea aplicar el esquema de color acorde al esquema de color del sistema operativo
         */
        PrefersColorSchemeService.prototype.init = function () {
            if (this.Scheme.matches) {
                this.enableDark();
            }
            else {
                this.enableLight();
            }
        };
        /**
         * @description
         * Obtener el esquema de color actual del SO
         * @returns {string} Esquema de color
         */
        PrefersColorSchemeService.prototype.get = function () {
            if (this.Scheme.matches) {
                return 'dark';
            }
            else {
                return 'light';
            }
        };
        /**
         * @description
         * Agrega SchemeDarkClassName y remueve SchemeLightClassName a la etiqueta body
         */
        PrefersColorSchemeService.prototype.enableDark = function () {
            var body = document.getElementsByTagName('body')[0];
            if (body.classList.contains(this.SchemeLightClassName)) {
                body.classList.remove(this.SchemeLightClassName);
            }
            body.classList.add(this.SchemeDarkClassName);
        };
        /**
         * @description
         * Agrega SchemeLightClassName y remueve SchemeDarkClassName a la etiqueta body
         */
        PrefersColorSchemeService.prototype.enableLight = function () {
            var body = document.getElementsByTagName('body')[0];
            if (body.classList.contains(this.SchemeDarkClassName)) {
                body.classList.remove(this.SchemeDarkClassName);
            }
            body.classList.add(this.SchemeLightClassName);
        };
        /**
         * @description
         * Habilita el cambio automatico de esquema de color según el cambio de esquema de color del SO
         */
        PrefersColorSchemeService.prototype.watch = function () {
            var _this = this;
            var setScheme = function (ev) {
                if (ev.matches) {
                    console.log('Changed to dark mode');
                    _this.enableDark();
                }
                else {
                    console.log('Changed to light mode');
                    _this.enableLight();
                }
            };
            if (typeof this.Scheme.onchange === 'function') {
                this.Scheme.onchange = setScheme;
            }
            else if (typeof this.Scheme.addEventListener === 'function') {
                this.Scheme.addEventListener('change', setScheme);
                // tslint:disable-next-line: deprecation
            }
            else if (typeof this.Scheme.addListener === 'function') {
                // tslint:disable-next-line: deprecation
                this.Scheme.addListener(setScheme);
            }
        };
        PrefersColorSchemeService.ɵprov = core["ɵɵdefineInjectable"]({ factory: function PrefersColorSchemeService_Factory() { return new PrefersColorSchemeService(); }, token: PrefersColorSchemeService, providedIn: "root" });
        PrefersColorSchemeService = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], PrefersColorSchemeService);
        return PrefersColorSchemeService;
    }());

    /**
     * @description
     * Función para verificar si una variable cumple con los siguiente:
     * - Si es un arreglo, verifica si tiene un tamaño mayor a cero
     * - No tiene ninguno de estos valores: '', null, undefined, NaN
     * @param {any | any[]} variable Variable a verificar
     * @returns {boolean}
     */
    function hasValue(variable) {
        if (Array.isArray(variable)) {
            return 0 < variable.length;
        }
        else {
            return ['', null, undefined, NaN].indexOf(variable) === -1;
        }
    }
    /**
     * @description
     * Función para verificar si un objeto no esta vacío
     * @param {any} value Objeto a verificar
     * @returns {boolean}
     */
    function objHasValue(value) {
        return Object.keys(value).length > 0;
    }

    var AWS_CONFIG = new core.InjectionToken('aws.config');
    /**
     * @description
     * Servicio para verificar si es usuario tiene o no permisos para realizar ciertas acciones
     * @example
     * constructor(private claimsService: ClaimsService) { }
     */
    var AwsService = /** @class */ (function () {
        function AwsService(config) {
            this.awsData = config;
        }
        Object.defineProperty(AwsService.prototype, "awsData", {
            get: function () {
                return this._awsData;
            },
            set: function (value) {
                this._awsData = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @description
         * Método obtener url de assets en S3
         * @param {string} key - Ruta del objeto en el bucket (Sin '/' al principio)
         * @example
         * this.awsService.getS3Url('assets/file.png');
         * @returns {string}
         */
        AwsService.prototype.getS3Url = function (key) {
            if (hasValue(key)) {
                return "https://" + this.awsData.s3.bucket + ".s3.amazonaws.com/" + key;
            }
            else {
                return '';
            }
        };
        /**
         * @description
         * Método obtener url de assets en S3
         * @param {string} key - Ruta del objeto en el bucket (Sin '/' al principio)
         * @example
         * this.awsService.getS3Url('assets/file.png');
         * @returns {string}
         */
        AwsService.prototype.getS3BgUrl = function (key) {
            if (hasValue(key)) {
                return "url(https://" + this.awsData.s3.bucket + ".s3.amazonaws.com/" + key + ")";
            }
            else {
                return '';
            }
        };
        AwsService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [AWS_CONFIG,] }] }
        ]; };
        AwsService.ɵprov = core["ɵɵdefineInjectable"]({ factory: function AwsService_Factory() { return new AwsService(core["ɵɵinject"](AWS_CONFIG)); }, token: AwsService, providedIn: "root" });
        AwsService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(0, core.Inject(AWS_CONFIG))
        ], AwsService);
        return AwsService;
    }());

    /**
     * @description
     * Módulo para inicializar el servicio AwsService
     * @example
     * import { AWS_CONFIG, AwsModule } from '@sersol/ngx';
     *
     * @NgModule({
        imports: [
          ...,
          AwsModule.forRoot({
              provide: AWS_CONFIG,
              useValue: {
                  s3: {
                    bucket: 'ser-app'
                  }
              }
          }),
          ...
        ],
        declarations: [...],
        schemas: [...],
        providers: [...],
        bootstrap: [...]
    })
    export class AppModule { }
     */
    var AwsModule = /** @class */ (function () {
        function AwsModule() {
        }
        AwsModule_1 = AwsModule;
        AwsModule.forRoot = function (ConfigProvider) {
            return {
                ngModule: AwsModule_1,
                providers: [
                    ConfigProvider,
                    AwsService
                ]
            };
        };
        var AwsModule_1;
        AwsModule = AwsModule_1 = __decorate([
            core.NgModule()
        ], AwsModule);
        return AwsModule;
    }());

    var GoogleSDKConfig = /** @class */ (function () {
        function GoogleSDKConfig(clientConfig) {
            this.clientConfig = clientConfig;
        }
        Object.defineProperty(GoogleSDKConfig.prototype, "clientConfig", {
            get: function () {
                return this._clientConfig;
            },
            set: function (value) {
                this._clientConfig = value;
            },
            enumerable: true,
            configurable: true
        });
        return GoogleSDKConfig;
    }());

    // Type definitions for Google API Client
    // Project: https://github.com/google/google-api-javascript-client
    // Definitions by: Frank M <https://github.com/sgtfrankieboy>, grant <https://github.com/grant>
    // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
    // TypeScript Version: 2.3
    var GoogleClientConfig = /** @class */ (function () {
        function GoogleClientConfig() {
        }
        return GoogleClientConfig;
    }());

    var NG_GAPI_CONFIG = new core.InjectionToken('google.config');
    /**
     * @description
     * Servicio para interactuar con la API de Google
     */
    var GoogleSDKService = /** @class */ (function () {
        function GoogleSDKService(config) {
            var _this = this;
            this.gapiUrl = 'https://apis.google.com/js/api.js';
            this.onload = new core.EventEmitter();
            this.config = new GoogleSDKConfig(config);
            this.loadSDK().subscribe(function () {
                console.log('Google: SDK loaded');
                _this.onload.emit();
            });
        }
        Object.defineProperty(GoogleSDKService.prototype, "config", {
            get: function () {
                return this._config;
            },
            set: function (value) {
                this._config = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GoogleSDKService.prototype, "GoogleAuth", {
            get: function () {
                return this._GoogleAuth;
            },
            set: function (value) {
                this._GoogleAuth = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @description
         * Método para obtener un token de inicio de sesión junto con la información de perfil
         * @returns {Observable<GoogleUserProfile>}
         */
        GoogleSDKService.prototype.login = function () {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                _this.GoogleAuth.signIn().then(function (res) {
                    var profile = res.getBasicProfile();
                    var googleProfile = {
                        id: profile.getId(),
                        id_token: res.getAuthResponse().id_token,
                        first_name: profile.getGivenName(),
                        last_name: profile.getFamilyName(),
                        email: profile.getEmail(),
                        picture: profile.getImageUrl().replace('=s96-', '=-')
                    };
                    observer.next(googleProfile);
                    observer.complete();
                }, function (err) {
                    return observer.error(err);
                });
            });
        };
        /**
         * @description
         * Metodo privado que carga la libreria de Google, al cargarse correctamente, se emite el evento 'onload'
         */
        GoogleSDKService.prototype.loadSDK = function () {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                if (window.gapi == null) {
                    var node = document.createElement('script');
                    node.src = _this.gapiUrl;
                    node.type = 'text/javascript';
                    node.async = true;
                    node.defer = true;
                    node.id = 'google-api';
                    document.getElementsByTagName('head')[0].appendChild(node);
                    node.onload = function () {
                        gapi.load('auth2', function () {
                            gapi.auth2.init(_this.config.clientConfig).then(function (auth) {
                                _this.GoogleAuth = auth;
                                observer.next();
                                observer.complete();
                            }).catch(function (err) { return observer.error(err); });
                        });
                    };
                }
                else {
                    observer.next();
                    observer.complete();
                }
            });
        };
        GoogleSDKService.ctorParameters = function () { return [
            { type: GoogleClientConfig, decorators: [{ type: core.Inject, args: [NG_GAPI_CONFIG,] }] }
        ]; };
        GoogleSDKService.ɵprov = core["ɵɵdefineInjectable"]({ factory: function GoogleSDKService_Factory() { return new GoogleSDKService(core["ɵɵinject"](NG_GAPI_CONFIG)); }, token: GoogleSDKService, providedIn: "root" });
        __decorate([
            core.Output()
        ], GoogleSDKService.prototype, "onload", void 0);
        GoogleSDKService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(0, core.Inject(NG_GAPI_CONFIG))
        ], GoogleSDKService);
        return GoogleSDKService;
    }());

    /**
     * @description
     * Módulo para parametrizar la autenticación con Google
     * @example
     * import { NG_GAPI_CONFIG, GoogleSDKModule } from '@sersol/ngx';
     * @NgModule({
     *  imports: [
     *    ...,
     *    GoogleSDKModule.forRoot({
     *        provide: NG_GAPI_CONFIG,
     *        useValue: {
     *            client_id: GOOGLE_CLIENT_ID,
     *            scope: 'profile email'
     *        }
     *    }),
     *    ...
     *  ],
     *  declarations: [...],
     *  schemas: [...],
     *  providers: [...],
     *  bootstrap: [...]
     * })
     * export class AppModule { }
     */
    var GoogleSDKModule = /** @class */ (function () {
        function GoogleSDKModule() {
        }
        GoogleSDKModule_1 = GoogleSDKModule;
        GoogleSDKModule.forRoot = function (gapiConfigProvider) {
            return {
                ngModule: GoogleSDKModule_1,
                providers: [
                    gapiConfigProvider,
                    GoogleSDKService
                ]
            };
        };
        var GoogleSDKModule_1;
        GoogleSDKModule = GoogleSDKModule_1 = __decorate([
            core.NgModule()
        ], GoogleSDKModule);
        return GoogleSDKModule;
    }());

    var FacebookSDKConfig = /** @class */ (function () {
        function FacebookSDKConfig(clientConfig) {
            this.clientConfig = clientConfig;
        }
        Object.defineProperty(FacebookSDKConfig.prototype, "clientConfig", {
            get: function () {
                return this._clientConfig;
            },
            set: function (value) {
                this._clientConfig = value;
            },
            enumerable: true,
            configurable: true
        });
        return FacebookSDKConfig;
    }());

    var NG_FSDK_CONFIG = new core.InjectionToken('facebook.config');
    /**
     * @description
     * Servicio para interacturar con el SDK de Facebook
     */
    var FacebookSDKService = /** @class */ (function () {
        function FacebookSDKService(config) {
            var _this = this;
            this.fsdkUrl = 'https://connect.facebook.net/en_US/sdk.js';
            this.onload = new core.EventEmitter();
            this.config = new FacebookSDKConfig(config);
            this.loadSDK().subscribe(function () {
                console.log('Facebook: SDK loaded');
                _this.onload.emit();
            });
        }
        Object.defineProperty(FacebookSDKService.prototype, "config", {
            get: function () {
                return this._config;
            },
            set: function (value) {
                this._config = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @description
         * Método para obtener un token de inicio de sesión junto con la información de perfil
         * @returns {Observable<FacebookUserProfile>}
         */
        FacebookSDKService.prototype.login = function () {
            return new rxjs.Observable(function (observer) {
                FB.login(function (response) {
                    if (response.status === 'connected') {
                        FB.api('/me', { fields: 'first_name,last_name,email' }, function (res) {
                            FB.api('/me/picture', {
                                width: 300,
                                redirect: 'false'
                            }, function (pic) {
                                var _a, _b;
                                var facebookProfile = {
                                    id: res.id,
                                    access_token: response.authResponse.accessToken,
                                    first_name: res.first_name,
                                    last_name: res.last_name,
                                    email: res.email,
                                };
                                if ((_b = (_a = pic) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.url) {
                                    facebookProfile.picture = pic.data.url;
                                }
                                observer.next(facebookProfile);
                                observer.complete();
                            });
                        });
                    }
                    else {
                        console.warn('Facebook: Popup closed by user');
                    }
                }, { scope: 'public_profile,email' });
            });
        };
        /**
         * @description
         * Metodo privado que carga la libreria de Facebook, al cargarse correctamente, se emite el evento 'onload'
         */
        FacebookSDKService.prototype.loadSDK = function () {
            var _this = this;
            return new rxjs.Observable(function (observer) {
                if (window.FB == null) {
                    var node = document.createElement('script');
                    node.src = _this.fsdkUrl;
                    node.type = 'text/javascript';
                    node.async = true;
                    node.defer = true;
                    node.id = 'facebook-sdk';
                    document.getElementsByTagName('head')[0].appendChild(node);
                    node.onload = function () {
                        FB.init(_this.config.clientConfig);
                        FB.AppEvents.logPageView();
                        observer.next(true);
                        observer.complete();
                    };
                }
                else {
                    observer.next(true);
                    observer.complete();
                }
            });
        };
        FacebookSDKService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [NG_FSDK_CONFIG,] }] }
        ]; };
        FacebookSDKService.ɵprov = core["ɵɵdefineInjectable"]({ factory: function FacebookSDKService_Factory() { return new FacebookSDKService(core["ɵɵinject"](NG_FSDK_CONFIG)); }, token: FacebookSDKService, providedIn: "root" });
        __decorate([
            core.Output()
        ], FacebookSDKService.prototype, "onload", void 0);
        FacebookSDKService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(0, core.Inject(NG_FSDK_CONFIG))
        ], FacebookSDKService);
        return FacebookSDKService;
    }());

    /**
     * @description
     * Módulo para parametrizar la autenticación con Facebook
     * @example
     * import { NG_FSDK_CONFIG, FacebookSDKModule } from '@sersol/ngx';
     * @NgModule({
        imports: [
          ...,
          FacebookSDKModule.forRoot({
              provide: NG_FSDK_CONFIG,
              useValue: {
                  appId: FACEBOOK_CLIENT_ID,
                  cookie: true,
                  xfbml: true,
                  version: 'v6.0'
              }
          }),
          ...
        ],
        declarations: [...],
        schemas: [...],
        providers: [...],
        bootstrap: [...]
    })
    export class AppModule { }
     */
    var FacebookSDKModule = /** @class */ (function () {
        function FacebookSDKModule() {
        }
        FacebookSDKModule_1 = FacebookSDKModule;
        FacebookSDKModule.forRoot = function (fsdkConfigProvider) {
            return {
                ngModule: FacebookSDKModule_1,
                providers: [
                    fsdkConfigProvider,
                    FacebookSDKService
                ]
            };
        };
        var FacebookSDKModule_1;
        FacebookSDKModule = FacebookSDKModule_1 = __decorate([
            core.NgModule()
        ], FacebookSDKModule);
        return FacebookSDKModule;
    }());

    /**
     * @description
     * Función para verificar si un valor existe en un arreglo
     * @param {any} value Valor a encontrar
     * @param {any[]} array Arreglo objetivo de la busqueda
     * @returns {boolean}
     */
    function inArray(value, array) {
        return array ? array.indexOf(value) !== -1 : false;
    }
    /**
     * @description
     * Función para verificar si un valor NO existe en un arreglo
     * @param {any} value Valor a encontrar
     * @param {any[]} array Arreglo objetivo de la busqueda
     * @returns {boolean}
     */
    function notInArray(value, array) {
        return array ? array.indexOf(value) === -1 : false;
    }
    /**
     * @description
     * Función para convertir un string en string[]
     * @param value Valor a convertir
     */
    var toArray = function (value) { return Array.isArray(value) ? value : [value]; };
    /**
     * @description
     * Función para crear un objeto con los datos agrupado de un arreglo por un valor dado
     * @param {any[]} array Arreglo para agrupar
     * @param {string | number} field Campo para agrupar
     * @returns {boolean}
     */
    function arrayGroupBy(array, field) {
        var array_group_by = {};
        for (var index = 0; index < array.length; ++index) {
            if (array_group_by[array[index][field]] === undefined) {
                array_group_by[array[index][field]] = [];
            }
            array_group_by[array[index][field]].push(array[index]);
        }
        return array_group_by;
    }
    /**
     * @description
     * Función para obtener un objeto contenido en un arreglo usando una pareja clave-valor para su busqueda
     * @param {any[]} array Arreglo de objetos
     * @param {string | number} field Campo de busqueda
     * @param {any} value Valor del campo de busqueda
     * @returns {object}
     */
    function getObjectByValue(array, field, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty(field)) {
                if (array[i][field] === value) {
                    return array[i];
                }
                else {
                    for (var prop in array[i][field]) {
                        if (array[i][field][prop] === value) {
                            return array[i];
                        }
                    }
                }
            }
        }
    }
    /**
     * @description
     * Función para obtener el índice de un objeto contenido en un arreglo usando una pareja clave-valor para su busqueda
     * @param {any[]} array Arreglo de objetos
     * @param {string | number} field Campo de busqueda
     * @param {any} value Valor del campo de busqueda
     * @returns {number}
     */
    function getObjIndexByValue(array, field, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty(field)) {
                if (array[i][field] === value) {
                    return i;
                }
                else {
                    for (var prop in array[i][field]) {
                        if (array[i][field][prop] === value) {
                            return i;
                        }
                    }
                }
            }
        }
    }

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
        ClaimsService.ɵprov = core["ɵɵdefineInjectable"]({ factory: function ClaimsService_Factory() { return new ClaimsService(); }, token: ClaimsService, providedIn: "root" });
        ClaimsService = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], ClaimsService);
        return ClaimsService;
    }());

    /**
     * @description
     * Función para transformar un objeto en un string apto para filtrar resultados GraphQL
     * @param {any} obj Objeto a convertir
     * @returns {string}
     */
    function objectToGraphParams(obj) {
        var e_1, _a;
        var graph_params = '';
        try {
            for (var _b = __values(Object.entries(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                if (hasValue(value)) {
                    graph_params += key + ': ';
                    if (typeof (value) === 'string') {
                        graph_params += '"' + value + '"';
                    }
                    else {
                        graph_params += value;
                    }
                    graph_params += ',';
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (hasValue(graph_params)) {
            graph_params = graph_params.substring(0, graph_params.length - 1);
        }
        return graph_params;
    }

    /**
     * Deep merge source object into target object
     * @param target Target object
     * @param source Source object
     */
    function mergeObjs(target, source) {
        var isObject = function (obj) { return obj && typeof obj === 'object'; };
        if (!isObject(target) || !isObject(source)) {
            return source;
        }
        Object.keys(source).forEach(function (key) {
            var targetValue = target[key];
            var sourceValue = source[key];
            if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
                target[key] = targetValue.concat(sourceValue);
            }
            else if (isObject(targetValue) && isObject(sourceValue)) {
                target[key] = mergeObjs(Object.assign({}, targetValue), sourceValue);
            }
            else {
                target[key] = sourceValue;
            }
        });
        return target;
    }

    /**
     * @description Agrega 4 clases css a un elemento HTML
     * @example <body class="bos-macOS bosv-10.15.4 bn-Chrome bv-81.0.4044.129">
     * @param {Parser.Parser} bowserInstance Objeto Bowser parseado
     * @param {Renderer2} renderer Elemento a modificar
     */
    function setBowserClasses(bowserInstance, renderer) {
        renderer.addClass(document.body, 'bos-' + bowserInstance.getOSName().replace(/ +/g, '-'));
        renderer.addClass(document.body, 'bosv-' + bowserInstance.getOSVersion().replace(/ +/g, '-'));
        renderer.addClass(document.body, 'bn-' + bowserInstance.getBrowserName().replace(/ +/g, '-'));
        renderer.addClass(document.body, 'bv-' + bowserInstance.getBrowserVersion().replace(/ +/g, '-'));
    }

    /**
     * @description
     * Función para verificar si el navegador dispone de lector PDF
     * @returns {boolean}
     */
    function hasPdfViewer() {
        for (var index = 0; index < window.navigator.plugins.length; index++) {
            if (window.navigator.plugins[index].name.toLowerCase().indexOf('pdf') > -1) {
                return true;
            }
        }
        return false;
    }
    /**
     * @description
     * Función para extraer todas las reglas CSS aplicadas a un elemento DOM
     * @param {Element} element Elemento DOM
     * @returns {CSSStyleDeclaration}
     */
    function getStyles(element) {
        return !(element instanceof HTMLElement) ? {} :
            element.ownerDocument && element.ownerDocument.defaultView.opener
                ? element.ownerDocument.defaultView.getComputedStyle(element)
                : window.getComputedStyle(element);
    }
    /**
     * @description
     * Función para obtener el ancho de la ventana o pestaña de la página
     * @returns {number}
     */
    function browserWidth() {
        return 0 < window.innerWidth ? window.innerWidth : screen.width;
    }
    /* if (bowser) {
      $('body').addClass('bos-' + bowser.osname.replace(/ /g, "") + ' bosv-' + bowser.osversion.replace(/ /g, "")
      + ' bn-' + bowser.name.replace(/ /g, "") + ' bv-' + bowser.version.replace(/ /g, ""));
    } */

    /**
     * @description
     * Función para generar un código GUID aleatorio
     * @returns {string}
     */
    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    /**
     * @description
     * Función para generar un código alfanúmerico único
     * @returns {string}
     */
    function uniqueId() {
        var today = new Date();
        return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4() + Math.floor((today.getTime() * Math.random()));
    }
    function s4() {
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
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * Función para generar contraseñas aleatorias
     * @param options Parametros de contraseña
     */
    function generatePassword(options) {
        var _a, _b, _c, _d;
        var defaultOptions = {
            length: 8,
            numbers: true,
            specialChars: false,
            lettersLowerCase: true,
            lettersUpperCase: true
        };
        mergeObjs(defaultOptions, options);
        var charset = '';
        if ((_a = defaultOptions) === null || _a === void 0 ? void 0 : _a.numbers) {
            charset += '0123456789';
        }
        if ((_b = defaultOptions) === null || _b === void 0 ? void 0 : _b.lettersLowerCase) {
            charset += 'abcdefghijklmnopqrstuvwxyz';
        }
        if ((_c = defaultOptions) === null || _c === void 0 ? void 0 : _c.lettersUpperCase) {
            charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if ((_d = defaultOptions) === null || _d === void 0 ? void 0 : _d.specialChars) {
            charset += '!#$%&\()*+,-./:;<=>?@^[\\]^_`{|}~';
        }
        var retVal = '';
        for (var i = 0, n = charset.length; i < defaultOptions.length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    /**
     * @description
     * Mapeo de teclas con su respectivo código númerico
     */
    var KEYBOARD_KEYS = {
        up: 38,
        down: 40,
        left: 37,
        right: 39,
        escape: 27,
        enter: 13,
        backspace: 8,
        delete: 46,
        shift: 16,
        leftCmd: 91,
        rightCmd: 93,
        ctrl: 17,
        alt: 18,
        tab: 9
    };

    /**
     * @description Colección de Regex comunes
     */

    (function (Patterns) {
        Patterns.PASSWORD = /^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])).{6,}$/;
        Patterns.DOMAIN = /^([a-zA-Z0-9\_\-\.]{2,63})\.([a-zA-Z0-9]{2,})$/;
        Patterns.EMAIL = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        Patterns.IMAGE = /^image\/([a-zA-Z].*)$/;
        Patterns.NUMBER = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
        Patterns.CC = /((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?/g;
    })(exports.Patterns || (exports.Patterns = {}));

    var MapService = /** @class */ (function () {
        function MapService() {
        }
        /**
         * Metodo para obtener la posisión GPS actual usando Observable
         * @example
         * this.mapService.getCurrentPosition().pipe(take(1)).subscribe({
         *      next(position) {
         *        console.log('Current Position: ', position);
         *      },
         *      error(msg) {
         *        console.log('Error Getting Location: ', msg);
         *      }
         *   });
         */
        MapService.prototype.getCurrentPosition = function () {
            return new rxjs.Observable(function (observer) {
                // Simple geolocation API check provides values to publish
                if ('geolocation' in navigator) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        observer.next(position);
                    }, function (error) {
                        observer.error(error);
                    });
                }
                else {
                    observer.error('Geolocation not available');
                }
            });
        };
        /**
         * Verifica si la latitud y longitud son válidas
         * @param lat Latitud
         * @param lng Longitud
         */
        MapService.prototype.checkLatLog = function (lat, lng) {
            return (-90 <= lat) && (90 >= lat) && (-180 <= lng) && (180 >= lng);
        };
        /**
         * Obtiene la distancia en km entre dos puntos LatLng
         * @param lon1 Latitud
         */
        MapService.prototype.distancePoints = function (options) {
            // tslint:disable-next-line: max-line-length
            var a = Math.sin(((options.to.lat - options.from.lat) * Math.PI / 180) / 2) * Math.sin(((options.to.lat - options.from.lat) * Math.PI / 180) / 2) + Math.cos(options.from.lat * Math.PI / 180) * Math.cos(options.to.lat * Math.PI / 180) * Math.sin(((options.to.lng - options.from.lng) * Math.PI / 180) / 2) * Math.sin(((options.to.lng - options.from.lng) * Math.PI / 180) / 2);
            return (6371 * (2 * Math.asin(Math.sqrt(a)))) * 1.60934;
        };
        MapService.prototype.cutPrecision = function (obj, precision) {
            if ('number' === typeof obj[0]) {
                for (var i = 0; i < obj.length; i++) {
                    obj[i] = Math.round(obj[i] * precision) / precision;
                }
            }
            else {
                var arr = obj.features || obj.geometries || obj.coordinates || obj;
                for (var i = 0; i < arr.length; i++) {
                    this.cutPrecision(arr[i], precision);
                }
            }
        };
        MapService.prototype.middlePoint = function (options) {
            if ((options.from.lng !== options.to.lng) || (options.from.lat !== options.to.lat)) {
                var lat1 = options.from.lat * Math.PI / 180;
                var lat2 = options.to.lat * Math.PI / 180;
                var lon1 = options.from.lng * Math.PI / 180;
                var lon2 = options.to.lng * Math.PI / 180;
                var dLon = lon2 - lon1;
                var x = Math.cos(lat2) * Math.cos(dLon);
                var y = Math.cos(lat2) * Math.sin(dLon);
                var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + x) * (Math.cos(lat1) + x) + y * y));
                var lon3 = lon1 + Math.atan2(y, Math.cos(lat1) + x);
                lat3 *= 180 / Math.PI;
                lon3 *= 180 / Math.PI;
                var deltaY = options.to.lng - options.from.lng;
                var deltaX = options.to.lat - options.from.lat;
                var angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
                return {
                    longitude: lon3,
                    Latitude: lat3,
                    angle: angleInDegrees,
                    distance: this.distancePoints(options)
                };
            }
            else {
                return false;
            }
        };
        MapService.ɵprov = core["ɵɵdefineInjectable"]({ factory: function MapService_Factory() { return new MapService(); }, token: MapService, providedIn: "root" });
        MapService = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], MapService);
        return MapService;
    }());

    // Layers Maps for Leaflet
    var LEAFLET_MAP_LAYERS = {
        'OpenStreetMap Street': leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
        'Mapbox Street': leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: window.mapbox_access_token
        })
    };

    var LeafletMap = /** @class */ (function () {
        function LeafletMap(options) {
            this.markers = {};
            this.options = {
                container: 'leaflet-map',
                initialView: {
                    lat: 4.6288702,
                    lng: -74.1193724,
                    zoom: 11
                },
                clusterMarkers: {
                    enable: true,
                    config: {}
                },
                layers: LEAFLET_MAP_LAYERS,
                mapOptions: {
                    positionControl: true,
                    layers: [LEAFLET_MAP_LAYERS['Mapbox Street']],
                    zoomControl: false
                },
                layersOptions: {
                    position: 'topright'
                }
            };
            mergeObjs(this.options, options);
            this.map = new leaflet.Map(this.options.container, this.options.mapOptions);
            this.layerControl = new leaflet.Control.Layers(this.options.layers, null, this.options.layersOptions);
            this.map.addControl(new leaflet.Control.MousePosition(this.options.mousePositionOptions));
            this.map.addControl(this.layerControl);
            this.map.addControl(new leaflet.Control.Fullscreen(this.options.fullscreen));
            this.map.addControl(new leaflet.Control.Zoom(this.options.zoom));
            this.map.setView([this.options.initialView.lat, this.options.initialView.lng], this.options.initialView.zoom);
            // Create cluster and scope
            if (this.options.clusterMarkers.enable) {
                this.initMarkerCluster();
            }
        }
        LeafletMap.prototype.initMarkerCluster = function () {
            if (leaflet.MarkerClusterGroup) {
                this.markerCluster = new leaflet.MarkerClusterGroup([], this.options.clusterMarkers.config);
                this.map.addLayer(this.markerCluster);
            }
        };
        LeafletMap.prototype.fitMarkersBounds = function (padding, flyTo) {
            if (hasValue(this.markers)) {
                var groupWrapper = [];
                // tslint:disable-next-line: forin
                for (var key in this.markers) {
                    groupWrapper.push(this.markers[key]);
                }
                if (hasValue(groupWrapper)) {
                    var pad = {
                        paddingTopLeft: {
                            x: 0,
                            y: 0
                        },
                        paddingBottomRight: {
                            x: 0,
                            y: 0
                        }
                    };
                    mergeObjs(pad, padding);
                    var group = leaflet.featureGroup(groupWrapper);
                    if (flyTo) {
                        this.map.flyToBounds(group.getBounds(), {
                            duration: 0.5,
                            paddingTopLeft: [pad.paddingTopLeft.x, pad.paddingTopLeft.y],
                            paddingBottomRight: [pad.paddingBottomRight.x, pad.paddingBottomRight.y]
                        });
                    }
                    else {
                        this.map.fitBounds(group.getBounds(), {
                            paddingTopLeft: [pad.paddingTopLeft.x, pad.paddingTopLeft.y],
                            paddingBottomRight: [pad.paddingBottomRight.x, pad.paddingBottomRight.y]
                        });
                    }
                }
            }
        };
        LeafletMap.prototype.addMarker = function (latLng, id) {
            this.markers[id] = leaflet.marker([latLng.lat, latLng.lng]);
            if (this.options.clusterMarkers.enable) {
                this.markerCluster.addLayer(this.markers[id]);
            }
            else {
                this.markers[id].addTo(this.map);
            }
            return this.markers[id];
        };
        LeafletMap.prototype.panTo = function (latlng, offset, options) {
            if (hasValue(offset)) {
                var x = this.map.latLngToContainerPoint(latlng).x - offset[0];
                var y = this.map.latLngToContainerPoint(latlng).y - offset[1];
                var point = this.map.containerPointToLatLng([x, y]);
                return this.map.setView(point, this.map.getZoom(), options);
            }
            else {
                return this.map.setView(latlng, this.map.getZoom(), options);
            }
        };
        LeafletMap.prototype.setView = function (latlng, targetZoom, offset, options) {
            if (hasValue(offset)) {
                var targetPoint = this.map.project(latlng, targetZoom).subtract(offset);
                var targetLatLng = this.map.unproject(targetPoint, targetZoom);
                return this.map.setView(targetLatLng, targetZoom, options);
            }
            else {
                return this.map.setView(latlng, targetZoom, options);
            }
        };
        LeafletMap.prototype.centerPoint = function (options) {
            this.map.flyTo([options.lat, options.lng], options.preserve_zoom ? this.map.getZoom() : 19, {
                duration: 0.5
            });
        };
        return LeafletMap;
    }());

    /**
     * Read the content of a File or Blob using the FileReader interface.
     * This is an async interface so it makes sense to handle it with Rx.
     * @param File | Blob
     */
    function readAsArrayBuffer(blob) {
        return new rxjs.Observable(function (obs) {
            if (!(blob instanceof Blob)) {
                obs.error(new Error('`blob` must be an instance of File or Blob.'));
                return;
            }
            var reader = new FileReader();
            reader.onerror = function (err) { return obs.error(err); };
            reader.onabort = function (err) { return obs.error(err); };
            reader.onload = function () { return obs.next(reader.result); };
            reader.onloadend = function () { return obs.complete(); };
            reader.readAsArrayBuffer(blob);
        });
    }
    /**
     * Read the content of a File or Blob using the FileReader interface.
     * This is an async interface so it makes sense to handle it with Rx.
     * @param File | Blob
     */
    function readAsDataURL(blob) {
        return new rxjs.Observable(function (obs) {
            if (!(blob instanceof Blob)) {
                obs.error(new Error('`blob` must be an instance of File or Blob.'));
                return;
            }
            var reader = new FileReader();
            reader.onerror = function (err) { return obs.error(err); };
            reader.onabort = function (err) { return obs.error(err); };
            reader.onload = function () { return obs.next(reader.result); };
            reader.onloadend = function () { return obs.complete(); };
            reader.readAsDataURL(blob);
        });
    }
    /**
     * @description Get file type based on header info
     * @param arrayBuffer Result of FileReader.readAsArrayBuffer()
     */
    function getFileType(arrayBuffer) {
        var e_1, _a;
        var arr = (new Uint8Array(arrayBuffer)).subarray(0, 4);
        var header = '';
        try {
            for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                var i = arr_1_1.value;
                header += i.toString(16);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        console.log('Header file: ', header);
        switch (header) {
            case '89504e47':
                return 'png';
            case '47494638':
                return 'gif';
            case 'ffd8ffe0':
            case 'ffd8ffe1':
            case 'ffd8ffe2':
            case 'ffd8ffe3':
            case 'ffd8ffe8':
                return 'jpeg';
            case '25504446':
                return 'ia';
            case '504b34':
                return 'xlsx';
            case '25504446':
                return 'pdf';
            default:
                return 'unknown';
        }
    }

    function lowerThan(BasePathField, TargetPathField) {
        return function (fg) {
            var base = fg.get(BasePathField);
            var target = fg.get(TargetPathField);
            if (base.value < target.value) {
                if (hasValue(target.errors)) {
                    delete base.errors.lowerThan;
                    if (hasValue(base.errors)) {
                        base.setErrors(base.errors);
                    }
                    else {
                        base.setErrors(null);
                    }
                }
                else {
                    base.setErrors(null);
                }
            }
            else {
                if (hasValue(base.errors)) {
                    base.errors.lowerThan = true;
                    base.setErrors(base.errors);
                }
                else {
                    base.setErrors({
                        lowerThan: true
                    });
                }
            }
            return null;
        };
    }
    function lowerOrEqualThan(BasePathField, TargetPathField) {
        return function (fg) {
            var base = fg.get(BasePathField);
            var target = fg.get(TargetPathField);
            if (base.value <= target.value) {
                if (hasValue(target.errors)) {
                    delete base.errors.lowerOrEqualThan;
                    if (hasValue(base.errors)) {
                        base.setErrors(base.errors);
                    }
                    else {
                        base.setErrors(null);
                    }
                }
                else {
                    base.setErrors(null);
                }
            }
            else {
                if (hasValue(base.errors)) {
                    base.errors.lowerOrEqualThan = true;
                    base.setErrors(base.errors);
                }
                else {
                    base.setErrors({
                        lowerOrEqualThan: true
                    });
                }
            }
            return null;
        };
    }
    function greaterThan(BasePathField, TargetPathField) {
        return function (fg) {
            var base = fg.get(BasePathField);
            var target = fg.get(TargetPathField);
            if (base.value > target.value) {
                if (hasValue(target.errors)) {
                    delete base.errors.greaterThan;
                    if (hasValue(base.errors)) {
                        base.setErrors(base.errors);
                    }
                    else {
                        base.setErrors(null);
                    }
                }
                else {
                    base.setErrors(null);
                }
            }
            else {
                if (hasValue(base.errors)) {
                    base.errors.greaterThan = true;
                    base.setErrors(base.errors);
                }
                else {
                    base.setErrors({
                        greaterThan: true
                    });
                }
            }
            return null;
        };
    }
    function greaterOrEqualThan(BasePathField, TargetPathField) {
        return function (fg) {
            var base = fg.get(BasePathField);
            var target = fg.get(TargetPathField);
            if (base.value >= target.value) {
                if (hasValue(target.errors)) {
                    delete base.errors.greaterOrEqualThan;
                    if (hasValue(base.errors)) {
                        base.setErrors(base.errors);
                    }
                    else {
                        base.setErrors(null);
                    }
                }
                else {
                    base.setErrors(null);
                }
            }
            else {
                if (hasValue(base.errors)) {
                    base.errors.greaterOrEqualThan = true;
                    base.setErrors(base.errors);
                }
                else {
                    base.setErrors({
                        greaterOrEqualThan: true
                    });
                }
            }
            return null;
        };
    }

    function match(originalPathField, duplicatePathField) {
        var validation = function (fg) {
            var original = fg.get(originalPathField);
            var duplicate = fg.get(duplicatePathField);
            if (original.value === duplicate.value) {
                if (hasValue(duplicate.errors)) {
                    delete duplicate.errors.match;
                    if (hasValue(duplicate.errors)) {
                        duplicate.setErrors(duplicate.errors);
                    }
                    else {
                        duplicate.setErrors(null);
                    }
                }
                else {
                    duplicate.setErrors(null);
                }
            }
            else {
                if (hasValue(duplicate.errors)) {
                    duplicate.errors.match = true;
                    duplicate.setErrors(duplicate.errors);
                }
                else {
                    duplicate.setErrors({
                        match: true
                    });
                }
            }
            return null;
        };
        return validation;
    }

    function maxFileSize(size) {
        return function (control) {
            var number = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
            var sizeNumber = size.match(number);
            var multiplier = 1;
            switch (true) {
                case /[. 0-9]+(KB)/i.test(size):
                    multiplier = 1e3;
                    break;
                case /[. 0-9]+(MB)/i.test(size):
                    multiplier = 1e6;
                    break;
                case /[. 0-9]+(GB)/i.test(size):
                    multiplier = 1e9;
                    break;
            }
            if (hasValue(sizeNumber)) {
                var sizeOnBytes = parseFloat(sizeNumber.join('')) * multiplier;
                if (control.value) {
                    if (control.value.size >= sizeOnBytes) {
                        return {
                            maxFileSize: true
                        };
                    }
                    return null;
                }
            }
            else {
                console.error('maxFileSize validation: Size must have a number');
            }
            return null;
        };
    }
    function minFileSize(size) {
        return function (control) {
            var number = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
            var sizeNumber = size.match(number);
            var multiplier = 1;
            switch (true) {
                case /[. 0-9]+(KB)/i.test(size):
                    multiplier = 1e3;
                    break;
                case /[. 0-9]+(MB)/i.test(size):
                    multiplier = 1e6;
                    break;
                case /[. 0-9]+(GB)/i.test(size):
                    multiplier = 1e9;
                    break;
            }
            if (hasValue(sizeNumber)) {
                var sizeOnBytes = parseFloat(sizeNumber.join('')) * multiplier;
                if (control.value) {
                    if (control.value.size <= sizeOnBytes) {
                        return {
                            minFileSize: true
                        };
                    }
                    return null;
                }
            }
            else {
                console.error('minFileSize validation: Size must have a number');
            }
            return null;
        };
    }
    function requiredFileType(ext) {
        return function (control) {
            var file = control.value;
            if (file) {
                if (!Array.isArray(ext)) {
                    ext = [ext];
                }
                var types_1 = ext.map(function (type) { return type.toLowerCase(); });
                return readAsArrayBuffer(file)
                    .pipe(operators.map(function (result) {
                    if (inArray(getFileType(result), types_1)) {
                        return null;
                    }
                    else {
                        return {
                            requiredFileType: true
                        };
                    }
                }));
            }
            return rxjs.of(null);
        };
    }

    function alreadyExist(http, url, requestBody) {
        return function (control) {
            return rxjs.of(control.value).pipe(operators.delay(1000), operators.switchMap(function (value) {
                if (hasValue(value)) {
                    requestBody.Value = value;
                    return http.post(url, requestBody).pipe(operators.map(function () { return ({ alreadyExist: true }); }), operators.catchError(function () { return rxjs.of(null); }));
                }
                return rxjs.of(null);
            }));
        };
    }

    // @dynamic
    /**
     * Validaciones adicionales para Form Control's
     */
    var CustomValidators = /** @class */ (function () {
        function CustomValidators() {
        }
        /**
         * Verifica si los campos proveidos son iguales
         * @param originalPathField Path del campo original
         * @param duplicatePathField Path del campo que deberia ser igual al original
         */
        CustomValidators.match = function (originalPathField, duplicatePathField) {
            return match(originalPathField, duplicatePathField);
        };
        /**
         * Verifica si un campo es menor a otro
         * @param BasePathField Path del campo que debe ser menor
         * @param TargetPathField Path del campo que deberia ser mayor
         */
        CustomValidators.lowerThan = function (BasePathField, TargetPathField) {
            return lowerThan(BasePathField, TargetPathField);
        };
        /**
         * Verifica si un campo es menor o igual a otro
         * @param BasePathField Path del campo que debe ser menor o igual
         * @param TargetPathField Path del campo que deberia ser mayor o igual
         */
        CustomValidators.lowerOrEqualThan = function (BasePathField, TargetPathField) {
            return lowerOrEqualThan(BasePathField, TargetPathField);
        };
        /**
         * Verifica si un campo es mayor a otro
         * @param BasePathField Path del campo que debe ser mayor
         * @param TargetPathField Path del campo que deberia ser menor
         */
        CustomValidators.greaterThan = function (BasePathField, TargetPathField) {
            return greaterThan(BasePathField, TargetPathField);
        };
        /**
         * Verifica si un campo es mayor o igual a otro
         * @param BasePathField Path del campo que debe ser mayor o igual
         * @param TargetPathField Path del campo que deberia ser menor o igual
         */
        CustomValidators.greaterOrEqualThan = function (BasePathField, TargetPathField) {
            return greaterOrEqualThan(BasePathField, TargetPathField);
        };
        /**
         * Verifica si el tamaño no excede el tamaño maximo indicado
         * @param size Tamaño en KB, MG ó GB (ejem: 100MB)
         */
        CustomValidators.maxFileSize = function (size) {
            return maxFileSize(size);
        };
        /**
         * Verifica si el tamaño es mayor el tamaño mínimo indicado
         * @param size Tamaño en KB, MG ó GB (ejem: 100MB)
         */
        CustomValidators.minFileSize = function (size) {
            return minFileSize(size);
        };
        /**
         * Verifica si el archivo tiene una extensión adminitida por medio de su cabecera
         * @param ext Extensiones admitidas
         */
        CustomValidators.requiredFileType = function (ext) {
            return requiredFileType(ext);
        };
        /**
         * Verifica si existe dicho valor en la DB si coincide con el modelo y el nombre de campo
         * @param http
         * @param url
         * @param requestBody propiedad Id opcional para excluir de la busqueda un registro
         */
        CustomValidators.alreadyExist = function (http, url, requestBody) {
            return alreadyExist(http, url, requestBody);
        };
        return CustomValidators;
    }());

    var SerControlDirective = /** @class */ (function () {
        function SerControlDirective(_ngControl) {
            this._ngControl = _ngControl;
            this.disabled = false;
            this.focus = false;
            this.dirty = false;
            this.valid = false;
            this.invalid = false;
            this.pending = false;
            this.hasValue = false;
        }
        SerControlDirective.prototype.onFocus = function () {
            this.focus = true;
        };
        SerControlDirective.prototype.onBlur = function () {
            this.focus = false;
        };
        SerControlDirective.prototype.onChangeValue = function (value) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            this.hasValue = hasValue(value);
            this.valid = (_b = (_a = this._ngControl) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.valid;
            this.invalid = (_d = (_c = this._ngControl) === null || _c === void 0 ? void 0 : _c.control) === null || _d === void 0 ? void 0 : _d.invalid;
            this.dirty = (_f = (_e = this._ngControl) === null || _e === void 0 ? void 0 : _e.control) === null || _f === void 0 ? void 0 : _f.dirty;
            this.disabled = (_h = (_g = this._ngControl) === null || _g === void 0 ? void 0 : _g.control) === null || _h === void 0 ? void 0 : _h.disabled;
            this.pending = (_k = (_j = this._ngControl) === null || _j === void 0 ? void 0 : _j.control) === null || _k === void 0 ? void 0 : _k.pending;
        };
        SerControlDirective.prototype.ngOnInit = function () {
            var _this = this;
            var _a, _b, _c, _d;
            this.onChangeValue((_b = (_a = this._ngControl) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.value);
            this.observer = (_d = (_c = this._ngControl) === null || _c === void 0 ? void 0 : _c.control) === null || _d === void 0 ? void 0 : _d.valueChanges.subscribe(function (value) {
                _this.onChangeValue(value);
            });
        };
        SerControlDirective.prototype.ngOnDestroy = function () {
            var _a;
            (_a = this.observer) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        };
        SerControlDirective.ctorParameters = function () { return [
            { type: forms.NgControl }
        ]; };
        __decorate([
            core.HostListener('focus')
        ], SerControlDirective.prototype, "onFocus", null);
        __decorate([
            core.HostListener('blur')
        ], SerControlDirective.prototype, "onBlur", null);
        SerControlDirective = __decorate([
            core.Directive({
                // tslint:disable-next-line: directive-selector
                selector: '[serControl]'
            })
        ], SerControlDirective);
        return SerControlDirective;
    }());

    var SerFormElementComponent = /** @class */ (function () {
        function SerFormElementComponent() {
        }
        Object.defineProperty(SerFormElementComponent.prototype, "disabled", {
            get: function () {
                var _a;
                return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.disabled;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerFormElementComponent.prototype, "focus", {
            get: function () {
                var _a;
                return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.focus;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerFormElementComponent.prototype, "active", {
            get: function () {
                var _a;
                return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.hasValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerFormElementComponent.prototype, "dirty", {
            get: function () {
                var _a;
                return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.dirty;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerFormElementComponent.prototype, "valid", {
            get: function () {
                var _a;
                return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.valid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerFormElementComponent.prototype, "invalid", {
            get: function () {
                var _a;
                return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.invalid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerFormElementComponent.prototype, "pending", {
            get: function () {
                var _a;
                return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.pending;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core.ContentChild(SerControlDirective)
        ], SerFormElementComponent.prototype, "formElement", void 0);
        __decorate([
            core.HostBinding('class.disabled')
        ], SerFormElementComponent.prototype, "disabled", null);
        __decorate([
            core.HostBinding('class.focus')
        ], SerFormElementComponent.prototype, "focus", null);
        __decorate([
            core.HostBinding('class.active')
        ], SerFormElementComponent.prototype, "active", null);
        __decorate([
            core.HostBinding('class.dirty')
        ], SerFormElementComponent.prototype, "dirty", null);
        __decorate([
            core.HostBinding('class.valid')
        ], SerFormElementComponent.prototype, "valid", null);
        __decorate([
            core.HostBinding('class.invalid')
        ], SerFormElementComponent.prototype, "invalid", null);
        __decorate([
            core.HostBinding('class.pending')
        ], SerFormElementComponent.prototype, "pending", null);
        SerFormElementComponent = __decorate([
            core.Component({
                selector: 'ser-form-element',
                template: '<ng-content></ng-content>',
                encapsulation: core.ViewEncapsulation.None
            })
        ], SerFormElementComponent);
        return SerFormElementComponent;
    }());

    var SerErrorsDirective = /** @class */ (function () {
        function SerErrorsDirective(_form) {
            this._form = _form;
            this.subject = new BehaviorSubject.BehaviorSubject(null);
            this.ready = false;
        }
        Object.defineProperty(SerErrorsDirective.prototype, "errors", {
            get: function () {
                if (!this.ready) {
                    return;
                }
                return this.control.errors;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerErrorsDirective.prototype, "hasErrors", {
            get: function () {
                return !!this.errors;
            },
            enumerable: true,
            configurable: true
        });
        SerErrorsDirective.prototype.hasError = function (name, conditions) {
            return this.checkPropState('invalid', name, conditions);
        };
        SerErrorsDirective.prototype.isValid = function (name, conditions) {
            return this.checkPropState('valid', name, conditions);
        };
        SerErrorsDirective.prototype.getError = function (name) {
            if (!this.ready) {
                return;
            }
            return this.control.getError(name);
        };
        SerErrorsDirective.prototype.checkPropState = function (prop, name, conditions) {
            var _this = this;
            if (!this.ready) {
                return;
            }
            var controlPropsState = (!conditions || toArray(conditions).every(function (condition) { return _this.control[condition]; }));
            if (name.charAt(0) === '*') {
                return this.control[prop] && controlPropsState;
            }
            return (prop === 'valid' ? !this.control.hasError(name) : this.control.hasError(name) && controlPropsState);
        };
        SerErrorsDirective.prototype.checkStatus = function () {
            var control = this.control;
            var errors = control.errors;
            this.ready = true;
            if (!errors) {
                return;
            }
            for (var errorName in errors) {
                if (this.errors.hasOwnProperty(errorName)) {
                    this.subject.next({ control: control, errorName: errorName });
                }
            }
        };
        SerErrorsDirective.prototype.ngOnChanges = function () {
            this.control = this._form.control.get(this.controlName);
        };
        SerErrorsDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () {
                _this.checkStatus();
                _this.control.statusChanges.subscribe(_this.checkStatus.bind(_this));
            });
        };
        SerErrorsDirective.prototype.ngOnDestroy = function () {
            this.subject.unsubscribe();
        };
        SerErrorsDirective.ctorParameters = function () { return [
            { type: forms.FormGroupDirective }
        ]; };
        __decorate([
            core.Input('serErrors')
        ], SerErrorsDirective.prototype, "controlName", void 0);
        SerErrorsDirective = __decorate([
            core.Directive({
                // tslint:disable-next-line: directive-selector
                selector: '[serErrors]',
                exportAs: 'serErrors'
            })
        ], SerErrorsDirective);
        return SerErrorsDirective;
    }());

    var SerErrorDirective = /** @class */ (function () {
        function SerErrorDirective(_serErrors) {
            this._serErrors = _serErrors;
            this.hidden = true;
            this.rules = [];
            this.errorNames = [];
        }
        Object.defineProperty(SerErrorDirective.prototype, "serError", {
            set: function (value) {
                this.errorNames = toArray(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SerErrorDirective.prototype, "when", {
            set: function (value) {
                this.rules = toArray(value);
            },
            enumerable: true,
            configurable: true
        });
        SerErrorDirective.prototype.ngOnInit = function () {
            var _this = this;
            this._states = new Subject.Subject();
            this.states = this._states.asObservable().distinctUntilChanged();
            var errors = this._serErrors.subject
                .filter(Boolean)
                // tslint:disable-next-line: no-bitwise
                .filter(function (obj) { return !!~_this.errorNames.indexOf(obj.errorName); });
            var states = this.states
                // tslint:disable-next-line: no-bitwise
                .map(function (states) { return _this.rules.every(function (rule) { return !!~states.indexOf(rule); }); });
            this.subscription = Observable.Observable.combineLatest([states, errors])
                .subscribe(function (_a) {
                var _b = __read(_a, 2), states = _b[0], errors = _b[1];
                _this.hidden = !(states && errors.control.hasError(errors.errorName));
            });
        };
        SerErrorDirective.prototype.ngDoCheck = function () {
            var _this = this;
            this._states.next(this.rules.filter(function (rule) { return _this._serErrors.control[rule]; }));
        };
        SerErrorDirective.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        SerErrorDirective.ctorParameters = function () { return [
            { type: SerErrorsDirective, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return SerErrorsDirective; }),] }] }
        ]; };
        __decorate([
            core.Input()
        ], SerErrorDirective.prototype, "serError", null);
        __decorate([
            core.Input()
        ], SerErrorDirective.prototype, "when", null);
        __decorate([
            core.HostBinding('hidden')
        ], SerErrorDirective.prototype, "hidden", void 0);
        SerErrorDirective = __decorate([
            core.Directive({
                // tslint:disable-next-line: directive-selector
                selector: '[serError]'
            }),
            __param(0, core.Inject(core.forwardRef(function () { return SerErrorsDirective; })))
        ], SerErrorDirective);
        return SerErrorDirective;
    }());

    var PinInputComponent = /** @class */ (function () {
        function PinInputComponent() {
            this.show = false;
            this.inputs = [];
            this.codeLength = 4;
            this.onlyNumber = true;
            this.isCodeHidden = false;
            this.value = [];
            this.isDisabled = false;
        }
        PinInputComponent_1 = PinInputComponent;
        PinInputComponent.prototype.writeValue = function (obj) {
            if (hasValue(obj)) {
                this.value = obj.toString().split('');
            }
        };
        PinInputComponent.prototype.ngOnInit = function () {
            this.type = (this.isCodeHidden) ? 'password' : 'text';
            this.codeInputs = Array(this.codeLength);
        };
        PinInputComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.inputsList.forEach(function (item, i) {
                if (hasValue(_this.value[i])) {
                    item.nativeElement.value = _this.value[i];
                }
                _this.inputs.push(item.nativeElement);
            });
        };
        PinInputComponent.prototype.canInputValue = function (value) {
            if (!hasValue(value)) {
                return true;
            }
            if (this.onlyNumber) {
                return /^[0-9]+$/.test(value.toString());
            }
            else {
                return /^[0-9a-zA-Z]+$/.test(value.toString());
            }
        };
        PinInputComponent.prototype.generateValue = function () {
            var values = [];
            this.inputs.forEach(function (input) {
                if (hasValue(input.value)) {
                    values.push(input.value.trim());
                }
            });
            if (values.length === this.codeLength) {
                return values.join('');
            }
            else {
                return null;
            }
        };
        PinInputComponent.prototype.onInput = function (e, i) {
            var next = i + 1;
            var target = e.target;
            var value = e.data || target.value;
            this.onTouch();
            if (!this.canInputValue(value)) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            if (next < this.codeLength && hasValue(value)) {
                this.inputs[next].focus();
            }
            this.onChange(this.generateValue());
        };
        PinInputComponent.prototype.onKeydown = function (e, i) {
            return __awaiter(this, void 0, void 0, function () {
                var prev, next, value, backspace;
                var _this = this;
                return __generator(this, function (_a) {
                    prev = i - 1;
                    next = i + 1;
                    value = e.target.value;
                    backspace = e.key.toLowerCase() === 'backspace';
                    if (backspace) {
                        if (prev >= 0) {
                            setTimeout(function () {
                                _this.inputs[prev].focus();
                            });
                        }
                        return [2 /*return*/];
                    }
                    if (!this.canInputValue(e.key.toLowerCase())) {
                        e.preventDefault();
                        e.stopPropagation();
                        return [2 /*return*/];
                    }
                    if (hasValue(value)) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (next < this.codeLength) {
                            this.inputs[next].focus();
                        }
                    }
                    return [2 /*return*/];
                });
            });
        };
        PinInputComponent.prototype.onClick = function (e) {
            var index = this.codeLength - 1;
            e.target.setSelectionRange(e.target.value.length, e.target.value.length);
            for (var i = 0; i < this.inputs.length; i++) {
                if (!hasValue(this.inputs[i].value)) {
                    index = i;
                    break;
                }
            }
            if (hasValue(index)) {
                this.inputs[index].focus();
            }
        };
        PinInputComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        PinInputComponent.prototype.onChange = function (_) { };
        PinInputComponent.prototype.registerOnTouched = function (fn) {
            this.onTouch = fn;
        };
        PinInputComponent.prototype.onTouch = function () { };
        PinInputComponent.prototype.setDisabledState = function (isDisabled) {
            this.isDisabled = isDisabled;
        };
        var PinInputComponent_1;
        __decorate([
            core.ViewChildren('input')
        ], PinInputComponent.prototype, "inputsList", void 0);
        __decorate([
            core.HostBinding('class.show')
        ], PinInputComponent.prototype, "show", void 0);
        __decorate([
            core.Input()
        ], PinInputComponent.prototype, "codeLength", void 0);
        __decorate([
            core.Input()
        ], PinInputComponent.prototype, "onlyNumber", void 0);
        __decorate([
            core.Input()
        ], PinInputComponent.prototype, "isCodeHidden", void 0);
        PinInputComponent = PinInputComponent_1 = __decorate([
            core.Component({
                selector: 'pin-input',
                template: "<span *ngFor=\"let holder of codeInputs; index as i\">\r\n\r\n    <input class=\"not-styled\" #input\r\n    [type]=\"type\"\r\n    [disabled]=\"isDisabled\"\r\n    (input)=\"onInput($event, i)\"\r\n    (keydown)=\"onKeydown($event, i)\"\r\n    (click)=\"onClick($event)\"\r\n    autocomplete=\"chrome-off\"\r\n    maxlength=\"1\"\r\n     />\r\n\r\n    <!-- <input (paste)=\"onPaste($event, i)\" /> -->\r\n\r\n</span>\r\n",
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return PinInputComponent_1; }),
                        multi: true
                    }
                ]
            })
        ], PinInputComponent);
        return PinInputComponent;
    }());

    var DataService = /** @class */ (function () {
        function DataService() {
            this.filteredData = [];
            this.subject = new rxjs.Subject();
        }
        DataService.prototype.setData = function (data) {
            this.filteredData = data;
            this.subject.next(data);
        };
        DataService.prototype.getData = function () {
            return this.subject.asObservable();
        };
        DataService.prototype.getFilteredData = function () {
            if (this.filteredData && this.filteredData.length > 0) {
                return this.filteredData;
            }
            else {
                return [];
            }
        };
        DataService.ɵprov = core["ɵɵdefineInjectable"]({ factory: function DataService_Factory() { return new DataService(); }, token: DataService, providedIn: "root" });
        DataService = __decorate([
            core.Injectable({
                providedIn: 'root'
            })
        ], DataService);
        return DataService;
    }());

    var SerSelectListFilterPipe = /** @class */ (function () {
        function SerSelectListFilterPipe(ds) {
            this.ds = ds;
        }
        SerSelectListFilterPipe.prototype.transform = function (items, filter, searchBy) {
            var _this = this;
            if (!hasValue(items) || !hasValue(filter)) {
                // this.ds.setData(items);
                return items;
            }
            var filteredList = items.filter(function (item) { return _this.applyFilter(item, filter, searchBy); });
            // this.ds.setData(filteredList);
            if (hasValue(filteredList)) {
                return filteredList;
            }
            else {
                return [];
            }
        };
        SerSelectListFilterPipe.prototype.applyFilter = function (item, filter, searchBy) {
            var found = false;
            if (searchBy.length > 0) {
                if (item.grpTitle) {
                    found = true;
                }
                else {
                    for (var t = 0; t < searchBy.length; t++) {
                        if (filter && item[searchBy[t]] && item[searchBy[t]] !== '') {
                            if (item[searchBy[t]].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                                found = true;
                            }
                        }
                    }
                }
            }
            else {
                if (item.grpTitle) {
                    found = true;
                }
                else {
                    for (var prop in item) {
                        if (filter && item[prop]) {
                            if (item[prop].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                                found = true;
                            }
                        }
                    }
                }
            }
            return found;
        };
        SerSelectListFilterPipe.ctorParameters = function () { return [
            { type: DataService }
        ]; };
        SerSelectListFilterPipe = __decorate([
            core.Pipe({
                name: 'serSelectListFilter',
                pure: true
            })
        ], SerSelectListFilterPipe);
        return SerSelectListFilterPipe;
    }());

    var SDItemDirective = /** @class */ (function () {
        function SDItemDirective(template) {
            this.template = template;
        }
        SDItemDirective.ctorParameters = function () { return [
            { type: core.TemplateRef }
        ]; };
        SDItemDirective = __decorate([
            core.Directive({
                selector: '[sd-item]'
            })
        ], SDItemDirective);
        return SDItemDirective;
    }());
    var SDBadgeDirective = /** @class */ (function () {
        function SDBadgeDirective(template) {
            this.template = template;
        }
        SDBadgeDirective.ctorParameters = function () { return [
            { type: core.TemplateRef }
        ]; };
        SDBadgeDirective = __decorate([
            core.Directive({
                selector: '[sd-badge]'
            })
        ], SDBadgeDirective);
        return SDBadgeDirective;
    }());
    var SDSearchDirective = /** @class */ (function () {
        function SDSearchDirective(template) {
            this.template = template;
        }
        SDSearchDirective.ctorParameters = function () { return [
            { type: core.TemplateRef }
        ]; };
        SDSearchDirective = __decorate([
            core.Directive({
                selector: '[sd-search]'
            })
        ], SDSearchDirective);
        return SDSearchDirective;
    }());

    function VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY() {
        return {
            scrollThrottlingTime: 0,
            scrollDebounceTime: 0,
            scrollAnimationTime: 750,
            checkResizeInterval: 1000,
            resizeBypassRefreshThreshold: 5,
            modifyOverflowStyleOfParentScroll: true,
            stripedTable: false
        };
    }
    var VirtualScrollerComponent = /** @class */ (function () {
        function VirtualScrollerComponent(element, renderer, zone, changeDetectorRef, platformId, options) {
            this.element = element;
            this.renderer = renderer;
            this.zone = zone;
            this.changeDetectorRef = changeDetectorRef;
            this.window = window;
            this.executeRefreshOutsideAngularZone = false;
            this._enableUnequalChildrenSizes = false;
            this.useMarginInsteadOfTranslate = false;
            this.ssrViewportWidth = 1920;
            this.ssrViewportHeight = 1080;
            this._bufferAmount = 0;
            this._items = [];
            this.compareItems = function (item1, item2) { return item1 === item2; };
            this.vsUpdate = new core.EventEmitter();
            this.vsChange = new core.EventEmitter();
            this.vsStart = new core.EventEmitter();
            this.vsEnd = new core.EventEmitter();
            this.calculatedScrollbarWidth = 0;
            this.calculatedScrollbarHeight = 0;
            this.padding = 0;
            this.previousViewPort = {};
            this.cachedPageSize = 0;
            this.previousScrollNumberElements = 0;
            this.isAngularUniversalSSR = common.isPlatformServer(platformId);
            this.scrollThrottlingTime = options.scrollThrottlingTime;
            this.scrollDebounceTime = options.scrollDebounceTime;
            this.scrollAnimationTime = options.scrollAnimationTime;
            this.scrollbarWidth = options.scrollbarWidth;
            this.scrollbarHeight = options.scrollbarHeight;
            this.checkResizeInterval = options.checkResizeInterval;
            this.resizeBypassRefreshThreshold = options.resizeBypassRefreshThreshold;
            this.modifyOverflowStyleOfParentScroll = options.modifyOverflowStyleOfParentScroll;
            this.stripedTable = options.stripedTable;
            this.horizontal = false;
            this.resetWrapGroupDimensions();
        }
        Object.defineProperty(VirtualScrollerComponent.prototype, "viewPortInfo", {
            get: function () {
                var pageInfo = this.previousViewPort || {};
                return {
                    startIndex: pageInfo.startIndex || 0,
                    endIndex: pageInfo.endIndex || 0,
                    scrollStartPosition: pageInfo.scrollStartPosition || 0,
                    scrollEndPosition: pageInfo.scrollEndPosition || 0,
                    maxScrollPosition: pageInfo.maxScrollPosition || 0,
                    startIndexWithBuffer: pageInfo.startIndexWithBuffer || 0,
                    endIndexWithBuffer: pageInfo.endIndexWithBuffer || 0
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualScrollerComponent.prototype, "enableUnequalChildrenSizes", {
            get: function () {
                return this._enableUnequalChildrenSizes;
            },
            set: function (value) {
                if (this._enableUnequalChildrenSizes === value) {
                    return;
                }
                this._enableUnequalChildrenSizes = value;
                this.minMeasuredChildWidth = undefined;
                this.minMeasuredChildHeight = undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualScrollerComponent.prototype, "bufferAmount", {
            get: function () {
                if (typeof (this._bufferAmount) === 'number' && this._bufferAmount >= 0) {
                    return this._bufferAmount;
                }
                else {
                    return this.enableUnequalChildrenSizes ? 5 : 0;
                }
            },
            set: function (value) {
                this._bufferAmount = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualScrollerComponent.prototype, "scrollThrottlingTime", {
            get: function () {
                return this._scrollThrottlingTime;
            },
            set: function (value) {
                this._scrollThrottlingTime = value;
                this.updateOnScrollFunction();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualScrollerComponent.prototype, "scrollDebounceTime", {
            get: function () {
                return this._scrollDebounceTime;
            },
            set: function (value) {
                this._scrollDebounceTime = value;
                this.updateOnScrollFunction();
            },
            enumerable: true,
            configurable: true
        });
        VirtualScrollerComponent.prototype.updateOnScrollFunction = function () {
            var _this_1 = this;
            if (this.scrollDebounceTime) {
                this.onScroll = this.debounce(function () {
                    _this_1.refresh_internal(false);
                }, this.scrollDebounceTime);
            }
            else if (this.scrollThrottlingTime) {
                this.onScroll = this.throttleTrailing(function () {
                    _this_1.refresh_internal(false);
                }, this.scrollThrottlingTime);
            }
            else {
                this.onScroll = function () {
                    _this_1.refresh_internal(false);
                };
            }
        };
        Object.defineProperty(VirtualScrollerComponent.prototype, "checkResizeInterval", {
            get: function () {
                return this._checkResizeInterval;
            },
            set: function (value) {
                if (this._checkResizeInterval === value) {
                    return;
                }
                this._checkResizeInterval = value;
                this.addScrollEventHandlers();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualScrollerComponent.prototype, "items", {
            get: function () {
                return this._items;
            },
            set: function (value) {
                if (value === this._items) {
                    return;
                }
                this._items = value || [];
                this.refresh_internal(true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualScrollerComponent.prototype, "horizontal", {
            get: function () {
                return this._horizontal;
            },
            set: function (value) {
                this._horizontal = value;
                this.updateDirection();
            },
            enumerable: true,
            configurable: true
        });
        VirtualScrollerComponent.prototype.revertParentOverscroll = function () {
            var scrollElement = this.getScrollElement();
            if (scrollElement && this.oldParentScrollOverflow) {
                scrollElement.style['overflow-y'] = this.oldParentScrollOverflow.y;
                scrollElement.style['overflow-x'] = this.oldParentScrollOverflow.x;
            }
            this.oldParentScrollOverflow = undefined;
        };
        Object.defineProperty(VirtualScrollerComponent.prototype, "parentScroll", {
            get: function () {
                return this._parentScroll;
            },
            set: function (value) {
                if (this._parentScroll === value) {
                    return;
                }
                this.revertParentOverscroll();
                this._parentScroll = value;
                this.addScrollEventHandlers();
                var scrollElement = this.getScrollElement();
                if (this.modifyOverflowStyleOfParentScroll && scrollElement !== this.element.nativeElement) {
                    this.oldParentScrollOverflow = { x: scrollElement.style['overflow-x'], y: scrollElement.style['overflow-y'] };
                    scrollElement.style['overflow-y'] = this.horizontal ? 'visible' : 'auto';
                    scrollElement.style['overflow-x'] = this.horizontal ? 'auto' : 'visible';
                }
            },
            enumerable: true,
            configurable: true
        });
        VirtualScrollerComponent.prototype.ngOnInit = function () {
            this.addScrollEventHandlers();
        };
        VirtualScrollerComponent.prototype.ngOnDestroy = function () {
            this.removeScrollEventHandlers();
            this.revertParentOverscroll();
        };
        VirtualScrollerComponent.prototype.ngOnChanges = function (changes) {
            var indexLengthChanged = this.cachedItemsLength !== this.items.length;
            this.cachedItemsLength = this.items.length;
            var firstRun = !changes.items || !changes.items.previousValue || changes.items.previousValue.length === 0;
            this.refresh_internal(indexLengthChanged || firstRun);
        };
        VirtualScrollerComponent.prototype.ngDoCheck = function () {
            if (this.cachedItemsLength !== this.items.length) {
                this.cachedItemsLength = this.items.length;
                this.refresh_internal(true);
                return;
            }
            if (this.previousViewPort && this.viewPortItems && this.viewPortItems.length > 0) {
                var itemsArrayChanged = false;
                for (var i = 0; i < this.viewPortItems.length; ++i) {
                    if (!this.compareItems(this.items[this.previousViewPort.startIndexWithBuffer + i], this.viewPortItems[i])) {
                        itemsArrayChanged = true;
                        break;
                    }
                }
                if (itemsArrayChanged) {
                    this.refresh_internal(true);
                }
            }
        };
        VirtualScrollerComponent.prototype.refresh = function () {
            this.refresh_internal(true);
        };
        VirtualScrollerComponent.prototype.invalidateAllCachedMeasurements = function () {
            this.wrapGroupDimensions = {
                maxChildSizePerWrapGroup: [],
                numberOfKnownWrapGroupChildSizes: 0,
                sumOfKnownWrapGroupChildWidths: 0,
                sumOfKnownWrapGroupChildHeights: 0
            };
            this.minMeasuredChildWidth = undefined;
            this.minMeasuredChildHeight = undefined;
            this.refresh_internal(false);
        };
        VirtualScrollerComponent.prototype.invalidateCachedMeasurementForItem = function (item) {
            if (this.enableUnequalChildrenSizes) {
                var index = this.items && this.items.indexOf(item);
                if (index >= 0) {
                    this.invalidateCachedMeasurementAtIndex(index);
                }
            }
            else {
                this.minMeasuredChildWidth = undefined;
                this.minMeasuredChildHeight = undefined;
            }
            this.refresh_internal(false);
        };
        VirtualScrollerComponent.prototype.invalidateCachedMeasurementAtIndex = function (index) {
            if (this.enableUnequalChildrenSizes) {
                var cachedMeasurement = this.wrapGroupDimensions.maxChildSizePerWrapGroup[index];
                if (cachedMeasurement) {
                    this.wrapGroupDimensions.maxChildSizePerWrapGroup[index] = undefined;
                    --this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                    this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths -= cachedMeasurement.childWidth || 0;
                    this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights -= cachedMeasurement.childHeight || 0;
                }
            }
            else {
                this.minMeasuredChildWidth = undefined;
                this.minMeasuredChildHeight = undefined;
            }
            this.refresh_internal(false);
        };
        VirtualScrollerComponent.prototype.scrollInto = function (item, alignToBeginning, additionalOffset, animationMilliseconds, animationCompletedCallback) {
            if (alignToBeginning === void 0) { alignToBeginning = true; }
            if (additionalOffset === void 0) { additionalOffset = 0; }
            if (animationMilliseconds === void 0) { animationMilliseconds = undefined; }
            if (animationCompletedCallback === void 0) { animationCompletedCallback = undefined; }
            var index = this.items.indexOf(item);
            if (index === -1) {
                return;
            }
            this.scrollToIndex(index, alignToBeginning, additionalOffset, animationMilliseconds, animationCompletedCallback);
        };
        VirtualScrollerComponent.prototype.scrollToIndex = function (index, alignToBeginning, additionalOffset, animationMilliseconds, animationCompletedCallback) {
            var _this_1 = this;
            if (alignToBeginning === void 0) { alignToBeginning = true; }
            if (additionalOffset === void 0) { additionalOffset = 0; }
            if (animationMilliseconds === void 0) { animationMilliseconds = undefined; }
            if (animationCompletedCallback === void 0) { animationCompletedCallback = undefined; }
            var maxRetries = 5;
            var retryIfNeeded = function () {
                --maxRetries;
                if (maxRetries <= 0) {
                    if (animationCompletedCallback) {
                        animationCompletedCallback();
                    }
                    return;
                }
                var dimensions = _this_1.calculateDimensions();
                var desiredStartIndex = Math.min(Math.max(index, 0), dimensions.itemCount - 1);
                if (_this_1.previousViewPort.startIndex === desiredStartIndex) {
                    if (animationCompletedCallback) {
                        animationCompletedCallback();
                    }
                    return;
                }
                _this_1.scrollToIndex_internal(index, alignToBeginning, additionalOffset, 0, retryIfNeeded);
            };
            this.scrollToIndex_internal(index, alignToBeginning, additionalOffset, animationMilliseconds, retryIfNeeded);
        };
        VirtualScrollerComponent.prototype.scrollToIndex_internal = function (index, alignToBeginning, additionalOffset, animationMilliseconds, animationCompletedCallback) {
            if (alignToBeginning === void 0) { alignToBeginning = true; }
            if (additionalOffset === void 0) { additionalOffset = 0; }
            if (animationMilliseconds === void 0) { animationMilliseconds = undefined; }
            if (animationCompletedCallback === void 0) { animationCompletedCallback = undefined; }
            animationMilliseconds = animationMilliseconds === undefined ? this.scrollAnimationTime : animationMilliseconds;
            var dimensions = this.calculateDimensions();
            var scroll = this.calculatePadding(index, dimensions) + additionalOffset;
            if (!alignToBeginning) {
                scroll -= dimensions.wrapGroupsPerPage * dimensions[this._childScrollDim];
            }
            this.scrollToPosition(scroll, animationMilliseconds, animationCompletedCallback);
        };
        VirtualScrollerComponent.prototype.scrollToPosition = function (scrollPosition, animationMilliseconds, animationCompletedCallback) {
            var _this_1 = this;
            if (animationMilliseconds === void 0) { animationMilliseconds = undefined; }
            if (animationCompletedCallback === void 0) { animationCompletedCallback = undefined; }
            scrollPosition += this.getElementsOffset();
            animationMilliseconds = animationMilliseconds === undefined ? this.scrollAnimationTime : animationMilliseconds;
            var scrollElement = this.getScrollElement();
            var animationRequest;
            if (this.currentTween) {
                this.currentTween.stop();
                this.currentTween = undefined;
            }
            if (!animationMilliseconds) {
                this.renderer.setProperty(scrollElement, this._scrollType, scrollPosition);
                this.refresh_internal(false, animationCompletedCallback);
                return;
            }
            var tweenConfigObj = { scrollPosition: scrollElement[this._scrollType] };
            var newTween = new tween_js.Tween(tweenConfigObj)
                .to({ scrollPosition: scrollPosition }, animationMilliseconds)
                .easing(tween_js.Easing.Quadratic.Out)
                .onUpdate(function (data) {
                if (isNaN(data.scrollPosition)) {
                    return;
                }
                _this_1.renderer.setProperty(scrollElement, _this_1._scrollType, data.scrollPosition);
                _this_1.refresh_internal(false);
            })
                .onStop(function () {
                cancelAnimationFrame(animationRequest);
            })
                .start();
            var animate = function (time) {
                if (!newTween["isPlaying"]()) {
                    return;
                }
                newTween.update(time);
                if (tweenConfigObj.scrollPosition === scrollPosition) {
                    _this_1.refresh_internal(false, animationCompletedCallback);
                    return;
                }
                _this_1.zone.runOutsideAngular(function () {
                    animationRequest = requestAnimationFrame(animate);
                });
            };
            animate();
            this.currentTween = newTween;
        };
        VirtualScrollerComponent.prototype.getElementSize = function (element) {
            var result = element.getBoundingClientRect();
            var styles = getComputedStyle(element);
            var marginTop = parseInt(styles['margin-top'], 10) || 0;
            var marginBottom = parseInt(styles['margin-bottom'], 10) || 0;
            var marginLeft = parseInt(styles['margin-left'], 10) || 0;
            var marginRight = parseInt(styles['margin-right'], 10) || 0;
            return {
                top: result.top + marginTop,
                bottom: result.bottom + marginBottom,
                left: result.left + marginLeft,
                right: result.right + marginRight,
                width: result.width + marginLeft + marginRight,
                height: result.height + marginTop + marginBottom
            };
        };
        VirtualScrollerComponent.prototype.checkScrollElementResized = function () {
            var boundingRect = this.getElementSize(this.getScrollElement());
            var sizeChanged;
            if (!this.previousScrollBoundingRect) {
                sizeChanged = true;
            }
            else {
                var widthChange = Math.abs(boundingRect.width - this.previousScrollBoundingRect.width);
                var heightChange = Math.abs(boundingRect.height - this.previousScrollBoundingRect.height);
                sizeChanged = widthChange > this.resizeBypassRefreshThreshold || heightChange > this.resizeBypassRefreshThreshold;
            }
            if (sizeChanged) {
                this.previousScrollBoundingRect = boundingRect;
                if (boundingRect.width > 0 && boundingRect.height > 0) {
                    this.refresh_internal(false);
                }
            }
        };
        VirtualScrollerComponent.prototype.updateDirection = function () {
            if (this.horizontal) {
                this._invisiblePaddingProperty = 'width';
                this._offsetType = 'offsetLeft';
                this._pageOffsetType = 'pageXOffset';
                this._childScrollDim = 'childWidth';
                this._marginDir = 'margin-left';
                this._translateDir = 'translateX';
                this._scrollType = 'scrollLeft';
            }
            else {
                this._invisiblePaddingProperty = 'height';
                this._offsetType = 'offsetTop';
                this._pageOffsetType = 'pageYOffset';
                this._childScrollDim = 'childHeight';
                this._marginDir = 'margin-top';
                this._translateDir = 'translateY';
                this._scrollType = 'scrollTop';
            }
        };
        VirtualScrollerComponent.prototype.debounce = function (func, wait) {
            var throttled = this.throttleTrailing(func, wait);
            var result = function () {
                throttled['cancel']();
                throttled.apply(this, arguments);
            };
            result['cancel'] = function () {
                throttled['cancel']();
            };
            return result;
        };
        VirtualScrollerComponent.prototype.throttleTrailing = function (func, wait) {
            var timeout = undefined;
            var _arguments = arguments;
            var result = function () {
                var _this = this;
                _arguments = arguments;
                if (timeout) {
                    return;
                }
                if (wait <= 0) {
                    func.apply(_this, _arguments);
                }
                else {
                    timeout = setTimeout(function () {
                        timeout = undefined;
                        func.apply(_this, _arguments);
                    }, wait);
                }
            };
            result['cancel'] = function () {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = undefined;
                }
            };
            return result;
        };
        VirtualScrollerComponent.prototype.refresh_internal = function (itemsArrayModified, refreshCompletedCallback, maxRunTimes) {
            //note: maxRunTimes is to force it to keep recalculating if the previous iteration caused a re-render (different sliced items in viewport or scrollPosition changed).
            //The default of 2x max will probably be accurate enough without causing too large a performance bottleneck
            //The code would typically quit out on the 2nd iteration anyways. The main time it'd think more than 2 runs would be necessary would be for vastly different sized child items or if this is the 1st time the items array was initialized.
            //Without maxRunTimes, If the user is actively scrolling this code would become an infinite loop until they stopped scrolling. This would be okay, except each scroll event would start an additional infinte loop. We want to short-circuit it to prevent this.
            var _this_1 = this;
            if (refreshCompletedCallback === void 0) { refreshCompletedCallback = undefined; }
            if (maxRunTimes === void 0) { maxRunTimes = 2; }
            if (itemsArrayModified && this.previousViewPort && this.previousViewPort.scrollStartPosition > 0) {
                //if items were prepended, scroll forward to keep same items visible
                var oldViewPort_1 = this.previousViewPort;
                var oldViewPortItems_1 = this.viewPortItems;
                var oldRefreshCompletedCallback_1 = refreshCompletedCallback;
                refreshCompletedCallback = function () {
                    var scrollLengthDelta = _this_1.previousViewPort.scrollLength - oldViewPort_1.scrollLength;
                    if (scrollLengthDelta > 0 && _this_1.viewPortItems) {
                        var oldStartItem_1 = oldViewPortItems_1[0];
                        var oldStartItemIndex = _this_1.items.findIndex(function (x) { return _this_1.compareItems(oldStartItem_1, x); });
                        if (oldStartItemIndex > _this_1.previousViewPort.startIndexWithBuffer) {
                            var itemOrderChanged = false;
                            for (var i = 1; i < _this_1.viewPortItems.length; ++i) {
                                if (!_this_1.compareItems(_this_1.items[oldStartItemIndex + i], oldViewPortItems_1[i])) {
                                    itemOrderChanged = true;
                                    break;
                                }
                            }
                            if (!itemOrderChanged) {
                                _this_1.scrollToPosition(_this_1.previousViewPort.scrollStartPosition + scrollLengthDelta, 0, oldRefreshCompletedCallback_1);
                                return;
                            }
                        }
                    }
                    if (oldRefreshCompletedCallback_1) {
                        oldRefreshCompletedCallback_1();
                    }
                };
            }
            this.zone.runOutsideAngular(function () {
                requestAnimationFrame(function () {
                    if (itemsArrayModified) {
                        _this_1.resetWrapGroupDimensions();
                    }
                    var viewport = _this_1.calculateViewport();
                    var startChanged = itemsArrayModified || viewport.startIndex !== _this_1.previousViewPort.startIndex;
                    var endChanged = itemsArrayModified || viewport.endIndex !== _this_1.previousViewPort.endIndex;
                    var scrollLengthChanged = viewport.scrollLength !== _this_1.previousViewPort.scrollLength;
                    var paddingChanged = viewport.padding !== _this_1.previousViewPort.padding;
                    var scrollPositionChanged = viewport.scrollStartPosition !== _this_1.previousViewPort.scrollStartPosition || viewport.scrollEndPosition !== _this_1.previousViewPort.scrollEndPosition || viewport.maxScrollPosition !== _this_1.previousViewPort.maxScrollPosition;
                    _this_1.previousViewPort = viewport;
                    if (scrollLengthChanged) {
                        _this_1.renderer.setStyle(_this_1.invisiblePaddingElementRef.nativeElement, _this_1._invisiblePaddingProperty, viewport.scrollLength + "px");
                    }
                    if (paddingChanged) {
                        if (_this_1.useMarginInsteadOfTranslate) {
                            _this_1.renderer.setStyle(_this_1.contentElementRef.nativeElement, _this_1._marginDir, viewport.padding + "px");
                        }
                        else {
                            _this_1.renderer.setStyle(_this_1.contentElementRef.nativeElement, 'transform', _this_1._translateDir + "(" + viewport.padding + "px)");
                            _this_1.renderer.setStyle(_this_1.contentElementRef.nativeElement, 'webkitTransform', _this_1._translateDir + "(" + viewport.padding + "px)");
                        }
                    }
                    if (_this_1.headerElementRef) {
                        var scrollPosition = _this_1.getScrollElement()[_this_1._scrollType];
                        var containerOffset = _this_1.getElementsOffset();
                        var offset = Math.max(scrollPosition - viewport.padding - containerOffset + _this_1.headerElementRef.nativeElement.clientHeight, 0);
                        _this_1.renderer.setStyle(_this_1.headerElementRef.nativeElement, 'transform', _this_1._translateDir + "(" + offset + "px)");
                        _this_1.renderer.setStyle(_this_1.headerElementRef.nativeElement, 'webkitTransform', _this_1._translateDir + "(" + offset + "px)");
                    }
                    var changeEventArg = (startChanged || endChanged) ? {
                        startIndex: viewport.startIndex,
                        endIndex: viewport.endIndex,
                        scrollStartPosition: viewport.scrollStartPosition,
                        scrollEndPosition: viewport.scrollEndPosition,
                        startIndexWithBuffer: viewport.startIndexWithBuffer,
                        endIndexWithBuffer: viewport.endIndexWithBuffer,
                        maxScrollPosition: viewport.maxScrollPosition
                    } : undefined;
                    if (startChanged || endChanged || scrollPositionChanged) {
                        var handleChanged = function () {
                            // update the scroll list to trigger re-render of components in viewport
                            _this_1.viewPortItems = viewport.startIndexWithBuffer >= 0 && viewport.endIndexWithBuffer >= 0 ? _this_1.items.slice(viewport.startIndexWithBuffer, viewport.endIndexWithBuffer + 1) : [];
                            _this_1.vsUpdate.emit(_this_1.viewPortItems);
                            if (startChanged) {
                                _this_1.vsStart.emit(changeEventArg);
                            }
                            if (endChanged) {
                                _this_1.vsEnd.emit(changeEventArg);
                            }
                            if (startChanged || endChanged) {
                                _this_1.changeDetectorRef.markForCheck();
                                _this_1.vsChange.emit(changeEventArg);
                            }
                            if (maxRunTimes > 0) {
                                _this_1.refresh_internal(false, refreshCompletedCallback, maxRunTimes - 1);
                                return;
                            }
                            if (refreshCompletedCallback) {
                                refreshCompletedCallback();
                            }
                        };
                        if (_this_1.executeRefreshOutsideAngularZone) {
                            handleChanged();
                        }
                        else {
                            _this_1.zone.run(handleChanged);
                        }
                    }
                    else {
                        if (maxRunTimes > 0 && (scrollLengthChanged || paddingChanged)) {
                            _this_1.refresh_internal(false, refreshCompletedCallback, maxRunTimes - 1);
                            return;
                        }
                        if (refreshCompletedCallback) {
                            refreshCompletedCallback();
                        }
                    }
                });
            });
        };
        VirtualScrollerComponent.prototype.getScrollElement = function () {
            return this.parentScroll instanceof Window ? document.scrollingElement || document.documentElement || document.body : this.parentScroll || this.element.nativeElement;
        };
        VirtualScrollerComponent.prototype.addScrollEventHandlers = function () {
            var _this_1 = this;
            if (this.isAngularUniversalSSR) {
                return;
            }
            var scrollElement = this.getScrollElement();
            this.removeScrollEventHandlers();
            this.zone.runOutsideAngular(function () {
                if (_this_1.parentScroll instanceof Window) {
                    _this_1.disposeScrollHandler = _this_1.renderer.listen('window', 'scroll', _this_1.onScroll);
                    _this_1.disposeResizeHandler = _this_1.renderer.listen('window', 'resize', _this_1.onScroll);
                }
                else {
                    _this_1.disposeScrollHandler = _this_1.renderer.listen(scrollElement, 'scroll', _this_1.onScroll);
                    if (_this_1._checkResizeInterval > 0) {
                        _this_1.checkScrollElementResizedTimer = setInterval(function () { _this_1.checkScrollElementResized(); }, _this_1._checkResizeInterval);
                    }
                }
            });
        };
        VirtualScrollerComponent.prototype.removeScrollEventHandlers = function () {
            if (this.checkScrollElementResizedTimer) {
                clearInterval(this.checkScrollElementResizedTimer);
            }
            if (this.disposeScrollHandler) {
                this.disposeScrollHandler();
                this.disposeScrollHandler = undefined;
            }
            if (this.disposeResizeHandler) {
                this.disposeResizeHandler();
                this.disposeResizeHandler = undefined;
            }
        };
        VirtualScrollerComponent.prototype.getElementsOffset = function () {
            if (this.isAngularUniversalSSR) {
                return 0;
            }
            var offset = 0;
            if (this.containerElementRef && this.containerElementRef.nativeElement) {
                offset += this.containerElementRef.nativeElement[this._offsetType];
            }
            if (this.parentScroll) {
                var scrollElement = this.getScrollElement();
                var elementClientRect = this.getElementSize(this.element.nativeElement);
                var scrollClientRect = this.getElementSize(scrollElement);
                if (this.horizontal) {
                    offset += elementClientRect.left - scrollClientRect.left;
                }
                else {
                    offset += elementClientRect.top - scrollClientRect.top;
                }
                if (!(this.parentScroll instanceof Window)) {
                    offset += scrollElement[this._scrollType];
                }
            }
            return offset;
        };
        VirtualScrollerComponent.prototype.countItemsPerWrapGroup = function () {
            if (this.isAngularUniversalSSR) {
                return Math.round(this.horizontal ? this.ssrViewportHeight / this.ssrChildHeight : this.ssrViewportWidth / this.ssrChildWidth);
            }
            var propertyName = this.horizontal ? 'offsetLeft' : 'offsetTop';
            var children = ((this.containerElementRef && this.containerElementRef.nativeElement) || this.contentElementRef.nativeElement).children;
            var childrenLength = children ? children.length : 0;
            if (childrenLength === 0) {
                return 1;
            }
            var firstOffset = children[0][propertyName];
            var result = 1;
            while (result < childrenLength && firstOffset === children[result][propertyName]) {
                ++result;
            }
            return result;
        };
        VirtualScrollerComponent.prototype.getScrollStartPosition = function () {
            var windowScrollValue = undefined;
            if (this.parentScroll instanceof Window) {
                windowScrollValue = window[this._pageOffsetType];
            }
            return windowScrollValue || this.getScrollElement()[this._scrollType] || 0;
        };
        VirtualScrollerComponent.prototype.resetWrapGroupDimensions = function () {
            var oldWrapGroupDimensions = this.wrapGroupDimensions;
            this.invalidateAllCachedMeasurements();
            if (!this.enableUnequalChildrenSizes || !oldWrapGroupDimensions || oldWrapGroupDimensions.numberOfKnownWrapGroupChildSizes === 0) {
                return;
            }
            var itemsPerWrapGroup = this.countItemsPerWrapGroup();
            for (var wrapGroupIndex = 0; wrapGroupIndex < oldWrapGroupDimensions.maxChildSizePerWrapGroup.length; ++wrapGroupIndex) {
                var oldWrapGroupDimension = oldWrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex];
                if (!oldWrapGroupDimension || !oldWrapGroupDimension.items || !oldWrapGroupDimension.items.length) {
                    continue;
                }
                if (oldWrapGroupDimension.items.length !== itemsPerWrapGroup) {
                    return;
                }
                var itemsChanged = false;
                var arrayStartIndex = itemsPerWrapGroup * wrapGroupIndex;
                for (var i = 0; i < itemsPerWrapGroup; ++i) {
                    if (!this.compareItems(oldWrapGroupDimension.items[i], this.items[arrayStartIndex + i])) {
                        itemsChanged = true;
                        break;
                    }
                }
                if (!itemsChanged) {
                    ++this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                    this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths += oldWrapGroupDimension.childWidth || 0;
                    this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights += oldWrapGroupDimension.childHeight || 0;
                    this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex] = oldWrapGroupDimension;
                }
            }
        };
        VirtualScrollerComponent.prototype.calculateDimensions = function () {
            var scrollElement = this.getScrollElement();
            var maxCalculatedScrollBarSize = 25; // Note: Formula to auto-calculate doesn't work for ParentScroll, so we default to this if not set by consuming application
            this.calculatedScrollbarHeight = Math.max(Math.min(scrollElement.offsetHeight - scrollElement.clientHeight, maxCalculatedScrollBarSize), this.calculatedScrollbarHeight);
            this.calculatedScrollbarWidth = Math.max(Math.min(scrollElement.offsetWidth - scrollElement.clientWidth, maxCalculatedScrollBarSize), this.calculatedScrollbarWidth);
            var viewportWidth = scrollElement.offsetWidth - (this.scrollbarWidth || this.calculatedScrollbarWidth || (this.horizontal ? 0 : maxCalculatedScrollBarSize));
            var viewportHeight = scrollElement.offsetHeight - (this.scrollbarHeight || this.calculatedScrollbarHeight || (this.horizontal ? maxCalculatedScrollBarSize : 0));
            var content = (this.containerElementRef && this.containerElementRef.nativeElement) || this.contentElementRef.nativeElement;
            var itemsPerWrapGroup = this.countItemsPerWrapGroup();
            var wrapGroupsPerPage;
            var defaultChildWidth;
            var defaultChildHeight;
            if (this.isAngularUniversalSSR) {
                viewportWidth = this.ssrViewportWidth;
                viewportHeight = this.ssrViewportHeight;
                defaultChildWidth = this.ssrChildWidth;
                defaultChildHeight = this.ssrChildHeight;
                var itemsPerRow = Math.max(Math.ceil(viewportWidth / defaultChildWidth), 1);
                var itemsPerCol = Math.max(Math.ceil(viewportHeight / defaultChildHeight), 1);
                wrapGroupsPerPage = this.horizontal ? itemsPerRow : itemsPerCol;
            }
            else if (!this.enableUnequalChildrenSizes) {
                if (content.children.length > 0) {
                    if (!this.childWidth || !this.childHeight) {
                        if (!this.minMeasuredChildWidth && viewportWidth > 0) {
                            this.minMeasuredChildWidth = viewportWidth;
                        }
                        if (!this.minMeasuredChildHeight && viewportHeight > 0) {
                            this.minMeasuredChildHeight = viewportHeight;
                        }
                    }
                    var child = content.children[0];
                    var clientRect = this.getElementSize(child);
                    this.minMeasuredChildWidth = Math.min(this.minMeasuredChildWidth, clientRect.width);
                    this.minMeasuredChildHeight = Math.min(this.minMeasuredChildHeight, clientRect.height);
                }
                defaultChildWidth = this.childWidth || this.minMeasuredChildWidth || viewportWidth;
                defaultChildHeight = this.childHeight || this.minMeasuredChildHeight || viewportHeight;
                var itemsPerRow = Math.max(Math.ceil(viewportWidth / defaultChildWidth), 1);
                var itemsPerCol = Math.max(Math.ceil(viewportHeight / defaultChildHeight), 1);
                wrapGroupsPerPage = this.horizontal ? itemsPerRow : itemsPerCol;
            }
            else {
                var scrollOffset = scrollElement[this._scrollType] - (this.previousViewPort ? this.previousViewPort.padding : 0);
                var arrayStartIndex = this.previousViewPort.startIndexWithBuffer || 0;
                var wrapGroupIndex = Math.ceil(arrayStartIndex / itemsPerWrapGroup);
                var maxWidthForWrapGroup = 0;
                var maxHeightForWrapGroup = 0;
                var sumOfVisibleMaxWidths = 0;
                var sumOfVisibleMaxHeights = 0;
                wrapGroupsPerPage = 0;
                for (var i = 0; i < content.children.length; ++i) {
                    ++arrayStartIndex;
                    var child = content.children[i];
                    var clientRect = this.getElementSize(child);
                    maxWidthForWrapGroup = Math.max(maxWidthForWrapGroup, clientRect.width);
                    maxHeightForWrapGroup = Math.max(maxHeightForWrapGroup, clientRect.height);
                    if (arrayStartIndex % itemsPerWrapGroup === 0) {
                        var oldValue = this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex];
                        if (oldValue) {
                            --this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                            this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths -= oldValue.childWidth || 0;
                            this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights -= oldValue.childHeight || 0;
                        }
                        ++this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                        var items = this.items.slice(arrayStartIndex - itemsPerWrapGroup, arrayStartIndex);
                        this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex] = {
                            childWidth: maxWidthForWrapGroup,
                            childHeight: maxHeightForWrapGroup,
                            items: items
                        };
                        this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths += maxWidthForWrapGroup;
                        this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights += maxHeightForWrapGroup;
                        if (this.horizontal) {
                            var maxVisibleWidthForWrapGroup = Math.min(maxWidthForWrapGroup, Math.max(viewportWidth - sumOfVisibleMaxWidths, 0));
                            if (scrollOffset > 0) {
                                var scrollOffsetToRemove = Math.min(scrollOffset, maxVisibleWidthForWrapGroup);
                                maxVisibleWidthForWrapGroup -= scrollOffsetToRemove;
                                scrollOffset -= scrollOffsetToRemove;
                            }
                            sumOfVisibleMaxWidths += maxVisibleWidthForWrapGroup;
                            if (maxVisibleWidthForWrapGroup > 0 && viewportWidth >= sumOfVisibleMaxWidths) {
                                ++wrapGroupsPerPage;
                            }
                        }
                        else {
                            var maxVisibleHeightForWrapGroup = Math.min(maxHeightForWrapGroup, Math.max(viewportHeight - sumOfVisibleMaxHeights, 0));
                            if (scrollOffset > 0) {
                                var scrollOffsetToRemove = Math.min(scrollOffset, maxVisibleHeightForWrapGroup);
                                maxVisibleHeightForWrapGroup -= scrollOffsetToRemove;
                                scrollOffset -= scrollOffsetToRemove;
                            }
                            sumOfVisibleMaxHeights += maxVisibleHeightForWrapGroup;
                            if (maxVisibleHeightForWrapGroup > 0 && viewportHeight >= sumOfVisibleMaxHeights) {
                                ++wrapGroupsPerPage;
                            }
                        }
                        ++wrapGroupIndex;
                        maxWidthForWrapGroup = 0;
                        maxHeightForWrapGroup = 0;
                    }
                }
                var averageChildWidth = this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths / this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                var averageChildHeight = this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights / this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                defaultChildWidth = this.childWidth || averageChildWidth || viewportWidth;
                defaultChildHeight = this.childHeight || averageChildHeight || viewportHeight;
                if (this.horizontal) {
                    if (viewportWidth > sumOfVisibleMaxWidths) {
                        wrapGroupsPerPage += Math.ceil((viewportWidth - sumOfVisibleMaxWidths) / defaultChildWidth);
                    }
                }
                else {
                    if (viewportHeight > sumOfVisibleMaxHeights) {
                        wrapGroupsPerPage += Math.ceil((viewportHeight - sumOfVisibleMaxHeights) / defaultChildHeight);
                    }
                }
            }
            var itemCount = this.items.length;
            var itemsPerPage = itemsPerWrapGroup * wrapGroupsPerPage;
            var pageCount_fractional = itemCount / itemsPerPage;
            var numberOfWrapGroups = Math.ceil(itemCount / itemsPerWrapGroup);
            var scrollLength = 0;
            var defaultScrollLengthPerWrapGroup = this.horizontal ? defaultChildWidth : defaultChildHeight;
            if (this.enableUnequalChildrenSizes) {
                var numUnknownChildSizes = 0;
                for (var i = 0; i < numberOfWrapGroups; ++i) {
                    var childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
                    if (childSize) {
                        scrollLength += childSize;
                    }
                    else {
                        ++numUnknownChildSizes;
                    }
                }
                scrollLength += Math.round(numUnknownChildSizes * defaultScrollLengthPerWrapGroup);
            }
            else {
                scrollLength = numberOfWrapGroups * defaultScrollLengthPerWrapGroup;
            }
            if (this.headerElementRef) {
                scrollLength += this.headerElementRef.nativeElement.clientHeight;
            }
            var viewportLength = this.horizontal ? viewportWidth : viewportHeight;
            var maxScrollPosition = Math.max(scrollLength - viewportLength, 0);
            return {
                itemCount: itemCount,
                itemsPerWrapGroup: itemsPerWrapGroup,
                wrapGroupsPerPage: wrapGroupsPerPage,
                itemsPerPage: itemsPerPage,
                pageCount_fractional: pageCount_fractional,
                childWidth: defaultChildWidth,
                childHeight: defaultChildHeight,
                scrollLength: scrollLength,
                viewportLength: viewportLength,
                maxScrollPosition: maxScrollPosition
            };
        };
        VirtualScrollerComponent.prototype.calculatePadding = function (arrayStartIndexWithBuffer, dimensions) {
            if (dimensions.itemCount === 0) {
                return 0;
            }
            var defaultScrollLengthPerWrapGroup = dimensions[this._childScrollDim];
            var startingWrapGroupIndex = Math.floor(arrayStartIndexWithBuffer / dimensions.itemsPerWrapGroup) || 0;
            if (!this.enableUnequalChildrenSizes) {
                return defaultScrollLengthPerWrapGroup * startingWrapGroupIndex;
            }
            var numUnknownChildSizes = 0;
            var result = 0;
            for (var i = 0; i < startingWrapGroupIndex; ++i) {
                var childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
                if (childSize) {
                    result += childSize;
                }
                else {
                    ++numUnknownChildSizes;
                }
            }
            result += Math.round(numUnknownChildSizes * defaultScrollLengthPerWrapGroup);
            return result;
        };
        VirtualScrollerComponent.prototype.calculatePageInfo = function (scrollPosition, dimensions) {
            var scrollPercentage = 0;
            if (this.enableUnequalChildrenSizes) {
                var numberOfWrapGroups = Math.ceil(dimensions.itemCount / dimensions.itemsPerWrapGroup);
                var totalScrolledLength = 0;
                var defaultScrollLengthPerWrapGroup = dimensions[this._childScrollDim];
                for (var i = 0; i < numberOfWrapGroups; ++i) {
                    var childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
                    if (childSize) {
                        totalScrolledLength += childSize;
                    }
                    else {
                        totalScrolledLength += defaultScrollLengthPerWrapGroup;
                    }
                    if (scrollPosition < totalScrolledLength) {
                        scrollPercentage = i / numberOfWrapGroups;
                        break;
                    }
                }
            }
            else {
                scrollPercentage = scrollPosition / dimensions.scrollLength;
            }
            var startingArrayIndex_fractional = Math.min(Math.max(scrollPercentage * dimensions.pageCount_fractional, 0), dimensions.pageCount_fractional) * dimensions.itemsPerPage;
            var maxStart = dimensions.itemCount - dimensions.itemsPerPage - 1;
            var arrayStartIndex = Math.min(Math.floor(startingArrayIndex_fractional), maxStart);
            arrayStartIndex -= arrayStartIndex % dimensions.itemsPerWrapGroup; // round down to start of wrapGroup
            if (this.stripedTable) {
                var bufferBoundary = 2 * dimensions.itemsPerWrapGroup;
                if (arrayStartIndex % bufferBoundary !== 0) {
                    arrayStartIndex = Math.max(arrayStartIndex - arrayStartIndex % bufferBoundary, 0);
                }
            }
            var arrayEndIndex = Math.ceil(startingArrayIndex_fractional) + dimensions.itemsPerPage - 1;
            var endIndexWithinWrapGroup = (arrayEndIndex + 1) % dimensions.itemsPerWrapGroup;
            if (endIndexWithinWrapGroup > 0) {
                arrayEndIndex += dimensions.itemsPerWrapGroup - endIndexWithinWrapGroup; // round up to end of wrapGroup
            }
            if (isNaN(arrayStartIndex)) {
                arrayStartIndex = 0;
            }
            if (isNaN(arrayEndIndex)) {
                arrayEndIndex = 0;
            }
            arrayStartIndex = Math.min(Math.max(arrayStartIndex, 0), dimensions.itemCount - 1);
            arrayEndIndex = Math.min(Math.max(arrayEndIndex, 0), dimensions.itemCount - 1);
            var bufferSize = this.bufferAmount * dimensions.itemsPerWrapGroup;
            var startIndexWithBuffer = Math.min(Math.max(arrayStartIndex - bufferSize, 0), dimensions.itemCount - 1);
            var endIndexWithBuffer = Math.min(Math.max(arrayEndIndex + bufferSize, 0), dimensions.itemCount - 1);
            return {
                startIndex: arrayStartIndex,
                endIndex: arrayEndIndex,
                startIndexWithBuffer: startIndexWithBuffer,
                endIndexWithBuffer: endIndexWithBuffer,
                scrollStartPosition: scrollPosition,
                scrollEndPosition: scrollPosition + dimensions.viewportLength,
                maxScrollPosition: dimensions.maxScrollPosition
            };
        };
        VirtualScrollerComponent.prototype.calculateViewport = function () {
            var dimensions = this.calculateDimensions();
            var offset = this.getElementsOffset();
            var scrollStartPosition = this.getScrollStartPosition();
            if (scrollStartPosition > (dimensions.scrollLength + offset) && !(this.parentScroll instanceof Window)) {
                scrollStartPosition = dimensions.scrollLength;
            }
            else {
                scrollStartPosition -= offset;
            }
            scrollStartPosition = Math.max(0, scrollStartPosition);
            var pageInfo = this.calculatePageInfo(scrollStartPosition, dimensions);
            var newPadding = this.calculatePadding(pageInfo.startIndexWithBuffer, dimensions);
            var newScrollLength = dimensions.scrollLength;
            return {
                startIndex: pageInfo.startIndex,
                endIndex: pageInfo.endIndex,
                startIndexWithBuffer: pageInfo.startIndexWithBuffer,
                endIndexWithBuffer: pageInfo.endIndexWithBuffer,
                padding: Math.round(newPadding),
                scrollLength: Math.round(newScrollLength),
                scrollStartPosition: pageInfo.scrollStartPosition,
                scrollEndPosition: pageInfo.scrollEndPosition,
                maxScrollPosition: pageInfo.maxScrollPosition
            };
        };
        VirtualScrollerComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: core.NgZone },
            { type: core.ChangeDetectorRef },
            { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: ['virtual-scroller-default-options',] }] }
        ]; };
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "executeRefreshOutsideAngularZone", void 0);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "enableUnequalChildrenSizes", null);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "useMarginInsteadOfTranslate", void 0);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "modifyOverflowStyleOfParentScroll", void 0);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "stripedTable", void 0);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "scrollbarWidth", void 0);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "scrollbarHeight", void 0);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "childWidth", void 0);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "childHeight", void 0);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "ssrChildWidth", void 0);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "ssrChildHeight", void 0);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "ssrViewportWidth", void 0);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "ssrViewportHeight", void 0);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "bufferAmount", null);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "scrollAnimationTime", void 0);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "resizeBypassRefreshThreshold", void 0);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "scrollThrottlingTime", null);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "scrollDebounceTime", null);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "checkResizeInterval", null);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "items", null);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "compareItems", void 0);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "horizontal", null);
        __decorate([
            core.Input()
        ], VirtualScrollerComponent.prototype, "parentScroll", null);
        __decorate([
            core.Output()
        ], VirtualScrollerComponent.prototype, "vsUpdate", void 0);
        __decorate([
            core.Output()
        ], VirtualScrollerComponent.prototype, "vsChange", void 0);
        __decorate([
            core.Output()
        ], VirtualScrollerComponent.prototype, "vsStart", void 0);
        __decorate([
            core.Output()
        ], VirtualScrollerComponent.prototype, "vsEnd", void 0);
        __decorate([
            core.ViewChild('content', { read: core.ElementRef, static: false })
        ], VirtualScrollerComponent.prototype, "contentElementRef", void 0);
        __decorate([
            core.ViewChild('invisiblePadding', { read: core.ElementRef, static: false })
        ], VirtualScrollerComponent.prototype, "invisiblePaddingElementRef", void 0);
        __decorate([
            core.ContentChild('header', { read: core.ElementRef, static: false })
        ], VirtualScrollerComponent.prototype, "headerElementRef", void 0);
        __decorate([
            core.ContentChild('container', { read: core.ElementRef, static: false })
        ], VirtualScrollerComponent.prototype, "containerElementRef", void 0);
        VirtualScrollerComponent = __decorate([
            core.Component({
                selector: 'virtual-scroller,[virtualScroller]',
                exportAs: 'virtualScroller',
                template: "\n    <div class=\"total-padding\" #invisiblePadding></div>\n    <div class=\"scrollable-content\" #content>\n      <ng-content></ng-content>\n    </div>\n  ",
                host: {
                    '[class.horizontal]': "horizontal",
                    '[class.vertical]': "!horizontal",
                    '[class.selfScroll]': "!parentScroll"
                },
                styles: ["\n    :host {\n      position: relative;\n\t  display: block;\n      -webkit-overflow-scrolling: touch;\n    }\n\t\n\t:host.horizontal.selfScroll {\n      overflow-y: visible;\n      overflow-x: auto;\n\t}\n\t:host.vertical.selfScroll {\n      overflow-y: auto;\n      overflow-x: visible;\n\t}\n\t\n    .scrollable-content {\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      max-width: 100vw;\n      max-height: 100vh;\n      position: absolute;\n    }\n\n\t.scrollable-content ::ng-deep > * {\n\t\tbox-sizing: border-box;\n\t}\n\t\n\t:host.horizontal {\n\t\twhite-space: nowrap;\n\t}\n\t\n\t:host.horizontal .scrollable-content {\n\t\tdisplay: flex;\n\t}\n\t\n\t:host.horizontal .scrollable-content ::ng-deep > * {\n\t\tflex-shrink: 0;\n\t\tflex-grow: 0;\n\t\twhite-space: initial;\n\t}\n\t\n    .total-padding {\n      width: 1px;\n      opacity: 0;\n    }\n    \n    :host.horizontal .total-padding {\n      height: 100%;\n    }\n  "]
            }),
            __param(4, core.Inject(core.PLATFORM_ID)),
            __param(5, core.Optional()), __param(5, core.Inject('virtual-scroller-default-options'))
        ], VirtualScrollerComponent);
        return VirtualScrollerComponent;
    }());
    var VirtualScrollerModule = /** @class */ (function () {
        function VirtualScrollerModule() {
        }
        VirtualScrollerModule = __decorate([
            core.NgModule({
                exports: [VirtualScrollerComponent],
                declarations: [VirtualScrollerComponent],
                imports: [common.CommonModule],
                providers: [
                    {
                        provide: 'virtual-scroller-default-options',
                        useFactory: VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY
                    }
                ]
            })
        ], VirtualScrollerModule);
        return VirtualScrollerModule;
    }());

    // tslint:disable: no-use-before-declare
    var noop = function () {
    };
    var ɵ0 = noop;
    var SerSelectComponent = /** @class */ (function () {
        function SerSelectComponent(_elementRef, cdr, ds, _renderer, multipleAttr, simple, primaryKey, labelKey) {
            var _this = this;
            this._elementRef = _elementRef;
            this.cdr = cdr;
            this.ds = ds;
            this._renderer = _renderer;
            this.data = [];
            this.onSelect = new core.EventEmitter();
            this.onDeSelect = new core.EventEmitter();
            this.onSelectAll = new core.EventEmitter();
            this.onDeSelectAll = new core.EventEmitter();
            this.onOpen = new core.EventEmitter();
            this.onClose = new core.EventEmitter();
            this.onScrollToEnd = new core.EventEmitter();
            this.onFilterSelectAll = new core.EventEmitter();
            this.onFilterDeSelectAll = new core.EventEmitter();
            this.onAddFilterNewItem = new core.EventEmitter();
            this.onGroupSelect = new core.EventEmitter();
            this.onGroupDeSelect = new core.EventEmitter();
            this.isDisabled = false;
            this.isActive = false;
            this.multipleClass = false;
            this.virtualdata = [];
            this.searchTerm$ = new rxjs.Subject();
            this.selectedItems = [];
            this.isSelectAll = false;
            this.isFilterSelectAll = false;
            this.isInfiniteFilterSelectAll = false;
            this.chunkIndex = [];
            this.cachedItems = [];
            this.groupCachedItems = [];
            this.itemHeight = 41.6;
            this.filterLength = 0;
            this.infiniteFilterLength = 0;
            this.dropdownSubs = [];
            this.defaultSettings = {
                singleSelection: true,
                enableCheckAll: true,
                selectAllText: 'Seleccionar todo',
                unSelectAllText: 'Deseleccionar todo',
                filterSelectAllText: 'Seleccionar todos los resultados filtrados',
                filterUnSelectAllText: 'Deseleccionar todos los resultados filtrados',
                enableSearchFilter: true,
                searchBy: ['name'],
                maxHeight: 300,
                badgeShowLimit: 999999999999,
                classes: '',
                searchPlaceholderText: 'Buscar',
                showCheckbox: true,
                noDataLabel: 'Sin datos disponibles',
                lazyLoading: false,
                labelKey: 'name',
                primaryKey: 'id',
                disabledKey: 'disabled',
                enableFilterSelectAll: true,
                selectGroup: false,
                addNewItemOnFilter: false,
                addNewButtonText: 'Agregar',
                escapeToClose: true,
                clearAll: true
            };
            this.randomSize = true;
            this.filteredList = [];
            this.virtualScroollInit = false;
            this.isDisabledItemPresent = false;
            this.hasValue = hasValue;
            // tslint:disable-next-line: member-ordering
            this.onChangeCallback = noop;
            // tslint:disable-next-line: member-ordering
            this.onTouchedCallback = noop;
            this.multiple = multipleAttr !== null;
            if (this.multiple) {
                this.defaultSettings.singleSelection = false;
            }
            if (simple !== null) {
                this.defaultSettings.enableSearchFilter = false;
                this.defaultSettings.clearAll = false;
            }
            if (primaryKey !== null) {
                this.defaultSettings.primaryKey = primaryKey;
            }
            if (labelKey !== null) {
                this.defaultSettings.labelKey = labelKey;
            }
            this.searchTerm$.asObservable().pipe(operators.debounceTime(1000), operators.distinctUntilChanged(), operators.tap(function (term) { return term; })).subscribe(function (val) {
                _this.filterInfiniteList(val);
            });
        }
        SerSelectComponent_1 = SerSelectComponent;
        SerSelectComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.settings = Object.assign(this.defaultSettings, this.settings);
            this.multipleClass = !this.settings.singleSelection;
            this.cachedItems = this.cloneArray(this.data);
            this.subscription = this.ds.getData().subscribe(function (data) {
                if (data) {
                    var len_1 = 0;
                    data.forEach(function (obj) {
                        if (obj[_this.settings.disabledKey]) {
                            _this.isDisabledItemPresent = true;
                        }
                        if (!obj.hasOwnProperty('grpTitle')) {
                            len_1++;
                        }
                    });
                    _this.filterLength = len_1;
                    _this.onFilterChange(data);
                }
            });
            this.virtualScroollInit = false;
        };
        SerSelectComponent.prototype.ngOnChanges = function (changes) {
            var _a;
            if (changes.data && !changes.data.firstChange) {
                if (this.settings.groupBy) {
                    this.groupedData = this.transformData(this.data, this.settings.groupBy);
                    if (this.data.length === 0) {
                        this.selectedItems = [];
                    }
                    this.groupCachedItems = this.cloneArray(this.groupedData);
                }
                this.cachedItems = this.cloneArray(this.data);
            }
            if (changes.settings && !changes.settings.firstChange) {
                this.settings = Object.assign(this.defaultSettings, this.settings);
            }
            if (changes.loading) {
            }
            if (((_a = this.settings) === null || _a === void 0 ? void 0 : _a.lazyLoading) && this.virtualScroollInit && changes.data) {
                this.virtualdata = changes.data.currentValue;
            }
        };
        SerSelectComponent.prototype.ngAfterViewInit = function () {
            this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
        };
        SerSelectComponent.prototype.onItemClick = function (item, k, e) {
            if (this.isDisabled || item[this.settings.disabledKey]) {
                return false;
            }
            var found = this.isSelected(item);
            var limit = this.selectedItems.length < this.settings.limitSelection ? true : false;
            if (!found) {
                if (this.settings.limitSelection) {
                    if (limit) {
                        this.addSelected(item);
                        this.onSelect.emit(item);
                    }
                }
                else {
                    this.addSelected(item);
                    this.onSelect.emit(item);
                }
            }
            else {
                this.removeSelected(item);
                this.onDeSelect.emit(item);
            }
            if (this.isSelectAll || this.data.length > this.selectedItems.length) {
                this.isSelectAll = false;
            }
            if (this.data.length === this.selectedItems.length) {
                this.isSelectAll = true;
            }
            if (this.settings.groupBy) {
                this.updateGroupInfo(item);
            }
        };
        SerSelectComponent.prototype.validate = function (c) {
            return null;
        };
        SerSelectComponent.prototype.writeValue = function (value) {
            var _this = this;
            var _a, _b;
            if (hasValue(value)) {
                if (this.settings.singleSelection) {
                    if (Array.isArray(value)) {
                        throw Error('Array detected as input, please add "multiple" attribute in the select or set "singleSelection" setting in false');
                    }
                    var selectedObject = (_a = this.data) === null || _a === void 0 ? void 0 : _a.find(function (item) {
                        return item[_this.settings.primaryKey] === value;
                    });
                    if (hasValue(selectedObject)) {
                        this.selectedItems = [selectedObject];
                    }
                    else {
                        this.selectedItems = [];
                        throw Error('No primaryKey finded in options, please set "primaryKey" setting with the correct value');
                    }
                    if (this.settings.groupBy) {
                        this.groupedData = this.transformData(this.data, this.settings.groupBy);
                        this.groupCachedItems = this.cloneArray(this.groupedData);
                    }
                }
                else {
                    if (!Array.isArray(value)) {
                        throw Error('Single value detected as input, please set "singleSelection" setting in true or remove "multiple" attribute in the select if you added');
                    }
                    var selectedObjects = (_b = this.data) === null || _b === void 0 ? void 0 : _b.filter(function (item) {
                        return inArray(item[_this.settings.primaryKey], value);
                    });
                    if (hasValue(selectedObjects)) {
                        if (this.settings.limitSelection) {
                            this.selectedItems = selectedObjects.slice(0, this.settings.limitSelection);
                        }
                        else {
                            this.selectedItems = selectedObjects;
                        }
                    }
                    else {
                        this.selectedItems = [];
                        throw Error('No primaryKey finded in options, please set "primaryKey" setting with the correct value');
                    }
                    if (this.selectedItems.length === this.data.length && this.data.length > 0) {
                        this.isSelectAll = true;
                    }
                    if (this.settings.groupBy) {
                        this.groupedData = this.transformData(this.data, this.settings.groupBy);
                        this.groupCachedItems = this.cloneArray(this.groupedData);
                    }
                }
            }
            else {
                this.selectedItems = [];
            }
        };
        SerSelectComponent.prototype.registerOnChange = function (fn) {
            this.onChangeCallback = fn;
        };
        SerSelectComponent.prototype.registerOnTouched = function (fn) {
            this.onTouchedCallback = fn;
        };
        SerSelectComponent.prototype.setDisabledState = function (isDisabled) {
            this.isDisabled = isDisabled;
        };
        SerSelectComponent.prototype.trackByFn = function (item) {
            return item[this.settings.primaryKey];
        };
        SerSelectComponent.prototype.isSelected = function (clickedItem) {
            var e_1, _a;
            if (clickedItem[this.settings.disabledKey]) {
                return false;
            }
            var found = false;
            if (hasValue(this.selectedItems)) {
                try {
                    for (var _b = __values(this.selectedItems), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
                            found = true;
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return found;
        };
        SerSelectComponent.prototype.addSelected = function (item) {
            var _this = this;
            if (this.settings.singleSelection) {
                this.selectedItems = [item];
                this.onChangeCallback(item[this.settings.primaryKey]);
                this.onTouchedCallback(item[this.settings.primaryKey]);
                this.closeDropdown();
            }
            else {
                this.selectedItems.push(item);
                var items = this.selectedItems.map(function (element) { return element[_this.settings.primaryKey]; });
                this.onChangeCallback(items);
                this.onTouchedCallback(items);
            }
        };
        SerSelectComponent.prototype.removeSelected = function (clickedItem) {
            var _this = this;
            if (hasValue(this.selectedItems)) {
                this.selectedItems.forEach(function (item, index) {
                    if (clickedItem[_this.settings.primaryKey] === item[_this.settings.primaryKey]) {
                        _this.selectedItems.splice(index, 1);
                    }
                });
            }
            if (this.settings.singleSelection) {
                this.onChangeCallback(null);
                this.onTouchedCallback(null);
            }
            else {
                this.onChangeCallback(this.selectedItems);
                this.onTouchedCallback(this.selectedItems);
            }
        };
        //#region dropdown status
        SerSelectComponent.prototype.toggleDropdown = function (evt) {
            if (this.isDisabled) {
                return false;
            }
            this.isActive = !this.isActive;
            if (this.isActive) {
                this.openDropdown();
            }
            else {
                this.closeDropdown();
            }
            if (this.settings.lazyLoading) {
                this.virtualdata = this.data;
                this.virtualScroollInit = true;
            }
            evt.preventDefault();
        };
        SerSelectComponent.prototype.openDropdown = function () {
            var _this = this;
            if (this.isDisabled) {
                return false;
            }
            this.isActive = true;
            this.dropdownSubs.push(rxjs.fromEvent(window, 'click')
                .pipe(operators.filter(function (e) { return !_this._elementRef.nativeElement.contains(e.target); }))
                .subscribe(function () { return _this.closeDropdown(); }));
            this.dropdownSubs.push(rxjs.fromEvent(window, 'keyup')
                .pipe(operators.filter(function (e) { return e.key.toLowerCase() === 'escape' && _this.settings.escapeToClose; }))
                .subscribe(function () { return _this.closeDropdown(); }));
            this.dropdownSubs.push(rxjs.fromEvent(this._elementRef.nativeElement, 'scroll').subscribe(function () { return console.log('scroll'); }));
            this.dropdownSubs.push(rxjs.fromEvent(window, 'resize').subscribe(function () { return _this.setPositionDropdown(); }));
            this.setPositionDropdown();
            this._renderer.appendChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
            if (this.settings.enableSearchFilter && !this.searchTempl) {
                setTimeout(function () {
                    var _a;
                    (_a = _this.searchInput) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
                }, 0);
            }
            this.onOpen.emit(true);
        };
        SerSelectComponent.prototype.closeDropdown = function () {
            if (this.searchInput) {
                this.searchInput.nativeElement.value = '';
            }
            this.clearSearch();
            this.isActive = false;
            this.dropdownSubs.forEach(function (s) { return s.unsubscribe(); });
            this.dropdownSubs = [];
            this.onClose.emit(false);
            this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
        };
        SerSelectComponent.prototype.setPositionDropdown = function () {
            var _this = this;
            setTimeout(function () {
                var dropdown = _this.dropdownListElem.nativeElement;
                var el = _this._elementRef.nativeElement;
                var remainingHeight = document.documentElement.offsetHeight - (dropdown.offsetHeight + el.getBoundingClientRect().top + el.offsetHeight);
                _this._renderer.setStyle(dropdown, 'width', (el.offsetWidth) + 'px');
                _this._renderer.setStyle(dropdown, 'left', (el.getBoundingClientRect().left) + 'px');
                if (remainingHeight > 0) {
                    _this._renderer.removeClass(el, 'ontop');
                    _this._renderer.removeClass(dropdown, 'ontop');
                    _this._elementRef.nativeElement.style.removeProperty('bottom');
                    _this._renderer.setStyle(dropdown, 'top', el.getBoundingClientRect().bottom + 'px');
                }
                else {
                    _this._renderer.addClass(el, 'ontop');
                    _this._renderer.addClass(dropdown, 'ontop');
                    _this._elementRef.nativeElement.style.removeProperty('top');
                    _this._renderer.setStyle(dropdown, 'bottom', (document.documentElement.offsetHeight - el.getBoundingClientRect().top) + 'px');
                }
            });
        };
        //#endregion
        SerSelectComponent.prototype.toggleSelectAll = function () {
            var _this = this;
            if (!this.isSelectAll) {
                this.selectedItems = [];
                if (this.settings.groupBy) {
                    this.groupedData.forEach(function (obj) {
                        obj.selected = !obj[_this.settings.disabledKey];
                    });
                    this.groupCachedItems.forEach(function (obj) {
                        obj.selected = !obj[_this.settings.disabledKey];
                    });
                }
                // this.selectedItems = this.data.slice();
                this.selectedItems = this.data.filter(function (individualData) { return !individualData[_this.settings.disabledKey]; });
                this.isSelectAll = true;
                this.onChangeCallback(this.selectedItems);
                this.onTouchedCallback(this.selectedItems);
                this.onSelectAll.emit(this.selectedItems);
            }
            else {
                if (this.settings.groupBy) {
                    this.groupedData.forEach(function (obj) {
                        obj.selected = false;
                    });
                    this.groupCachedItems.forEach(function (obj) {
                        obj.selected = false;
                    });
                }
                this.selectedItems = [];
                this.isSelectAll = false;
                this.onChangeCallback(this.selectedItems);
                this.onTouchedCallback(this.selectedItems);
                this.onDeSelectAll.emit(this.selectedItems);
            }
        };
        SerSelectComponent.prototype.filterFn = function (value) {
            if (this.settings.groupBy && !this.settings.lazyLoading) {
                this.filterGroupedList();
            }
            else if (this.settings.lazyLoading) {
                this.searchTerm$.next(value);
            }
        };
        SerSelectComponent.prototype.filterGroupedList = function () {
            var _this = this;
            if (this.filter === '' || this.filter == null) {
                this.clearSearch();
                return;
            }
            this.groupedData = this.cloneArray(this.groupCachedItems);
            this.groupedData = this.groupedData.filter(function (obj) {
                var arr = [];
                if (obj[_this.settings.labelKey].toLowerCase().indexOf(_this.filter.toLowerCase()) > -1) {
                    arr = obj.list;
                }
                else {
                    arr = obj.list.filter(function (t) {
                        return t[_this.settings.labelKey].toLowerCase().indexOf(_this.filter.toLowerCase()) > -1;
                    });
                }
                obj.list = arr;
                if (obj[_this.settings.labelKey].toLowerCase().indexOf(_this.filter.toLowerCase()) > -1) {
                    return arr;
                }
                else {
                    return arr.some(function (cat) {
                        return cat[_this.settings.labelKey].toLowerCase().indexOf(_this.filter.toLowerCase()) > -1;
                    });
                }
            });
        };
        SerSelectComponent.prototype.toggleFilterSelectAll = function () {
            var _this = this;
            if (!this.isFilterSelectAll) {
                var added_1 = [];
                if (this.settings.groupBy) {
                    /*                 this.groupedData.forEach((item: any) => {
                                        if (item.list) {
                                            item.list.forEach((el: any) => {
                                                if (!this.isSelected(el)) {
                                                    this.addSelected(el);
                                                    added.push(el);
                                                }
                                            });
                                        }
                                        this.updateGroupInfo(item);

                                    }); */
                    this.ds.getFilteredData().forEach(function (el) {
                        if (!_this.isSelected(el) && !el.hasOwnProperty('grpTitle')) {
                            _this.addSelected(el);
                            added_1.push(el);
                        }
                    });
                }
                else {
                    this.ds.getFilteredData().forEach(function (item) {
                        if (!_this.isSelected(item)) {
                            _this.addSelected(item);
                            added_1.push(item);
                        }
                    });
                }
                this.isFilterSelectAll = true;
                this.onFilterSelectAll.emit(added_1);
            }
            else {
                var removed_1 = [];
                if (this.settings.groupBy) {
                    /*                 this.groupedData.forEach((item: any) => {
                                        if (item.list) {
                                            item.list.forEach((el: any) => {
                                                if (this.isSelected(el)) {
                                                    this.removeSelected(el);
                                                    removed.push(el);
                                                }
                                            });
                                        }
                                    }); */
                    this.ds.getFilteredData().forEach(function (el) {
                        if (_this.isSelected(el)) {
                            _this.removeSelected(el);
                            removed_1.push(el);
                        }
                    });
                }
                else {
                    this.ds.getFilteredData().forEach(function (item) {
                        if (_this.isSelected(item)) {
                            _this.removeSelected(item);
                            removed_1.push(item);
                        }
                    });
                }
                this.isFilterSelectAll = false;
                this.onFilterDeSelectAll.emit(removed_1);
            }
        };
        SerSelectComponent.prototype.toggleInfiniteFilterSelectAll = function () {
            var _this = this;
            if (!this.isInfiniteFilterSelectAll) {
                this.virtualdata.forEach(function (item) {
                    if (!_this.isSelected(item)) {
                        _this.addSelected(item);
                    }
                });
                this.isInfiniteFilterSelectAll = true;
            }
            else {
                this.virtualdata.forEach(function (item) {
                    if (_this.isSelected(item)) {
                        _this.removeSelected(item);
                    }
                });
                this.isInfiniteFilterSelectAll = false;
            }
        };
        SerSelectComponent.prototype.clearSearch = function () {
            var _this = this;
            this.filter = '';
            if (this.settings.lazyLoading) {
                this.isInfiniteFilterSelectAll = false;
                this.virtualdata = [];
                this.virtualdata = this.cachedItems;
                this.groupedData = this.groupCachedItems;
                this.infiniteFilterLength = 0;
            }
            else {
                if (this.settings.groupBy) {
                    this.groupedData = [];
                    this.groupedData = this.cloneArray(this.groupCachedItems);
                }
                this.isFilterSelectAll = false;
            }
            setTimeout(function () {
                var _a;
                (_a = _this.searchInput) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
            }, 0);
        };
        SerSelectComponent.prototype.onFilterChange = function (data) {
            var _this = this;
            if (this.filter && this.filter === '' || data.length === 0) {
                this.isFilterSelectAll = false;
            }
            var cnt = 0;
            data.forEach(function (item) {
                if (!item.hasOwnProperty('grpTitle') && _this.isSelected(item)) {
                    cnt++;
                }
            });
            if (cnt > 0 && this.filterLength === cnt) {
                this.isFilterSelectAll = true;
            }
            else if (cnt > 0 && this.filterLength !== cnt) {
                this.isFilterSelectAll = false;
            }
            this.cdr.detectChanges();
        };
        SerSelectComponent.prototype.cloneArray = function (arr) {
            if (Array.isArray(arr)) {
                return JSON.parse(JSON.stringify(arr));
            }
            else if (typeof arr === 'object') {
                throw 'Cannot clone array containing an object!';
            }
            else {
                return arr;
            }
        };
        SerSelectComponent.prototype.updateGroupInfo = function (item) {
            var _this = this;
            if (item[this.settings.disabledKey]) {
                return false;
            }
            var key = this.settings.groupBy;
            this.groupedData.forEach(function (obj) {
                var cnt = 0;
                if (obj.grpTitle && (item[key] === obj[key])) {
                    if (obj.list) {
                        obj.list.forEach(function (el) {
                            if (_this.isSelected(el)) {
                                cnt++;
                            }
                        });
                    }
                }
                if (obj.list && (cnt === obj.list.length) && (item[key] === obj[key])) {
                    obj.selected = true;
                }
                else if (obj.list && (cnt !== obj.list.length) && (item[key] === obj[key])) {
                    obj.selected = false;
                }
            });
            this.groupCachedItems.forEach(function (obj) {
                var cnt = 0;
                if (obj.grpTitle && (item[key] === obj[key])) {
                    if (obj.list) {
                        obj.list.forEach(function (el) {
                            if (_this.isSelected(el)) {
                                cnt++;
                            }
                        });
                    }
                }
                if (obj.list && (cnt === obj.list.length) && (item[key] === obj[key])) {
                    obj.selected = true;
                }
                else if (obj.list && (cnt !== obj.list.length) && (item[key] === obj[key])) {
                    obj.selected = false;
                }
            });
        };
        SerSelectComponent.prototype.transformData = function (arr, field) {
            var _this = this;
            var groupedObj = arr.reduce(function (prev, cur) {
                if (!prev[cur[field]]) {
                    prev[cur[field]] = [cur];
                }
                else {
                    prev[cur[field]].push(cur);
                }
                return prev;
            }, {});
            var tempArr = [];
            Object.keys(groupedObj).map(function (x) {
                var obj = {};
                var disabledChildrens = [];
                obj.grpTitle = true;
                obj[_this.settings.labelKey] = x;
                obj[_this.settings.groupBy] = x;
                obj.selected = false;
                obj.list = [];
                var cnt = 0;
                groupedObj[x].forEach(function (item) {
                    item.list = [];
                    if (item[_this.settings.disabledKey]) {
                        _this.isDisabledItemPresent = true;
                        disabledChildrens.push(item);
                    }
                    obj.list.push(item);
                    if (_this.isSelected(item)) {
                        cnt++;
                    }
                });
                if (cnt === obj.list.length) {
                    obj.selected = true;
                }
                else {
                    obj.selected = false;
                }
                // Check if current group item's all childrens are disabled or not
                obj[_this.settings.disabledKey] = disabledChildrens.length === groupedObj[x].length;
                tempArr.push(obj);
                // obj.list.forEach((item: any) => {
                //     tempArr.push(item);
                // });
            });
            return tempArr;
        };
        SerSelectComponent.prototype.filterInfiniteList = function (evt) {
            var _this = this;
            var filteredElems = [];
            if (this.settings.groupBy) {
                this.groupedData = this.groupCachedItems.slice();
            }
            else {
                this.data = this.cachedItems.slice();
                this.virtualdata = this.cachedItems.slice();
            }
            if ((evt != null || evt !== '') && !this.settings.groupBy) {
                if (this.settings.searchBy.length > 0) {
                    var _loop_1 = function (t) {
                        this_1.virtualdata.filter(function (el) {
                            if (el[_this.settings.searchBy[t].toString()].toString().toLowerCase().indexOf(evt.toString().toLowerCase()) >= 0) {
                                filteredElems.push(el);
                            }
                        });
                    };
                    var this_1 = this;
                    for (var t = 0; t < this.settings.searchBy.length; t++) {
                        _loop_1(t);
                    }
                }
                else {
                    this.virtualdata.filter(function (el) {
                        for (var prop in el) {
                            if (el[prop].toString().toLowerCase().indexOf(evt.toString().toLowerCase()) >= 0) {
                                filteredElems.push(el);
                                break;
                            }
                        }
                    });
                }
                this.virtualdata = [];
                this.virtualdata = filteredElems;
                this.infiniteFilterLength = this.virtualdata.length;
            }
            if (evt.toString() !== '' && this.settings.groupBy) {
                this.groupedData.filter(function (el) {
                    if (el.hasOwnProperty('grpTitle')) {
                        filteredElems.push(el);
                    }
                    else {
                        for (var prop in el) {
                            if (el[prop].toString().toLowerCase().indexOf(evt.toString().toLowerCase()) >= 0) {
                                filteredElems.push(el);
                                break;
                            }
                        }
                    }
                });
                this.groupedData = [];
                this.groupedData = filteredElems;
                this.infiniteFilterLength = this.groupedData.length;
            }
            else if (evt.toString() === '' && this.cachedItems.length > 0) {
                this.virtualdata = [];
                this.virtualdata = this.cachedItems;
                this.infiniteFilterLength = 0;
            }
            this.virtualScroller.refresh();
        };
        SerSelectComponent.prototype.onScrollEnd = function (e) {
            if (e.endIndex === this.data.length - 1 || e.startIndex === 0) {
            }
            this.onScrollToEnd.emit(e);
        };
        SerSelectComponent.prototype.selectGroup = function (item) {
            var _this = this;
            if (item[this.settings.disabledKey]) {
                return false;
            }
            if (item.selected) {
                item.selected = false;
                item.list.forEach(function (obj) {
                    _this.removeSelected(obj);
                });
                this.onGroupDeSelect.emit(item);
                this.updateGroupInfo(item);
            }
            else {
                item.selected = true;
                item.list.forEach(function (obj) {
                    if (!_this.isSelected(obj)) {
                        _this.addSelected(obj);
                    }
                });
                this.onGroupSelect.emit(item);
                this.updateGroupInfo(item);
            }
        };
        SerSelectComponent.prototype.addFilterNewItem = function () {
            this.onAddFilterNewItem.emit(this.filter);
            this.filterPipe = new SerSelectListFilterPipe(this.ds);
            this.filterPipe.transform(this.data, this.filter, this.settings.searchBy);
        };
        SerSelectComponent.prototype.clearSelection = function (e) {
            if (this.settings.groupBy) {
                this.groupCachedItems.forEach(function (obj) {
                    obj.selected = false;
                });
            }
            this.clearSearch();
            this.selectedItems = [];
            this.isSelectAll = false;
            if (this.settings.singleSelection) {
                this.onChangeCallback(null);
                this.onTouchedCallback(null);
            }
            else {
                this.onChangeCallback(this.selectedItems);
                this.onTouchedCallback(this.selectedItems);
            }
            this.onDeSelectAll.emit(this.selectedItems);
            e.stopPropagation();
        };
        SerSelectComponent.prototype.getItemContext = function (item) {
            return item;
        };
        SerSelectComponent.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.dropdownSubs.forEach(function (s) {
                s.unsubscribe();
            });
        };
        var SerSelectComponent_1;
        SerSelectComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: DataService },
            { type: core.Renderer2 },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Attribute, args: ['multiple',] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Attribute, args: ['simple',] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Attribute, args: ['primaryKey',] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Attribute, args: ['labelKey',] }] }
        ]; };
        __decorate([
            core.Input()
        ], SerSelectComponent.prototype, "data", void 0);
        __decorate([
            core.Input()
        ], SerSelectComponent.prototype, "settings", void 0);
        __decorate([
            core.Input()
        ], SerSelectComponent.prototype, "loading", void 0);
        __decorate([
            core.Input()
        ], SerSelectComponent.prototype, "multiple", void 0);
        __decorate([
            core.Output('onSelect')
        ], SerSelectComponent.prototype, "onSelect", void 0);
        __decorate([
            core.Output('onDeSelect')
        ], SerSelectComponent.prototype, "onDeSelect", void 0);
        __decorate([
            core.Output('onSelectAll')
        ], SerSelectComponent.prototype, "onSelectAll", void 0);
        __decorate([
            core.Output('onDeSelectAll')
        ], SerSelectComponent.prototype, "onDeSelectAll", void 0);
        __decorate([
            core.Output('onOpen')
        ], SerSelectComponent.prototype, "onOpen", void 0);
        __decorate([
            core.Output('onClose')
        ], SerSelectComponent.prototype, "onClose", void 0);
        __decorate([
            core.Output('onScrollToEnd')
        ], SerSelectComponent.prototype, "onScrollToEnd", void 0);
        __decorate([
            core.Output('onFilterSelectAll')
        ], SerSelectComponent.prototype, "onFilterSelectAll", void 0);
        __decorate([
            core.Output('onFilterDeSelectAll')
        ], SerSelectComponent.prototype, "onFilterDeSelectAll", void 0);
        __decorate([
            core.Output('onAddFilterNewItem')
        ], SerSelectComponent.prototype, "onAddFilterNewItem", void 0);
        __decorate([
            core.Output('onGroupSelect')
        ], SerSelectComponent.prototype, "onGroupSelect", void 0);
        __decorate([
            core.Output('onGroupDeSelect')
        ], SerSelectComponent.prototype, "onGroupDeSelect", void 0);
        __decorate([
            core.ContentChild(SDItemDirective, { static: true })
        ], SerSelectComponent.prototype, "itemTempl", void 0);
        __decorate([
            core.ContentChild(SDBadgeDirective, { static: true })
        ], SerSelectComponent.prototype, "badgeTempl", void 0);
        __decorate([
            core.ContentChild(SDSearchDirective, { static: true })
        ], SerSelectComponent.prototype, "searchTempl", void 0);
        __decorate([
            core.ViewChild('searchInput')
        ], SerSelectComponent.prototype, "searchInput", void 0);
        __decorate([
            core.ViewChild('selectedList')
        ], SerSelectComponent.prototype, "selectedListElem", void 0);
        __decorate([
            core.ViewChild('dropdownList')
        ], SerSelectComponent.prototype, "dropdownListElem", void 0);
        __decorate([
            core.HostBinding('class.disabled')
        ], SerSelectComponent.prototype, "isDisabled", void 0);
        __decorate([
            core.HostBinding('class.active')
        ], SerSelectComponent.prototype, "isActive", void 0);
        __decorate([
            core.HostBinding('class.multiple')
        ], SerSelectComponent.prototype, "multipleClass", void 0);
        __decorate([
            core.ViewChild(VirtualScrollerComponent, { static: false })
        ], SerSelectComponent.prototype, "virtualScroller", void 0);
        SerSelectComponent = SerSelectComponent_1 = __decorate([
            core.Component({
                selector: 'ser-select',
                template: "<div class=\"selected-list\" #selectedList (click)=\"toggleDropdown($event)\" [attr.tabindex]=\"0\">\r\n\r\n    <div class=\"values\">\r\n\r\n        <ng-container *ngIf=\"settings.singleSelection && hasValue(selectedItems)\">\r\n\r\n            <ng-container *ngIf=\"!hasValue(badgeTempl)\">\r\n                {{ selectedItems[0][settings.labelKey] }}\r\n            </ng-container>\r\n\r\n            <ng-container *ngIf=\"hasValue(badgeTempl)\">\r\n                <ng-container *ngTemplateOutlet=\"badgeTempl.template; context:{item: selectedItems[0]}\"></ng-container>\r\n            </ng-container>\r\n\r\n        </ng-container>\r\n\r\n        <ng-container *ngIf=\"!settings.singleSelection && hasValue(selectedItems)\">\r\n\r\n            <div class=\"token-list\">\r\n                <ng-container *ngFor=\"let item of selectedItems;trackBy: trackByFn.bind(this);let k = index\">\r\n\r\n                    <div *ngIf=\"k < (settings.badgeShowLimit - 1)\" class=\"token\">\r\n                        <span *ngIf=\"!hasValue(badgeTempl)\" class=\"label\">{{ item[settings.labelKey] }}</span>\r\n                        <span *ngIf=\"hasValue(badgeTempl)\" class=\"label\">\r\n                            <ng-container *ngTemplateOutlet=\"badgeTempl.template; context:{item: item}\"></ng-container>\r\n                        </span>\r\n\r\n                        <span class=\"remove\" (click)=\"onItemClick(item, k, $event);$event.stopPropagation()\">\r\n                            <span class=\"material-icons\">close</span>\r\n                        </span>\r\n                    </div>\r\n\r\n                </ng-container>\r\n            </div>\r\n\r\n        </ng-container>\r\n    </div>\r\n\r\n    <div class=\"controls\">\r\n        <span class=\"countplaceholder\" *ngIf=\"selectedItems?.length > settings.badgeShowLimit\">+{{ selectedItems?.length - settings.badgeShowLimit }}</span>\r\n\r\n        <button type=\"button\" *ngIf=\"settings.clearAll && !isDisabled && selectedItems?.length > 0\" class=\"clear-all\" (click)=\"clearSelection($event);\">\r\n            <span class=\"material-icons\">close</span>\r\n        </button>\r\n\r\n        <span class=\"material-icons chevron\" [ngClass]=\"{'rotate': isActive}\">keyboard_arrow_down</span>\r\n    </div>\r\n</div>\r\n\r\n<div #dropdownList class=\"dropdown-list\" [ngClass]=\"{'single-select-mode': settings.singleSelection }\">\r\n    <div class=\"pure-checkbox select-all\" *ngIf=\"settings.enableCheckAll && !settings.singleSelection && !settings.limitSelection && data?.length > 0 && !isDisabledItemPresent\" (click)=\"toggleSelectAll()\">\r\n\r\n        <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelectAll\" [disabled]=\"settings.limitSelection == selectedItems?.length\" id=\"selectAll\"/>\r\n\r\n        <label for=\"selectAll\">\r\n            <span [hidden]=\"isSelectAll\">{{ settings.selectAllText }}</span>\r\n            <span [hidden]=\"!isSelectAll\">{{ settings.unSelectAllText }}</span>\r\n        </label>\r\n    </div>\r\n\r\n    <img class=\"loading-icon\" *ngIf=\"loading\" src=\"assets/img/loading.gif\" />\r\n\r\n    <div class=\"list-filter\" *ngIf=\"settings.enableSearchFilter && hasValue(data)\">\r\n\r\n        <span class=\"material-icons icon-search\">search</span>\r\n\r\n        <ng-content *ngIf=\"searchTempl then searchTemplate;else searchDefault\"></ng-content>\r\n\r\n        <ng-template #searchTemplate>\r\n            <ng-container *ngTemplateOutlet=\"searchTempl.template; context:{item: item}\"></ng-container>\r\n        </ng-template>\r\n\r\n        <ng-template #searchDefault>\r\n            <input #searchInput class=\"c-input not-styled\" type=\"text\" [placeholder]=\"settings.searchPlaceholderText\" [(ngModel)]=\"filter\" (keyup)=\"filterFn($event.target.value)\">\r\n        </ng-template>\r\n\r\n\r\n        <span [hidden]=\"!hasValue(filter)\" (click)=\"clearSearch()\" class=\"material-icons icon-clear\">cancel</span>\r\n\r\n    </div>\r\n\r\n    <div class=\"filter-select-all\" *ngIf=\"!settings.lazyLoading && settings.enableFilterSelectAll && !isDisabledItemPresent\">\r\n\r\n        <div class=\"pure-checkbox select-all\" *ngIf=\"!settings.groupBy && filter?.length > 0 && filterLength > 0\" (click)=\"toggleFilterSelectAll()\">\r\n            <input type=\"checkbox\" [checked]=\"isFilterSelectAll\" [disabled]=\"settings.limitSelection == selectedItems?.length\" aria-labelledby=\"optionName\" />\r\n            <label>\r\n                <span [hidden]=\"isFilterSelectAll\">{{settings.filterSelectAllText}}</span>\r\n                <span [hidden]=\"!isFilterSelectAll\">{{settings.filterUnSelectAllText}}</span>\r\n            </label>\r\n        </div>\r\n\r\n        <div class=\"pure-checkbox select-all\" *ngIf=\"settings.groupBy && filter?.length > 0 && groupedData?.length > 0\" (click)=\"toggleFilterSelectAll()\">\r\n            <input type=\"checkbox\" [checked]=\"isFilterSelectAll && filter?.length > 0\" [disabled]=\"settings.limitSelection == selectedItems?.length\" />\r\n            <label>\r\n                <span [hidden]=\"isFilterSelectAll\">{{settings.filterSelectAllText}}</span>\r\n                <span [hidden]=\"!isFilterSelectAll\">{{settings.filterUnSelectAllText}}</span>\r\n            </label>\r\n        </div>\r\n\r\n        <!-- <label class=\"nodata-label\" *ngIf=\"!settings.groupBy && filterLength == 0\" [hidden]=\"filter == undefined || filter?.length == 0\">{{settings.noDataLabel}}</label>\r\n        <label class=\"nodata-label\" *ngIf=\"settings.groupBy && groupedData?.length == 0\" [hidden]=\"filter == undefined || filter?.length == 0\">{{settings.noDataLabel}}</label> -->\r\n\r\n        <div class=\"btn-container\" *ngIf=\"settings.addNewItemOnFilter && filterLength == 0\" [hidden]=\"filter == undefined || filter?.length == 0\">\r\n            <button class=\"d-btn btn-iceblue\" (click)=\"addFilterNewItem()\">{{settings.addNewButtonText}}</button>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"filter-select-all\" *ngIf=\"settings.lazyLoading && settings.enableFilterSelectAll && !isDisabledItemPresent\">\r\n        <div class=\"pure-checkbox select-all\" *ngIf=\"filter?.length > 0 && infiniteFilterLength > 0\" (click)=\"toggleInfiniteFilterSelectAll()\">\r\n            <input type=\"checkbox\" [checked]=\"isInfiniteFilterSelectAll\" [disabled]=\"settings.limitSelection == selectedItems?.length\" />\r\n            <label>\r\n                <span [hidden]=\"isInfiniteFilterSelectAll\">{{ settings.filterSelectAllText }}</span>\r\n                <span [hidden]=\"!isInfiniteFilterSelectAll\">{{ settings.filterUnSelectAllText }}</span>\r\n            </label>\r\n        </div>\r\n    </div>\r\n\r\n    <div *ngIf=\"!settings.groupBy && !settings.lazyLoading && !hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul class=\"lazyContainer\">\r\n            <li *ngFor=\"let item of data | serSelectListFilter:filter : settings.searchBy; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) }\">\r\n                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                <label>{{ item[settings.labelKey] }}</label>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"!settings.groupBy && settings.lazyLoading && !hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul virtualScroller #scroll [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\" (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\" class=\"lazyContainer\">\r\n            <li *ngFor=\"let item of scroll.viewPortItems; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) }\">\r\n                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                <label>{{item[settings.labelKey]}}</label>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"!settings.groupBy && !settings.lazyLoading && hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul class=\"lazyContainer\">\r\n            <li *ngFor=\"let item of data | serSelectListFilter:filter : settings.searchBy; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) }\">\r\n                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                <label></label>\r\n                <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: item}\"></ng-container>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"!settings.groupBy && settings.lazyLoading && hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul virtualScroller #scroll2 [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\"\r\n            (vsEnd)=\"onScrollEnd($event)\" class=\"lazyContainer\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\">\r\n            <li *ngFor=\"let item of scroll2.viewPortItems; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) }\">\r\n                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\"  />\r\n                <label></label>\r\n                <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: item}\"></ng-container>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"settings.groupBy && settings.lazyLoading && hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul virtualScroller #scroll3 [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\" (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\" class=\"lazyContainer\">\r\n            <span *ngFor=\"let item of scroll3.viewPortItems; let i = index;\">\r\n                <li (click)=\"onItemClick(item,i,$event)\" *ngIf=\"!item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\"\r\n                    class=\"pure-checkbox\">\r\n                    <input *ngIf=\"settings.showCheckbox && !settings.singleSelection\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                    <label></label>\r\n                    <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: item}\"></ng-container>\r\n                </li>\r\n                <li *ngIf=\"item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\"\r\n                    class=\"pure-checkbox\">\r\n                    <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                    <label></label>\r\n                    <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: item}\"></ng-container>\r\n                </li>\r\n            </span>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"settings.groupBy && !settings.lazyLoading && hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\"  style=\"overflow: auto;\">\r\n        <ul class=\"lazyContainer\">\r\n            <span *ngFor=\"let item of groupedData; let i = index;\">\r\n                <li (click)=\"selectGroup(item)\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\" class=\"pure-checkbox\">\r\n                    <input *ngIf=\"settings.showCheckbox && !settings.singleSelection\" type=\"checkbox\" [checked]=\"item.selected\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                    <label>{{item[settings.labelKey]}}</label>\r\n                    <ul class=\"lazyContainer\">\r\n                        <span *ngFor=\"let val of item.list ; let j = index;\">\r\n                            <li (click)=\"onItemClick(val,j,$event); $event.stopPropagation()\" [ngClass]=\"{'grp-title': val.grpTitle,'grp-item': !val.grpTitle && !settings.singleSelection}\"\r\n                                class=\"pure-checkbox\">\r\n                                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(val)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(val)) || val[settings.disabledKey]\"\r\n                                />\r\n                                <label></label>\r\n                                <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: val}\"></ng-container>\r\n                            </li>\r\n                        </span>\r\n                    </ul>\r\n\r\n                </li>\r\n            </span>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"settings.groupBy && settings.lazyLoading && !hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <virtual-scroller [items]=\"groupedData\" (vsUpdate)=\"viewPortItems = $event\" (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\">\r\n            <ul virtualScroller #scroll4 [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\"\r\n                (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\" class=\"lazyContainer\">\r\n                <span *ngFor=\"let item of scroll4.viewPortItems; let i = index;\">\r\n                    <li *ngIf=\"item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection, 'selected-item': isSelected(item) }\"\r\n                        class=\"pure-checkbox\">\r\n                        <input *ngIf=\"settings.showCheckbox && !item.grpTitle && !settings.singleSelection\" type=\"checkbox\" [checked]=\"isSelected(item)\"\r\n                            [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                        <label>{{item[settings.labelKey]}}</label>\r\n                    </li>\r\n                    <li (click)=\"onItemClick(item,i,$event)\" *ngIf=\"!item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection, 'selected-item': isSelected(item) }\"\r\n                        class=\"pure-checkbox\">\r\n                        <input *ngIf=\"settings.showCheckbox && !item.grpTitle\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\"\r\n                        />\r\n                        <label>{{item[settings.labelKey]}}</label>\r\n                    </li>\r\n                </span>\r\n            </ul>\r\n        </virtual-scroller>\r\n    </div>\r\n\r\n    <div *ngIf=\"settings.groupBy && !settings.lazyLoading && !hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul class=\"lazyContainer\">\r\n            <span *ngFor=\"let item of groupedData ; let i = index;\">\r\n                <li (click)=\"selectGroup(item)\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\" class=\"pure-checkbox\">\r\n                    <input *ngIf=\"settings.showCheckbox && !settings.singleSelection\" type=\"checkbox\" [checked]=\"item.selected\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                    <label>{{ item[settings.labelKey] }}</label>\r\n                    <ul class=\"lazyContainer\">\r\n                        <span *ngFor=\"let val of item.list ; let j = index;\">\r\n                            <li (click)=\"onItemClick(val,j,$event); $event.stopPropagation()\" [ngClass]=\"{'selected-item': isSelected(val) == true,'grp-title': val.grpTitle,'grp-item': !val.grpTitle && !settings.singleSelection}\" class=\"pure-checkbox\">\r\n                                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(val)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(val)) || val[settings.disabledKey]\" />\r\n                                <label>{{val[settings.labelKey]}}</label>\r\n                            </li>\r\n                        </span>\r\n                    </ul>\r\n                </li>\r\n            </span>\r\n            <!-- <span *ngFor=\"let item of groupedData ; let i = index;\">\r\n            <li (click)=\"onItemClick(item,i,$event)\" *ngIf=\"!item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}\" class=\"pure-checkbox\">\r\n            <input *ngIf=\"settings.showCheckbox && !item.grpTitle\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"settings.limitSelection == selectedItems?.length && !isSelected(item)\"\r\n            />\r\n            <label>{{item[settings.labelKey]}}</label>\r\n        </li>\r\n        <li *ngIf=\"item.grpTitle && !settings.selectGroup\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}\" class=\"pure-checkbox\">\r\n            <input *ngIf=\"settings.showCheckbox && settings.selectGroup\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"settings.limitSelection == selectedItems?.length && !isSelected(item)\"\r\n            />\r\n            <label>{{item[settings.labelKey]}}</label>\r\n        </li>\r\n         <li  (click)=\"selectGroup(item)\" *ngIf=\"item.grpTitle && settings.selectGroup\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}\" class=\"pure-checkbox\">\r\n            <input *ngIf=\"settings.showCheckbox && settings.selectGroup\" type=\"checkbox\" [checked]=\"item.selected\" [disabled]=\"settings.limitSelection == selectedItems?.length && !isSelected(item)\"\r\n            />\r\n            <label>{{item[settings.labelKey]}}</label>\r\n        </li>\r\n        </span> -->\r\n        </ul>\r\n    </div>\r\n\r\n    <h5 class=\"list-message\" *ngIf=\"!hasValue(data)\">{{ settings.noDataLabel }}</h5>\r\n\r\n</div>\r\n",
                host: { '[class]': 'defaultSettings.classes' },
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return SerSelectComponent_1; }),
                        multi: true
                    },
                    {
                        provide: forms.NG_VALIDATORS,
                        useExisting: core.forwardRef(function () { return SerSelectComponent_1; }),
                        multi: true,
                    }
                ],
                encapsulation: core.ViewEncapsulation.None
            }),
            __param(4, core.Optional()), __param(4, core.Attribute('multiple')),
            __param(5, core.Optional()), __param(5, core.Attribute('simple')), __param(6, core.Optional()), __param(6, core.Attribute('primaryKey')), __param(7, core.Optional()), __param(7, core.Attribute('labelKey'))
        ], SerSelectComponent);
        return SerSelectComponent;
    }());

    // tslint:disable: max-line-length
    var dependencies = [
        SerSelectComponent,
        SerSelectListFilterPipe,
        SDItemDirective,
        SDBadgeDirective,
        SDSearchDirective
    ];
    var SerSelectModule = /** @class */ (function () {
        function SerSelectModule() {
        }
        SerSelectModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, platformBrowser.BrowserModule, forms.FormsModule, VirtualScrollerModule],
                declarations: __spread(dependencies),
                exports: __spread(dependencies),
                providers: [DataService]
            })
        ], SerSelectModule);
        return SerSelectModule;
    }());

    var AddressColComponent = /** @class */ (function () {
        function AddressColComponent(_fb, _renderer, _elementRef) {
            this._fb = _fb;
            this._renderer = _renderer;
            this._elementRef = _elementRef;
            this.class = true;
            this.modelForm = this._fb.group({
                via: ['', [forms.Validators.required]],
                address1: ['', [forms.Validators.required, forms.Validators.maxLength(50)]],
                address2: ['', forms.Validators.maxLength(50)],
                address3: ['', forms.Validators.maxLength(50)]
            });
            // tslint:disable-next-line: max-line-length
            this.viaOptionsSubs = [];
            this.viaRegex = /^Autopista|Avenida Calle|Avenida Carrera|Avenida|Calle|Carrera|Circunvalar|Circular|Diagonal|Kilometro|Manzana|Transversal$/i;
            this.viaOptions = [
                'Autopista', 'Avenida', 'Avenida Calle', 'Avenida Carrera', 'Calle', 'Carrera', 'Circunvalar', 'Circular', 'Diagonal', 'Kilometro', 'Manzana', 'Transversal', 'Via'
            ];
            this.viaOptionsOriginal = [
                'Autopista', 'Avenida', 'Avenida Calle', 'Avenida Carrera', 'Calle', 'Carrera', 'Circunvalar', 'Circular', 'Diagonal', 'Kilometro', 'Manzana', 'Transversal', 'Via'
            ];
        }
        AddressColComponent_1 = AddressColComponent;
        AddressColComponent.prototype.writeValue = function (obj) {
            var _this = this;
            if (hasValue(obj)) {
                var address1 = void 0;
                var address2 = void 0;
                var address3 = void 0;
                obj = obj.trim().replace(/\s+/g, ' ');
                if (/(\s?-\s?)+/.test(obj)) {
                    address3 = obj.split(/(\s?-\s?)+/);
                    this.modelForm.get('address3').setValue(address3[address3.length - 1].trim().split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' '));
                    address2 = address3[0].trim();
                }
                else {
                    address2 = obj;
                }
                if (/(\s?[#]\s?)+/.test(address2)) {
                    address2 = address2.split(/(\s?[#]\s?)+/);
                    this.modelForm.get('address2').setValue(address2[address2.length - 1].trim().split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' '));
                    address1 = address2[0].trim();
                }
                else {
                    address1 = obj;
                }
                if (this.viaRegex.test(address1)) {
                    address1 = address1.split(this.viaRegex);
                    this.modelForm.get('address1').setValue(address1[address1.length - 1].trim().split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' '));
                    setTimeout(function () {
                        _this.setVia(_this.viaRegex.exec(obj)[0].split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' '));
                    });
                }
            }
        };
        AddressColComponent.prototype.generateValue = function () {
            var _a, _b, _c;
            var address = this.modelForm.get('via').value + ' ' + ((_a = this.modelForm.get('address1').value) === null || _a === void 0 ? void 0 : _a.trim().split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' ')) +
                ' # ' + ((_b = this.modelForm.get('address2').value) === null || _b === void 0 ? void 0 : _b.trim().split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' ')) +
                ' - ' + ((_c = this.modelForm.get('address3').value) === null || _c === void 0 ? void 0 : _c.trim().split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' '));
            return address;
        };
        AddressColComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        AddressColComponent.prototype.onChange = function (_) { };
        AddressColComponent.prototype.registerOnTouched = function (fn) {
            this.onTouch = fn;
        };
        AddressColComponent.prototype.onTouch = function () { };
        AddressColComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.modelSub = this.modelForm.valueChanges.subscribe(function () {
                if (_this.modelForm.valid) {
                    _this.onChange(_this.generateValue());
                }
                else {
                    _this.onChange(null);
                }
            });
        };
        AddressColComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this._renderer.removeChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);
            setTimeout(function () {
                if (!hasValue(_this.viaElHint.nativeElement.value)) {
                    _this.viaElHint.nativeElement.value = 'Calle';
                }
            });
        };
        AddressColComponent.prototype.openViaOptions = function () {
            var _this = this;
            this.viaOptionsSubs.push(rxjs.fromEvent(window, 'click')
                .pipe(operators.filter(function (e) { return !_this.viaElCont.nativeElement.contains(e.target); }))
                .subscribe(function () {
                _this.setVia(_this.viaOptions[0]);
            }));
            this.viaOptionsSubs.push(rxjs.fromEvent(window, 'keyup')
                .pipe(operators.filter(function (e) { return inArray(e.key.toLowerCase(), ['arrowright', 'escape', 'enter']); }))
                .subscribe(function () {
                _this.setVia(_this.viaOptions[0]);
            }));
            this.filterViaOptions(this.modelForm.get('via').value);
            this.setPositionDropdown();
            this._renderer.appendChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);
        };
        AddressColComponent.prototype.closeDropdown = function () {
            this.viaOptionsSubs.forEach(function (s) { return s.unsubscribe(); });
            this.viaOptionsSubs = [];
            this._renderer.removeChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);
            this.address1.nativeElement.focus();
        };
        AddressColComponent.prototype.setPositionDropdown = function () {
            var _this = this;
            setTimeout(function () {
                var dropdown = _this.viaOptionsEl.nativeElement;
                var el = _this.viaEl.nativeElement;
                var remainingHeight = document.documentElement.offsetHeight - (dropdown.offsetHeight + el.getBoundingClientRect().top + el.offsetHeight);
                _this._renderer.setStyle(dropdown, 'left', (el.getBoundingClientRect().left - 6) + 'px');
                if (remainingHeight > 0) {
                    _this._renderer.removeClass(el, 'ontop');
                    _this._renderer.removeClass(dropdown, 'ontop');
                    _this._elementRef.nativeElement.style.removeProperty('bottom');
                    _this._renderer.setStyle(dropdown, 'top', el.getBoundingClientRect().bottom + 'px');
                }
                else {
                    _this._renderer.addClass(el, 'ontop');
                    _this._renderer.addClass(dropdown, 'ontop');
                    _this._elementRef.nativeElement.style.removeProperty('top');
                    _this._renderer.setStyle(dropdown, 'bottom', (document.documentElement.offsetHeight - el.getBoundingClientRect().top) + 'px');
                }
            });
        };
        AddressColComponent.prototype.filterViaOptions = function (value) {
            var _this = this;
            var _a;
            if (hasValue(value)) {
                this.viaOptions = this.viaOptionsOriginal.filter(function (it) { var _a; return it.slice(0, value.length).toLowerCase() === ((_a = value) === null || _a === void 0 ? void 0 : _a.toLowerCase()); });
                if (hasValue(this.viaOptions)) {
                    this.viaElHint.nativeElement.value = this.viaOptions[0];
                    this.viaEl.nativeElement.value = (_a = this.viaEl.nativeElement.value) === null || _a === void 0 ? void 0 : _a.split(' ').map(function (val) { return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(); }).join(' ');
                }
                else {
                    this.viaElHint.nativeElement.value = '';
                }
                setTimeout(function () {
                    _this.setPositionDropdown();
                });
            }
            else {
                this.viaOptions = this.viaOptionsOriginal;
            }
        };
        AddressColComponent.prototype.viaBlur = function () {
            if (!hasValue(this.modelForm.get('via').value)) {
                this.setVia(this.viaOptions[0]);
            }
        };
        AddressColComponent.prototype.setVia = function (value) {
            if (hasValue(value)) {
                this.modelForm.get('via').setValue(value);
                this.viaEl.nativeElement.value = value;
                this.viaElHint.nativeElement.value = value;
            }
            else {
                this.viaEl.nativeElement.value = '';
                this.viaElHint.nativeElement.value = '';
            }
            this.closeDropdown();
        };
        AddressColComponent.prototype.ngOnDestroy = function () {
            var _a;
            this.modelSub.unsubscribe();
            (_a = this.viaOptionsSubs) === null || _a === void 0 ? void 0 : _a.forEach(function (s) { var _a; return (_a = s) === null || _a === void 0 ? void 0 : _a.unsubscribe(); });
        };
        var AddressColComponent_1;
        AddressColComponent.ctorParameters = function () { return [
            { type: forms.FormBuilder },
            { type: core.Renderer2 },
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.HostBinding('class.address-input')
        ], AddressColComponent.prototype, "class", void 0);
        __decorate([
            core.ViewChild('viaOptionsEl')
        ], AddressColComponent.prototype, "viaOptionsEl", void 0);
        __decorate([
            core.ViewChild('viaElCont')
        ], AddressColComponent.prototype, "viaElCont", void 0);
        __decorate([
            core.ViewChild('viaEl')
        ], AddressColComponent.prototype, "viaEl", void 0);
        __decorate([
            core.ViewChild('viaElHint')
        ], AddressColComponent.prototype, "viaElHint", void 0);
        __decorate([
            core.ViewChild('address1')
        ], AddressColComponent.prototype, "address1", void 0);
        AddressColComponent = AddressColComponent_1 = __decorate([
            core.Component({
                selector: 'address-col-input',
                template: "<ng-container [formGroup]=\"modelForm\">\n\n    <div class=\"via\" #viaElCont>\n        <input type=\"text\" class=\"not-styled via-input\" [size]=\"viaElHint?.value ? viaElHint?.value?.length : 1\" #viaEl (focus)=\"openViaOptions()\" (input)=\"filterViaOptions(viaEl.value)\" autocomplete=\"off\" spellcheck=\"false\" >\n        <input type=\"text\" #viaElHint class=\"not-styled hint\" [size]=\"viaElHint?.value ? viaElHint?.value?.length : 1\" />\n\n        <div class=\"via-options\" #viaOptionsEl>\n            <div class=\"via-item\" *ngFor=\"let item of viaOptions\" (click)=\"setVia(item)\">{{ item }}</div>\n        </div>\n    </div>\n\n    <input class=\"not-styled address1\" #address1 placeholder=\"\" formControlName=\"address1\"  [size]=\"address1?.value ? address1?.value?.length : 1\" />\n\n    <span class=\"separator s1\">#</span>\n\n    <input class=\"not-styled address2\" #address2 placeholder=\"\" formControlName=\"address2\"  [size]=\"address2?.value ? address2?.value?.length : 1\" />\n\n    <span class=\"separator s2\">-</span>\n\n    <input class=\"not-styled address3\" #address3 placeholder=\"\" formControlName=\"address3\"  [size]=\"address3?.value ? address3?.value?.length : 1\" />\n\n</ng-container>\n",
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return AddressColComponent_1; }),
                        multi: true
                    }
                ],
                encapsulation: core.ViewEncapsulation.None
            })
        ], AddressColComponent);
        return AddressColComponent;
    }());

    var SerFilterListFilterPipe = /** @class */ (function () {
        function SerFilterListFilterPipe() {
        }
        SerFilterListFilterPipe.prototype.transform = function (items, filter, searchBy) {
            var _this = this;
            if (!hasValue(items) || !hasValue(filter)) {
                return items;
            }
            var filteredList = items.filter(function (item) { return _this.applyFilter(item, filter, searchBy); });
            if (hasValue(filteredList)) {
                return filteredList;
            }
            else {
                return [];
            }
        };
        SerFilterListFilterPipe.prototype.applyFilter = function (item, filter, searchBy) {
            var found = false;
            if (searchBy.length > 0) {
                if (item.grpTitle) {
                    found = true;
                }
                else {
                    for (var t = 0; t < searchBy.length; t++) {
                        if (filter && item[searchBy[t]] && item[searchBy[t]] !== '') {
                            if (item[searchBy[t]].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                                found = true;
                            }
                        }
                    }
                }
            }
            else {
                if (item.grpTitle) {
                    found = true;
                }
                else {
                    for (var prop in item) {
                        if (filter && item[prop]) {
                            if (item[prop].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                                found = true;
                            }
                        }
                    }
                }
            }
            return found;
        };
        SerFilterListFilterPipe = __decorate([
            core.Pipe({
                name: 'serFilterListFilter',
                pure: true
            })
        ], SerFilterListFilterPipe);
        return SerFilterListFilterPipe;
    }());

    // tslint:disable: no-use-before-declare
    var noop$1 = function () {
    };
    var ɵ0$1 = noop$1;
    var SerFilterComponent = /** @class */ (function () {
        function SerFilterComponent(_elementRef, cdr, _renderer, primaryKey, labelKey) {
            this._elementRef = _elementRef;
            this.cdr = cdr;
            this._renderer = _renderer;
            this.data = [];
            this.onSelect = new core.EventEmitter();
            this.onDeSelect = new core.EventEmitter();
            this.onSelectAll = new core.EventEmitter();
            this.onDeSelectAll = new core.EventEmitter();
            this.onOpen = new core.EventEmitter();
            this.onClose = new core.EventEmitter();
            this.onScrollToEnd = new core.EventEmitter();
            this.onFilterSelectAll = new core.EventEmitter();
            this.onFilterDeSelectAll = new core.EventEmitter();
            this.onAddFilterNewItem = new core.EventEmitter();
            this.onGroupSelect = new core.EventEmitter();
            this.onGroupDeSelect = new core.EventEmitter();
            this.isDisabled = false;
            this.isActive = false;
            this.searchTerm$ = new rxjs.Subject();
            this.selectedItems = [];
            this.isSelectAll = false;
            this.isFilterSelectAll = false;
            this.chunkIndex = [];
            this.cachedItems = [];
            this.groupCachedItems = [];
            this.itemHeight = 41.6;
            this.filterLength = 0;
            this.labelActive = false;
            this.dropdownSubs = [];
            this.defaultSettings = {
                enableCheckAll: true,
                selectAllText: 'Seleccionar todo',
                unSelectAllText: 'Deseleccionar todo',
                filterSelectAllText: 'Seleccionar todos los resultados filtrados',
                filterUnSelectAllText: 'Deseleccionar todos los resultados filtrados',
                searchBy: ['name'],
                maxHeight: 300,
                classes: '',
                searchPlaceholderText: 'Filtrar',
                noDataLabel: 'Sin datos disponibles',
                labelKey: 'name',
                primaryKey: 'id',
                disabledKey: 'disabled',
                enableFilterSelectAll: true,
                clearAll: true
            };
            this.randomSize = true;
            this.filteredList = [];
            this.isDisabledItemPresent = false;
            this.hasValue = hasValue;
            // tslint:disable-next-line: member-ordering
            this.onChangeCallback = noop$1;
            // tslint:disable-next-line: member-ordering
            this.onTouchedCallback = noop$1;
            if (primaryKey !== null) {
                this.defaultSettings.primaryKey = primaryKey;
            }
            if (labelKey !== null) {
                this.defaultSettings.labelKey = labelKey;
            }
        }
        SerFilterComponent_1 = SerFilterComponent;
        SerFilterComponent.prototype.ngOnInit = function () {
            this.settings = Object.assign(this.defaultSettings, this.settings);
            this.cachedItems = this.cloneArray(this.data);
        };
        SerFilterComponent.prototype.ngOnChanges = function (changes) {
            if (changes.data && !changes.data.firstChange) {
                this.cachedItems = this.cloneArray(this.data);
            }
            if (changes.settings && !changes.settings.firstChange) {
                this.settings = Object.assign(this.defaultSettings, this.settings);
            }
            if (changes.loading) {
            }
        };
        SerFilterComponent.prototype.ngAfterViewInit = function () {
            this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
        };
        SerFilterComponent.prototype.onItemClick = function (item, k, e) {
            if (this.isDisabled || item[this.settings.disabledKey]) {
                return false;
            }
            var found = this.isSelected(item);
            if (!found) {
                this.addSelected(item);
                this.onSelect.emit(item);
            }
            else {
                this.removeSelected(item);
                this.onDeSelect.emit(item);
            }
            if (this.isSelectAll || this.data.length > this.selectedItems.length) {
                this.isSelectAll = false;
            }
            if (this.data.length === this.selectedItems.length) {
                this.isSelectAll = true;
            }
        };
        SerFilterComponent.prototype.validate = function (c) {
            return null;
        };
        SerFilterComponent.prototype.writeValue = function (value) {
            var _this = this;
            var _a;
            if (hasValue(value)) {
                if (!Array.isArray(value)) {
                    throw Error('Single value detected as input, please set "singleSelection" setting in true or remove "multiple" attribute in the select if you added');
                }
                var selectedObjects = (_a = this.data) === null || _a === void 0 ? void 0 : _a.filter(function (item) {
                    return inArray(item[_this.settings.primaryKey], value);
                });
                if (hasValue(selectedObjects)) {
                    this.selectedItems = selectedObjects;
                }
                else {
                    this.selectedItems = [];
                    throw Error('No primaryKey finded in options, please set "primaryKey" setting with the correct value');
                }
                if (this.selectedItems.length === this.data.length && this.data.length > 0) {
                    this.isSelectAll = true;
                }
            }
            else {
                this.selectedItems = [];
            }
        };
        SerFilterComponent.prototype.registerOnChange = function (fn) {
            this.onChangeCallback = fn;
        };
        SerFilterComponent.prototype.registerOnTouched = function (fn) {
            this.onTouchedCallback = fn;
        };
        SerFilterComponent.prototype.setDisabledState = function (isDisabled) {
            this.isDisabled = isDisabled;
        };
        SerFilterComponent.prototype.trackByFn = function (item) {
            return item[this.settings.primaryKey];
        };
        SerFilterComponent.prototype.isSelected = function (clickedItem) {
            var e_1, _a;
            if (clickedItem[this.settings.disabledKey]) {
                return false;
            }
            var found = false;
            if (hasValue(this.selectedItems)) {
                try {
                    for (var _b = __values(this.selectedItems), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
                            found = true;
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return found;
        };
        SerFilterComponent.prototype.addSelected = function (item) {
            var _this = this;
            this.selectedItems.push(item);
            var items = this.selectedItems.map(function (element) { return element[_this.settings.primaryKey]; });
            this.onChangeCallback(items);
            this.onTouchedCallback(items);
        };
        SerFilterComponent.prototype.removeSelected = function (clickedItem) {
            var _this = this;
            if (hasValue(this.selectedItems)) {
                this.selectedItems.forEach(function (item, index) {
                    if (clickedItem[_this.settings.primaryKey] === item[_this.settings.primaryKey]) {
                        _this.selectedItems.splice(index, 1);
                    }
                });
            }
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);
        };
        //#region dropdown status
        SerFilterComponent.prototype.toggleDropdown = function (evt) {
            if (this.isDisabled) {
                return false;
            }
            this.isActive = !this.isActive;
            if (this.isActive) {
                this.openDropdown();
            }
            else {
                this.closeDropdown();
            }
            evt.preventDefault();
        };
        SerFilterComponent.prototype.openDropdown = function () {
            var _this = this;
            if (this.isDisabled) {
                return false;
            }
            this.isActive = true;
            this.labelActive = true;
            this.dropdownSubs.push(rxjs.fromEvent(window, 'click')
                .pipe(operators.filter(function (e) { return !_this._elementRef.nativeElement.contains(e.target); }))
                .subscribe(function () { return _this.closeDropdown(); }));
            this.dropdownSubs.push(rxjs.fromEvent(window, 'keyup')
                .pipe(operators.filter(function (e) { return e.key.toLowerCase() === 'escape'; }))
                .subscribe(function () { return _this.closeDropdown(); }));
            this.dropdownSubs.push(rxjs.fromEvent(this._elementRef.nativeElement, 'scroll').subscribe(function () { return console.log('scroll'); }));
            this.dropdownSubs.push(rxjs.fromEvent(window, 'resize').subscribe(function () { return _this.setPositionDropdown(); }));
            this.setPositionDropdown();
            this._renderer.appendChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
            setTimeout(function () {
                var _a;
                (_a = _this.searchInput) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
            }, 0);
            this.onOpen.emit(true);
        };
        SerFilterComponent.prototype.closeDropdown = function () {
            if (this.searchInput) {
                this.searchInput.nativeElement.value = '';
            }
            this.clearSearch();
            this.isActive = false;
            this.labelActive = false;
            this.dropdownSubs.forEach(function (s) { return s.unsubscribe(); });
            this.dropdownSubs = [];
            this.onClose.emit(false);
            this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
        };
        SerFilterComponent.prototype.setPositionDropdown = function () {
            var _this = this;
            setTimeout(function () {
                var dropdown = _this.dropdownListElem.nativeElement;
                // const el = (this._elementRef.nativeElement as HTMLElement);
                var el = _this.searchInput.nativeElement;
                var remainingHeight = document.documentElement.offsetHeight - (dropdown.offsetHeight + el.getBoundingClientRect().top + el.offsetHeight);
                _this._renderer.setStyle(dropdown, 'width', (el.offsetWidth) + 'px');
                _this._renderer.setStyle(dropdown, 'left', (el.getBoundingClientRect().left) + 'px');
                if (remainingHeight > 0) {
                    _this._renderer.removeClass(el, 'ontop');
                    _this._renderer.removeClass(dropdown, 'ontop');
                    _this._elementRef.nativeElement.style.removeProperty('bottom');
                    _this._renderer.setStyle(dropdown, 'top', el.getBoundingClientRect().bottom + 'px');
                }
                else {
                    _this._renderer.addClass(el, 'ontop');
                    _this._renderer.addClass(dropdown, 'ontop');
                    _this._elementRef.nativeElement.style.removeProperty('top');
                    _this._renderer.setStyle(dropdown, 'bottom', (document.documentElement.offsetHeight - el.getBoundingClientRect().top) + 'px');
                }
            });
        };
        //#endregion
        SerFilterComponent.prototype.toggleSelectAll = function () {
            var _this = this;
            if (!this.isSelectAll) {
                this.selectedItems = [];
                // this.selectedItems = this.data.slice();
                this.selectedItems = this.data.filter(function (individualData) { return !individualData[_this.settings.disabledKey]; });
                var selectedItems = this.selectedItems.map(function (element) { return element[_this.settings.primaryKey]; });
                this.isSelectAll = true;
                this.onChangeCallback(selectedItems);
                this.onTouchedCallback(selectedItems);
                this.onSelectAll.emit(this.selectedItems);
            }
            else {
                this.selectedItems = [];
                this.isSelectAll = false;
                this.onChangeCallback(this.selectedItems);
                this.onTouchedCallback(this.selectedItems);
                this.onDeSelectAll.emit(this.selectedItems);
            }
            this.closeDropdown();
        };
        SerFilterComponent.prototype.toggleFilterSelectAll = function () {
            if (!this.isFilterSelectAll) {
                var added = [];
                this.isFilterSelectAll = true;
                this.onFilterSelectAll.emit(added);
            }
            else {
                var removed = [];
                this.isFilterSelectAll = false;
                this.onFilterDeSelectAll.emit(removed);
            }
            this.closeDropdown();
        };
        SerFilterComponent.prototype.clearSearch = function () {
            var _this = this;
            this.filter = '';
            this.isFilterSelectAll = false;
            setTimeout(function () {
                var _a;
                (_a = _this.searchInput) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
            }, 0);
        };
        SerFilterComponent.prototype.onFilterChange = function (data) {
            var _this = this;
            if (this.filter && this.filter === '' || data.length === 0) {
                this.isFilterSelectAll = false;
            }
            var cnt = 0;
            data.forEach(function (item) {
                if (!item.hasOwnProperty('grpTitle') && _this.isSelected(item)) {
                    cnt++;
                }
            });
            if (cnt > 0 && this.filterLength === cnt) {
                this.isFilterSelectAll = true;
            }
            else if (cnt > 0 && this.filterLength !== cnt) {
                this.isFilterSelectAll = false;
            }
            this.cdr.detectChanges();
        };
        SerFilterComponent.prototype.cloneArray = function (arr) {
            if (Array.isArray(arr)) {
                return JSON.parse(JSON.stringify(arr));
            }
            else if (typeof arr === 'object') {
                throw Error('Cannot clone array containing an object!');
            }
            else {
                return arr;
            }
        };
        SerFilterComponent.prototype.onScrollEnd = function (e) {
            if (e.endIndex === this.data.length - 1 || e.startIndex === 0) {
            }
            this.onScrollToEnd.emit(e);
        };
        SerFilterComponent.prototype.clearSelection = function (e) {
            this.clearSearch();
            this.selectedItems = [];
            this.isSelectAll = false;
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);
            this.onDeSelectAll.emit(this.selectedItems);
            e.stopPropagation();
        };
        SerFilterComponent.prototype.getItemContext = function (item) {
            return item;
        };
        SerFilterComponent.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.dropdownSubs.forEach(function (s) {
                s.unsubscribe();
            });
        };
        var SerFilterComponent_1;
        SerFilterComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: core.Renderer2 },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Attribute, args: ['primaryKey',] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Attribute, args: ['labelKey',] }] }
        ]; };
        __decorate([
            core.Input()
        ], SerFilterComponent.prototype, "data", void 0);
        __decorate([
            core.Input()
        ], SerFilterComponent.prototype, "settings", void 0);
        __decorate([
            core.Input()
        ], SerFilterComponent.prototype, "loading", void 0);
        __decorate([
            core.Input()
        ], SerFilterComponent.prototype, "multiple", void 0);
        __decorate([
            core.Input()
        ], SerFilterComponent.prototype, "label", void 0);
        __decorate([
            core.Output('onSelect')
        ], SerFilterComponent.prototype, "onSelect", void 0);
        __decorate([
            core.Output('onDeSelect')
        ], SerFilterComponent.prototype, "onDeSelect", void 0);
        __decorate([
            core.Output('onSelectAll')
        ], SerFilterComponent.prototype, "onSelectAll", void 0);
        __decorate([
            core.Output('onDeSelectAll')
        ], SerFilterComponent.prototype, "onDeSelectAll", void 0);
        __decorate([
            core.Output('onOpen')
        ], SerFilterComponent.prototype, "onOpen", void 0);
        __decorate([
            core.Output('onClose')
        ], SerFilterComponent.prototype, "onClose", void 0);
        __decorate([
            core.Output('onScrollToEnd')
        ], SerFilterComponent.prototype, "onScrollToEnd", void 0);
        __decorate([
            core.Output('onFilterSelectAll')
        ], SerFilterComponent.prototype, "onFilterSelectAll", void 0);
        __decorate([
            core.Output('onFilterDeSelectAll')
        ], SerFilterComponent.prototype, "onFilterDeSelectAll", void 0);
        __decorate([
            core.Output('onAddFilterNewItem')
        ], SerFilterComponent.prototype, "onAddFilterNewItem", void 0);
        __decorate([
            core.Output('onGroupSelect')
        ], SerFilterComponent.prototype, "onGroupSelect", void 0);
        __decorate([
            core.Output('onGroupDeSelect')
        ], SerFilterComponent.prototype, "onGroupDeSelect", void 0);
        __decorate([
            core.ContentChild(SDItemDirective, { static: true })
        ], SerFilterComponent.prototype, "itemTempl", void 0);
        __decorate([
            core.ContentChild(SDBadgeDirective, { static: true })
        ], SerFilterComponent.prototype, "badgeTempl", void 0);
        __decorate([
            core.ViewChild('searchInput')
        ], SerFilterComponent.prototype, "searchInput", void 0);
        __decorate([
            core.ViewChild('selectedList')
        ], SerFilterComponent.prototype, "selectedListElem", void 0);
        __decorate([
            core.ViewChild('dropdownList')
        ], SerFilterComponent.prototype, "dropdownListElem", void 0);
        __decorate([
            core.HostBinding('class.disabled')
        ], SerFilterComponent.prototype, "isDisabled", void 0);
        __decorate([
            core.HostBinding('class.active')
        ], SerFilterComponent.prototype, "isActive", void 0);
        SerFilterComponent = SerFilterComponent_1 = __decorate([
            core.Component({
                selector: 'ser-filter',
                template: "<div class=\"list-filter\" #searchInput (click)=\"toggleDropdown($event)\">\r\n\r\n    <span class=\"material-icons icon-search\">search</span>\r\n\r\n    <div class=\"label\" [ngClass]=\"{active: labelActive}\">{{ label }}</div>\r\n\r\n    <input class=\"c-input not-styled\" type=\"text\" [(ngModel)]=\"filter\">\r\n\r\n    <span [hidden]=\"!hasValue(filter)\" (click)=\"clearSearch()\" class=\"material-icons icon-clear\">cancel</span>\r\n\r\n    <div class=\"controls\">\r\n\r\n        <!-- <button type=\"button\" *ngIf=\"settings.clearAll && !isDisabled && selectedItems?.length > 0\" class=\"clear-all\" (click)=\"clearSelection($event);\">\r\n            <span class=\"material-icons\">close</span>\r\n        </button> -->\r\n\r\n        <span class=\"material-icons chevron\" [ngClass]=\"{'rotate': isActive}\">keyboard_arrow_down</span>\r\n    </div>\r\n\r\n</div>\r\n\r\n<div class=\"selected-list\" #selectedList [attr.tabindex]=\"0\">\r\n\r\n    <div class=\"values\">\r\n\r\n        <ng-container *ngIf=\"hasValue(selectedItems)\">\r\n\r\n            <div class=\"token-list\">\r\n                <div class=\"token\" *ngFor=\"let item of selectedItems;trackBy: trackByFn.bind(this);let k = index\">\r\n                    <ng-container>\r\n\r\n                        <span *ngIf=\"!hasValue(badgeTempl)\" class=\"label\">{{ item[settings.labelKey] }}</span>\r\n                        <span *ngIf=\"hasValue(badgeTempl)\" class=\"label\">\r\n                            <ng-container *ngTemplateOutlet=\"badgeTempl.template; context:{item: item}\"></ng-container>\r\n                        </span>\r\n\r\n                        <span class=\"remove\" (click)=\"onItemClick(item, k, $event);$event.stopPropagation()\">\r\n                            <span class=\"material-icons\">close</span>\r\n                        </span>\r\n                    </ng-container>\r\n                </div>\r\n            </div>\r\n\r\n        </ng-container>\r\n    </div>\r\n</div>\r\n\r\n<div #dropdownList class=\"dropdown-list\">\r\n\r\n    <div class=\"pure-checkbox select-all\" *ngIf=\"settings.enableCheckAll && data?.length > 0 && !isDisabledItemPresent\" (click)=\"toggleSelectAll()\">\r\n        <input type=\"checkbox\" [checked]=\"isSelectAll\" />\r\n        <label>\r\n            <span [hidden]=\"isSelectAll\">{{ settings.selectAllText }}</span>\r\n            <span [hidden]=\"!isSelectAll\">{{ settings.unSelectAllText }}</span>\r\n        </label>\r\n    </div>\r\n\r\n    <div class=\"filter-select-all\" *ngIf=\"settings.enableFilterSelectAll && !isDisabledItemPresent\">\r\n\r\n        <div class=\"pure-checkbox select-all\" *ngIf=\"filter?.length > 0 && filterLength > 0\" (click)=\"toggleFilterSelectAll()\">\r\n            <input type=\"checkbox\" [checked]=\"isFilterSelectAll\" />\r\n            <label>\r\n                <span [hidden]=\"isFilterSelectAll\">{{settings.filterSelectAllText}}</span>\r\n                <span [hidden]=\"!isFilterSelectAll\">{{settings.filterUnSelectAllText}}</span>\r\n            </label>\r\n        </div>\r\n\r\n        <!-- <div class=\"nodata-label\" *ngIf=\"filterLength == 0\" [hidden]=\"filter == undefined || filter?.length == 0\">{{ settings.noDataLabel }}</div> -->\r\n\r\n    </div>\r\n\r\n    <div *ngIf=\"!hasValue(itemTempl)\" class=\"list lazyContainer\" [style.maxHeight]=\"settings.maxHeight+'px'\">\r\n        <ng-container *ngFor=\"let item of data | serFilterListFilter:filter : settings.searchBy; let i = index;\">\r\n            <div class=\"item pure-checkbox\"  *ngIf=\"!isSelected(item)\" (click)=\"onItemClick(item, i, $event)\">\r\n                {{ item[settings.labelKey] }}\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n\r\n    <div *ngIf=\"hasValue(itemTempl)\" class=\"list lazyContainer\" [style.maxHeight]=\"settings.maxHeight+'px'\">\r\n        <ng-container *ngFor=\"let item of data | serFilterListFilter:filter : settings.searchBy; let i = index;\">\r\n            <div class=\"item pure-checkbox\" *ngIf=\"!isSelected(item)\" (click)=\"onItemClick(item, i, $event)\">\r\n                <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: item}\"></ng-container>\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n\r\n    <h5 class=\"list-message\" *ngIf=\"!hasValue(data)\">{{ settings.noDataLabel }}</h5>\r\n\r\n</div>\r\n",
                host: { '[class]': 'defaultSettings.classes' },
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return SerFilterComponent_1; }),
                        multi: true
                    },
                    {
                        provide: forms.NG_VALIDATORS,
                        useExisting: core.forwardRef(function () { return SerFilterComponent_1; }),
                        multi: true,
                    }
                ],
                encapsulation: core.ViewEncapsulation.None
            }),
            __param(3, core.Optional()), __param(3, core.Attribute('primaryKey')),
            __param(4, core.Optional()), __param(4, core.Attribute('labelKey'))
        ], SerFilterComponent);
        return SerFilterComponent;
    }());

    // tslint:disable: max-line-length
    var dependencies$1 = [
        SerFilterComponent,
        SerFilterListFilterPipe
    ];
    var SerFilterModule = /** @class */ (function () {
        function SerFilterModule() {
        }
        SerFilterModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, platformBrowser.BrowserModule, forms.FormsModule],
                declarations: __spread(dependencies$1),
                exports: __spread(dependencies$1),
                providers: []
            })
        ], SerFilterModule);
        return SerFilterModule;
    }());

    var dependencies$2 = [
        SerFormElementComponent,
        SerControlDirective,
        SerErrorsDirective,
        SerErrorDirective,
        PinInputComponent,
        AddressColComponent
    ];
    var SerFormModule = /** @class */ (function () {
        function SerFormModule() {
        }
        SerFormModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, platformBrowser.BrowserModule, forms.ReactiveFormsModule],
                declarations: __spread(dependencies$2),
                exports: __spread(dependencies$2, [SerSelectModule, SerFilterModule])
            })
        ], SerFormModule);
        return SerFormModule;
    }());

    var WhenScrolledDirective = /** @class */ (function () {
        function WhenScrolledDirective(_elementRef, rendered) {
            var _this = this;
            this._elementRef = _elementRef;
            this.callback = new core.EventEmitter();
            this.listener = rendered.listen(this._elementRef.nativeElement, 'scroll', function (ev) {
                if (ev.target.scrollTop + ev.target.offsetHeight >= ev.target.scrollHeight) {
                    _this.callback.emit();
                }
            });
        }
        WhenScrolledDirective.prototype.ngOnDestroy = function () {
            this.listener();
        };
        WhenScrolledDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Output()
        ], WhenScrolledDirective.prototype, "callback", void 0);
        WhenScrolledDirective = __decorate([
            core.Directive({
                // tslint:disable-next-line: directive-selector
                selector: '[whenScrolled]'
            })
        ], WhenScrolledDirective);
        return WhenScrolledDirective;
    }());

    var FinishTypingDirective = /** @class */ (function () {
        function FinishTypingDirective(_elementRef, rendered) {
            var _this = this;
            this._elementRef = _elementRef;
            this.callback = new core.EventEmitter();
            this.listener = rendered.listen(this._elementRef.nativeElement, 'keyup', function () {
                if (_this.inputChangedPromise) {
                    clearTimeout(_this.inputChangedPromise);
                }
                _this.inputChangedPromise = setTimeout(function () {
                    _this.callback.emit();
                }, 500);
            });
        }
        FinishTypingDirective.prototype.ngOnDestroy = function () {
            this.listener();
        };
        FinishTypingDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Output()
        ], FinishTypingDirective.prototype, "callback", void 0);
        FinishTypingDirective = __decorate([
            core.Directive({
                // tslint:disable-next-line: directive-selector
                selector: '[finishTyping]'
            })
        ], FinishTypingDirective);
        return FinishTypingDirective;
    }());

    var CopyToClipboardDirective = /** @class */ (function () {
        function CopyToClipboardDirective() {
            this.valToCopy = '';
            this.copied = new core.EventEmitter();
        }
        CopyToClipboardDirective.prototype.onClick = function (val) {
            var selBox = document.createElement('textarea');
            selBox.style.position = 'fixed';
            selBox.style.zIndex = '-1000';
            selBox.style.left = '0';
            selBox.style.top = '0';
            selBox.style.opacity = '0';
            selBox.value = this.valToCopy;
            document.body.appendChild(selBox);
            selBox.focus();
            selBox.select();
            document.execCommand('copy');
            document.body.removeChild(selBox);
            this.copied.emit(this.valToCopy);
        };
        __decorate([
            core.Input('copyToClipboard')
        ], CopyToClipboardDirective.prototype, "valToCopy", void 0);
        __decorate([
            core.Output()
        ], CopyToClipboardDirective.prototype, "copied", void 0);
        __decorate([
            core.HostListener('click', ['$event'])
        ], CopyToClipboardDirective.prototype, "onClick", null);
        CopyToClipboardDirective = __decorate([
            core.Directive({
                // tslint:disable-next-line: directive-selector
                selector: '[copyToClipboard]'
            })
        ], CopyToClipboardDirective);
        return CopyToClipboardDirective;
    }());

    var BgImageDirective = /** @class */ (function () {
        function BgImageDirective(el, rendered, aws) {
            this.el = el;
            this.rendered = rendered;
            this.aws = aws;
            this.imageRegex = /(image\/(jpe?g|png|gif|bmp))/i;
        }
        BgImageDirective.prototype.ngOnChanges = function () {
            var _this = this;
            if (hasValue(this.image.file) && this.image.file instanceof File && this.imageRegex.test(this.image.file.type)) {
                readAsDataURL(this.image.file).pipe(operators.take(1)).subscribe(function (result) {
                    _this.rendered.setStyle(_this.el.nativeElement, 'background-image', "url(" + result + ")");
                });
            }
            else if (hasValue(this.image.url)) {
                this.rendered.setStyle(this.el.nativeElement, 'background-image', this.aws.getS3BgUrl(this.image.url));
            }
            else {
                this.rendered.removeStyle(this.el.nativeElement, 'background-image');
            }
        };
        BgImageDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: AwsService }
        ]; };
        __decorate([
            core.Input('bgImage')
        ], BgImageDirective.prototype, "image", void 0);
        BgImageDirective = __decorate([
            core.Directive({
                // tslint:disable-next-line: directive-selector
                selector: '[bgImage]'
            })
        ], BgImageDirective);
        return BgImageDirective;
    }());

    var dependencies$3 = [
        WhenScrolledDirective,
        FinishTypingDirective,
        BgImageDirective,
        CopyToClipboardDirective
    ];
    var SerUiModule = /** @class */ (function () {
        function SerUiModule() {
        }
        SerUiModule = __decorate([
            core.NgModule({
                declarations: __spread(dependencies$3),
                exports: __spread(dependencies$3)
            })
        ], SerUiModule);
        return SerUiModule;
    }());

    exports.AWS_CONFIG = AWS_CONFIG;
    exports.AddressColComponent = AddressColComponent;
    exports.AwsModule = AwsModule;
    exports.AwsService = AwsService;
    exports.ClaimsService = ClaimsService;
    exports.CookiesService = CookiesService;
    exports.CopyToClipboardDirective = CopyToClipboardDirective;
    exports.CustomValidators = CustomValidators;
    exports.DataService = DataService;
    exports.ExternalScriptService = ExternalScriptService;
    exports.FacebookSDKConfig = FacebookSDKConfig;
    exports.FacebookSDKModule = FacebookSDKModule;
    exports.FacebookSDKService = FacebookSDKService;
    exports.FinishTypingDirective = FinishTypingDirective;
    exports.GoogleClientConfig = GoogleClientConfig;
    exports.GoogleSDKConfig = GoogleSDKConfig;
    exports.GoogleSDKModule = GoogleSDKModule;
    exports.GoogleSDKService = GoogleSDKService;
    exports.KEYBOARD_KEYS = KEYBOARD_KEYS;
    exports.LEAFLET_MAP_LAYERS = LEAFLET_MAP_LAYERS;
    exports.LeafletMap = LeafletMap;
    exports.MapService = MapService;
    exports.NG_FSDK_CONFIG = NG_FSDK_CONFIG;
    exports.NG_GAPI_CONFIG = NG_GAPI_CONFIG;
    exports.PinInputComponent = PinInputComponent;
    exports.PrefersColorSchemeService = PrefersColorSchemeService;
    exports.SDBadgeDirective = SDBadgeDirective;
    exports.SDItemDirective = SDItemDirective;
    exports.SDSearchDirective = SDSearchDirective;
    exports.SerControlDirective = SerControlDirective;
    exports.SerErrorDirective = SerErrorDirective;
    exports.SerErrorsDirective = SerErrorsDirective;
    exports.SerFilterComponent = SerFilterComponent;
    exports.SerFilterListFilterPipe = SerFilterListFilterPipe;
    exports.SerFilterModule = SerFilterModule;
    exports.SerFormElementComponent = SerFormElementComponent;
    exports.SerFormModule = SerFormModule;
    exports.SerSelectComponent = SerSelectComponent;
    exports.SerSelectListFilterPipe = SerSelectListFilterPipe;
    exports.SerSelectModule = SerSelectModule;
    exports.SerUiModule = SerUiModule;
    exports.VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY = VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY;
    exports.VirtualScrollerComponent = VirtualScrollerComponent;
    exports.VirtualScrollerModule = VirtualScrollerModule;
    exports.WhenScrolledDirective = WhenScrolledDirective;
    exports.arrayGroupBy = arrayGroupBy;
    exports.browserWidth = browserWidth;
    exports.generatePassword = generatePassword;
    exports.getFileType = getFileType;
    exports.getObjIndexByValue = getObjIndexByValue;
    exports.getObjectByValue = getObjectByValue;
    exports.getRandomInt = getRandomInt;
    exports.getStyles = getStyles;
    exports.guid = guid;
    exports.hasPdfViewer = hasPdfViewer;
    exports.hasValue = hasValue;
    exports.inArray = inArray;
    exports.mergeObjs = mergeObjs;
    exports.notInArray = notInArray;
    exports.objHasValue = objHasValue;
    exports.objectToGraphParams = objectToGraphParams;
    exports.readAsArrayBuffer = readAsArrayBuffer;
    exports.readAsDataURL = readAsDataURL;
    exports.setBowserClasses = setBowserClasses;
    exports.toArray = toArray;
    exports.uniqueId = uniqueId;
    exports.ɵ0 = ɵ0;
    exports.ɵa = match;
    exports.ɵb = lowerThan;
    exports.ɵc = lowerOrEqualThan;
    exports.ɵd = greaterThan;
    exports.ɵe = greaterOrEqualThan;
    exports.ɵf = maxFileSize;
    exports.ɵg = minFileSize;
    exports.ɵh = requiredFileType;
    exports.ɵi = alreadyExist;
    exports.ɵk = BgImageDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sersol-ngx.umd.js.map
