/// <reference types="gapi.auth2" />
import { Observable } from 'rxjs';
import { InjectionToken, EventEmitter } from '@angular/core';
import { GoogleSDKConfig } from './config/google-sdk.config';
import { GoogleUserProfile, GoogleClientConfig } from './Igoogle';
export declare let NG_GAPI_CONFIG: InjectionToken<GoogleClientConfig>;
/**
 * @description
 * Servicio para interactuar con la API de Google
 */
export declare class GoogleSDKService {
    private readonly gapiUrl;
    onload: EventEmitter<void>;
    private _config;
    get config(): GoogleSDKConfig;
    set config(value: GoogleSDKConfig);
    private _GoogleAuth;
    get GoogleAuth(): gapi.auth2.GoogleAuth;
    set GoogleAuth(value: gapi.auth2.GoogleAuth);
    constructor(config: GoogleClientConfig);
    /**
     * @description
     * Método para obtener un token de inicio de sesión junto con la información de perfil
     * @returns {Observable<GoogleUserProfile>}
     */
    login(): Observable<GoogleUserProfile>;
    /**
     * @description
     * Metodo privado que carga la libreria de Google, al cargarse correctamente, se emite el evento 'onload'
     */
    private loadSDK;
}
