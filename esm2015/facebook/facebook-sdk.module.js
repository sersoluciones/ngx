var FacebookSDKModule_1;
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { FacebookSDKService } from './facebook-sdk.service';
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
export { FacebookSDKModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2stc2RrLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZXJzb2wvbmd4LyIsInNvdXJjZXMiOlsiZmFjZWJvb2svZmFjZWJvb2stc2RrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsSUFBYSxpQkFBaUIseUJBQTlCLE1BQWEsaUJBQWlCO0lBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQTRCO1FBQ3pDLE9BQU87WUFDTCxRQUFRLEVBQUUsbUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVCxrQkFBa0I7Z0JBQ2xCLGtCQUFrQjthQUNuQjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQVZZLGlCQUFpQjtJQUQ3QixRQUFRLEVBQUU7R0FDRSxpQkFBaUIsQ0FVN0I7U0FWWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRmFjZWJvb2tTREtTZXJ2aWNlIH0gZnJvbSAnLi9mYWNlYm9vay1zZGsuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIE3Ds2R1bG8gcGFyYSBwYXJhbWV0cml6YXIgbGEgYXV0ZW50aWNhY2nDs24gY29uIEZhY2Vib29rXHJcbiAqIEBleGFtcGxlXHJcbiAqIGltcG9ydCB7IE5HX0ZTREtfQ09ORklHLCBGYWNlYm9va1NES01vZHVsZSB9IGZyb20gJ0BzZXJzb2wvbmd4JztcclxuICogQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgLi4uLFxyXG4gICAgICBGYWNlYm9va1NES01vZHVsZS5mb3JSb290KHtcclxuICAgICAgICAgIHByb3ZpZGU6IE5HX0ZTREtfQ09ORklHLFxyXG4gICAgICAgICAgdXNlVmFsdWU6IHtcclxuICAgICAgICAgICAgICBhcHBJZDogRkFDRUJPT0tfQ0xJRU5UX0lELFxyXG4gICAgICAgICAgICAgIGNvb2tpZTogdHJ1ZSxcclxuICAgICAgICAgICAgICB4ZmJtbDogdHJ1ZSxcclxuICAgICAgICAgICAgICB2ZXJzaW9uOiAndjYuMCdcclxuICAgICAgICAgIH1cclxuICAgICAgfSksXHJcbiAgICAgIC4uLlxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogWy4uLl0sXHJcbiAgICBzY2hlbWFzOiBbLi4uXSxcclxuICAgIHByb3ZpZGVyczogWy4uLl0sXHJcbiAgICBib290c3RyYXA6IFsuLi5dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XHJcbiAqL1xyXG5ATmdNb2R1bGUoKVxyXG5leHBvcnQgY2xhc3MgRmFjZWJvb2tTREtNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGZzZGtDb25maWdQcm92aWRlcjogUHJvdmlkZXIpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBGYWNlYm9va1NES01vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgZnNka0NvbmZpZ1Byb3ZpZGVyLFxyXG4gICAgICAgIEZhY2Vib29rU0RLU2VydmljZVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=