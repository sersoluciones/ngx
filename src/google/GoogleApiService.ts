import {Observable} from 'rxjs';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {GoogleApiConfig, NgGapiClientConfig} from './config/GoogleApiConfig';
import {Observer} from 'rxjs';

export let NG_GAPI_CONFIG: InjectionToken<NgGapiClientConfig> = new InjectionToken<NgGapiClientConfig>('google.config');

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {
    private readonly gapiUrl: string = 'https://apis.google.com/js/api.js';
    public config: GoogleApiConfig;

    constructor(@Inject(NG_GAPI_CONFIG) config: NgGapiClientConfig) {
        this.config = new GoogleApiConfig(config);
    }

    public get(): Observable<boolean> {
      return new Observable((observer: Observer<boolean>) => {

          if ((window as any).gapi == null) {

            const node = document.createElement('script');
            node.src = this.gapiUrl;
            node.type = 'text/javascript';
            node.async = true;
            node.defer = true;
            node.id = 'google-api';
            document.getElementsByTagName('head')[0].appendChild(node);
            node.onload = () => {
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
