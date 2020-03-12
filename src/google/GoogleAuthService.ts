import {Injectable} from '@angular/core';
import {GoogleApiService} from './GoogleApiService';
import { gapi } from './IGoogleApi';
import GoogleAuth = gapi.auth2.GoogleAuth;
import {mergeMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {Observable, Observer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
    private GoogleAuth: GoogleAuth = undefined;

    constructor(private googleApi: GoogleApiService) {
        this.googleApi.get().subscribe(() => {
            this.loadGapiAuth().subscribe();
        });
    }

    public getAuth(newInstance = false): Observable<GoogleAuth> {
        if (!this.GoogleAuth || newInstance) {
            return this.googleApi.get()
                .pipe(mergeMap(() => this.loadGapiAuth()));
        }
        return of(this.GoogleAuth);
    }

    private loadGapiAuth(): Observable<GoogleAuth> {
        return new Observable((observer: Observer<GoogleAuth>) => {
          (window as any).gapi.load('auth2', () => {
            (window as any).gapi.auth2.init(this.googleApi.config.getClientConfig()).then((auth: GoogleAuth) => {
                    this.GoogleAuth = auth;
                    observer.next(auth);
                    observer.complete();
                }).catch((err: any) => observer.error(err));
            });
        });
    }
}
