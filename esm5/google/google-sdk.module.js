import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { GoogleSDKService } from './google-sdk.service';
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
var GoogleSDKModule = /** @class */ (function () {
    function GoogleSDKModule() {
    }
    GoogleSDKModule_1 = GoogleSDKModule;
    GoogleSDKModule.forRoot = function (gapiConfigProvider) {
        return {
            ngModule: GoogleSDKModule_1,
            providers: [
                gapiConfigProvider,
                GoogleSDKService
            ]
        };
    };
    var GoogleSDKModule_1;
    GoogleSDKModule = GoogleSDKModule_1 = __decorate([
        NgModule()
    ], GoogleSDKModule);
    return GoogleSDKModule;
}());
export { GoogleSDKModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLXNkay5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2Vyc29sL25neC8iLCJzb3VyY2VzIjpbImdvb2dsZS9nb29nbGUtc2RrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUg7SUFBQTtJQVVBLENBQUM7d0JBVlksZUFBZTtJQUNuQix1QkFBTyxHQUFkLFVBQWUsa0JBQTRCO1FBQ3pDLE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWU7WUFDekIsU0FBUyxFQUFFO2dCQUNULGtCQUFrQjtnQkFDbEIsZ0JBQWdCO2FBQ2pCO1NBQ0YsQ0FBQztJQUNKLENBQUM7O0lBVFUsZUFBZTtRQUQzQixRQUFRLEVBQUU7T0FDRSxlQUFlLENBVTNCO0lBQUQsc0JBQUM7Q0FBQSxBQVZELElBVUM7U0FWWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdvb2dsZVNES1NlcnZpY2UgfSBmcm9tICcuL2dvb2dsZS1zZGsuc2VydmljZSc7XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIE3Ds2R1bG8gcGFyYSBwYXJhbWV0cml6YXIgbGEgYXV0ZW50aWNhY2nDs24gY29uIEdvb2dsZVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBpbXBvcnQgeyBOR19HQVBJX0NPTkZJRywgR29vZ2xlU0RLTW9kdWxlIH0gZnJvbSAnQHNlcnNvbC9uZ3gnO1xyXG4gKiBATmdNb2R1bGUoe1xyXG4gKiAgaW1wb3J0czogW1xyXG4gKiAgICAuLi4sXHJcbiAqICAgIEdvb2dsZVNES01vZHVsZS5mb3JSb290KHtcclxuICogICAgICAgIHByb3ZpZGU6IE5HX0dBUElfQ09ORklHLFxyXG4gKiAgICAgICAgdXNlVmFsdWU6IHtcclxuICogICAgICAgICAgICBjbGllbnRfaWQ6IEdPT0dMRV9DTElFTlRfSUQsXHJcbiAqICAgICAgICAgICAgc2NvcGU6ICdwcm9maWxlIGVtYWlsJ1xyXG4gKiAgICAgICAgfVxyXG4gKiAgICB9KSxcclxuICogICAgLi4uXHJcbiAqICBdLFxyXG4gKiAgZGVjbGFyYXRpb25zOiBbLi4uXSxcclxuICogIHNjaGVtYXM6IFsuLi5dLFxyXG4gKiAgcHJvdmlkZXJzOiBbLi4uXSxcclxuICogIGJvb3RzdHJhcDogWy4uLl1cclxuICogfSlcclxuICogZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuICovXHJcbkBOZ01vZHVsZSgpXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVTREtNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGdhcGlDb25maWdQcm92aWRlcjogUHJvdmlkZXIpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBHb29nbGVTREtNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIGdhcGlDb25maWdQcm92aWRlcixcclxuICAgICAgICBHb29nbGVTREtTZXJ2aWNlXHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==