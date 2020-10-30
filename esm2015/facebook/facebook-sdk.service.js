import { __decorate, __param } from "tslib";
import { Observable } from 'rxjs';
import { Inject, Injectable, InjectionToken, Output, EventEmitter } from '@angular/core';
import { FacebookSDKConfig } from './config/facebook-sdk.config';
import * as i0 from "@angular/core";
export let NG_FSDK_CONFIG = new InjectionToken('facebook.config');
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
FacebookSDKService.ɵprov = i0.ɵɵdefineInjectable({ factory: function FacebookSDKService_Factory() { return new FacebookSDKService(i0.ɵɵinject(NG_FSDK_CONFIG)); }, token: FacebookSDKService, providedIn: "root" });
__decorate([
    Output()
], FacebookSDKService.prototype, "onload", void 0);
FacebookSDKService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(NG_FSDK_CONFIG))
], FacebookSDKService);
export { FacebookSDKService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2stc2RrLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImZhY2Vib29rL2ZhY2Vib29rLXNkay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztBQUdqRSxNQUFNLENBQUMsSUFBSSxjQUFjLEdBQXdDLElBQUksY0FBYyxDQUFzQixpQkFBaUIsQ0FBQyxDQUFDO0FBRTVIOzs7R0FHRztBQUlILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBWTdCLFlBQW9DLE1BQTJCO1FBWDlDLFlBQU8sR0FBVywyQ0FBMkMsQ0FBQztRQVNyRSxXQUFNLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHeEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWZELElBQVcsTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBVyxNQUFNLENBQUMsS0FBd0I7UUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQVlEOzs7O09BSUc7SUFDSSxLQUFLO1FBQ1YsT0FBTyxJ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QUUsTUFBTTtLQUNuQixDQUFDO0lBYWEsV0FBQSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUE7R0FaeEIsa0JBQWtCLENBNkY5QjtTQTdGWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cImZhY2Vib29rLWpzLXNka1wiIC8+XHJcblxyXG5pbXBvcnQgeyBGYWNlYm9va1VzZXJQcm9maWxlIH0gZnJvbSAnLi9JZmFjZWJvb2snO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZhY2Vib29rU0RLQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvZmFjZWJvb2stc2RrLmNvbmZpZyc7XHJcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcblxyXG5leHBvcnQgbGV0IE5HX0ZTREtfQ09ORklHOiBJbmplY3Rpb25Ub2tlbjxmYWNlYm9vay5Jbml0UGFyYW1zPiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxmYWNlYm9vay5Jbml0UGFyYW1zPignZmFjZWJvb2suY29uZmlnJyk7XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIFNlcnZpY2lvIHBhcmEgaW50ZXJhY3R1cmFyIGNvbiBlbCBTREsgZGUgRmFjZWJvb2tcclxuICovXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZhY2Vib29rU0RLU2VydmljZSB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBmc2RrVXJsOiBzdHJpbmcgPSAnaHR0cHM6Ly9jb25uZWN0LmZhY2Vib29rLm5ldC9lbl9VUy9zZGsuanMnO1xyXG4gIHByaXZhdGUgX2NvbmZpZzogRmFjZWJvb2tTREtDb25maWc7XHJcbiAgcHVibGljIGdldCBjb25maWcoKTogRmFjZWJvb2tTREtDb25maWcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICB9XHJcbiAgcHVibGljIHNldCBjb25maWcodmFsdWU6IEZhY2Vib29rU0RLQ29uZmlnKSB7XHJcbiAgICB0aGlzLl9jb25maWcgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBvbmxvYWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChOR19GU0RLX0NPTkZJRykgY29uZmlnOiBmYWNlYm9vay5Jbml0UGFyYW1zKSB7XHJcbiAgICB0aGlzLmNvbmZpZyA9IG5ldyBGYWNlYm9va1NES0NvbmZpZyhjb25maWcpO1xyXG4gICAgdGhpcy5sb2FkU0RLKCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ0ZhY2Vib29rOiBTREsgbG9hZGVkJyk7XHJcbiAgICAgIHRoaXMub25sb2FkLmVtaXQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogTcOpdG9kbyBwYXJhIG9idGVuZXIgdW4gdG9rZW4gZGUgaW5pY2lvIGRlIHNlc2nDs24ganVudG8gY29uIGxhIGluZm9ybWFjacOzbiBkZSBwZXJmaWxcclxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxGYWNlYm9va1VzZXJQcm9maWxlPn1cclxuICAgKi9cclxuICBwdWJsaWMgbG9naW4oKTogT2JzZXJ2YWJsZTxGYWNlYm9va1VzZXJQcm9maWxlPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxGYWNlYm9va1VzZXJQcm9maWxlPikgPT4ge1xyXG5cclxuICAgICAgRkIubG9naW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAnY29ubmVjdGVkJykge1xyXG4gICAgICAgICAgRkIuYXBpKCcvbWUnLCB7IGZpZWxkczogJ2ZpcnN0X25hbWUsbGFzdF9uYW1lLGVtYWlsJyB9LCAocmVzOiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgIEZCLmFwaSgnL21lL3BpY3R1cmUnLCB7XHJcbiAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICByZWRpcmVjdDogJ2ZhbHNlJ1xyXG4gICAgICAgICAgICB9LCAocGljOiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgY29uc3QgZmFjZWJvb2tQcm9maWxlOiBGYWNlYm9va1VzZXJQcm9maWxlID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IHJlcy5pZCxcclxuICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogcmVzcG9uc2UuYXV0aFJlc3BvbnNlLmFjY2Vzc1Rva2VuLFxyXG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogcmVzLmZpcnN0X25hbWUsXHJcbiAgICAgICAgICAgICAgICBsYXN0X25hbWU6IHJlcy5sYXN0X25hbWUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogcmVzLmVtYWlsLFxyXG4gICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgIGlmIChwaWM/LmRhdGE/LnVybCkge1xyXG4gICAgICAgICAgICAgICAgZmFjZWJvb2tQcm9maWxlLnBpY3R1cmUgPSBwaWMuZGF0YS51cmw7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGZhY2Vib29rUHJvZmlsZSk7XHJcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKCdGYWNlYm9vazogUG9wdXAgY2xvc2VkIGJ5IHVzZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIHsgc2NvcGU6ICdwdWJsaWNfcHJvZmlsZSxlbWFpbCcgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIE1ldG9kbyBwcml2YWRvIHF1ZSBjYXJnYSBsYSBsaWJyZXJpYSBkZSBGYWNlYm9vaywgYWwgY2FyZ2Fyc2UgY29ycmVjdGFtZW50ZSwgc2UgZW1pdGUgZWwgZXZlbnRvICdvbmxvYWQnXHJcbiAgICovXHJcbiAgcHVibGljIGxvYWRTREsoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxib29sZWFuPikgPT4ge1xyXG5cclxuICAgICAgaWYgKCh3aW5kb3cgYXMgYW55KS5GQiA9PSBudWxsKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICBub2RlLnNyYyA9IHRoaXMuZnNka1VybDtcclxuICAgICAgICBub2RlLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcclxuICAgICAgICBub2RlLmFzeW5jID0gdHJ1ZTtcclxuICAgICAgICBub2RlLmRlZmVyID0gdHJ1ZTtcclxuICAgICAgICBub2RlLmlkID0gJ2ZhY2Vib29rLXNkayc7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChub2RlKTtcclxuICAgICAgICBub2RlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgIEZCLmluaXQodGhpcy5jb25maWcuY2xpZW50Q29uZmlnKTtcclxuICAgICAgICAgIEZCLkFwcEV2ZW50cy5sb2dQYWdlVmlldygpO1xyXG5cclxuICAgICAgICAgIG9ic2VydmVyLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9ic2VydmVyLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==