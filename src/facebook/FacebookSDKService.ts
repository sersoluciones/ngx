/// <reference types="facebook-js-sdk" />

import { FacebookUserProfile } from './IFacebook';
import { Observable } from 'rxjs';
import { Inject, Injectable, InjectionToken, Output, EventEmitter } from '@angular/core';
import { FacebookSDKConfig } from './config/FacebookSDKConfig';
import { Observer } from 'rxjs';

export let NG_FSDK_CONFIG: InjectionToken<facebook.InitParams> = new InjectionToken<facebook.InitParams>('facebook.config');

/**
 * @description
 * Servicio para interacturar con el SDK de Facebook
 */
@Injectable({
  providedIn: 'root'
})
export class FacebookSDKService {
  private readonly fsdkUrl: string = 'https://connect.facebook.net/en_US/sdk.js';
  private _config: FacebookSDKConfig;
  public get config(): FacebookSDKConfig {
    return this._config;
  }
  public set config(value: FacebookSDKConfig) {
    this._config = value;
  }

  @Output() onload: EventEmitter<void> = new EventEmitter();

  constructor(@Inject(NG_FSDK_CONFIG) config: facebook.InitParams) {
    this.config = new FacebookSDKConfig(config);
    this.loadSDK().subscribe(() => {
      console.log('Facebook: SDK loaded');
      this.onload.emit();
    });
  }

  /**
   * @description
   * Método para obtener un token de inicio de sesión junto con la información de perfil
   * @returns {Observable<FacebookUserProfile>}
   */
  public login(): Observable<FacebookUserProfile> {
    return new Observable((observer: Observer<FacebookUserProfile>) => {

      FB.login((response: any) => {
        if (response.status === 'connected') {
          FB.api('/me', { fields: 'first_name,last_name,email' }, (res: any) => {

            FB.api('/me/picture', {
              width: 300,
              redirect: 'false'
            }, (pic: any) => {

              const facebookProfile: FacebookUserProfile = {
                id: res.id,
                access_token: response.authResponse.accessToken,
                first_name: res.first_name,
                last_name: res.last_name,
                email: res.email,
              };

              if (pic?.data?.url) {
                facebookProfile.picture = pic.data.url;
              }

              observer.next(facebookProfile);
              observer.complete();

            });

          });

        } else {
          console.warn('Facebook: Popup closed by user');
        }
      }, { scope: 'public_profile,email' });
    });
  }

  /**
   * @description
   * Metodo privado que carga la libreria de Facebook, al cargarse correctamente, se emite el evento 'onload'
   */
  public loadSDK(): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {

      if ((window as any).FB == null) {

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

      } else {
        observer.next(true);
        observer.complete();
      }
    });
  }
}
