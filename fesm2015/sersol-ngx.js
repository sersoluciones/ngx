import { __decorate, __param, __awaiter } from 'tslib';
import { ɵɵdefineInjectable, Injectable, InjectionToken, Inject, ɵɵinject, NgModule, EventEmitter, Output, HostListener, Directive, ContentChild, HostBinding, Component, ViewEncapsulation, Input, forwardRef, ViewChildren, Pipe, TemplateRef, ElementRef, Renderer2, NgZone, ChangeDetectorRef, PLATFORM_ID, Optional, ViewChild, Attribute } from '@angular/core';
import { Observable, of, Subject as Subject$1, fromEvent } from 'rxjs';
import { tileLayer, Map, Control, MarkerClusterGroup, featureGroup, marker } from 'leaflet';
import 'leaflet.markercluster';
import '@sersol/leaflet-plugins/leaflet-fullscreen';
import '@sersol/leaflet-plugins/leaflet-mouseposition';
import { map, delay, switchMap, catchError, debounceTime, distinctUntilChanged, tap, filter, take } from 'rxjs/operators';
import { NgControl, FormGroupDirective, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormsModule, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable as Observable$1 } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/combineLatest';
import { isPlatformServer, CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Tween, Easing } from '@tweenjs/tween.js';

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
CookiesService.ɵprov = ɵɵdefineInjectable({ factory: function CookiesService_Factory() { return new CookiesService(); }, token: CookiesService, providedIn: "root" });
CookiesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CookiesService);

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
let ExternalScriptService = class ExternalScriptService {
    constructor() {
    }
    insert(id, src) {
        const fjs = document.getElementsByTagName('script')[0];
        if (document.getElementById(id)) {
            return;
        }
        const js = document.createElement('script');
        js.id = id;
        js.src = src;
        fjs.parentNode.insertBefore(js, fjs);
    }
};
ExternalScriptService.ɵprov = ɵɵdefineInjectable({ factory: function ExternalScriptService_Factory() { return new ExternalScriptService(); }, token: ExternalScriptService, providedIn: "root" });
ExternalScriptService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ExternalScriptService);

/**
 * @description
 * Clase para obtener, observar y cambiar el esquema de color claro/oscuro
 * @example
 * constructor(prefersColorSchemeService: PrefersColorSchemeService) { }
 *
 * this.prefersColorSchemeService.init(); // Setea el esquema inicial
 * this.prefersColorSchemeService.watch(); // Observa cambio de esquema en OS
 */
let PrefersColorSchemeService = class PrefersColorSchemeService {
    constructor() {
        this._SchemeLightClassName = 'scheme-light';
        this._SchemeDarkClassName = 'scheme-dark';
        this.Scheme = window.matchMedia('(prefers-color-scheme: dark)');
    }
    get Scheme() {
        return this._Scheme;
    }
    set Scheme(value) {
        this._Scheme = value;
    }
    get SchemeLightClassName() {
        return this._SchemeLightClassName;
    }
    set SchemeLightClassName(value) {
        this._SchemeLightClassName = value;
    }
    get SchemeDarkClassName() {
        return this._SchemeDarkClassName;
    }
    set SchemeDarkClassName(value) {
        this._SchemeDarkClassName = value;
    }
    /**
     * @description
     * Inicializar el esquema de color
     * @usageNotes
     * Usarse unicamente si se desea aplicar el esquema de color acorde al esquema de color del sistema operativo
     */
    init() {
        if (this.Scheme.matches) {
            this.enableDark();
        }
        else {
            this.enableLight();
        }
    }
    /**
     * @description
     * Obtener el esquema de color actual del SO
     * @returns {string} Esquema de color
     */
    get() {
        if (this.Scheme.matches) {
            return 'dark';
        }
        else {
            return 'light';
        }
    }
    /**
     * @description
     * Agrega SchemeDarkClassName y remueve SchemeLightClassName a la etiqueta body
     */
    enableDark() {
        const body = document.getElementsByTagName('body')[0];
        if (body.classList.contains(this.SchemeLightClassName)) {
            body.classList.remove(this.SchemeLightClassName);
        }
        body.classList.add(this.SchemeDarkClassName);
    }
    /**
     * @description
     * Agrega SchemeLightClassName y remueve SchemeDarkClassName a la etiqueta body
     */
    enableLight() {
        const body = document.getElementsByTagName('body')[0];
        if (body.classList.contains(this.SchemeDarkClassName)) {
            body.classList.remove(this.SchemeDarkClassName);
        }
        body.classList.add(this.SchemeLightClassName);
    }
    /**
     * @description
     * Habilita el cambio automatico de esquema de color según el cambio de esquema de color del SO
     */
    watch() {
        const setScheme = (ev) => {
            if (ev.matches) {
                console.log('Changed to dark mode');
                this.enableDark();
            }
            else {
                console.log('Changed to light mode');
                this.enableLight();
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
    }
};
PrefersColorSchemeService.ɵprov = ɵɵdefineInjectable({ factory: function PrefersColorSchemeService_Factory() { return new PrefersColorSchemeService(); }, token: PrefersColorSchemeService, providedIn: "root" });
PrefersColorSchemeService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PrefersColorSchemeService);

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

let AWS_CONFIG = new InjectionToken('aws.config');
/**
 * @description
 * Servicio para verificar si es usuario tiene o no permisos para realizar ciertas acciones
 * @example
 * constructor(private claimsService: ClaimsService) { }
 */
let AwsService = class AwsService {
    constructor(config) {
        this.awsData = config;
    }
    get awsData() {
        return this._awsData;
    }
    set awsData(value) {
        this._awsData = value;
    }
    /**
     * @description
     * Método obtener url de assets en S3
     * @param {string} key - Ruta del objeto en el bucket (Sin '/' al principio)
     * @example
     * this.awsService.getS3Url('assets/file.png');
     * @returns {string}
     */
    getS3Url(key) {
        if (hasValue(key)) {
            return `https://${this.awsData.s3.bucket}.s3.amazonaws.com/${key}`;
        }
        else {
            return '';
        }
    }
    /**
     * @description
     * Método obtener url de assets en S3
     * @param {string} key - Ruta del objeto en el bucket (Sin '/' al principio)
     * @example
     * this.awsService.getS3Url('assets/file.png');
     * @returns {string}
     */
    getS3BgUrl(key) {
        if (hasValue(key)) {
            return `url(https://${this.awsData.s3.bucket}.s3.amazonaws.com/${key})`;
        }
        else {
            return '';
        }
    }
};
AwsService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [AWS_CONFIG,] }] }
];
AwsService.ɵprov = ɵɵdefineInjectable({ factory: function AwsService_Factory() { return new AwsService(ɵɵinject(AWS_CONFIG)); }, token: AwsService, providedIn: "root" });
AwsService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(AWS_CONFIG))
], AwsService);

var AwsModule_1;
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
let AwsModule = AwsModule_1 = class AwsModule {
    static forRoot(ConfigProvider) {
        return {
            ngModule: AwsModule_1,
            providers: [
                ConfigProvider,
                AwsService
            ]
        };
    }
};
AwsModule = AwsModule_1 = __decorate([
    NgModule()
], AwsModule);

class GoogleSDKConfig {
    constructor(clientConfig) {
        this.clientConfig = clientConfig;
    }
    get clientConfig() {
        return this._clientConfig;
    }
    set clientConfig(value) {
        this._clientConfig = value;
    }
}

// Type definitions for Google API Client
// Project: https://github.com/google/google-api-javascript-client
// Definitions by: Frank M <https://github.com/sgtfrankieboy>, grant <https://github.com/grant>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3
class GoogleClientConfig {
}

let NG_GAPI_CONFIG = new InjectionToken('google.config');
/**
 * @description
 * Servicio para interactuar con la API de Google
 */
let GoogleSDKService = class GoogleSDKService {
    constructor(config) {
        this.gapiUrl = 'https://apis.google.com/js/api.js';
        this.onload = new EventEmitter();
        this.config = new GoogleSDKConfig(config);
        this.loadSDK().subscribe(() => {
            console.log('Google: SDK loaded');
            this.onload.emit();
        });
    }
    get config() {
        return this._config;
    }
    set config(value) {
        this._config = value;
    }
    get GoogleAuth() {
        return this._GoogleAuth;
    }
    set GoogleAuth(value) {
        this._GoogleAuth = value;
    }
    /**
     * @description
     * Método para obtener un token de inicio de sesión junto con la información de perfil
     * @returns {Observable<GoogleUserProfile>}
     */
    login() {
        return new Observable((observer) => {
            this.GoogleAuth.signIn().then((res) => {
                const profile = res.getBasicProfile();
                const googleProfile = {
                    id: profile.getId(),
                    id_token: res.getAuthResponse().id_token,
                    first_name: profile.getGivenName(),
                    last_name: profile.getFamilyName(),
                    email: profile.getEmail(),
                    picture: profile.getImageUrl().replace('=s96-', '=-')
                };
                observer.next(googleProfile);
                observer.complete();
            }, (err) => {
                return observer.error(err);
            });
        });
    }
    /**
     * @description
     * Metodo privado que carga la libreria de Google, al cargarse correctamente, se emite el evento 'onload'
     */
    loadSDK() {
        return new Observable((observer) => {
            if (window.gapi == null) {
                const node = document.createElement('script');
                node.src = this.gapiUrl;
                node.type = 'text/javascript';
                node.async = true;
                node.defer = true;
                node.id = 'google-api';
                document.getElementsByTagName('head')[0].appendChild(node);
                node.onload = () => {
                    gapi.load('auth2', () => {
                        gapi.auth2.init(this.config.clientConfig).then((auth) => {
                            this.GoogleAuth = auth;
                            observer.next();
                            observer.complete();
                        }).catch((err) => observer.error(err));
                    });
                };
            }
            else {
                observer.next();
                observer.complete();
            }
        });
    }
};
GoogleSDKService.ctorParameters = () => [
    { type: GoogleClientConfig, decorators: [{ type: Inject, args: [NG_GAPI_CONFIG,] }] }
];
GoogleSDKService.ɵprov = ɵɵdefineInjectable({ factory: function GoogleSDKService_Factory() { return new GoogleSDKService(ɵɵinject(NG_GAPI_CONFIG)); }, token: GoogleSDKService, providedIn: "root" });
__decorate([
    Output()
], GoogleSDKService.prototype, "onload", void 0);
GoogleSDKService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(NG_GAPI_CONFIG))
], GoogleSDKService);

var GoogleSDKModule_1;
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
let GoogleSDKModule = GoogleSDKModule_1 = class GoogleSDKModule {
    static forRoot(gapiConfigProvider) {
        return {
            ngModule: GoogleSDKModule_1,
            providers: [
                gapiConfigProvider,
                GoogleSDKService
            ]
        };
    }
};
GoogleSDKModule = GoogleSDKModule_1 = __decorate([
    NgModule()
], GoogleSDKModule);

class FacebookSDKConfig {
    constructor(clientConfig) {
        this.clientConfig = clientConfig;
    }
    get clientConfig() {
        return this._clientConfig;
    }
    set clientConfig(value) {
        this._clientConfig = value;
    }
}

let NG_FSDK_CONFIG = new InjectionToken('facebook.config');
/**
 * @description
 * Servicio para interacturar con el SDK de Facebook
 */
