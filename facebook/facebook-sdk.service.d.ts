/// <reference types="facebook-js-sdk" />
import { FacebookUserProfile } from './Ifacebook';
import { Observable } from 'rxjs';
import { InjectionToken, EventEmitter } from '@angular/core';
import { FacebookSDKConfig } from './config/facebook-sdk.config';
export declare let NG_FSDK_CONFIG: InjectionToken<facebook.InitParams>;
/**
 * @description
 * Servicio para interacturar con el SDK de Facebook
 */
export declare class FacebookSDKService {
    private readonly fsdkUrl;
    private _config;
    get config(): FacebookSDKConfig;
    set config(value: FacebookSDKConfig);
    onload: EventEmitter<void>;
    constructor(config: facebook.InitParams);
    /**
     * @description
     * Método para obtener un token de inicio de sesión junto con la información de perfil
     * @returns {Observable<FacebookUserProfile>}
     */
    login(): Observable<FacebookUserProfile>;
    /**
     * @description
     * Metodo privado que carga la libreria de Facebook, al cargarse correctamente, se emite el evento 'onload'
     */
    loadSDK(): Observable<boolean>;
}
