import { __decorate, __param } from "tslib";
/// <reference types="gapi" />
/// <reference types="gapi.auth2" />
import { Observable } from 'rxjs';
import { Inject, Injectable, InjectionToken, Output, EventEmitter } from '@angular/core';
import { GoogleSDKConfig } from './config/google-sdk.config';
import { GoogleUserProfile, GoogleClientConfig } from './Igoogle';
import * as i0 from "@angular/core";
export var NG_GAPI_CONFIG = new InjectionToken('google.config');
/**
 * @description
 * Servicio para interactuar con la API de Google
 */
var GoogleSDKService = /** @class */ (function () {
    function GoogleSDKService(config) {
        var _this = this;
        this.gapiUrl = 'https://apis.google.com/js/api.js';
        this.onload = new EventEmitter();
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
        return new Observable(function (observer) {
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
        return new Observable(function (observer) {
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
        { type: GoogleClientConfig, decorators: [{ type: Inject, args: [NG_GAPI_CONFIG,] }] }
    ]; };
    GoogleSDKService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GoogleSDKService_Factory() { return new GoogleSDKService(i0.ɵɵinject(NG_GAPI_CONFIG)); }, token: GoogleSDKService, providedIn: "root" });
    __decorate([
        Output()
    ], GoogleSDKService.prototype, "onload", void 0);
    GoogleSDKService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(0, Inject(NG_GAPI_CONFIG))
    ], GoogleSDKService);
    return GoogleSDKService;
}());
export { GoogleSDKService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXNkay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlcnNvbC9uZ3gvIiwic291cmNlcyI6WyJnb29nbGUvZ29vZ2xlLXNkay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4QkFBOEI7QUFDOUIsb0NBQW9DO0FBRXBDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFFbEUsTUFBTSxDQUFDLElBQUksY0FBYyxHQUF1QyxJQUFJLGNBQWMsQ0FBcUIsZUFBZSxDQUFDLENBQUM7QUFFeEg7OztHQUdHO0FBSUg7SUFxQkUsMEJBQW9DLE1BQTBCO1FBQTlELGlCQU1DO1FBMUJnQixZQUFPLEdBQVcsbUNBQW1DLENBQUM7UUFFN0QsV0FBTSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBbUJ4RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2xDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBckJELHNCQUFXLG9DQUFNO2FBQWpCO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7YUFDRCxVQUFrQixLQUFzQjtZQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztR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Qzs7Z0JBdEUyQyxrQkFBa0IsdUJBQWpELE1BQU0sU0FBQyxjQUFjOzs7SUFsQnhCO1FBQVQsTUFBTSxFQUFFO29EQUFpRDtJQUgvQyxnQkFBZ0I7UUFINUIsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztRQXNCYSxXQUFBLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtPQXJCeEIsZ0JBQWdCLENBNEY1QjsyQkE5R0Q7Q0E4R0MsQUE1RkQsSUE0RkM7U0E1RlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJnYXBpXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJnYXBpLmF1dGgyXCIgLz5cclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgR29vZ2xlU0RLQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvZ29vZ2xlLXNkay5jb25maWcnO1xyXG5pbXBvcnQgeyBHb29nbGVVc2VyUHJvZmlsZSwgR29vZ2xlQ2xpZW50Q29uZmlnIH0gZnJvbSAnLi9JZ29vZ2xlJztcclxuXHJcbmV4cG9ydCBsZXQgTkdfR0FQSV9DT05GSUc6IEluamVjdGlvblRva2VuPEdvb2dsZUNsaWVudENvbmZpZz4gPSBuZXcgSW5qZWN0aW9uVG9rZW48R29vZ2xlQ2xpZW50Q29uZmlnPignZ29vZ2xlLmNvbmZpZycpO1xyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBTZXJ2aWNpbyBwYXJhIGludGVyYWN0dWFyIGNvbiBsYSBBUEkgZGUgR29vZ2xlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVTREtTZXJ2aWNlIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGdhcGlVcmw6IHN0cmluZyA9ICdodHRwczovL2FwaXMuZ29vZ2xlLmNvbS9qcy9hcGkuanMnO1xyXG5cclxuICBAT3V0cHV0KCkgb25sb2FkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHByaXZhdGUgX2NvbmZpZzogR29vZ2xlU0RLQ29uZmlnO1xyXG4gIHB1YmxpYyBnZXQgY29uZmlnKCk6IEdvb2dsZVNES0NvbmZpZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0IGNvbmZpZyh2YWx1ZTogR29vZ2xlU0RLQ29uZmlnKSB7XHJcbiAgICB0aGlzLl9jb25maWcgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX0dvb2dsZUF1dGg6IGdhcGkuYXV0aDIuR29vZ2xlQXV0aDtcclxuICBwdWJsaWMgZ2V0IEdvb2dsZUF1dGgoKTogZ2FwaS5hdXRoMi5Hb29nbGVBdXRoIHtcclxuICAgIHJldHVybiB0aGlzLl9Hb29nbGVBdXRoO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0IEdvb2dsZUF1dGgodmFsdWU6IGdhcGkuYXV0aDIuR29vZ2xlQXV0aCkge1xyXG4gICAgdGhpcy5fR29vZ2xlQXV0aCA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChOR19HQVBJX0NPTkZJRykgY29uZmlnOiBHb29nbGVDbGllbnRDb25maWcpIHtcclxuICAgIHRoaXMuY29uZmlnID0gbmV3IEdvb2dsZVNES0NvbmZpZyhjb25maWcpO1xyXG4gICAgdGhpcy5sb2FkU0RLKCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ0dvb2dsZTogU0RLIGxvYWRlZCcpO1xyXG4gICAgICB0aGlzLm9ubG9hZC5lbWl0KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIE3DqXRvZG8gcGFyYSBvYnRlbmVyIHVuIHRva2VuIGRlIGluaWNpbyBkZSBzZXNpw7NuIGp1bnRvIGNvbiBsYSBpbmZvcm1hY2nDs24gZGUgcGVyZmlsXHJcbiAgICogQHJldHVybnMge09ic2VydmFibGU8R29vZ2xlVXNlclByb2ZpbGU+fVxyXG4gICAqL1xyXG4gIHB1YmxpYyBsb2dpbigpOiBPYnNlcnZhYmxlPEdvb2dsZVVzZXJQcm9maWxlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxHb29nbGVVc2VyUHJvZmlsZT4pID0+IHtcclxuXHJcbiAgICAgIHRoaXMuR29vZ2xlQXV0aC5zaWduSW4oKS50aGVuKChyZXM6IGdhcGkuYXV0aDIuR29vZ2xlVXNlcikgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBwcm9maWxlID0gcmVzLmdldEJhc2ljUHJvZmlsZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBnb29nbGVQcm9maWxlOiBHb29nbGVVc2VyUHJvZmlsZSA9IHtcclxuICAgICAgICAgIGlkOiBwcm9maWxlLmdldElkKCksXHJcbiAgICAgICAgICBpZF90b2tlbjogcmVzLmdldEF1dGhSZXNwb25zZSgpLmlkX3Rva2VuLFxyXG4gICAgICAgICAgZmlyc3RfbmFtZTogcHJvZmlsZS5nZXRHaXZlbk5hbWUoKSxcclxuICAgICAgICAgIGxhc3RfbmFtZTogcHJvZmlsZS5nZXRGYW1pbHlOYW1lKCksXHJcbiAgICAgICAgICBlbWFpbDogcHJvZmlsZS5nZXRFbWFpbCgpLFxyXG4gICAgICAgICAgcGljdHVyZTogcHJvZmlsZS5nZXRJbWFnZVVybCgpLnJlcGxhY2UoJz1zOTYtJywgJz0tJylcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvYnNlcnZlci5uZXh0KGdvb2dsZVByb2ZpbGUpO1xyXG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcblxyXG4gICAgICB9LCAoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgIHJldHVybiBvYnNlcnZlci5lcnJvcihlcnIpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIE1ldG9kbyBwcml2YWRvIHF1ZSBjYXJnYSBsYSBsaWJyZXJpYSBkZSBHb29nbGUsIGFsIGNhcmdhcnNlIGNvcnJlY3RhbWVudGUsIHNlIGVtaXRlIGVsIGV2ZW50byAnb25sb2FkJ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgbG9hZFNESygpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPHZvaWQ+KSA9PiB7XHJcblxyXG4gICAgICBpZiAoKHdpbmRvdyBhcyBhbnkpLmdhcGkgPT0gbnVsbCkge1xyXG5cclxuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgICAgbm9kZS5zcmMgPSB0aGlzLmdhcGlVcmw7XHJcbiAgICAgICAgbm9kZS50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XHJcbiAgICAgICAgbm9kZS5hc3luYyA9IHRydWU7XHJcbiAgICAgICAgbm9kZS5kZWZlciA9IHRydWU7XHJcbiAgICAgICAgbm9kZS5pZCA9ICdnb29nbGUtYXBpJztcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIG5vZGUub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgZ2FwaS5sb2FkKCdhdXRoMicsICgpID0+IHtcclxuICAgICAgICAgICAgZ2FwaS5hdXRoMi5pbml0KHRoaXMuY29uZmlnLmNsaWVudENvbmZpZykudGhlbigoYXV0aDogZ2FwaS5hdXRoMi5Hb29nbGVBdXRoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5Hb29nbGVBdXRoID0gYXV0aDtcclxuICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycjogYW55KSA9PiBvYnNlcnZlci5lcnJvcihlcnIpKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9ic2VydmVyLm5leHQoKTtcclxuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19