/// <reference types="gapi" />
/// <reference types="gapi.auth2" />

import { Observable } from 'rxjs';
import { Inject, Injectable, InjectionToken, Output, EventEmitter } from '@angular/core';
import { Observer } from 'rxjs';
import { GoogleSDKConfig } from './config/google-sdk.config';
import { GoogleUserProfile, GoogleClientConfig } from './Igoogle';

export let NG_GAPI_CONFIG: InjectionToken<GoogleClientConfig> = new InjectionToken<GoogleClientConfig>('google.config');

/**
 * @description
 * Servicio para interactuar con la API de Google
 */
@Injectable({
    providedIn: 'root'
})
export class GoogleSDKService {
    private readonly gapiUrl: string = 'https://apis.google.com/js/api.js';

    @Output() onload: EventEmitter<void> = new EventEmitter();

    private _config: GoogleSDKConfig;
    public get config(): GoogleSDKConfig {
        return this._config;
    }
    public set config(value: GoogleSDKConfig) {
        this._config = value;
    }

    private _GoogleAuth: gapi.auth2.GoogleAuth;
    public get GoogleAuth(): gapi.auth2.GoogleAuth {
        return this._GoogleAuth;
    }
    public set GoogleAuth(value: gapi.auth2.GoogleAuth) {
        this._GoogleAuth = value;
    }

    constructor(@Inject(NG_GAPI_CONFIG) config: GoogleClientConfig) {
        this.config = new GoogleSDKConfig(config);
        this.loadSDK().subscribe(() => {
            console.log('Google: SDK loaded');
            this.onload.emit();
        });
    }

    /**
     * @description
     * Método para obtener un token de inicio de sesión junto con la información de perfil
     * @returns {Observable<GoogleUserProfile>}
     */
    public login(): Observable<GoogleUserProfile> {
        return new Observable((observer: Observer<GoogleUserProfile>) => {

            this.GoogleAuth.signIn().then((res: gapi.auth2.GoogleUser) => {

                const profile = res.getBasicProfile();

                const googleProfile: GoogleUserProfile = {
                    id: profile.getId(),
                    id_token: res.getAuthResponse().id_token,
                    first_name: profile.getGivenName(),
                    last_name: profile.getFamilyName(),
                    email: profile.getEmail(),
                    picture: profile.getImageUrl().replace('=s96-', '=-')
                };

                observer.next(googleProfile);
                observer.complete();

            }, (err: any) => {
                return observer.error(err);
            });

        });
    }

    /**
     * @description
     * Metodo privado que carga la libreria de Google, al cargarse correctamente, se emite el evento 'onload'
     */
    private loadSDK(): Observable<void> {
        return new Observable((observer: Observer<void>) => {

            if ((window as any).gapi == null) {

                const node = document.createElement('script');
                node.src = this.gapiUrl;
                node.type = 'text/javascript';
                node.async = true;
                node.defer = true;
                node.id = 'google-api';
                document.getElementsByTagName('head')[0].appendChild(node);
                node.onload = () => {
                    gapi.load('auth2', () => {
                        gapi.auth2.init(this.config.clientConfig).then((auth: gapi.auth2.GoogleAuth) => {
                            this.GoogleAuth = auth;
                            observer.next();
                            observer.complete();
                        }).catch((err: any) => observer.error(err));
                    });
                };

            } else {
                observer.next();
                observer.complete();
            }
        });
    }
}