let FacebookSDKService = class FacebookSDKService {
    constructor(config) {
        this.fsdkUrl = 'https://connect.facebook.net/en_US/sdk.js';
        this.onload = new EventEmitter();
        this.config = new FacebookSDKConfig(config);
        this.loadSDK().subscribe(() => {
            console.log('Facebook: SDK loaded');
            this.onload.emit();
        });
    }
    get config() {
        return this._config;
    }
    set config(value) {
        this._config = value;
    }
    /**
     * @description
     * Método para obtener un token de inicio de sesión junto con la información de perfil
     * @returns {Observable<FacebookUserProfile>}
     */
    login() {
        return new Observable((observer) => {
            FB.login((response) => {
                if (response.status === 'connected') {
                    FB.api('/me', { fields: 'first_name,last_name,email' }, (res) => {
                        FB.api('/me/picture', {
                            width: 300,
                            redirect: 'false'
                        }, (pic) => {
                            var _a, _b;
                            const facebookProfile = {
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
    }
    /**
     * @description
     * Metodo privado que carga la libreria de Facebook, al cargarse correctamente, se emite el evento 'onload'
     */
    loadSDK() {
        return new Observable((observer) => {
            if (window.FB == null) {
                const node = document.createElement('script');
                node.src = this.fsdkUrl;
                node.type = 'text/javascript';
                node.async = true;
                node.defer = true;
                node.id = 'facebook-sdk';
                document.getElementsByTagName('head')[0].appendChild(node);
                node.onload = () => {
                    FB.init(this.config.clientConfig);
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
    }
};
FacebookSDKService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NG_FSDK_CONFIG,] }] }
];
FacebookSDKService.ɵprov = ɵɵdefineInjectable({ factory: function FacebookSDKService_Factory() { return new FacebookSDKService(ɵɵinject(NG_FSDK_CONFIG)); }, token: FacebookSDKService, providedIn: "root" });
__decorate([
    Output()
], FacebookSDKService.prototype, "onload", void 0);
FacebookSDKService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(NG_FSDK_CONFIG))
], FacebookSDKService);

var FacebookSDKModule_1;
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
let FacebookSDKModule = FacebookSDKModule_1 = class FacebookSDKModule {
    static forRoot(fsdkConfigProvider) {
        return {
            ngModule: FacebookSDKModule_1,
            providers: [
                fsdkConfigProvider,
                FacebookSDKService
            ]
        };
    }
};
FacebookSDKModule = FacebookSDKModule_1 = __decorate([
    NgModule()
], FacebookSDKModule);

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
const toArray = (value) => Array.isArray(value) ? value : [value];
/**
 * @description
 * Función para crear un objeto con los datos agrupado de un arreglo por un valor dado
 * @param {any[]} array Arreglo para agrupar
 * @param {string | number} field Campo para agrupar
 * @returns {boolean}
 */
function arrayGroupBy(array, field) {
    const array_group_by = {};
    for (let index = 0; index < array.length; ++index) {
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
    for (let i = 0; i < array.length; i++) {
        if (array[i].hasOwnProperty(field)) {
            if (array[i][field] === value) {
                return array[i];
            }
            else {
                for (const prop in array[i][field]) {
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
    for (let i = 0; i < array.length; i++) {
        if (array[i].hasOwnProperty(field)) {
            if (array[i][field] === value) {
                return i;
            }
            else {
                for (const prop in array[i][field]) {
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
ClaimsService.ɵprov = ɵɵdefineInjectable({ factory: function ClaimsService_Factory() { return new ClaimsService(); }, token: ClaimsService, providedIn: "root" });
ClaimsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ClaimsService);

/**
 * @description
 * Función para transformar un objeto en un string apto para filtrar resultados GraphQL
 * @param {any} obj Objeto a convertir
 * @returns {string}
 */
function objectToGraphParams(obj) {
    let graph_params = '';
    for (const [key, value] of Object.entries(obj)) {
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
    const isObject = (obj) => obj && typeof obj === 'object';
    if (!isObject(target) || !isObject(source)) {
        return source;
    }
    Object.keys(source).forEach(key => {
        const targetValue = target[key];
        const sourceValue = source[key];
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
    for (let index = 0; index < window.navigator.plugins.length; index++) {
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
    const today = new Date();
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
    const defaultOptions = {
        length: 8,
        numbers: true,
        specialChars: false,
        lettersLowerCase: true,
        lettersUpperCase: true
    };
    mergeObjs(defaultOptions, options);
    let charset = '';
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
    let retVal = '';
    for (let i = 0, n = charset.length; i < defaultOptions.length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

/**
 * @description
 * Mapeo de teclas con su respectivo código númerico
 */
const KEYBOARD_KEYS = {
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
var Patterns;
(function (Patterns) {
    Patterns.PASSWORD = /^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])).{6,}$/;
    Patterns.DOMAIN = /^([a-zA-Z0-9\_\-\.]{2,63})\.([a-zA-Z0-9]{2,})$/;
    Patterns.EMAIL = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    Patterns.IMAGE = /^image\/([a-zA-Z].*)$/;
    Patterns.NUMBER = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
    Patterns.CC = /((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?/g;
})(Patterns || (Patterns = {}));

let MapService = class MapService {
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
    getCurrentPosition() {
        return new Observable((observer) => {
            // Simple geolocation API check provides values to publish
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    observer.next(position);
                }, (error) => {
                    observer.error(error);
                });
            }
            else {
                observer.error('Geolocation not available');
            }
        });
    }
    /**
     * Verifica si la latitud y longitud son válidas
     * @param lat Latitud
     * @param lng Longitud
     */
    checkLatLog(lat, lng) {
        return (-90 <= lat) && (90 >= lat) && (-180 <= lng) && (180 >= lng);
    }
    /**
     * Obtiene la distancia en km entre dos puntos LatLng
     * @param lon1 Latitud
     */
    distancePoints(options) {
        // tslint:disable-next-line: max-line-length
        const a = Math.sin(((options.to.lat - options.from.lat) * Math.PI / 180) / 2) * Math.sin(((options.to.lat - options.from.lat) * Math.PI / 180) / 2) + Math.cos(options.from.lat * Math.PI / 180) * Math.cos(options.to.lat * Math.PI / 180) * Math.sin(((options.to.lng - options.from.lng) * Math.PI / 180) / 2) * Math.sin(((options.to.lng - options.from.lng) * Math.PI / 180) / 2);
        return (6371 * (2 * Math.asin(Math.sqrt(a)))) * 1.60934;
    }
    cutPrecision(obj, precision) {
        if ('number' === typeof obj[0]) {
            for (let i = 0; i < obj.length; i++) {
                obj[i] = Math.round(obj[i] * precision) / precision;
            }
        }
        else {
            const arr = obj.features || obj.geometries || obj.coordinates || obj;
            for (let i = 0; i < arr.length; i++) {
                this.cutPrecision(arr[i], precision);
            }
        }
    }
    middlePoint(options) {
        if ((options.from.lng !== options.to.lng) || (options.from.lat !== options.to.lat)) {
            const lat1 = options.from.lat * Math.PI / 180;
            const lat2 = options.to.lat * Math.PI / 180;
            const lon1 = options.from.lng * Math.PI / 180;
            const lon2 = options.to.lng * Math.PI / 180;
            const dLon = lon2 - lon1;
            const x = Math.cos(lat2) * Math.cos(dLon);
            const y = Math.cos(lat2) * Math.sin(dLon);
            let lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + x) * (Math.cos(lat1) + x) + y * y));
            let lon3 = lon1 + Math.atan2(y, Math.cos(lat1) + x);
            lat3 *= 180 / Math.PI;
            lon3 *= 180 / Math.PI;
            const deltaY = options.to.lng - options.from.lng;
            const deltaX = options.to.lat - options.from.lat;
            const angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
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
    }
};
MapService.ɵprov = ɵɵdefineInjectable({ factory: function MapService_Factory() { return new MapService(); }, token: MapService, providedIn: "root" });
MapService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MapService);

// Layers Maps for Leaflet
const LEAFLET_MAP_LAYERS = {
    'OpenStreetMap Street': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }),
    'Mapbox Street': tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: window.mapbox_access_token
    })
};

class LeafletMap {
    constructor(options) {
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
        this.map = new Map(this.options.container, this.options.mapOptions);
        this.layerControl = new Control.Layers(this.options.layers, null, this.options.layersOptions);
        this.map.addControl(new Control.MousePosition(this.options.mousePositionOptions));
        this.map.addControl(this.layerControl);
        this.map.addControl(new Control.Fullscreen(this.options.fullscreen));
        this.map.addControl(new Control.Zoom(this.options.zoom));
        this.map.setView([this.options.initialView.lat, this.options.initialView.lng], this.options.initialView.zoom);
        // Create cluster and scope
        if (this.options.clusterMarkers.enable) {
            this.initMarkerCluster();
        }
    }
    initMarkerCluster() {
        if (MarkerClusterGroup) {
            this.markerCluster = new MarkerClusterGroup([], this.options.clusterMarkers.config);
            this.map.addLayer(this.markerCluster);
        }
    }
    fitMarkersBounds(padding, flyTo) {
        if (hasValue(this.markers)) {
            const groupWrapper = [];
            // tslint:disable-next-line: forin
            for (const key in this.markers) {
                groupWrapper.push(this.markers[key]);
            }
            if (hasValue(groupWrapper)) {
                const pad = {
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
                const group = featureGroup(groupWrapper);
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
    }
    addMarker(latLng, id) {
        this.markers[id] = marker([latLng.lat, latLng.lng]);
        if (this.options.clusterMarkers.enable) {
            this.markerCluster.addLayer(this.markers[id]);
        }
        else {
            this.markers[id].addTo(this.map);
        }
        return this.markers[id];
    }
    panTo(latlng, offset, options) {
        if (hasValue(offset)) {
            const x = this.map.latLngToContainerPoint(latlng).x - offset[0];
            const y = this.map.latLngToContainerPoint(latlng).y - offset[1];
            const point = this.map.containerPointToLatLng([x, y]);
            return this.map.setView(point, this.map.getZoom(), options);
        }
        else {
            return this.map.setView(latlng, this.map.getZoom(), options);
        }
    }
    setView(latlng, targetZoom, offset, options) {
        if (hasValue(offset)) {
            const targetPoint = this.map.project(latlng, targetZoom).subtract(offset);
            const targetLatLng = this.map.unproject(targetPoint, targetZoom);
            return this.map.setView(targetLatLng, targetZoom, options);
        }
        else {
            return this.map.setView(latlng, targetZoom, options);
        }
    }
    centerPoint(options) {
        this.map.flyTo([options.lat, options.lng], options.preserve_zoom ? this.map.getZoom() : 19, {
            duration: 0.5
        });
    }
}

/**
 * Read the content of a File or Blob using the FileReader interface.
 * This is an async interface so it makes sense to handle it with Rx.
 * @param File | Blob
 */
function readAsArrayBuffer(blob) {
    return new Observable((obs) => {
        if (!(blob instanceof Blob)) {
            obs.error(new Error('`blob` must be an instance of File or Blob.'));
            return;
        }
        const reader = new FileReader();
        reader.onerror = err => obs.error(err);
        reader.onabort = err => obs.error(err);
        reader.onload = () => obs.next(reader.result);
        reader.onloadend = () => obs.complete();
        reader.readAsArrayBuffer(blob);
    });
}
/**
 * Read the content of a File or Blob using the FileReader interface.
 * This is an async interface so it makes sense to handle it with Rx.
 * @param File | Blob
 */
function readAsDataURL(blob) {
    return new Observable((obs) => {
        if (!(blob instanceof Blob)) {
            obs.error(new Error('`blob` must be an instance of File or Blob.'));
            return;
        }
        const reader = new FileReader();
        reader.onerror = err => obs.error(err);
        reader.onabort = err => obs.error(err);
        reader.onload = () => obs.next(reader.result);
        reader.onloadend = () => obs.complete();
        reader.readAsDataURL(blob);
    });
}
/**
 * @description Get file type based on header info
 * @param arrayBuffer Result of FileReader.readAsArrayBuffer()
 */
function getFileType(arrayBuffer) {
    const arr = (new Uint8Array(arrayBuffer)).subarray(0, 4);
    let header = '';
    for (const i of arr) {
        header += i.toString(16);
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
    return (fg) => {
        const base = fg.get(BasePathField);
        const target = fg.get(TargetPathField);
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
    return (fg) => {
        const base = fg.get(BasePathField);
        const target = fg.get(TargetPathField);
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
    return (fg) => {
        const base = fg.get(BasePathField);
        const target = fg.get(TargetPathField);
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
    return (fg) => {
        const base = fg.get(BasePathField);
        const target = fg.get(TargetPathField);
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
    const validation = (fg) => {
        const original = fg.get(originalPathField);
        const duplicate = fg.get(duplicatePathField);
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
    return (control) => {
        const number = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
        const sizeNumber = size.match(number);
        let multiplier = 1;
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
            const sizeOnBytes = parseFloat(sizeNumber.join('')) * multiplier;
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
    return (control) => {
        const number = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
        const sizeNumber = size.match(number);
        let multiplier = 1;
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
            const sizeOnBytes = parseFloat(sizeNumber.join('')) * multiplier;
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
    return (control) => {
        const file = control.value;
        if (file) {
            if (!Array.isArray(ext)) {
                ext = [ext];
            }
            const types = ext.map((type) => type.toLowerCase());
            return readAsArrayBuffer(file)
                .pipe(map((result) => {
                if (inArray(getFileType(result), types)) {
                    return null;
                }
                else {
                    return {
                        requiredFileType: true
                    };
                }
            }));
        }
        return of(null);
    };
}

function alreadyExist(http, url, requestBody) {
    return (control) => {
        return of(control.value).pipe(delay(1000), switchMap((value) => {
            if (hasValue(value)) {
                requestBody.Value = value;
                return http.post(url, requestBody).pipe(map(() => ({ alreadyExist: true })), catchError(() => of(null)));
            }
            return of(null);
        }));
    };
}

// @dynamic
/**
 * Validaciones adicionales para Form Control's
 */
class CustomValidators {
    /**
     * Verifica si los campos proveidos son iguales
     * @param originalPathField Path del campo original
     * @param duplicatePathField Path del campo que deberia ser igual al original
     */
    static match(originalPathField, duplicatePathField) {
        return match(originalPathField, duplicatePathField);
    }
    /**
     * Verifica si un campo es menor a otro
     * @param BasePathField Path del campo que debe ser menor
     * @param TargetPathField Path del campo que deberia ser mayor
     */
    static lowerThan(BasePathField, TargetPathField) {
        return lowerThan(BasePathField, TargetPathField);
    }
    /**
     * Verifica si un campo es menor o igual a otro
     * @param BasePathField Path del campo que debe ser menor o igual
     * @param TargetPathField Path del campo que deberia ser mayor o igual
     */
    static lowerOrEqualThan(BasePathField, TargetPathField) {
        return lowerOrEqualThan(BasePathField, TargetPathField);
    }
    /**
     * Verifica si un campo es mayor a otro
     * @param BasePathField Path del campo que debe ser mayor
     * @param TargetPathField Path del campo que deberia ser menor
     */
    static greaterThan(BasePathField, TargetPathField) {
        return greaterThan(BasePathField, TargetPathField);
    }
    /**
     * Verifica si un campo es mayor o igual a otro
     * @param BasePathField Path del campo que debe ser mayor o igual
     * @param TargetPathField Path del campo que deberia ser menor o igual
     */
    static greaterOrEqualThan(BasePathField, TargetPathField) {
        return greaterOrEqualThan(BasePathField, TargetPathField);
    }
    /**
     * Verifica si el tamaño no excede el tamaño maximo indicado
     * @param size Tamaño en KB, MG ó GB (ejem: 100MB)
     */
    static maxFileSize(size) {
        return maxFileSize(size);
    }
    /**
     * Verifica si el tamaño es mayor el tamaño mínimo indicado
     * @param size Tamaño en KB, MG ó GB (ejem: 100MB)
     */
    static minFileSize(size) {
        return minFileSize(size);
    }
    /**
     * Verifica si el archivo tiene una extensión adminitida por medio de su cabecera
     * @param ext Extensiones admitidas
     */
    static requiredFileType(ext) {
        return requiredFileType(ext);
    }
    /**
     * Verifica si existe dicho valor en la DB si coincide con el modelo y el nombre de campo
     * @param http
     * @param url
     * @param requestBody propiedad Id opcional para excluir de la busqueda un registro
     */
    static alreadyExist(http, url, requestBody) {
        return alreadyExist(http, url, requestBody);
    }
}

let SerControlDirective = class SerControlDirective {
    constructor(_ngControl) {
        this._ngControl = _ngControl;
        this.disabled = false;
        this.focus = false;
        this.dirty = false;
        this.valid = false;
        this.invalid = false;
        this.pending = false;
        this.hasValue = false;
    }
    onFocus() {
        this.focus = true;
    }
    onBlur() {
        this.focus = false;
    }
    onChangeValue(value) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.hasValue = hasValue(value);
        this.valid = (_b = (_a = this._ngControl) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.valid;
        this.invalid = (_d = (_c = this._ngControl) === null || _c === void 0 ? void 0 : _c.control) === null || _d === void 0 ? void 0 : _d.invalid;
        this.dirty = (_f = (_e = this._ngControl) === null || _e === void 0 ? void 0 : _e.control) === null || _f === void 0 ? void 0 : _f.dirty;
        this.disabled = (_h = (_g = this._ngControl) === null || _g === void 0 ? void 0 : _g.control) === null || _h === void 0 ? void 0 : _h.disabled;
        this.pending = (_k = (_j = this._ngControl) === null || _j === void 0 ? void 0 : _j.control) === null || _k === void 0 ? void 0 : _k.pending;
    }
    ngOnInit() {
        var _a, _b, _c, _d;
        this.onChangeValue((_b = (_a = this._ngControl) === null || _a === void 0 ? void 0 : _a.control) === null || _b === void 0 ? void 0 : _b.value);
        this.observer = (_d = (_c = this._ngControl) === null || _c === void 0 ? void 0 : _c.control) === null || _d === void 0 ? void 0 : _d.valueChanges.subscribe((value) => {
            this.onChangeValue(value);
        });
    }
    ngOnDestroy() {
        var _a;
        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
};
SerControlDirective.ctorParameters = () => [
    { type: NgControl }
];
__decorate([
    HostListener('focus')
], SerControlDirective.prototype, "onFocus", null);
__decorate([
    HostListener('blur')
], SerControlDirective.prototype, "onBlur", null);
SerControlDirective = __decorate([
    Directive({
        // tslint:disable-next-line: directive-selector
        selector: '[serControl]'
    })
], SerControlDirective);

let SerFormElementComponent = class SerFormElementComponent {
    get disabled() {
        var _a;
        return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.disabled;
    }
    get focus() {
        var _a;
        return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.focus;
    }
    get active() {
        var _a;
        return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.hasValue;
    }
    get dirty() {
        var _a;
        return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.dirty;
    }
    get valid() {
        var _a;
        return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.valid;
    }
    get invalid() {
        var _a;
        return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.invalid;
    }
    get pending() {
        var _a;
        return (_a = this.formElement) === null || _a === void 0 ? void 0 : _a.pending;
    }
};
__decorate([
    ContentChild(SerControlDirective)
], SerFormElementComponent.prototype, "formElement", void 0);
__decorate([
    HostBinding('class.disabled')
], SerFormElementComponent.prototype, "disabled", null);
__decorate([
    HostBinding('class.focus')
], SerFormElementComponent.prototype, "focus", null);
__decorate([
    HostBinding('class.active')
], SerFormElementComponent.prototype, "active", null);
__decorate([
    HostBinding('class.dirty')
], SerFormElementComponent.prototype, "dirty", null);
__decorate([
    HostBinding('class.valid')
], SerFormElementComponent.prototype, "valid", null);
__decorate([
    HostBinding('class.invalid')
], SerFormElementComponent.prototype, "invalid", null);
__decorate([
    HostBinding('class.pending')
], SerFormElementComponent.prototype, "pending", null);
SerFormElementComponent = __decorate([
    Component({
        selector: 'ser-form-element',
        template: '<ng-content></ng-content>',
        encapsulation: ViewEncapsulation.None
    })
], SerFormElementComponent);

let SerErrorsDirective = class SerErrorsDirective {
    constructor(_form) {
        this._form = _form;
        this.subject = new BehaviorSubject(null);
        this.ready = false;
    }
    get errors() {
        if (!this.ready) {
            return;
        }
        return this.control.errors;
    }
    get hasErrors() {
        return !!this.errors;
    }
    hasError(name, conditions) {
        return this.checkPropState('invalid', name, conditions);
    }
    isValid(name, conditions) {
        return this.checkPropState('valid', name, conditions);
    }
    getError(name) {
        if (!this.ready) {
            return;
        }
        return this.control.getError(name);
    }
    checkPropState(prop, name, conditions) {
        if (!this.ready) {
            return;
        }
        const controlPropsState = (!conditions || toArray(conditions).every((condition) => this.control[condition]));
        if (name.charAt(0) === '*') {
            return this.control[prop] && controlPropsState;
        }
        return (prop === 'valid' ? !this.control.hasError(name) : this.control.hasError(name) && controlPropsState);
    }
    checkStatus() {
        const control = this.control;
        const errors = control.errors;
        this.ready = true;
        if (!errors) {
            return;
        }
        for (const errorName in errors) {
            if (this.errors.hasOwnProperty(errorName)) {
                this.subject.next({ control, errorName });
            }
        }
    }
    ngOnChanges() {
        this.control = this._form.control.get(this.controlName);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.checkStatus();
            this.control.statusChanges.subscribe(this.checkStatus.bind(this));
        });
    }
    ngOnDestroy() {
        this.subject.unsubscribe();
    }
};
SerErrorsDirective.ctorParameters = () => [
    { type: FormGroupDirective }
];
__decorate([
    Input('serErrors')
], SerErrorsDirective.prototype, "controlName", void 0);
SerErrorsDirective = __decorate([
    Directive({
        // tslint:disable-next-line: directive-selector
        selector: '[serErrors]',
        exportAs: 'serErrors'
    })
], SerErrorsDirective);

let SerErrorDirective = class SerErrorDirective {
    constructor(_serErrors) {
        this._serErrors = _serErrors;
        this.hidden = true;
        this.rules = [];
        this.errorNames = [];
    }
    set serError(value) {
        this.errorNames = toArray(value);
    }
    set when(value) {
        this.rules = toArray(value);
    }
    ngOnInit() {
        this._states = new Subject();
        this.states = this._states.asObservable().distinctUntilChanged();
        const errors = this._serErrors.subject
            .filter(Boolean)
            // tslint:disable-next-line: no-bitwise
            .filter((obj) => !!~this.errorNames.indexOf(obj.errorName));
        const states = this.states
            // tslint:disable-next-line: no-bitwise
            .map(states => this.rules.every(rule => !!~states.indexOf(rule)));
        this.subscription = Observable$1.combineLatest([states, errors])
            .subscribe(([states, errors]) => {
            this.hidden = !(states && errors.control.hasError(errors.errorName));
        });
    }
    ngDoCheck() {
        this._states.next(this.rules.filter((rule) => this._serErrors.control[rule]));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
SerErrorDirective.ctorParameters = () => [
    { type: SerErrorsDirective, decorators: [{ type: Inject, args: [forwardRef(() => SerErrorsDirective),] }] }
];
__decorate([
    Input()
], SerErrorDirective.prototype, "serError", null);
__decorate([
    Input()
], SerErrorDirective.prototype, "when", null);
__decorate([
    HostBinding('hidden')
], SerErrorDirective.prototype, "hidden", void 0);
SerErrorDirective = __decorate([
    Directive({
        // tslint:disable-next-line: directive-selector
        selector: '[serError]'
    }),
    __param(0, Inject(forwardRef(() => SerErrorsDirective)))
], SerErrorDirective);

var PinInputComponent_1;
let PinInputComponent = PinInputComponent_1 = class PinInputComponent {
    constructor() {
        this.show = false;
        this.inputs = [];
        this.codeLength = 4;
        this.onlyNumber = true;
        this.isCodeHidden = false;
        this.value = [];
        this.isDisabled = false;
    }
    writeValue(obj) {
        if (hasValue(obj)) {
            this.value = obj.toString().split('');
        }
    }
    ngOnInit() {
        this.type = (this.isCodeHidden) ? 'password' : 'text';
        this.codeInputs = Array(this.codeLength);
    }
    ngAfterViewInit() {
        this.inputsList.forEach((item, i) => {
            if (hasValue(this.value[i])) {
                item.nativeElement.value = this.value[i];
            }
            this.inputs.push(item.nativeElement);
        });
    }
    canInputValue(value) {
        if (!hasValue(value)) {
            return true;
        }
        if (this.onlyNumber) {
            return /^[0-9]+$/.test(value.toString());
        }
        else {
            return /^[0-9a-zA-Z]+$/.test(value.toString());
        }
    }
    generateValue() {
        const values = [];
        this.inputs.forEach((input) => {
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
    }
    onInput(e, i) {
        const next = i + 1;
        const target = e.target;
        const value = e.data || target.value;
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
    }
    onKeydown(e, i) {
        return __awaiter(this, void 0, void 0, function* () {
            const prev = i - 1;
            const next = i + 1;
            const value = e.target.value;
            const backspace = e.key.toLowerCase() === 'backspace';
            if (backspace) {
                if (prev >= 0) {
                    setTimeout(() => {
                        this.inputs[prev].focus();
                    });
                }
                return;
            }
            if (!this.canInputValue(e.key.toLowerCase())) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            if (hasValue(value)) {
                e.preventDefault();
                e.stopPropagation();
                if (next < this.codeLength) {
                    this.inputs[next].focus();
                }
            }
        });
    }
    onClick(e) {
        let index = this.codeLength - 1;
        e.target.setSelectionRange(e.target.value.length, e.target.value.length);
        for (let i = 0; i < this.inputs.length; i++) {
            if (!hasValue(this.inputs[i].value)) {
                index = i;
                break;
            }
        }
        if (hasValue(index)) {
            this.inputs[index].focus();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    onChange(_) { }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    onTouch() { }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
    }
};
__decorate([
    ViewChildren('input')
], PinInputComponent.prototype, "inputsList", void 0);
__decorate([
    HostBinding('class.show')
], PinInputComponent.prototype, "show", void 0);
__decorate([
    Input()
], PinInputComponent.prototype, "codeLength", void 0);
__decorate([
    Input()
], PinInputComponent.prototype, "onlyNumber", void 0);
__decorate([
    Input()
], PinInputComponent.prototype, "isCodeHidden", void 0);
PinInputComponent = PinInputComponent_1 = __decorate([
    Component({
        selector: 'pin-input',
        template: "<span *ngFor=\"let holder of codeInputs; index as i\">\r\n\r\n    <input class=\"not-styled\" #input\r\n    [type]=\"type\"\r\n    [disabled]=\"isDisabled\"\r\n    (input)=\"onInput($event, i)\"\r\n    (keydown)=\"onKeydown($event, i)\"\r\n    (click)=\"onClick($event)\"\r\n    autocomplete=\"chrome-off\"\r\n    maxlength=\"1\"\r\n     />\r\n\r\n    <!-- <input (paste)=\"onPaste($event, i)\" /> -->\r\n\r\n</span>\r\n",
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => PinInputComponent_1),
                multi: true
            }
        ]
    })
], PinInputComponent);

let DataService = class DataService {
    constructor() {
        this.filteredData = [];
        this.subject = new Subject$1();
    }
    setData(data) {
        this.filteredData = data;
        this.subject.next(data);
    }
    getData() {
        return this.subject.asObservable();
    }
    getFilteredData() {
        if (this.filteredData && this.filteredData.length > 0) {
            return this.filteredData;
        }
        else {
            return [];
        }
    }
};
DataService.ɵprov = ɵɵdefineInjectable({ factory: function DataService_Factory() { return new DataService(); }, token: DataService, providedIn: "root" });
DataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DataService);

let SerSelectListFilterPipe = class SerSelectListFilterPipe {
    constructor(ds) {
        this.ds = ds;
    }
    transform(items, filter, searchBy) {
        if (!hasValue(items) || !hasValue(filter)) {
            // this.ds.setData(items);
            return items;
        }
        const filteredList = items.filter((item) => this.applyFilter(item, filter, searchBy));
        // this.ds.setData(filteredList);
        if (hasValue(filteredList)) {
            return filteredList;
        }
        else {
            return [];
        }
    }
    applyFilter(item, filter, searchBy) {
        let found = false;
        if (searchBy.length > 0) {
            if (item.grpTitle) {
                found = true;
            }
            else {
                for (let t = 0; t < searchBy.length; t++) {
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
                for (const prop in item) {
                    if (filter && item[prop]) {
                        if (item[prop].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                            found = true;
                        }
                    }
                }
            }
        }
        return found;
    }
};
SerSelectListFilterPipe.ctorParameters = () => [
    { type: DataService }
];
SerSelectListFilterPipe = __decorate([
    Pipe({
        name: 'serSelectListFilter',
        pure: true
    })
], SerSelectListFilterPipe);

let SDItemDirective = class SDItemDirective {
    constructor(template) {
        this.template = template;
    }
};
SDItemDirective.ctorParameters = () => [
    { type: TemplateRef }
];
SDItemDirective = __decorate([
    Directive({
        selector: '[sd-item]'
    })
], SDItemDirective);
let SDBadgeDirective = class SDBadgeDirective {
    constructor(template) {
        this.template = template;
    }
};
SDBadgeDirective.ctorParameters = () => [
    { type: TemplateRef }
];
SDBadgeDirective = __decorate([
    Directive({
        selector: '[sd-badge]'
    })
], SDBadgeDirective);
let SDSearchDirective = class SDSearchDirective {
    constructor(template) {
        this.template = template;
    }
};
SDSearchDirective.ctorParameters = () => [
    { type: TemplateRef }
];
SDSearchDirective = __decorate([
    Directive({
        selector: '[sd-search]'
    })
], SDSearchDirective);

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
let VirtualScrollerComponent = class VirtualScrollerComponent {
    constructor(element, renderer, zone, changeDetectorRef, platformId, options) {
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
        this.compareItems = (item1, item2) => item1 === item2;
        this.vsUpdate = new EventEmitter();
        this.vsChange = new EventEmitter();
        this.vsStart = new EventEmitter();
        this.vsEnd = new EventEmitter();
        this.calculatedScrollbarWidth = 0;
        this.calculatedScrollbarHeight = 0;
        this.padding = 0;
        this.previousViewPort = {};
        this.cachedPageSize = 0;
        this.previousScrollNumberElements = 0;
        this.isAngularUniversalSSR = isPlatformServer(platformId);
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
    get viewPortInfo() {
        let pageInfo = this.previousViewPort || {};
        return {
            startIndex: pageInfo.startIndex || 0,
            endIndex: pageInfo.endIndex || 0,
            scrollStartPosition: pageInfo.scrollStartPosition || 0,
            scrollEndPosition: pageInfo.scrollEndPosition || 0,
            maxScrollPosition: pageInfo.maxScrollPosition || 0,
            startIndexWithBuffer: pageInfo.startIndexWithBuffer || 0,
            endIndexWithBuffer: pageInfo.endIndexWithBuffer || 0
        };
    }
    get enableUnequalChildrenSizes() {
        return this._enableUnequalChildrenSizes;
    }
    set enableUnequalChildrenSizes(value) {
        if (this._enableUnequalChildrenSizes === value) {
            return;
        }
        this._enableUnequalChildrenSizes = value;
        this.minMeasuredChildWidth = undefined;
        this.minMeasuredChildHeight = undefined;
    }
    get bufferAmount() {
        if (typeof (this._bufferAmount) === 'number' && this._bufferAmount >= 0) {
            return this._bufferAmount;
        }
        else {
            return this.enableUnequalChildrenSizes ? 5 : 0;
        }
    }
    set bufferAmount(value) {
        this._bufferAmount = value;
    }
    get scrollThrottlingTime() {
        return this._scrollThrottlingTime;
    }
    set scrollThrottlingTime(value) {
        this._scrollThrottlingTime = value;
        this.updateOnScrollFunction();
    }
    get scrollDebounceTime() {
        return this._scrollDebounceTime;
    }
    set scrollDebounceTime(value) {
        this._scrollDebounceTime = value;
        this.updateOnScrollFunction();
    }
    updateOnScrollFunction() {
        if (this.scrollDebounceTime) {
            this.onScroll = this.debounce(() => {
                this.refresh_internal(false);
            }, this.scrollDebounceTime);
        }
        else if (this.scrollThrottlingTime) {
            this.onScroll = this.throttleTrailing(() => {
                this.refresh_internal(false);
            }, this.scrollThrottlingTime);
        }
        else {
            this.onScroll = () => {
                this.refresh_internal(false);
            };
        }
    }
    get checkResizeInterval() {
        return this._checkResizeInterval;
    }
    set checkResizeInterval(value) {
        if (this._checkResizeInterval === value) {
            return;
        }
        this._checkResizeInterval = value;
        this.addScrollEventHandlers();
    }
    get items() {
        return this._items;
    }
    set items(value) {
        if (value === this._items) {
            return;
        }
        this._items = value || [];
        this.refresh_internal(true);
    }
    get horizontal() {
        return this._horizontal;
    }
    set horizontal(value) {
        this._horizontal = value;
        this.updateDirection();
    }
    revertParentOverscroll() {
        const scrollElement = this.getScrollElement();
        if (scrollElement && this.oldParentScrollOverflow) {
            scrollElement.style['overflow-y'] = this.oldParentScrollOverflow.y;
            scrollElement.style['overflow-x'] = this.oldParentScrollOverflow.x;
        }
        this.oldParentScrollOverflow = undefined;
    }
    get parentScroll() {
        return this._parentScroll;
    }
    set parentScroll(value) {
        if (this._parentScroll === value) {
            return;
        }
        this.revertParentOverscroll();
        this._parentScroll = value;
        this.addScrollEventHandlers();
        const scrollElement = this.getScrollElement();
        if (this.modifyOverflowStyleOfParentScroll && scrollElement !== this.element.nativeElement) {
            this.oldParentScrollOverflow = { x: scrollElement.style['overflow-x'], y: scrollElement.style['overflow-y'] };
            scrollElement.style['overflow-y'] = this.horizontal ? 'visible' : 'auto';
            scrollElement.style['overflow-x'] = this.horizontal ? 'auto' : 'visible';
        }
    }
    ngOnInit() {
        this.addScrollEventHandlers();
    }
    ngOnDestroy() {
        this.removeScrollEventHandlers();
        this.revertParentOverscroll();
    }
    ngOnChanges(changes) {
        let indexLengthChanged = this.cachedItemsLength !== this.items.length;
        this.cachedItemsLength = this.items.length;
        const firstRun = !changes.items || !changes.items.previousValue || changes.items.previousValue.length === 0;
        this.refresh_internal(indexLengthChanged || firstRun);
    }
    ngDoCheck() {
        if (this.cachedItemsLength !== this.items.length) {
            this.cachedItemsLength = this.items.length;
            this.refresh_internal(true);
            return;
        }
        if (this.previousViewPort && this.viewPortItems && this.viewPortItems.length > 0) {
            let itemsArrayChanged = false;
            for (let i = 0; i < this.viewPortItems.length; ++i) {
                if (!this.compareItems(this.items[this.previousViewPort.startIndexWithBuffer + i], this.viewPortItems[i])) {
                    itemsArrayChanged = true;
                    break;
                }
            }
            if (itemsArrayChanged) {
                this.refresh_internal(true);
            }
        }
    }
    refresh() {
        this.refresh_internal(true);
    }
    invalidateAllCachedMeasurements() {
        this.wrapGroupDimensions = {
            maxChildSizePerWrapGroup: [],
            numberOfKnownWrapGroupChildSizes: 0,
            sumOfKnownWrapGroupChildWidths: 0,
            sumOfKnownWrapGroupChildHeights: 0
        };
        this.minMeasuredChildWidth = undefined;
        this.minMeasuredChildHeight = undefined;
        this.refresh_internal(false);
    }
    invalidateCachedMeasurementForItem(item) {
        if (this.enableUnequalChildrenSizes) {
            let index = this.items && this.items.indexOf(item);
            if (index >= 0) {
                this.invalidateCachedMeasurementAtIndex(index);
            }
        }
        else {
            this.minMeasuredChildWidth = undefined;
            this.minMeasuredChildHeight = undefined;
        }
        this.refresh_internal(false);
    }
    invalidateCachedMeasurementAtIndex(index) {
        if (this.enableUnequalChildrenSizes) {
            let cachedMeasurement = this.wrapGroupDimensions.maxChildSizePerWrapGroup[index];
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
    }
    scrollInto(item, alignToBeginning = true, additionalOffset = 0, animationMilliseconds = undefined, animationCompletedCallback = undefined) {
        let index = this.items.indexOf(item);
        if (index === -1) {
            return;
        }
        this.scrollToIndex(index, alignToBeginning, additionalOffset, animationMilliseconds, animationCompletedCallback);
    }
    scrollToIndex(index, alignToBeginning = true, additionalOffset = 0, animationMilliseconds = undefined, animationCompletedCallback = undefined) {
        let maxRetries = 5;
        let retryIfNeeded = () => {
            --maxRetries;
            if (maxRetries <= 0) {
                if (animationCompletedCallback) {
                    animationCompletedCallback();
                }
                return;
            }
            let dimensions = this.calculateDimensions();
            let desiredStartIndex = Math.min(Math.max(index, 0), dimensions.itemCount - 1);
            if (this.previousViewPort.startIndex === desiredStartIndex) {
                if (animationCompletedCallback) {
                    animationCompletedCallback();
                }
                return;
            }
            this.scrollToIndex_internal(index, alignToBeginning, additionalOffset, 0, retryIfNeeded);
        };
        this.scrollToIndex_internal(index, alignToBeginning, additionalOffset, animationMilliseconds, retryIfNeeded);
    }
    scrollToIndex_internal(index, alignToBeginning = true, additionalOffset = 0, animationMilliseconds = undefined, animationCompletedCallback = undefined) {
        animationMilliseconds = animationMilliseconds === undefined ? this.scrollAnimationTime : animationMilliseconds;
        let dimensions = this.calculateDimensions();
        let scroll = this.calculatePadding(index, dimensions) + additionalOffset;
        if (!alignToBeginning) {
            scroll -= dimensions.wrapGroupsPerPage * dimensions[this._childScrollDim];
        }
        this.scrollToPosition(scroll, animationMilliseconds, animationCompletedCallback);
    }
    scrollToPosition(scrollPosition, animationMilliseconds = undefined, animationCompletedCallback = undefined) {
        scrollPosition += this.getElementsOffset();
        animationMilliseconds = animationMilliseconds === undefined ? this.scrollAnimationTime : animationMilliseconds;
        let scrollElement = this.getScrollElement();
        let animationRequest;
        if (this.currentTween) {
            this.currentTween.stop();
            this.currentTween = undefined;
        }
        if (!animationMilliseconds) {
            this.renderer.setProperty(scrollElement, this._scrollType, scrollPosition);
            this.refresh_internal(false, animationCompletedCallback);
            return;
        }
        const tweenConfigObj = { scrollPosition: scrollElement[this._scrollType] };
        let newTween = new Tween(tweenConfigObj)
            .to({ scrollPosition }, animationMilliseconds)
            .easing(Easing.Quadratic.Out)
            .onUpdate((data) => {
            if (isNaN(data.scrollPosition)) {
                return;
            }
            this.renderer.setProperty(scrollElement, this._scrollType, data.scrollPosition);
            this.refresh_internal(false);
        })
            .onStop(() => {
            cancelAnimationFrame(animationRequest);
        })
            .start();
        const animate = (time) => {
            if (!newTween["isPlaying"]()) {
                return;
            }
            newTween.update(time);
            if (tweenConfigObj.scrollPosition === scrollPosition) {
                this.refresh_internal(false, animationCompletedCallback);
                return;
            }
            this.zone.runOutsideAngular(() => {
                animationRequest = requestAnimationFrame(animate);
            });
        };
        animate();
        this.currentTween = newTween;
    }
    getElementSize(element) {
        let result = element.getBoundingClientRect();
        let styles = getComputedStyle(element);
        let marginTop = parseInt(styles['margin-top'], 10) || 0;
        let marginBottom = parseInt(styles['margin-bottom'], 10) || 0;
        let marginLeft = parseInt(styles['margin-left'], 10) || 0;
        let marginRight = parseInt(styles['margin-right'], 10) || 0;
        return {
            top: result.top + marginTop,
            bottom: result.bottom + marginBottom,
            left: result.left + marginLeft,
            right: result.right + marginRight,
            width: result.width + marginLeft + marginRight,
            height: result.height + marginTop + marginBottom
        };
    }
    checkScrollElementResized() {
        let boundingRect = this.getElementSize(this.getScrollElement());
        let sizeChanged;
        if (!this.previousScrollBoundingRect) {
            sizeChanged = true;
        }
        else {
            let widthChange = Math.abs(boundingRect.width - this.previousScrollBoundingRect.width);
            let heightChange = Math.abs(boundingRect.height - this.previousScrollBoundingRect.height);
            sizeChanged = widthChange > this.resizeBypassRefreshThreshold || heightChange > this.resizeBypassRefreshThreshold;
        }
        if (sizeChanged) {
            this.previousScrollBoundingRect = boundingRect;
            if (boundingRect.width > 0 && boundingRect.height > 0) {
                this.refresh_internal(false);
            }
        }
    }
    updateDirection() {
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
    }
    debounce(func, wait) {
        const throttled = this.throttleTrailing(func, wait);
        const result = function () {
            throttled['cancel']();
            throttled.apply(this, arguments);
        };
        result['cancel'] = function () {
            throttled['cancel']();
        };
        return result;
    }
    throttleTrailing(func, wait) {
        let timeout = undefined;
        let _arguments = arguments;
        const result = function () {
            const _this = this;
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
    }
    refresh_internal(itemsArrayModified, refreshCompletedCallback = undefined, maxRunTimes = 2) {
        //note: maxRunTimes is to force it to keep recalculating if the previous iteration caused a re-render (different sliced items in viewport or scrollPosition changed).
        //The default of 2x max will probably be accurate enough without causing too large a performance bottleneck
        //The code would typically quit out on the 2nd iteration anyways. The main time it'd think more than 2 runs would be necessary would be for vastly different sized child items or if this is the 1st time the items array was initialized.
        //Without maxRunTimes, If the user is actively scrolling this code would become an infinite loop until they stopped scrolling. This would be okay, except each scroll event would start an additional infinte loop. We want to short-circuit it to prevent this.
        if (itemsArrayModified && this.previousViewPort && this.previousViewPort.scrollStartPosition > 0) {
            //if items were prepended, scroll forward to keep same items visible
            let oldViewPort = this.previousViewPort;
            let oldViewPortItems = this.viewPortItems;
            let oldRefreshCompletedCallback = refreshCompletedCallback;
            refreshCompletedCallback = () => {
                let scrollLengthDelta = this.previousViewPort.scrollLength - oldViewPort.scrollLength;
                if (scrollLengthDelta > 0 && this.viewPortItems) {
                    let oldStartItem = oldViewPortItems[0];
                    let oldStartItemIndex = this.items.findIndex(x => this.compareItems(oldStartItem, x));
                    if (oldStartItemIndex > this.previousViewPort.startIndexWithBuffer) {
                        let itemOrderChanged = false;
                        for (let i = 1; i < this.viewPortItems.length; ++i) {
                            if (!this.compareItems(this.items[oldStartItemIndex + i], oldViewPortItems[i])) {
                                itemOrderChanged = true;
                                break;
                            }
                        }
                        if (!itemOrderChanged) {
                            this.scrollToPosition(this.previousViewPort.scrollStartPosition + scrollLengthDelta, 0, oldRefreshCompletedCallback);
                            return;
                        }
                    }
                }
                if (oldRefreshCompletedCallback) {
                    oldRefreshCompletedCallback();
                }
            };
        }
        this.zone.runOutsideAngular(() => {
            requestAnimationFrame(() => {
                if (itemsArrayModified) {
                    this.resetWrapGroupDimensions();
                }
                let viewport = this.calculateViewport();
                let startChanged = itemsArrayModified || viewport.startIndex !== this.previousViewPort.startIndex;
                let endChanged = itemsArrayModified || viewport.endIndex !== this.previousViewPort.endIndex;
                let scrollLengthChanged = viewport.scrollLength !== this.previousViewPort.scrollLength;
                let paddingChanged = viewport.padding !== this.previousViewPort.padding;
                let scrollPositionChanged = viewport.scrollStartPosition !== this.previousViewPort.scrollStartPosition || viewport.scrollEndPosition !== this.previousViewPort.scrollEndPosition || viewport.maxScrollPosition !== this.previousViewPort.maxScrollPosition;
                this.previousViewPort = viewport;
                if (scrollLengthChanged) {
                    this.renderer.setStyle(this.invisiblePaddingElementRef.nativeElement, this._invisiblePaddingProperty, `${viewport.scrollLength}px`);
                }
                if (paddingChanged) {
                    if (this.useMarginInsteadOfTranslate) {
                        this.renderer.setStyle(this.contentElementRef.nativeElement, this._marginDir, `${viewport.padding}px`);
                    }
                    else {
                        this.renderer.setStyle(this.contentElementRef.nativeElement, 'transform', `${this._translateDir}(${viewport.padding}px)`);
                        this.renderer.setStyle(this.contentElementRef.nativeElement, 'webkitTransform', `${this._translateDir}(${viewport.padding}px)`);
                    }
                }
                if (this.headerElementRef) {
                    let scrollPosition = this.getScrollElement()[this._scrollType];
                    let containerOffset = this.getElementsOffset();
                    let offset = Math.max(scrollPosition - viewport.padding - containerOffset + this.headerElementRef.nativeElement.clientHeight, 0);
                    this.renderer.setStyle(this.headerElementRef.nativeElement, 'transform', `${this._translateDir}(${offset}px)`);
                    this.renderer.setStyle(this.headerElementRef.nativeElement, 'webkitTransform', `${this._translateDir}(${offset}px)`);
                }
                const changeEventArg = (startChanged || endChanged) ? {
                    startIndex: viewport.startIndex,
                    endIndex: viewport.endIndex,
                    scrollStartPosition: viewport.scrollStartPosition,
                    scrollEndPosition: viewport.scrollEndPosition,
                    startIndexWithBuffer: viewport.startIndexWithBuffer,
                    endIndexWithBuffer: viewport.endIndexWithBuffer,
                    maxScrollPosition: viewport.maxScrollPosition
                } : undefined;
                if (startChanged || endChanged || scrollPositionChanged) {
                    const handleChanged = () => {
                        // update the scroll list to trigger re-render of components in viewport
                        this.viewPortItems = viewport.startIndexWithBuffer >= 0 && viewport.endIndexWithBuffer >= 0 ? this.items.slice(viewport.startIndexWithBuffer, viewport.endIndexWithBuffer + 1) : [];
                        this.vsUpdate.emit(this.viewPortItems);
                        if (startChanged) {
                            this.vsStart.emit(changeEventArg);
                        }
                        if (endChanged) {
                            this.vsEnd.emit(changeEventArg);
                        }
                        if (startChanged || endChanged) {
                            this.changeDetectorRef.markForCheck();
                            this.vsChange.emit(changeEventArg);
                        }
                        if (maxRunTimes > 0) {
                            this.refresh_internal(false, refreshCompletedCallback, maxRunTimes - 1);
                            return;
                        }
                        if (refreshCompletedCallback) {
                            refreshCompletedCallback();
                        }
                    };
                    if (this.executeRefreshOutsideAngularZone) {
                        handleChanged();
                    }
                    else {
                        this.zone.run(handleChanged);
                    }
                }
                else {
                    if (maxRunTimes > 0 && (scrollLengthChanged || paddingChanged)) {
                        this.refresh_internal(false, refreshCompletedCallback, maxRunTimes - 1);
                        return;
                    }
                    if (refreshCompletedCallback) {
                        refreshCompletedCallback();
                    }
                }
            });
        });
    }
    getScrollElement() {
        return this.parentScroll instanceof Window ? document.scrollingElement || document.documentElement || document.body : this.parentScroll || this.element.nativeElement;
    }
    addScrollEventHandlers() {
        if (this.isAngularUniversalSSR) {
            return;
        }
        let scrollElement = this.getScrollElement();
        this.removeScrollEventHandlers();
        this.zone.runOutsideAngular(() => {
            if (this.parentScroll instanceof Window) {
                this.disposeScrollHandler = this.renderer.listen('window', 'scroll', this.onScroll);
                this.disposeResizeHandler = this.renderer.listen('window', 'resize', this.onScroll);
            }
            else {
                this.disposeScrollHandler = this.renderer.listen(scrollElement, 'scroll', this.onScroll);
                if (this._checkResizeInterval > 0) {
                    this.checkScrollElementResizedTimer = setInterval(() => { this.checkScrollElementResized(); }, this._checkResizeInterval);
                }
            }
        });
    }
    removeScrollEventHandlers() {
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
    }
    getElementsOffset() {
        if (this.isAngularUniversalSSR) {
            return 0;
        }
        let offset = 0;
        if (this.containerElementRef && this.containerElementRef.nativeElement) {
            offset += this.containerElementRef.nativeElement[this._offsetType];
        }
        if (this.parentScroll) {
            let scrollElement = this.getScrollElement();
            let elementClientRect = this.getElementSize(this.element.nativeElement);
            let scrollClientRect = this.getElementSize(scrollElement);
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
    }
    countItemsPerWrapGroup() {
        if (this.isAngularUniversalSSR) {
            return Math.round(this.horizontal ? this.ssrViewportHeight / this.ssrChildHeight : this.ssrViewportWidth / this.ssrChildWidth);
        }
        let propertyName = this.horizontal ? 'offsetLeft' : 'offsetTop';
        let children = ((this.containerElementRef && this.containerElementRef.nativeElement) || this.contentElementRef.nativeElement).children;
        let childrenLength = children ? children.length : 0;
        if (childrenLength === 0) {
            return 1;
        }
        let firstOffset = children[0][propertyName];
        let result = 1;
        while (result < childrenLength && firstOffset === children[result][propertyName]) {
            ++result;
        }
        return result;
    }
    getScrollStartPosition() {
        let windowScrollValue = undefined;
        if (this.parentScroll instanceof Window) {
            windowScrollValue = window[this._pageOffsetType];
        }
        return windowScrollValue || this.getScrollElement()[this._scrollType] || 0;
    }
    resetWrapGroupDimensions() {
        const oldWrapGroupDimensions = this.wrapGroupDimensions;
        this.invalidateAllCachedMeasurements();
        if (!this.enableUnequalChildrenSizes || !oldWrapGroupDimensions || oldWrapGroupDimensions.numberOfKnownWrapGroupChildSizes === 0) {
            return;
        }
        const itemsPerWrapGroup = this.countItemsPerWrapGroup();
        for (let wrapGroupIndex = 0; wrapGroupIndex < oldWrapGroupDimensions.maxChildSizePerWrapGroup.length; ++wrapGroupIndex) {
            const oldWrapGroupDimension = oldWrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex];
            if (!oldWrapGroupDimension || !oldWrapGroupDimension.items || !oldWrapGroupDimension.items.length) {
                continue;
            }
            if (oldWrapGroupDimension.items.length !== itemsPerWrapGroup) {
                return;
            }
            let itemsChanged = false;
            let arrayStartIndex = itemsPerWrapGroup * wrapGroupIndex;
            for (let i = 0; i < itemsPerWrapGroup; ++i) {
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
    }
    calculateDimensions() {
        let scrollElement = this.getScrollElement();
        const maxCalculatedScrollBarSize = 25; // Note: Formula to auto-calculate doesn't work for ParentScroll, so we default to this if not set by consuming application
        this.calculatedScrollbarHeight = Math.max(Math.min(scrollElement.offsetHeight - scrollElement.clientHeight, maxCalculatedScrollBarSize), this.calculatedScrollbarHeight);
        this.calculatedScrollbarWidth = Math.max(Math.min(scrollElement.offsetWidth - scrollElement.clientWidth, maxCalculatedScrollBarSize), this.calculatedScrollbarWidth);
        let viewportWidth = scrollElement.offsetWidth - (this.scrollbarWidth || this.calculatedScrollbarWidth || (this.horizontal ? 0 : maxCalculatedScrollBarSize));
        let viewportHeight = scrollElement.offsetHeight - (this.scrollbarHeight || this.calculatedScrollbarHeight || (this.horizontal ? maxCalculatedScrollBarSize : 0));
        let content = (this.containerElementRef && this.containerElementRef.nativeElement) || this.contentElementRef.nativeElement;
        let itemsPerWrapGroup = this.countItemsPerWrapGroup();
        let wrapGroupsPerPage;
        let defaultChildWidth;
        let defaultChildHeight;
        if (this.isAngularUniversalSSR) {
            viewportWidth = this.ssrViewportWidth;
            viewportHeight = this.ssrViewportHeight;
            defaultChildWidth = this.ssrChildWidth;
            defaultChildHeight = this.ssrChildHeight;
            let itemsPerRow = Math.max(Math.ceil(viewportWidth / defaultChildWidth), 1);
            let itemsPerCol = Math.max(Math.ceil(viewportHeight / defaultChildHeight), 1);
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
                let child = content.children[0];
                let clientRect = this.getElementSize(child);
                this.minMeasuredChildWidth = Math.min(this.minMeasuredChildWidth, clientRect.width);
                this.minMeasuredChildHeight = Math.min(this.minMeasuredChildHeight, clientRect.height);
            }
            defaultChildWidth = this.childWidth || this.minMeasuredChildWidth || viewportWidth;
            defaultChildHeight = this.childHeight || this.minMeasuredChildHeight || viewportHeight;
            let itemsPerRow = Math.max(Math.ceil(viewportWidth / defaultChildWidth), 1);
            let itemsPerCol = Math.max(Math.ceil(viewportHeight / defaultChildHeight), 1);
            wrapGroupsPerPage = this.horizontal ? itemsPerRow : itemsPerCol;
        }
        else {
            let scrollOffset = scrollElement[this._scrollType] - (this.previousViewPort ? this.previousViewPort.padding : 0);
            let arrayStartIndex = this.previousViewPort.startIndexWithBuffer || 0;
            let wrapGroupIndex = Math.ceil(arrayStartIndex / itemsPerWrapGroup);
            let maxWidthForWrapGroup = 0;
            let maxHeightForWrapGroup = 0;
            let sumOfVisibleMaxWidths = 0;
            let sumOfVisibleMaxHeights = 0;
            wrapGroupsPerPage = 0;
            for (let i = 0; i < content.children.length; ++i) {
                ++arrayStartIndex;
                let child = content.children[i];
                let clientRect = this.getElementSize(child);
                maxWidthForWrapGroup = Math.max(maxWidthForWrapGroup, clientRect.width);
                maxHeightForWrapGroup = Math.max(maxHeightForWrapGroup, clientRect.height);
                if (arrayStartIndex % itemsPerWrapGroup === 0) {
                    let oldValue = this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex];
                    if (oldValue) {
                        --this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                        this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths -= oldValue.childWidth || 0;
                        this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights -= oldValue.childHeight || 0;
                    }
                    ++this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
                    const items = this.items.slice(arrayStartIndex - itemsPerWrapGroup, arrayStartIndex);
                    this.wrapGroupDimensions.maxChildSizePerWrapGroup[wrapGroupIndex] = {
                        childWidth: maxWidthForWrapGroup,
                        childHeight: maxHeightForWrapGroup,
                        items: items
                    };
                    this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths += maxWidthForWrapGroup;
                    this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights += maxHeightForWrapGroup;
                    if (this.horizontal) {
                        let maxVisibleWidthForWrapGroup = Math.min(maxWidthForWrapGroup, Math.max(viewportWidth - sumOfVisibleMaxWidths, 0));
                        if (scrollOffset > 0) {
                            let scrollOffsetToRemove = Math.min(scrollOffset, maxVisibleWidthForWrapGroup);
                            maxVisibleWidthForWrapGroup -= scrollOffsetToRemove;
                            scrollOffset -= scrollOffsetToRemove;
                        }
                        sumOfVisibleMaxWidths += maxVisibleWidthForWrapGroup;
                        if (maxVisibleWidthForWrapGroup > 0 && viewportWidth >= sumOfVisibleMaxWidths) {
                            ++wrapGroupsPerPage;
                        }
                    }
                    else {
                        let maxVisibleHeightForWrapGroup = Math.min(maxHeightForWrapGroup, Math.max(viewportHeight - sumOfVisibleMaxHeights, 0));
                        if (scrollOffset > 0) {
                            let scrollOffsetToRemove = Math.min(scrollOffset, maxVisibleHeightForWrapGroup);
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
            let averageChildWidth = this.wrapGroupDimensions.sumOfKnownWrapGroupChildWidths / this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
            let averageChildHeight = this.wrapGroupDimensions.sumOfKnownWrapGroupChildHeights / this.wrapGroupDimensions.numberOfKnownWrapGroupChildSizes;
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
        let itemCount = this.items.length;
        let itemsPerPage = itemsPerWrapGroup * wrapGroupsPerPage;
        let pageCount_fractional = itemCount / itemsPerPage;
        let numberOfWrapGroups = Math.ceil(itemCount / itemsPerWrapGroup);
        let scrollLength = 0;
        let defaultScrollLengthPerWrapGroup = this.horizontal ? defaultChildWidth : defaultChildHeight;
        if (this.enableUnequalChildrenSizes) {
            let numUnknownChildSizes = 0;
            for (let i = 0; i < numberOfWrapGroups; ++i) {
                let childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
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
        let viewportLength = this.horizontal ? viewportWidth : viewportHeight;
        let maxScrollPosition = Math.max(scrollLength - viewportLength, 0);
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
    }
    calculatePadding(arrayStartIndexWithBuffer, dimensions) {
        if (dimensions.itemCount === 0) {
            return 0;
        }
        let defaultScrollLengthPerWrapGroup = dimensions[this._childScrollDim];
        let startingWrapGroupIndex = Math.floor(arrayStartIndexWithBuffer / dimensions.itemsPerWrapGroup) || 0;
        if (!this.enableUnequalChildrenSizes) {
            return defaultScrollLengthPerWrapGroup * startingWrapGroupIndex;
        }
        let numUnknownChildSizes = 0;
        let result = 0;
        for (let i = 0; i < startingWrapGroupIndex; ++i) {
            let childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
            if (childSize) {
                result += childSize;
            }
            else {
                ++numUnknownChildSizes;
            }
        }
        result += Math.round(numUnknownChildSizes * defaultScrollLengthPerWrapGroup);
        return result;
    }
    calculatePageInfo(scrollPosition, dimensions) {
        let scrollPercentage = 0;
        if (this.enableUnequalChildrenSizes) {
            const numberOfWrapGroups = Math.ceil(dimensions.itemCount / dimensions.itemsPerWrapGroup);
            let totalScrolledLength = 0;
            let defaultScrollLengthPerWrapGroup = dimensions[this._childScrollDim];
            for (let i = 0; i < numberOfWrapGroups; ++i) {
                let childSize = this.wrapGroupDimensions.maxChildSizePerWrapGroup[i] && this.wrapGroupDimensions.maxChildSizePerWrapGroup[i][this._childScrollDim];
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
        let startingArrayIndex_fractional = Math.min(Math.max(scrollPercentage * dimensions.pageCount_fractional, 0), dimensions.pageCount_fractional) * dimensions.itemsPerPage;
        let maxStart = dimensions.itemCount - dimensions.itemsPerPage - 1;
        let arrayStartIndex = Math.min(Math.floor(startingArrayIndex_fractional), maxStart);
        arrayStartIndex -= arrayStartIndex % dimensions.itemsPerWrapGroup; // round down to start of wrapGroup
        if (this.stripedTable) {
            let bufferBoundary = 2 * dimensions.itemsPerWrapGroup;
            if (arrayStartIndex % bufferBoundary !== 0) {
                arrayStartIndex = Math.max(arrayStartIndex - arrayStartIndex % bufferBoundary, 0);
            }
        }
        let arrayEndIndex = Math.ceil(startingArrayIndex_fractional) + dimensions.itemsPerPage - 1;
        let endIndexWithinWrapGroup = (arrayEndIndex + 1) % dimensions.itemsPerWrapGroup;
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
        let bufferSize = this.bufferAmount * dimensions.itemsPerWrapGroup;
        let startIndexWithBuffer = Math.min(Math.max(arrayStartIndex - bufferSize, 0), dimensions.itemCount - 1);
        let endIndexWithBuffer = Math.min(Math.max(arrayEndIndex + bufferSize, 0), dimensions.itemCount - 1);
        return {
            startIndex: arrayStartIndex,
            endIndex: arrayEndIndex,
            startIndexWithBuffer: startIndexWithBuffer,
            endIndexWithBuffer: endIndexWithBuffer,
            scrollStartPosition: scrollPosition,
            scrollEndPosition: scrollPosition + dimensions.viewportLength,
            maxScrollPosition: dimensions.maxScrollPosition
        };
    }
    calculateViewport() {
        let dimensions = this.calculateDimensions();
        let offset = this.getElementsOffset();
        let scrollStartPosition = this.getScrollStartPosition();
        if (scrollStartPosition > (dimensions.scrollLength + offset) && !(this.parentScroll instanceof Window)) {
            scrollStartPosition = dimensions.scrollLength;
        }
        else {
            scrollStartPosition -= offset;
        }
        scrollStartPosition = Math.max(0, scrollStartPosition);
        let pageInfo = this.calculatePageInfo(scrollStartPosition, dimensions);
        let newPadding = this.calculatePadding(pageInfo.startIndexWithBuffer, dimensions);
        let newScrollLength = dimensions.scrollLength;
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
    }
};
VirtualScrollerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['virtual-scroller-default-options',] }] }
];
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "executeRefreshOutsideAngularZone", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "enableUnequalChildrenSizes", null);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "useMarginInsteadOfTranslate", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "modifyOverflowStyleOfParentScroll", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "stripedTable", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "scrollbarWidth", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "scrollbarHeight", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "childWidth", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "childHeight", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "ssrChildWidth", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "ssrChildHeight", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "ssrViewportWidth", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "ssrViewportHeight", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "bufferAmount", null);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "scrollAnimationTime", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "resizeBypassRefreshThreshold", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "scrollThrottlingTime", null);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "scrollDebounceTime", null);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "checkResizeInterval", null);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "items", null);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "compareItems", void 0);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "horizontal", null);
__decorate([
    Input()
], VirtualScrollerComponent.prototype, "parentScroll", null);
__decorate([
    Output()
], VirtualScrollerComponent.prototype, "vsUpdate", void 0);
__decorate([
    Output()
], VirtualScrollerComponent.prototype, "vsChange", void 0);
__decorate([
    Output()
], VirtualScrollerComponent.prototype, "vsStart", void 0);
__decorate([
    Output()
], VirtualScrollerComponent.prototype, "vsEnd", void 0);
__decorate([
    ViewChild('content', { read: ElementRef, static: false })
], VirtualScrollerComponent.prototype, "contentElementRef", void 0);
__decorate([
    ViewChild('invisiblePadding', { read: ElementRef, static: false })
], VirtualScrollerComponent.prototype, "invisiblePaddingElementRef", void 0);
__decorate([
    ContentChild('header', { read: ElementRef, static: false })
], VirtualScrollerComponent.prototype, "headerElementRef", void 0);
__decorate([
    ContentChild('container', { read: ElementRef, static: false })
], VirtualScrollerComponent.prototype, "containerElementRef", void 0);
VirtualScrollerComponent = __decorate([
    Component({
        selector: 'virtual-scroller,[virtualScroller]',
        exportAs: 'virtualScroller',
        template: `
    <div class="total-padding" #invisiblePadding></div>
    <div class="scrollable-content" #content>
      <ng-content></ng-content>
    </div>
  `,
        host: {
            '[class.horizontal]': "horizontal",
            '[class.vertical]': "!horizontal",
            '[class.selfScroll]': "!parentScroll"
        },
        styles: [`
    :host {
      position: relative;
	  display: block;
      -webkit-overflow-scrolling: touch;
    }
	
	:host.horizontal.selfScroll {
      overflow-y: visible;
      overflow-x: auto;
	}
	:host.vertical.selfScroll {
      overflow-y: auto;
      overflow-x: visible;
	}
	
    .scrollable-content {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      max-width: 100vw;
      max-height: 100vh;
      position: absolute;
    }

	.scrollable-content ::ng-deep > * {
		box-sizing: border-box;
	}
	
	:host.horizontal {
		white-space: nowrap;
	}
	
	:host.horizontal .scrollable-content {
		display: flex;
	}
	
	:host.horizontal .scrollable-content ::ng-deep > * {
		flex-shrink: 0;
		flex-grow: 0;
		white-space: initial;
	}
	
    .total-padding {
      width: 1px;
      opacity: 0;
    }
    
    :host.horizontal .total-padding {
      height: 100%;
    }
  `]
    }),
    __param(4, Inject(PLATFORM_ID)),
    __param(5, Optional()), __param(5, Inject('virtual-scroller-default-options'))
], VirtualScrollerComponent);
let VirtualScrollerModule = class VirtualScrollerModule {
};
VirtualScrollerModule = __decorate([
    NgModule({
        exports: [VirtualScrollerComponent],
        declarations: [VirtualScrollerComponent],
        imports: [CommonModule],
        providers: [
            {
                provide: 'virtual-scroller-default-options',
                useFactory: VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY
            }
        ]
    })
], VirtualScrollerModule);

// tslint:disable: no-use-before-declare
// tslint:disable: no-host-metadata-property
// tslint:disable: max-line-length
// tslint:disable: no-output-rename
// tslint:disable: no-output-on-prefix
// tslint:disable: prefer-const
// tslint:disable: no-conflicting-lifecycle
// tslint:disable: component-class-suffix
// tslint:disable: component-selector
var SerSelectComponent_1;
const noop = () => {
};
const ɵ0 = noop;
let SerSelectComponent = SerSelectComponent_1 = class SerSelectComponent {
    constructor(_elementRef, cdr, ds, _renderer, multipleAttr, simple, primaryKey, labelKey) {
        this._elementRef = _elementRef;
        this.cdr = cdr;
        this.ds = ds;
        this._renderer = _renderer;
        this.data = [];
        this.onSelect = new EventEmitter();
        this.onDeSelect = new EventEmitter();
        this.onSelectAll = new EventEmitter();
        this.onDeSelectAll = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this.onScrollToEnd = new EventEmitter();
        this.onFilterSelectAll = new EventEmitter();
        this.onFilterDeSelectAll = new EventEmitter();
        this.onAddFilterNewItem = new EventEmitter();
        this.onGroupSelect = new EventEmitter();
        this.onGroupDeSelect = new EventEmitter();
        this.isDisabled = false;
        this.isActive = false;
        this.multipleClass = false;
        this.virtualdata = [];
        this.searchTerm$ = new Subject$1();
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
        this.searchTerm$.asObservable().pipe(debounceTime(1000), distinctUntilChanged(), tap(term => term)).subscribe(val => {
            this.filterInfiniteList(val);
        });
    }
    ngOnInit() {
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.multipleClass = !this.settings.singleSelection;
        this.cachedItems = this.cloneArray(this.data);
        this.subscription = this.ds.getData().subscribe(data => {
            if (data) {
                let len = 0;
                data.forEach((obj) => {
                    if (obj[this.settings.disabledKey]) {
                        this.isDisabledItemPresent = true;
                    }
                    if (!obj.hasOwnProperty('grpTitle')) {
                        len++;
                    }
                });
                this.filterLength = len;
                this.onFilterChange(data);
            }
        });
        this.virtualScroollInit = false;
    }
    ngOnChanges(changes) {
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
    }
    ngAfterViewInit() {
        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
    }
    onItemClick(item, k, e) {
        if (this.isDisabled || item[this.settings.disabledKey]) {
            return false;
        }
        let found = this.isSelected(item);
        let limit = this.selectedItems.length < this.settings.limitSelection ? true : false;
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
    }
    validate(c) {
        return null;
    }
    writeValue(value) {
        var _a, _b;
        if (hasValue(value)) {
            if (this.settings.singleSelection) {
                if (Array.isArray(value)) {
                    throw Error('Array detected as input, please add "multiple" attribute in the select or set "singleSelection" setting in false');
                }
                const selectedObject = (_a = this.data) === null || _a === void 0 ? void 0 : _a.find(item => {
                    return item[this.settings.primaryKey] === value;
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
                const selectedObjects = (_b = this.data) === null || _b === void 0 ? void 0 : _b.filter(item => {
                    return inArray(item[this.settings.primaryKey], value);
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
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
    }
    trackByFn(item) {
        return item[this.settings.primaryKey];
    }
    isSelected(clickedItem) {
        if (clickedItem[this.settings.disabledKey]) {
            return false;
        }
        let found = false;
        if (hasValue(this.selectedItems)) {
            for (const item of this.selectedItems) {
                if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
                    found = true;
                    break;
                }
            }
        }
        return found;
    }
    addSelected(item) {
        if (this.settings.singleSelection) {
            this.selectedItems = [item];
            this.onChangeCallback(item[this.settings.primaryKey]);
            this.onTouchedCallback(item[this.settings.primaryKey]);
            this.closeDropdown();
        }
        else {
            this.selectedItems.push(item);
            const items = this.selectedItems.map(element => element[this.settings.primaryKey]);
            this.onChangeCallback(items);
            this.onTouchedCallback(items);
        }
    }
    removeSelected(clickedItem) {
        if (hasValue(this.selectedItems)) {
            this.selectedItems.forEach((item, index) => {
                if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
                    this.selectedItems.splice(index, 1);
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
    }
    //#region dropdown status
    toggleDropdown(evt) {
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
    }
    openDropdown() {
        if (this.isDisabled) {
            return false;
        }
        this.isActive = true;
        this.dropdownSubs.push(fromEvent(window, 'click')
            .pipe(filter((e) => !this._elementRef.nativeElement.contains(e.target)))
            .subscribe(() => this.closeDropdown()));
        this.dropdownSubs.push(fromEvent(window, 'keyup')
            .pipe(filter((e) => e.key.toLowerCase() === 'escape' && this.settings.escapeToClose))
            .subscribe(() => this.closeDropdown()));
        this.dropdownSubs.push(fromEvent(this._elementRef.nativeElement, 'scroll').subscribe(() => console.log('scroll')));
        this.dropdownSubs.push(fromEvent(window, 'resize').subscribe(() => this.setPositionDropdown()));
        this.setPositionDropdown();
        this._renderer.appendChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
        if (this.settings.enableSearchFilter && !this.searchTempl) {
            setTimeout(() => {
                var _a;
                (_a = this.searchInput) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
            }, 0);
        }
        this.onOpen.emit(true);
    }
    closeDropdown() {
        if (this.searchInput) {
            this.searchInput.nativeElement.value = '';
        }
        this.clearSearch();
        this.isActive = false;
        this.dropdownSubs.forEach(s => s.unsubscribe());
        this.dropdownSubs = [];
        this.onClose.emit(false);
        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
    }
    setPositionDropdown() {
        setTimeout(() => {
            const dropdown = this.dropdownListElem.nativeElement;
            const el = this._elementRef.nativeElement;
            const remainingHeight = document.documentElement.offsetHeight - (dropdown.offsetHeight + el.getBoundingClientRect().top + el.offsetHeight);
            this._renderer.setStyle(dropdown, 'width', (el.offsetWidth) + 'px');
            this._renderer.setStyle(dropdown, 'left', (el.getBoundingClientRect().left) + 'px');
            if (remainingHeight > 0) {
                this._renderer.removeClass(el, 'ontop');
                this._renderer.removeClass(dropdown, 'ontop');
                this._elementRef.nativeElement.style.removeProperty('bottom');
                this._renderer.setStyle(dropdown, 'top', el.getBoundingClientRect().bottom + 'px');
            }
            else {
                this._renderer.addClass(el, 'ontop');
                this._renderer.addClass(dropdown, 'ontop');
                this._elementRef.nativeElement.style.removeProperty('top');
                this._renderer.setStyle(dropdown, 'bottom', (document.documentElement.offsetHeight - el.getBoundingClientRect().top) + 'px');
            }
        });
    }
    //#endregion
    toggleSelectAll() {
        if (!this.isSelectAll) {
            this.selectedItems = [];
            if (this.settings.groupBy) {
                this.groupedData.forEach((obj) => {
                    obj.selected = !obj[this.settings.disabledKey];
                });
                this.groupCachedItems.forEach((obj) => {
                    obj.selected = !obj[this.settings.disabledKey];
                });
            }
            // this.selectedItems = this.data.slice();
            this.selectedItems = this.data.filter((individualData) => !individualData[this.settings.disabledKey]);
            this.isSelectAll = true;
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);
            this.onSelectAll.emit(this.selectedItems);
        }
        else {
            if (this.settings.groupBy) {
                this.groupedData.forEach((obj) => {
                    obj.selected = false;
                });
                this.groupCachedItems.forEach((obj) => {
                    obj.selected = false;
                });
            }
            this.selectedItems = [];
            this.isSelectAll = false;
            this.onChangeCallback(this.selectedItems);
            this.onTouchedCallback(this.selectedItems);
            this.onDeSelectAll.emit(this.selectedItems);
        }
    }
    filterFn(value) {
        if (this.settings.groupBy && !this.settings.lazyLoading) {
            this.filterGroupedList();
        }
        else if (this.settings.lazyLoading) {
            this.searchTerm$.next(value);
        }
    }
    filterGroupedList() {
        if (this.filter === '' || this.filter == null) {
            this.clearSearch();
            return;
        }
        this.groupedData = this.cloneArray(this.groupCachedItems);
        this.groupedData = this.groupedData.filter(obj => {
            let arr = [];
            if (obj[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1) {
                arr = obj.list;
            }
            else {
                arr = obj.list.filter(t => {
                    return t[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1;
                });
            }
            obj.list = arr;
            if (obj[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1) {
                return arr;
            }
            else {
                return arr.some(cat => {
                    return cat[this.settings.labelKey].toLowerCase().indexOf(this.filter.toLowerCase()) > -1;
                });
            }
        });
    }
    toggleFilterSelectAll() {
        if (!this.isFilterSelectAll) {
            let added = [];
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
                this.ds.getFilteredData().forEach((el) => {
                    if (!this.isSelected(el) && !el.hasOwnProperty('grpTitle')) {
                        this.addSelected(el);
                        added.push(el);
                    }
                });
            }
            else {
                this.ds.getFilteredData().forEach((item) => {
                    if (!this.isSelected(item)) {
                        this.addSelected(item);
                        added.push(item);
                    }
                });
            }
            this.isFilterSelectAll = true;
            this.onFilterSelectAll.emit(added);
        }
        else {
            let removed = [];
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
                this.ds.getFilteredData().forEach((el) => {
                    if (this.isSelected(el)) {
                        this.removeSelected(el);
                        removed.push(el);
                    }
                });
            }
            else {
                this.ds.getFilteredData().forEach((item) => {
                    if (this.isSelected(item)) {
                        this.removeSelected(item);
                        removed.push(item);
                    }
                });
            }
            this.isFilterSelectAll = false;
            this.onFilterDeSelectAll.emit(removed);
        }
    }
    toggleInfiniteFilterSelectAll() {
        if (!this.isInfiniteFilterSelectAll) {
            this.virtualdata.forEach((item) => {
                if (!this.isSelected(item)) {
                    this.addSelected(item);
                }
            });
            this.isInfiniteFilterSelectAll = true;
        }
        else {
            this.virtualdata.forEach((item) => {
                if (this.isSelected(item)) {
                    this.removeSelected(item);
                }
            });
            this.isInfiniteFilterSelectAll = false;
        }
    }
    clearSearch() {
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
        setTimeout(() => {
            var _a;
            (_a = this.searchInput) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
        }, 0);
    }
    onFilterChange(data) {
        if (this.filter && this.filter === '' || data.length === 0) {
            this.isFilterSelectAll = false;
        }
        let cnt = 0;
        data.forEach((item) => {
            if (!item.hasOwnProperty('grpTitle') && this.isSelected(item)) {
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
    }
    cloneArray(arr) {
        if (Array.isArray(arr)) {
            return JSON.parse(JSON.stringify(arr));
        }
        else if (typeof arr === 'object') {
            throw 'Cannot clone array containing an object!';
        }
        else {
            return arr;
        }
    }
    updateGroupInfo(item) {
        if (item[this.settings.disabledKey]) {
            return false;
        }
        let key = this.settings.groupBy;
        this.groupedData.forEach((obj) => {
            let cnt = 0;
            if (obj.grpTitle && (item[key] === obj[key])) {
                if (obj.list) {
                    obj.list.forEach((el) => {
                        if (this.isSelected(el)) {
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
        this.groupCachedItems.forEach((obj) => {
            let cnt = 0;
            if (obj.grpTitle && (item[key] === obj[key])) {
                if (obj.list) {
                    obj.list.forEach((el) => {
                        if (this.isSelected(el)) {
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
    }
    transformData(arr, field) {
        const groupedObj = arr.reduce((prev, cur) => {
            if (!prev[cur[field]]) {
                prev[cur[field]] = [cur];
            }
            else {
                prev[cur[field]].push(cur);
            }
            return prev;
        }, {});
        const tempArr = [];
        Object.keys(groupedObj).map((x) => {
            let obj = {};
            let disabledChildrens = [];
            obj.grpTitle = true;
            obj[this.settings.labelKey] = x;
            obj[this.settings.groupBy] = x;
            obj.selected = false;
            obj.list = [];
            let cnt = 0;
            groupedObj[x].forEach((item) => {
                item.list = [];
                if (item[this.settings.disabledKey]) {
                    this.isDisabledItemPresent = true;
                    disabledChildrens.push(item);
                }
                obj.list.push(item);
                if (this.isSelected(item)) {
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
            obj[this.settings.disabledKey] = disabledChildrens.length === groupedObj[x].length;
            tempArr.push(obj);
            // obj.list.forEach((item: any) => {
            //     tempArr.push(item);
            // });
        });
        return tempArr;
    }
    filterInfiniteList(evt) {
        let filteredElems = [];
        if (this.settings.groupBy) {
            this.groupedData = this.groupCachedItems.slice();
        }
        else {
            this.data = this.cachedItems.slice();
            this.virtualdata = this.cachedItems.slice();
        }
        if ((evt != null || evt !== '') && !this.settings.groupBy) {
            if (this.settings.searchBy.length > 0) {
                for (let t = 0; t < this.settings.searchBy.length; t++) {
                    this.virtualdata.filter((el) => {
                        if (el[this.settings.searchBy[t].toString()].toString().toLowerCase().indexOf(evt.toString().toLowerCase()) >= 0) {
                            filteredElems.push(el);
                        }
                    });
                }
            }
            else {
                this.virtualdata.filter((el) => {
                    for (let prop in el) {
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
            this.groupedData.filter((el) => {
                if (el.hasOwnProperty('grpTitle')) {
                    filteredElems.push(el);
                }
                else {
                    for (let prop in el) {
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
    }
    onScrollEnd(e) {
        if (e.endIndex === this.data.length - 1 || e.startIndex === 0) {
        }
        this.onScrollToEnd.emit(e);
    }
    selectGroup(item) {
        if (item[this.settings.disabledKey]) {
            return false;
        }
        if (item.selected) {
            item.selected = false;
            item.list.forEach((obj) => {
                this.removeSelected(obj);
            });
            this.onGroupDeSelect.emit(item);
            this.updateGroupInfo(item);
        }
        else {
            item.selected = true;
            item.list.forEach((obj) => {
                if (!this.isSelected(obj)) {
                    this.addSelected(obj);
                }
            });
            this.onGroupSelect.emit(item);
            this.updateGroupInfo(item);
        }
    }
    addFilterNewItem() {
        this.onAddFilterNewItem.emit(this.filter);
        this.filterPipe = new SerSelectListFilterPipe(this.ds);
        this.filterPipe.transform(this.data, this.filter, this.settings.searchBy);
    }
    clearSelection(e) {
        if (this.settings.groupBy) {
            this.groupCachedItems.forEach((obj) => {
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
    }
    getItemContext(item) {
        return item;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.dropdownSubs.forEach(s => {
            s.unsubscribe();
        });
    }
};
SerSelectComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: DataService },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['multiple',] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['simple',] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['primaryKey',] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['labelKey',] }] }
];
__decorate([
    Input()
], SerSelectComponent.prototype, "data", void 0);
__decorate([
    Input()
], SerSelectComponent.prototype, "settings", void 0);
__decorate([
    Input()
], SerSelectComponent.prototype, "loading", void 0);
__decorate([
    Input()
], SerSelectComponent.prototype, "multiple", void 0);
__decorate([
    Output('onSelect')
], SerSelectComponent.prototype, "onSelect", void 0);
__decorate([
    Output('onDeSelect')
], SerSelectComponent.prototype, "onDeSelect", void 0);
__decorate([
    Output('onSelectAll')
], SerSelectComponent.prototype, "onSelectAll", void 0);
__decorate([
    Output('onDeSelectAll')
], SerSelectComponent.prototype, "onDeSelectAll", void 0);
__decorate([
    Output('onOpen')
], SerSelectComponent.prototype, "onOpen", void 0);
__decorate([
    Output('onClose')
], SerSelectComponent.prototype, "onClose", void 0);
__decorate([
    Output('onScrollToEnd')
], SerSelectComponent.prototype, "onScrollToEnd", void 0);
__decorate([
    Output('onFilterSelectAll')
], SerSelectComponent.prototype, "onFilterSelectAll", void 0);
__decorate([
    Output('onFilterDeSelectAll')
], SerSelectComponent.prototype, "onFilterDeSelectAll", void 0);
__decorate([
    Output('onAddFilterNewItem')
], SerSelectComponent.prototype, "onAddFilterNewItem", void 0);
__decorate([
    Output('onGroupSelect')
], SerSelectComponent.prototype, "onGroupSelect", void 0);
__decorate([
    Output('onGroupDeSelect')
], SerSelectComponent.prototype, "onGroupDeSelect", void 0);
__decorate([
    ContentChild(SDItemDirective, { static: true })
], SerSelectComponent.prototype, "itemTempl", void 0);
__decorate([
    ContentChild(SDBadgeDirective, { static: true })
], SerSelectComponent.prototype, "badgeTempl", void 0);
__decorate([
    ContentChild(SDSearchDirective, { static: true })
], SerSelectComponent.prototype, "searchTempl", void 0);
__decorate([
    ViewChild('searchInput')
], SerSelectComponent.prototype, "searchInput", void 0);
__decorate([
    ViewChild('selectedList')
], SerSelectComponent.prototype, "selectedListElem", void 0);
__decorate([
    ViewChild('dropdownList')
], SerSelectComponent.prototype, "dropdownListElem", void 0);
__decorate([
    HostBinding('class.disabled')
], SerSelectComponent.prototype, "isDisabled", void 0);
__decorate([
    HostBinding('class.active')
], SerSelectComponent.prototype, "isActive", void 0);
__decorate([
    HostBinding('class.multiple')
], SerSelectComponent.prototype, "multipleClass", void 0);
__decorate([
    ViewChild(VirtualScrollerComponent, { static: false })
], SerSelectComponent.prototype, "virtualScroller", void 0);
SerSelectComponent = SerSelectComponent_1 = __decorate([
    Component({
        selector: 'ser-select',
        template: "<div class=\"selected-list\" #selectedList (click)=\"toggleDropdown($event)\" [attr.tabindex]=\"0\">\r\n\r\n    <div class=\"values\">\r\n\r\n        <ng-container *ngIf=\"settings.singleSelection && hasValue(selectedItems)\">\r\n\r\n            <ng-container *ngIf=\"!hasValue(badgeTempl)\">\r\n                {{ selectedItems[0][settings.labelKey] }}\r\n            </ng-container>\r\n\r\n            <ng-container *ngIf=\"hasValue(badgeTempl)\">\r\n                <ng-container *ngTemplateOutlet=\"badgeTempl.template; context:{item: selectedItems[0]}\"></ng-container>\r\n            </ng-container>\r\n\r\n        </ng-container>\r\n\r\n        <ng-container *ngIf=\"!settings.singleSelection && hasValue(selectedItems)\">\r\n\r\n            <div class=\"token-list\">\r\n                <ng-container *ngFor=\"let item of selectedItems;trackBy: trackByFn.bind(this);let k = index\">\r\n\r\n                    <div *ngIf=\"k < (settings.badgeShowLimit - 1)\" class=\"token\">\r\n                        <span *ngIf=\"!hasValue(badgeTempl)\" class=\"label\">{{ item[settings.labelKey] }}</span>\r\n                        <span *ngIf=\"hasValue(badgeTempl)\" class=\"label\">\r\n                            <ng-container *ngTemplateOutlet=\"badgeTempl.template; context:{item: item}\"></ng-container>\r\n                        </span>\r\n\r\n                        <span class=\"remove\" (click)=\"onItemClick(item, k, $event);$event.stopPropagation()\">\r\n                            <span class=\"material-icons\">close</span>\r\n                        </span>\r\n                    </div>\r\n\r\n                </ng-container>\r\n            </div>\r\n\r\n        </ng-container>\r\n    </div>\r\n\r\n    <div class=\"controls\">\r\n        <span class=\"countplaceholder\" *ngIf=\"selectedItems?.length > settings.badgeShowLimit\">+{{ selectedItems?.length - settings.badgeShowLimit }}</span>\r\n\r\n        <button type=\"button\" *ngIf=\"settings.clearAll && !isDisabled && selectedItems?.length > 0\" class=\"clear-all\" (click)=\"clearSelection($event);\">\r\n            <span class=\"material-icons\">close</span>\r\n        </button>\r\n\r\n        <span class=\"material-icons chevron\" [ngClass]=\"{'rotate': isActive}\">keyboard_arrow_down</span>\r\n    </div>\r\n</div>\r\n\r\n<div #dropdownList class=\"dropdown-list\" [ngClass]=\"{'single-select-mode': settings.singleSelection }\">\r\n    <div class=\"pure-checkbox select-all\" *ngIf=\"settings.enableCheckAll && !settings.singleSelection && !settings.limitSelection && data?.length > 0 && !isDisabledItemPresent\" (click)=\"toggleSelectAll()\">\r\n\r\n        <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelectAll\" [disabled]=\"settings.limitSelection == selectedItems?.length\" id=\"selectAll\"/>\r\n\r\n        <label for=\"selectAll\">\r\n            <span [hidden]=\"isSelectAll\">{{ settings.selectAllText }}</span>\r\n            <span [hidden]=\"!isSelectAll\">{{ settings.unSelectAllText }}</span>\r\n        </label>\r\n    </div>\r\n\r\n    <img class=\"loading-icon\" *ngIf=\"loading\" src=\"assets/img/loading.gif\" />\r\n\r\n    <div class=\"list-filter\" *ngIf=\"settings.enableSearchFilter && hasValue(data)\">\r\n\r\n        <span class=\"material-icons icon-search\">search</span>\r\n\r\n        <ng-content *ngIf=\"searchTempl then searchTemplate;else searchDefault\"></ng-content>\r\n\r\n        <ng-template #searchTemplate>\r\n            <ng-container *ngTemplateOutlet=\"searchTempl.template; context:{item: item}\"></ng-container>\r\n        </ng-template>\r\n\r\n        <ng-template #searchDefault>\r\n            <input #searchInput class=\"c-input not-styled\" type=\"text\" [placeholder]=\"settings.searchPlaceholderText\" [(ngModel)]=\"filter\" (keyup)=\"filterFn($event.target.value)\">\r\n        </ng-template>\r\n\r\n\r\n        <span [hidden]=\"!hasValue(filter)\" (click)=\"clearSearch()\" class=\"material-icons icon-clear\">cancel</span>\r\n\r\n    </div>\r\n\r\n    <div class=\"filter-select-all\" *ngIf=\"!settings.lazyLoading && settings.enableFilterSelectAll && !isDisabledItemPresent\">\r\n\r\n        <div class=\"pure-checkbox select-all\" *ngIf=\"!settings.groupBy && filter?.length > 0 && filterLength > 0\" (click)=\"toggleFilterSelectAll()\">\r\n            <input type=\"checkbox\" [checked]=\"isFilterSelectAll\" [disabled]=\"settings.limitSelection == selectedItems?.length\" aria-labelledby=\"optionName\" />\r\n            <label>\r\n                <span [hidden]=\"isFilterSelectAll\">{{settings.filterSelectAllText}}</span>\r\n                <span [hidden]=\"!isFilterSelectAll\">{{settings.filterUnSelectAllText}}</span>\r\n            </label>\r\n        </div>\r\n\r\n        <div class=\"pure-checkbox select-all\" *ngIf=\"settings.groupBy && filter?.length > 0 && groupedData?.length > 0\" (click)=\"toggleFilterSelectAll()\">\r\n            <input type=\"checkbox\" [checked]=\"isFilterSelectAll && filter?.length > 0\" [disabled]=\"settings.limitSelection == selectedItems?.length\" />\r\n            <label>\r\n                <span [hidden]=\"isFilterSelectAll\">{{settings.filterSelectAllText}}</span>\r\n                <span [hidden]=\"!isFilterSelectAll\">{{settings.filterUnSelectAllText}}</span>\r\n            </label>\r\n        </div>\r\n\r\n        <!-- <label class=\"nodata-label\" *ngIf=\"!settings.groupBy && filterLength == 0\" [hidden]=\"filter == undefined || filter?.length == 0\">{{settings.noDataLabel}}</label>\r\n        <label class=\"nodata-label\" *ngIf=\"settings.groupBy && groupedData?.length == 0\" [hidden]=\"filter == undefined || filter?.length == 0\">{{settings.noDataLabel}}</label> -->\r\n\r\n        <div class=\"btn-container\" *ngIf=\"settings.addNewItemOnFilter && filterLength == 0\" [hidden]=\"filter == undefined || filter?.length == 0\">\r\n            <button class=\"d-btn btn-iceblue\" (click)=\"addFilterNewItem()\">{{settings.addNewButtonText}}</button>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"filter-select-all\" *ngIf=\"settings.lazyLoading && settings.enableFilterSelectAll && !isDisabledItemPresent\">\r\n        <div class=\"pure-checkbox select-all\" *ngIf=\"filter?.length > 0 && infiniteFilterLength > 0\" (click)=\"toggleInfiniteFilterSelectAll()\">\r\n            <input type=\"checkbox\" [checked]=\"isInfiniteFilterSelectAll\" [disabled]=\"settings.limitSelection == selectedItems?.length\" />\r\n            <label>\r\n                <span [hidden]=\"isInfiniteFilterSelectAll\">{{ settings.filterSelectAllText }}</span>\r\n                <span [hidden]=\"!isInfiniteFilterSelectAll\">{{ settings.filterUnSelectAllText }}</span>\r\n            </label>\r\n        </div>\r\n    </div>\r\n\r\n    <div *ngIf=\"!settings.groupBy && !settings.lazyLoading && !hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul class=\"lazyContainer\">\r\n            <li *ngFor=\"let item of data | serSelectListFilter:filter : settings.searchBy; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) }\">\r\n                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                <label>{{ item[settings.labelKey] }}</label>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"!settings.groupBy && settings.lazyLoading && !hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul virtualScroller #scroll [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\" (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\" class=\"lazyContainer\">\r\n            <li *ngFor=\"let item of scroll.viewPortItems; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) }\">\r\n                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                <label>{{item[settings.labelKey]}}</label>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"!settings.groupBy && !settings.lazyLoading && hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul class=\"lazyContainer\">\r\n            <li *ngFor=\"let item of data | serSelectListFilter:filter : settings.searchBy; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) }\">\r\n                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                <label></label>\r\n                <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: item}\"></ng-container>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"!settings.groupBy && settings.lazyLoading && hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul virtualScroller #scroll2 [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\"\r\n            (vsEnd)=\"onScrollEnd($event)\" class=\"lazyContainer\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\">\r\n            <li *ngFor=\"let item of scroll2.viewPortItems; let i = index;\" (click)=\"onItemClick(item,i,$event)\" class=\"pure-checkbox\" [ngClass]=\"{'selected-item': isSelected(item) }\">\r\n                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\"  />\r\n                <label></label>\r\n                <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: item}\"></ng-container>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"settings.groupBy && settings.lazyLoading && hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul virtualScroller #scroll3 [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\" (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\" class=\"lazyContainer\">\r\n            <span *ngFor=\"let item of scroll3.viewPortItems; let i = index;\">\r\n                <li (click)=\"onItemClick(item,i,$event)\" *ngIf=\"!item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\"\r\n                    class=\"pure-checkbox\">\r\n                    <input *ngIf=\"settings.showCheckbox && !settings.singleSelection\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                    <label></label>\r\n                    <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: item}\"></ng-container>\r\n                </li>\r\n                <li *ngIf=\"item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\"\r\n                    class=\"pure-checkbox\">\r\n                    <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                    <label></label>\r\n                    <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: item}\"></ng-container>\r\n                </li>\r\n            </span>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"settings.groupBy && !settings.lazyLoading && hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\"  style=\"overflow: auto;\">\r\n        <ul class=\"lazyContainer\">\r\n            <span *ngFor=\"let item of groupedData; let i = index;\">\r\n                <li (click)=\"selectGroup(item)\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\" class=\"pure-checkbox\">\r\n                    <input *ngIf=\"settings.showCheckbox && !settings.singleSelection\" type=\"checkbox\" [checked]=\"item.selected\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                    <label>{{item[settings.labelKey]}}</label>\r\n                    <ul class=\"lazyContainer\">\r\n                        <span *ngFor=\"let val of item.list ; let j = index;\">\r\n                            <li (click)=\"onItemClick(val,j,$event); $event.stopPropagation()\" [ngClass]=\"{'grp-title': val.grpTitle,'grp-item': !val.grpTitle && !settings.singleSelection}\"\r\n                                class=\"pure-checkbox\">\r\n                                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(val)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(val)) || val[settings.disabledKey]\"\r\n                                />\r\n                                <label></label>\r\n                                <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: val}\"></ng-container>\r\n                            </li>\r\n                        </span>\r\n                    </ul>\r\n\r\n                </li>\r\n            </span>\r\n        </ul>\r\n    </div>\r\n\r\n    <div *ngIf=\"settings.groupBy && settings.lazyLoading && !hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <virtual-scroller [items]=\"groupedData\" (vsUpdate)=\"viewPortItems = $event\" (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\">\r\n            <ul virtualScroller #scroll4 [enableUnequalChildrenSizes]=\"randomSize\" [items]=\"virtualdata\" (vsStart)=\"onScrollEnd($event)\"\r\n                (vsEnd)=\"onScrollEnd($event)\" [ngStyle]=\"{'height': settings.maxHeight+'px'}\" class=\"lazyContainer\">\r\n                <span *ngFor=\"let item of scroll4.viewPortItems; let i = index;\">\r\n                    <li *ngIf=\"item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection, 'selected-item': isSelected(item) }\"\r\n                        class=\"pure-checkbox\">\r\n                        <input *ngIf=\"settings.showCheckbox && !item.grpTitle && !settings.singleSelection\" type=\"checkbox\" [checked]=\"isSelected(item)\"\r\n                            [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                        <label>{{item[settings.labelKey]}}</label>\r\n                    </li>\r\n                    <li (click)=\"onItemClick(item,i,$event)\" *ngIf=\"!item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection, 'selected-item': isSelected(item) }\"\r\n                        class=\"pure-checkbox\">\r\n                        <input *ngIf=\"settings.showCheckbox && !item.grpTitle\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\"\r\n                        />\r\n                        <label>{{item[settings.labelKey]}}</label>\r\n                    </li>\r\n                </span>\r\n            </ul>\r\n        </virtual-scroller>\r\n    </div>\r\n\r\n    <div *ngIf=\"settings.groupBy && !settings.lazyLoading && !hasValue(itemTempl)\" [style.maxHeight]=\"settings.maxHeight+'px'\" style=\"overflow: auto;\">\r\n        <ul class=\"lazyContainer\">\r\n            <span *ngFor=\"let item of groupedData ; let i = index;\">\r\n                <li (click)=\"selectGroup(item)\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle && !settings.singleSelection}\" class=\"pure-checkbox\">\r\n                    <input *ngIf=\"settings.showCheckbox && !settings.singleSelection\" type=\"checkbox\" [checked]=\"item.selected\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(item)) || item[settings.disabledKey]\" />\r\n                    <label>{{ item[settings.labelKey] }}</label>\r\n                    <ul class=\"lazyContainer\">\r\n                        <span *ngFor=\"let val of item.list ; let j = index;\">\r\n                            <li (click)=\"onItemClick(val,j,$event); $event.stopPropagation()\" [ngClass]=\"{'selected-item': isSelected(val) == true,'grp-title': val.grpTitle,'grp-item': !val.grpTitle && !settings.singleSelection}\" class=\"pure-checkbox\">\r\n                                <input *ngIf=\"settings.showCheckbox\" type=\"checkbox\" [checked]=\"isSelected(val)\" [disabled]=\"(settings.limitSelection == selectedItems?.length && !isSelected(val)) || val[settings.disabledKey]\" />\r\n                                <label>{{val[settings.labelKey]}}</label>\r\n                            </li>\r\n                        </span>\r\n                    </ul>\r\n                </li>\r\n            </span>\r\n            <!-- <span *ngFor=\"let item of groupedData ; let i = index;\">\r\n            <li (click)=\"onItemClick(item,i,$event)\" *ngIf=\"!item.grpTitle\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}\" class=\"pure-checkbox\">\r\n            <input *ngIf=\"settings.showCheckbox && !item.grpTitle\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"settings.limitSelection == selectedItems?.length && !isSelected(item)\"\r\n            />\r\n            <label>{{item[settings.labelKey]}}</label>\r\n        </li>\r\n        <li *ngIf=\"item.grpTitle && !settings.selectGroup\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}\" class=\"pure-checkbox\">\r\n            <input *ngIf=\"settings.showCheckbox && settings.selectGroup\" type=\"checkbox\" [checked]=\"isSelected(item)\" [disabled]=\"settings.limitSelection == selectedItems?.length && !isSelected(item)\"\r\n            />\r\n            <label>{{item[settings.labelKey]}}</label>\r\n        </li>\r\n         <li  (click)=\"selectGroup(item)\" *ngIf=\"item.grpTitle && settings.selectGroup\" [ngClass]=\"{'grp-title': item.grpTitle,'grp-item': !item.grpTitle}\" class=\"pure-checkbox\">\r\n            <input *ngIf=\"settings.showCheckbox && settings.selectGroup\" type=\"checkbox\" [checked]=\"item.selected\" [disabled]=\"settings.limitSelection == selectedItems?.length && !isSelected(item)\"\r\n            />\r\n            <label>{{item[settings.labelKey]}}</label>\r\n        </li>\r\n        </span> -->\r\n        </ul>\r\n    </div>\r\n\r\n    <h5 class=\"list-message\" *ngIf=\"!hasValue(data)\">{{ settings.noDataLabel }}</h5>\r\n\r\n</div>\r\n",
        host: { '[class]': 'defaultSettings.classes' },
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => SerSelectComponent_1),
                multi: true
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => SerSelectComponent_1),
                multi: true,
            }
        ],
        encapsulation: ViewEncapsulation.None
    }),
    __param(4, Optional()), __param(4, Attribute('multiple')),
    __param(5, Optional()), __param(5, Attribute('simple')), __param(6, Optional()), __param(6, Attribute('primaryKey')), __param(7, Optional()), __param(7, Attribute('labelKey'))
], SerSelectComponent);

// tslint:disable: max-line-length
const dependencies = [
    SerSelectComponent,
    SerSelectListFilterPipe,
    SDItemDirective,
    SDBadgeDirective,
    SDSearchDirective
];
let SerSelectModule = class SerSelectModule {
};
SerSelectModule = __decorate([
    NgModule({
        imports: [CommonModule, BrowserModule, FormsModule, VirtualScrollerModule],
        declarations: [...dependencies],
        exports: [...dependencies],
        providers: [DataService]
    })
], SerSelectModule);

var AddressColComponent_1;
let AddressColComponent = AddressColComponent_1 = class AddressColComponent {
    constructor(_fb, _renderer, _elementRef) {
        this._fb = _fb;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.class = true;
        this.modelForm = this._fb.group({
            via: ['', [Validators.required]],
            address1: ['', [Validators.required, Validators.maxLength(50)]],
            address2: ['', Validators.maxLength(50)],
            address3: ['', Validators.maxLength(50)]
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
    writeValue(obj) {
        if (hasValue(obj)) {
            let address1;
            let address2;
            let address3;
            obj = obj.trim().replace(/\s+/g, ' ');
            if (/(\s?-\s?)+/.test(obj)) {
                address3 = obj.split(/(\s?-\s?)+/);
                this.modelForm.get('address3').setValue(address3[address3.length - 1].trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' '));
                address2 = address3[0].trim();
            }
            else {
                address2 = obj;
            }
            if (/(\s?[#]\s?)+/.test(address2)) {
                address2 = address2.split(/(\s?[#]\s?)+/);
                this.modelForm.get('address2').setValue(address2[address2.length - 1].trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' '));
                address1 = address2[0].trim();
            }
            else {
                address1 = obj;
            }
            if (this.viaRegex.test(address1)) {
                address1 = address1.split(this.viaRegex);
                this.modelForm.get('address1').setValue(address1[address1.length - 1].trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' '));
                setTimeout(() => {
                    this.setVia(this.viaRegex.exec(obj)[0].split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' '));
                });
            }
        }
    }
    generateValue() {
        var _a, _b, _c;
        const address = this.modelForm.get('via').value + ' ' + ((_a = this.modelForm.get('address1').value) === null || _a === void 0 ? void 0 : _a.trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ')) +
            ' # ' + ((_b = this.modelForm.get('address2').value) === null || _b === void 0 ? void 0 : _b.trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ')) +
            ' - ' + ((_c = this.modelForm.get('address3').value) === null || _c === void 0 ? void 0 : _c.trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' '));
        return address;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    onChange(_) { }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    onTouch() { }
    ngOnInit() {
        this.modelSub = this.modelForm.valueChanges.subscribe(() => {
            if (this.modelForm.valid) {
                this.onChange(this.generateValue());
            }
            else {
                this.onChange(null);
            }
        });
    }
    ngAfterViewInit() {
        this._renderer.removeChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);
        setTimeout(() => {
            if (!hasValue(this.viaElHint.nativeElement.value)) {
                this.viaElHint.nativeElement.value = 'Calle';
            }
        });
    }
    openViaOptions() {
        this.viaOptionsSubs.push(fromEvent(window, 'click')
            .pipe(filter((e) => !this.viaElCont.nativeElement.contains(e.target)))
            .subscribe(() => {
            this.setVia(this.viaOptions[0]);
        }));
        this.viaOptionsSubs.push(fromEvent(window, 'keyup')
            .pipe(filter((e) => inArray(e.key.toLowerCase(), ['arrowright', 'escape', 'enter'])))
            .subscribe(() => {
            this.setVia(this.viaOptions[0]);
        }));
        this.filterViaOptions(this.modelForm.get('via').value);
        this.setPositionDropdown();
        this._renderer.appendChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);
    }
    closeDropdown() {
        this.viaOptionsSubs.forEach(s => s.unsubscribe());
        this.viaOptionsSubs = [];
        this._renderer.removeChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);
        this.address1.nativeElement.focus();
    }
    setPositionDropdown() {
        setTimeout(() => {
            const dropdown = this.viaOptionsEl.nativeElement;
            const el = this.viaEl.nativeElement;
            const remainingHeight = document.documentElement.offsetHeight - (dropdown.offsetHeight + el.getBoundingClientRect().top + el.offsetHeight);
            this._renderer.setStyle(dropdown, 'left', (el.getBoundingClientRect().left - 6) + 'px');
            if (remainingHeight > 0) {
                this._renderer.removeClass(el, 'ontop');
                this._renderer.removeClass(dropdown, 'ontop');
                this._elementRef.nativeElement.style.removeProperty('bottom');
                this._renderer.setStyle(dropdown, 'top', el.getBoundingClientRect().bottom + 'px');
            }
            else {
                this._renderer.addClass(el, 'ontop');
                this._renderer.addClass(dropdown, 'ontop');
                this._elementRef.nativeElement.style.removeProperty('top');
                this._renderer.setStyle(dropdown, 'bottom', (document.documentElement.offsetHeight - el.getBoundingClientRect().top) + 'px');
            }
        });
    }
    filterViaOptions(value) {
        var _a;
        if (hasValue(value)) {
            this.viaOptions = this.viaOptionsOriginal.filter(it => { var _a; return it.slice(0, value.length).toLowerCase() === ((_a = value) === null || _a === void 0 ? void 0 : _a.toLowerCase()); });
            if (hasValue(this.viaOptions)) {
                this.viaElHint.nativeElement.value = this.viaOptions[0];
                this.viaEl.nativeElement.value = (_a = this.viaEl.nativeElement.value) === null || _a === void 0 ? void 0 : _a.split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ');
            }
            else {
                this.viaElHint.nativeElement.value = '';
            }
            setTimeout(() => {
                this.setPositionDropdown();
            });
        }
        else {
            this.viaOptions = this.viaOptionsOriginal;
        }
    }
    viaBlur() {
        if (!hasValue(this.modelForm.get('via').value)) {
            this.setVia(this.viaOptions[0]);
        }
    }
    setVia(value) {
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
    }
    ngOnDestroy() {
        var _a;
        this.modelSub.unsubscribe();
        (_a = this.viaOptionsSubs) === null || _a === void 0 ? void 0 : _a.forEach(s => { var _a; return (_a = s) === null || _a === void 0 ? void 0 : _a.unsubscribe(); });
    }
};
AddressColComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: Renderer2 },
    { type: ElementRef }
];
__decorate([
    HostBinding('class.address-input')
], AddressColComponent.prototype, "class", void 0);
__decorate([
    ViewChild('viaOptionsEl')
], AddressColComponent.prototype, "viaOptionsEl", void 0);
__decorate([
    ViewChild('viaElCont')
], AddressColComponent.prototype, "viaElCont", void 0);
__decorate([
    ViewChild('viaEl')
], AddressColComponent.prototype, "viaEl", void 0);
__decorate([
    ViewChild('viaElHint')
], AddressColComponent.prototype, "viaElHint", void 0);
__decorate([
    ViewChild('address1')
], AddressColComponent.prototype, "address1", void 0);
AddressColComponent = AddressColComponent_1 = __decorate([
    Component({
        selector: 'address-col-input',
        template: "<ng-container [formGroup]=\"modelForm\">\n\n    <div class=\"via\" #viaElCont>\n        <input type=\"text\" class=\"not-styled via-input\" [size]=\"viaElHint?.value ? viaElHint?.value?.length : 1\" #viaEl (focus)=\"openViaOptions()\" (input)=\"filterViaOptions(viaEl.value)\" autocomplete=\"off\" spellcheck=\"false\" >\n        <input type=\"text\" #viaElHint class=\"not-styled hint\" [size]=\"viaElHint?.value ? viaElHint?.value?.length : 1\" />\n\n        <div class=\"via-options\" #viaOptionsEl>\n            <div class=\"via-item\" *ngFor=\"let item of viaOptions\" (click)=\"setVia(item)\">{{ item }}</div>\n        </div>\n    </div>\n\n    <input class=\"not-styled address1\" #address1 placeholder=\"\" formControlName=\"address1\"  [size]=\"address1?.value ? address1?.value?.length : 1\" />\n\n    <span class=\"separator s1\">#</span>\n\n    <input class=\"not-styled address2\" #address2 placeholder=\"\" formControlName=\"address2\"  [size]=\"address2?.value ? address2?.value?.length : 1\" />\n\n    <span class=\"separator s2\">-</span>\n\n    <input class=\"not-styled address3\" #address3 placeholder=\"\" formControlName=\"address3\"  [size]=\"address3?.value ? address3?.value?.length : 1\" />\n\n</ng-container>\n",
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => AddressColComponent_1),
                multi: true
            }
        ],
        encapsulation: ViewEncapsulation.None
    })
], AddressColComponent);

let SerFilterListFilterPipe = class SerFilterListFilterPipe {
    transform(items, filter, searchBy) {
        if (!hasValue(items) || !hasValue(filter)) {
            return items;
        }
        const filteredList = items.filter((item) => this.applyFilter(item, filter, searchBy));
        if (hasValue(filteredList)) {
            return filteredList;
        }
        else {
            return [];
        }
    }
    applyFilter(item, filter, searchBy) {
        let found = false;
        if (searchBy.length > 0) {
            if (item.grpTitle) {
                found = true;
            }
            else {
                for (let t = 0; t < searchBy.length; t++) {
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
                for (const prop in item) {
                    if (filter && item[prop]) {
                        if (item[prop].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                            found = true;
                        }
                    }
                }
            }
        }
        return found;
    }
};
SerFilterListFilterPipe = __decorate([
    Pipe({
        name: 'serFilterListFilter',
        pure: true
    })
], SerFilterListFilterPipe);

// tslint:disable: no-use-before-declare
// tslint:disable: no-host-metadata-property
// tslint:disable: max-line-length
// tslint:disable: no-output-rename
// tslint:disable: no-output-on-prefix
// tslint:disable: prefer-const
// tslint:disable: no-conflicting-lifecycle
// tslint:disable: component-class-suffix
// tslint:disable: component-selector
var SerFilterComponent_1;
const noop$1 = () => {
};
const ɵ0$1 = noop$1;
let SerFilterComponent = SerFilterComponent_1 = class SerFilterComponent {
    constructor(_elementRef, cdr, _renderer, primaryKey, labelKey) {
        this._elementRef = _elementRef;
        this.cdr = cdr;
        this._renderer = _renderer;
        this.data = [];
        this.onSelect = new EventEmitter();
        this.onDeSelect = new EventEmitter();
        this.onSelectAll = new EventEmitter();
        this.onDeSelectAll = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this.onScrollToEnd = new EventEmitter();
        this.onFilterSelectAll = new EventEmitter();
        this.onFilterDeSelectAll = new EventEmitter();
        this.onAddFilterNewItem = new EventEmitter();
        this.onGroupSelect = new EventEmitter();
        this.onGroupDeSelect = new EventEmitter();
        this.isDisabled = false;
        this.isActive = false;
        this.searchTerm$ = new Subject$1();
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
    ngOnInit() {
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.cachedItems = this.cloneArray(this.data);
    }
    ngOnChanges(changes) {
        if (changes.data && !changes.data.firstChange) {
            this.cachedItems = this.cloneArray(this.data);
        }
        if (changes.settings && !changes.settings.firstChange) {
            this.settings = Object.assign(this.defaultSettings, this.settings);
        }
        if (changes.loading) {
        }
    }
    ngAfterViewInit() {
        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
    }
    onItemClick(item, k, e) {
        if (this.isDisabled || item[this.settings.disabledKey]) {
            return false;
        }
        let found = this.isSelected(item);
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
    }
    validate(c) {
        return null;
    }
    writeValue(value) {
        var _a;
        if (hasValue(value)) {
            if (!Array.isArray(value)) {
                throw Error('Single value detected as input, please set "singleSelection" setting in true or remove "multiple" attribute in the select if you added');
            }
            const selectedObjects = (_a = this.data) === null || _a === void 0 ? void 0 : _a.filter(item => {
                return inArray(item[this.settings.primaryKey], value);
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
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
    }
    trackByFn(item) {
        return item[this.settings.primaryKey];
    }
    isSelected(clickedItem) {
        if (clickedItem[this.settings.disabledKey]) {
            return false;
        }
        let found = false;
        if (hasValue(this.selectedItems)) {
            for (const item of this.selectedItems) {
                if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
                    found = true;
                    break;
                }
            }
        }
        return found;
    }
    addSelected(item) {
        this.selectedItems.push(item);
        const items = this.selectedItems.map(element => element[this.settings.primaryKey]);
        this.onChangeCallback(items);
        this.onTouchedCallback(items);
    }
    removeSelected(clickedItem) {
        if (hasValue(this.selectedItems)) {
            this.selectedItems.forEach((item, index) => {
                if (clickedItem[this.settings.primaryKey] === item[this.settings.primaryKey]) {
                    this.selectedItems.splice(index, 1);
                }
            });
        }
        this.onChangeCallback(this.selectedItems);
        this.onTouchedCallback(this.selectedItems);
    }
    //#region dropdown status
    toggleDropdown(evt) {
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
    }
    openDropdown() {
        if (this.isDisabled) {
            return false;
        }
        this.isActive = true;
        this.labelActive = true;
        this.dropdownSubs.push(fromEvent(window, 'click')
            .pipe(filter((e) => !this._elementRef.nativeElement.contains(e.target)))
            .subscribe(() => this.closeDropdown()));
        this.dropdownSubs.push(fromEvent(window, 'keyup')
            .pipe(filter((e) => e.key.toLowerCase() === 'escape'))
            .subscribe(() => this.closeDropdown()));
        this.dropdownSubs.push(fromEvent(this._elementRef.nativeElement, 'scroll').subscribe(() => console.log('scroll')));
        this.dropdownSubs.push(fromEvent(window, 'resize').subscribe(() => this.setPositionDropdown()));
        this.setPositionDropdown();
        this._renderer.appendChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
        setTimeout(() => {
            var _a;
            (_a = this.searchInput) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
        }, 0);
        this.onOpen.emit(true);
    }
    closeDropdown() {
        if (this.searchInput) {
            this.searchInput.nativeElement.value = '';
        }
        this.clearSearch();
        this.isActive = false;
        this.labelActive = false;
        this.dropdownSubs.forEach(s => s.unsubscribe());
        this.dropdownSubs = [];
        this.onClose.emit(false);
        this._renderer.removeChild(this._elementRef.nativeElement, this.dropdownListElem.nativeElement);
    }
    setPositionDropdown() {
        setTimeout(() => {
            const dropdown = this.dropdownListElem.nativeElement;
            // const el = (this._elementRef.nativeElement as HTMLElement);
            const el = this.searchInput.nativeElement;
            const remainingHeight = document.documentElement.offsetHeight - (dropdown.offsetHeight + el.getBoundingClientRect().top + el.offsetHeight);
            this._renderer.setStyle(dropdown, 'width', (el.offsetWidth) + 'px');
            this._renderer.setStyle(dropdown, 'left', (el.getBoundingClientRect().left) + 'px');
            if (remainingHeight > 0) {
                this._renderer.removeClass(el, 'ontop');
                this._renderer.removeClass(dropdown, 'ontop');
                this._elementRef.nativeElement.style.removeProperty('bottom');
                this._renderer.setStyle(dropdown, 'top', el.getBoundingClientRect().bottom + 'px');
            }
            else {
                this._renderer.addClass(el, 'ontop');
                this._renderer.addClass(dropdown, 'ontop');
                this._elementRef.nativeElement.style.removeProperty('top');
                this._renderer.setStyle(dropdown, 'bottom', (document.documentElement.offsetHeight - el.getBoundingClientRect().top) + 'px');
            }
        });
    }
    //#endregion
    toggleSelectAll() {
        if (!this.isSelectAll) {
            this.selectedItems = [];
            // this.selectedItems = this.data.slice();
            this.selectedItems = this.data.filter((individualData) => !individualData[this.settings.disabledKey]);
            const selectedItems = this.selectedItems.map(element => element[this.settings.primaryKey]);
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
    }
    toggleFilterSelectAll() {
        if (!this.isFilterSelectAll) {
            let added = [];
            this.isFilterSelectAll = true;
            this.onFilterSelectAll.emit(added);
        }
        else {
            let removed = [];
            this.isFilterSelectAll = false;
            this.onFilterDeSelectAll.emit(removed);
        }
        this.closeDropdown();
    }
    clearSearch() {
        this.filter = '';
        this.isFilterSelectAll = false;
        setTimeout(() => {
            var _a;
            (_a = this.searchInput) === null || _a === void 0 ? void 0 : _a.nativeElement.focus();
        }, 0);
    }
    onFilterChange(data) {
        if (this.filter && this.filter === '' || data.length === 0) {
            this.isFilterSelectAll = false;
        }
        let cnt = 0;
        data.forEach((item) => {
            if (!item.hasOwnProperty('grpTitle') && this.isSelected(item)) {
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
    }
    cloneArray(arr) {
        if (Array.isArray(arr)) {
            return JSON.parse(JSON.stringify(arr));
        }
        else if (typeof arr === 'object') {
            throw Error('Cannot clone array containing an object!');
        }
        else {
            return arr;
        }
    }
    onScrollEnd(e) {
        if (e.endIndex === this.data.length - 1 || e.startIndex === 0) {
        }
        this.onScrollToEnd.emit(e);
    }
    clearSelection(e) {
        this.clearSearch();
        this.selectedItems = [];
        this.isSelectAll = false;
        this.onChangeCallback(this.selectedItems);
        this.onTouchedCallback(this.selectedItems);
        this.onDeSelectAll.emit(this.selectedItems);
        e.stopPropagation();
    }
    getItemContext(item) {
        return item;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.dropdownSubs.forEach(s => {
            s.unsubscribe();
        });
    }
};
SerFilterComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['primaryKey',] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Attribute, args: ['labelKey',] }] }
];
__decorate([
    Input()
], SerFilterComponent.prototype, "data", void 0);
__decorate([
    Input()
], SerFilterComponent.prototype, "settings", void 0);
__decorate([
    Input()
], SerFilterComponent.prototype, "loading", void 0);
__decorate([
    Input()
], SerFilterComponent.prototype, "multiple", void 0);
__decorate([
    Input()
], SerFilterComponent.prototype, "label", void 0);
__decorate([
    Output('onSelect')
], SerFilterComponent.prototype, "onSelect", void 0);
__decorate([
    Output('onDeSelect')
], SerFilterComponent.prototype, "onDeSelect", void 0);
__decorate([
    Output('onSelectAll')
], SerFilterComponent.prototype, "onSelectAll", void 0);
__decorate([
    Output('onDeSelectAll')
], SerFilterComponent.prototype, "onDeSelectAll", void 0);
__decorate([
    Output('onOpen')
], SerFilterComponent.prototype, "onOpen", void 0);
__decorate([
    Output('onClose')
], SerFilterComponent.prototype, "onClose", void 0);
__decorate([
    Output('onScrollToEnd')
], SerFilterComponent.prototype, "onScrollToEnd", void 0);
__decorate([
    Output('onFilterSelectAll')
], SerFilterComponent.prototype, "onFilterSelectAll", void 0);
__decorate([
    Output('onFilterDeSelectAll')
], SerFilterComponent.prototype, "onFilterDeSelectAll", void 0);
__decorate([
    Output('onAddFilterNewItem')
], SerFilterComponent.prototype, "onAddFilterNewItem", void 0);
__decorate([
    Output('onGroupSelect')
], SerFilterComponent.prototype, "onGroupSelect", void 0);
__decorate([
    Output('onGroupDeSelect')
], SerFilterComponent.prototype, "onGroupDeSelect", void 0);
__decorate([
    ContentChild(SDItemDirective, { static: true })
], SerFilterComponent.prototype, "itemTempl", void 0);
__decorate([
    ContentChild(SDBadgeDirective, { static: true })
], SerFilterComponent.prototype, "badgeTempl", void 0);
__decorate([
    ViewChild('searchInput')
], SerFilterComponent.prototype, "searchInput", void 0);
__decorate([
    ViewChild('selectedList')
], SerFilterComponent.prototype, "selectedListElem", void 0);
__decorate([
    ViewChild('dropdownList')
], SerFilterComponent.prototype, "dropdownListElem", void 0);
__decorate([
    HostBinding('class.disabled')
], SerFilterComponent.prototype, "isDisabled", void 0);
__decorate([
    HostBinding('class.active')
], SerFilterComponent.prototype, "isActive", void 0);
SerFilterComponent = SerFilterComponent_1 = __decorate([
    Component({
        selector: 'ser-filter',
        template: "<div class=\"list-filter\" #searchInput (click)=\"toggleDropdown($event)\">\r\n\r\n    <span class=\"material-icons icon-search\">search</span>\r\n\r\n    <div class=\"label\" [ngClass]=\"{active: labelActive}\">{{ label }}</div>\r\n\r\n    <input class=\"c-input not-styled\" type=\"text\" [(ngModel)]=\"filter\">\r\n\r\n    <span [hidden]=\"!hasValue(filter)\" (click)=\"clearSearch()\" class=\"material-icons icon-clear\">cancel</span>\r\n\r\n    <div class=\"controls\">\r\n\r\n        <!-- <button type=\"button\" *ngIf=\"settings.clearAll && !isDisabled && selectedItems?.length > 0\" class=\"clear-all\" (click)=\"clearSelection($event);\">\r\n            <span class=\"material-icons\">close</span>\r\n        </button> -->\r\n\r\n        <span class=\"material-icons chevron\" [ngClass]=\"{'rotate': isActive}\">keyboard_arrow_down</span>\r\n    </div>\r\n\r\n</div>\r\n\r\n<div class=\"selected-list\" #selectedList [attr.tabindex]=\"0\">\r\n\r\n    <div class=\"values\">\r\n\r\n        <ng-container *ngIf=\"hasValue(selectedItems)\">\r\n\r\n            <div class=\"token-list\">\r\n                <div class=\"token\" *ngFor=\"let item of selectedItems;trackBy: trackByFn.bind(this);let k = index\">\r\n                    <ng-container>\r\n\r\n                        <span *ngIf=\"!hasValue(badgeTempl)\" class=\"label\">{{ item[settings.labelKey] }}</span>\r\n                        <span *ngIf=\"hasValue(badgeTempl)\" class=\"label\">\r\n                            <ng-container *ngTemplateOutlet=\"badgeTempl.template; context:{item: item}\"></ng-container>\r\n                        </span>\r\n\r\n                        <span class=\"remove\" (click)=\"onItemClick(item, k, $event);$event.stopPropagation()\">\r\n                            <span class=\"material-icons\">close</span>\r\n                        </span>\r\n                    </ng-container>\r\n                </div>\r\n            </div>\r\n\r\n        </ng-container>\r\n    </div>\r\n</div>\r\n\r\n<div #dropdownList class=\"dropdown-list\">\r\n\r\n    <div class=\"pure-checkbox select-all\" *ngIf=\"settings.enableCheckAll && data?.length > 0 && !isDisabledItemPresent\" (click)=\"toggleSelectAll()\">\r\n        <input type=\"checkbox\" [checked]=\"isSelectAll\" />\r\n        <label>\r\n            <span [hidden]=\"isSelectAll\">{{ settings.selectAllText }}</span>\r\n            <span [hidden]=\"!isSelectAll\">{{ settings.unSelectAllText }}</span>\r\n        </label>\r\n    </div>\r\n\r\n    <div class=\"filter-select-all\" *ngIf=\"settings.enableFilterSelectAll && !isDisabledItemPresent\">\r\n\r\n        <div class=\"pure-checkbox select-all\" *ngIf=\"filter?.length > 0 && filterLength > 0\" (click)=\"toggleFilterSelectAll()\">\r\n            <input type=\"checkbox\" [checked]=\"isFilterSelectAll\" />\r\n            <label>\r\n                <span [hidden]=\"isFilterSelectAll\">{{settings.filterSelectAllText}}</span>\r\n                <span [hidden]=\"!isFilterSelectAll\">{{settings.filterUnSelectAllText}}</span>\r\n            </label>\r\n        </div>\r\n\r\n        <!-- <div class=\"nodata-label\" *ngIf=\"filterLength == 0\" [hidden]=\"filter == undefined || filter?.length == 0\">{{ settings.noDataLabel }}</div> -->\r\n\r\n    </div>\r\n\r\n    <div *ngIf=\"!hasValue(itemTempl)\" class=\"list lazyContainer\" [style.maxHeight]=\"settings.maxHeight+'px'\">\r\n        <ng-container *ngFor=\"let item of data | serFilterListFilter:filter : settings.searchBy; let i = index;\">\r\n            <div class=\"item pure-checkbox\"  *ngIf=\"!isSelected(item)\" (click)=\"onItemClick(item, i, $event)\">\r\n                {{ item[settings.labelKey] }}\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n\r\n    <div *ngIf=\"hasValue(itemTempl)\" class=\"list lazyContainer\" [style.maxHeight]=\"settings.maxHeight+'px'\">\r\n        <ng-container *ngFor=\"let item of data | serFilterListFilter:filter : settings.searchBy; let i = index;\">\r\n            <div class=\"item pure-checkbox\" *ngIf=\"!isSelected(item)\" (click)=\"onItemClick(item, i, $event)\">\r\n                <ng-container *ngTemplateOutlet=\"itemTempl.template; context:{item: item}\"></ng-container>\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n\r\n    <h5 class=\"list-message\" *ngIf=\"!hasValue(data)\">{{ settings.noDataLabel }}</h5>\r\n\r\n</div>\r\n",
        host: { '[class]': 'defaultSettings.classes' },
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => SerFilterComponent_1),
                multi: true
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => SerFilterComponent_1),
                multi: true,
            }
        ],
        encapsulation: ViewEncapsulation.None
    }),
    __param(3, Optional()), __param(3, Attribute('primaryKey')),
    __param(4, Optional()), __param(4, Attribute('labelKey'))
], SerFilterComponent);

// tslint:disable: max-line-length
const dependencies$1 = [
    SerFilterComponent,
    SerFilterListFilterPipe
];
let SerFilterModule = class SerFilterModule {
};
SerFilterModule = __decorate([
    NgModule({
        imports: [CommonModule, BrowserModule, FormsModule],
        declarations: [...dependencies$1],
        exports: [...dependencies$1],
        providers: []
    })
], SerFilterModule);

const dependencies$2 = [
    SerFormElementComponent,
    SerControlDirective,
    SerErrorsDirective,
    SerErrorDirective,
    PinInputComponent,
    AddressColComponent
];
let SerFormModule = class SerFormModule {
};
SerFormModule = __decorate([
    NgModule({
        imports: [CommonModule, BrowserModule, ReactiveFormsModule],
        declarations: [...dependencies$2],
        exports: [...dependencies$2, SerSelectModule, SerFilterModule]
    })
], SerFormModule);

let WhenScrolledDirective = class WhenScrolledDirective {
    constructor(_elementRef, rendered) {
        this._elementRef = _elementRef;
        this.callback = new EventEmitter();
        this.listener = rendered.listen(this._elementRef.nativeElement, 'scroll', (ev) => {
            if (ev.target.scrollTop + ev.target.offsetHeight >= ev.target.scrollHeight) {
                this.callback.emit();
            }
        });
    }
    ngOnDestroy() {
        this.listener();
    }
};
WhenScrolledDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Output()
], WhenScrolledDirective.prototype, "callback", void 0);
WhenScrolledDirective = __decorate([
    Directive({
        // tslint:disable-next-line: directive-selector
        selector: '[whenScrolled]'
    })
], WhenScrolledDirective);

let FinishTypingDirective = class FinishTypingDirective {
    constructor(_elementRef, rendered) {
        this._elementRef = _elementRef;
        this.callback = new EventEmitter();
        this.listener = rendered.listen(this._elementRef.nativeElement, 'keyup', () => {
            if (this.inputChangedPromise) {
                clearTimeout(this.inputChangedPromise);
            }
            this.inputChangedPromise = setTimeout(() => {
                this.callback.emit();
            }, 500);
        });
    }
    ngOnDestroy() {
        this.listener();
    }
};
FinishTypingDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Output()
], FinishTypingDirective.prototype, "callback", void 0);
FinishTypingDirective = __decorate([
    Directive({
        // tslint:disable-next-line: directive-selector
        selector: '[finishTyping]'
    })
], FinishTypingDirective);

let CopyToClipboardDirective = class CopyToClipboardDirective {
    constructor() {
        this.valToCopy = '';
        this.copied = new EventEmitter();
    }
    onClick(val) {
        const selBox = document.createElement('textarea');
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
    }
};
__decorate([
    Input('copyToClipboard')
], CopyToClipboardDirective.prototype, "valToCopy", void 0);
__decorate([
    Output()
], CopyToClipboardDirective.prototype, "copied", void 0);
__decorate([
    HostListener('click', ['$event'])
], CopyToClipboardDirective.prototype, "onClick", null);
CopyToClipboardDirective = __decorate([
    Directive({
        // tslint:disable-next-line: directive-selector
        selector: '[copyToClipboard]'
    })
], CopyToClipboardDirective);

let BgImageDirective = class BgImageDirective {
    constructor(el, rendered, aws) {
        this.el = el;
        this.rendered = rendered;
        this.aws = aws;
        this.imageRegex = /(image\/(jpe?g|png|gif|bmp))/i;
    }
    ngOnChanges() {
        if (hasValue(this.image.file) && this.image.file instanceof File && this.imageRegex.test(this.image.file.type)) {
            readAsDataURL(this.image.file).pipe(take(1)).subscribe((result) => {
                this.rendered.setStyle(this.el.nativeElement, 'background-image', `url(${result})`);
            });
        }
        else if (hasValue(this.image.url)) {
            this.rendered.setStyle(this.el.nativeElement, 'background-image', this.aws.getS3BgUrl(this.image.url));
        }
        else {
            this.rendered.removeStyle(this.el.nativeElement, 'background-image');
        }
    }
};
BgImageDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: AwsService }
];
__decorate([
    Input('bgImage')
], BgImageDirective.prototype, "image", void 0);
BgImageDirective = __decorate([
    Directive({
        // tslint:disable-next-line: directive-selector
        selector: '[bgImage]'
    })
], BgImageDirective);

const dependencies$3 = [
    WhenScrolledDirective,
    FinishTypingDirective,
    BgImageDirective,
    CopyToClipboardDirective
];
let SerUiModule = class SerUiModule {
};
SerUiModule = __decorate([
    NgModule({
        declarations: [...dependencies$3],
        exports: [...dependencies$3]
    })
], SerUiModule);

/*
 * Public API Surface of ngx
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AWS_CONFIG, AddressColComponent, AwsModule, AwsService, ClaimsService, CookiesService, CopyToClipboardDirective, CustomValidators, DataService, ExternalScriptService, FacebookSDKConfig, FacebookSDKModule, FacebookSDKService, FinishTypingDirective, GoogleClientConfig, GoogleSDKConfig, GoogleSDKModule, GoogleSDKService, KEYBOARD_KEYS, LEAFLET_MAP_LAYERS, LeafletMap, MapService, NG_FSDK_CONFIG, NG_GAPI_CONFIG, Patterns, PinInputComponent, PrefersColorSchemeService, SDBadgeDirective, SDItemDirective, SDSearchDirective, SerControlDirective, SerErrorDirective, SerErrorsDirective, SerFilterComponent, SerFilterListFilterPipe, SerFilterModule, SerFormElementComponent, SerFormModule, SerSelectComponent, SerSelectListFilterPipe, SerSelectModule, SerUiModule, VIRTUAL_SCROLLER_DEFAULT_OPTIONS_FACTORY, VirtualScrollerComponent, VirtualScrollerModule, WhenScrolledDirective, arrayGroupBy, browserWidth, generatePassword, getFileType, getObjIndexByValue, getObjectByValue, getRandomInt, getStyles, guid, hasPdfViewer, hasValue, inArray, mergeObjs, notInArray, objHasValue, objectToGraphParams, readAsArrayBuffer, readAsDataURL, setBowserClasses, toArray, uniqueId, ɵ0, match as ɵa, lowerThan as ɵb, lowerOrEqualThan as ɵc, greaterThan as ɵd, greaterOrEqualThan as ɵe, maxFileSize as ɵf, minFileSize as ɵg, requiredFileType as ɵh, alreadyExist as ɵi, BgImageDirective as ɵk };
//# sourceMappingURL=sersol-ngx.js.map
